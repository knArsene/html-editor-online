import { useState, useRef } from "react";

export interface FileContent {
  html: string; // Only <body> content in split mode
  css: string;
  js: string;
  headContent?: string; // Stores <meta>, <link>, etc.
  externalResources?: string; // Explicitly stores ALL meta/link/title etc from <head>
}

// Improved extraction: collects and preserves all external head resources
function extractCodeFromHTML(html: string) {
  // 1. Extract <head> content exactly
  let headContent = "";
  let externalResources = "";
  const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  if (headMatch) {
    headContent = headMatch[1];

    // Extract all <meta>, <link>, <title> from <head>
    const resourceRegex = /(<meta[\s\S]*?>|<link[\s\S]*?>|<title>[\s\S]*?<\/title>)/gi;
    const resources = headContent.match(resourceRegex);
    if (resources) {
      externalResources = resources.join("\n");
    }
    // Remove style and script blocks so only naked resources remain in headContent
    headContent = headContent
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(resourceRegex, "")
      .trim();
  } else {
    // No <head>? Try to extract all <meta>, <link>, <title> from anywhere
    const resourceRegex = /(<meta[\s\S]*?>|<link[\s\S]*?>|<title>[\s\S]*?<\/title>)/gi;
    const resources = html.match(resourceRegex);
    if (resources) {
      externalResources = resources.join("\n");
    }
  }

  // 2. Extract all <style>
  let styleBlocks = [];
  const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let styleMatch;
  while ((styleMatch = styleRegex.exec(html)) !== null) {
    styleBlocks.push(styleMatch[1].trim());
  }
  const css = styleBlocks.join('\n\n');

  // 3. Extract all <script>
  let scriptBlocks = [];
  const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
  let scriptMatch;
  while ((scriptMatch = scriptRegex.exec(html)) !== null) {
    scriptBlocks.push(scriptMatch[1].trim());
  }
  const js = scriptBlocks.join('\n\n');

  // 4. Extract <body> content (or everything minus head/style/script)
  let bodyContent = "";
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) {
    bodyContent = bodyMatch[1].trim();
  } else {
    // Fallback: remove head/style/script from all HTML
    let tempHtml = html
      .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, "")
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "");
    bodyContent = tempHtml.replace(/^\s*[\r\n]/gm, "").trim();
  }

  return {
    html: bodyContent,
    css,
    js,
    headContent: headContent.trim(),
    externalResources: externalResources.trim()
  };
}

// Robust merge: headContent is optional, externalResources always re-injected
function mergeToHTML(html: string, css: string, js: string, headContent?: string, externalResources?: string) {
  let head = "";

  // 1. Insert meta/link/title resources first
  if (externalResources && externalResources.trim()) {
    head += externalResources.trim() + "\n";
  }

  // 2. Add any remaining raw headContent (extra, like custom tags)
  if (headContent && headContent.trim()) {
    head += headContent.trim() + "\n";
  }

  // 3. Then insert all CSS in <style>
  if (css && css.trim()) {
    head += `<style>\n${css}\n</style>\n`;
  }

  // 4. Always add a title if missing
  if (!/title>/i.test(head)) {
    head += `<title>Web Project</title>\n`;
  }

  // 5. Build body and add JS at end
  let body = html || "";
  let output = `<!DOCTYPE html>
<html lang="en">
<head>
${head}
</head>
<body>
${body}
`;

  if (js && js.trim()) {
    output += `<script>\n${js}\n</script>\n`;
  }
  output += `</body>\n</html>`;
  return output;
}

export function useFileSync(initialFiles: FileContent, initialMode: "single" | "split") {
  // Maintain master file content
  const [files, setFiles] = useState<FileContent>({
    ...initialFiles,
    ...extractCodeFromHTML(initialFiles.html)
  });
  const [mode, setMode] = useState<"single" | "split">(initialMode);

  // Track last split/single representations
  const lastSplit = useRef<FileContent>(extractCodeFromHTML(initialFiles.html));
  const lastSingle = useRef<string>(initialFiles.html);

  // Update file, keeping all head resources safe
  const updateFile = (type: keyof FileContent, content: string) => {
    if (mode === "single") {
      setFiles((prev) => {
        const updated = { ...prev, html: content };
        const parsed = extractCodeFromHTML(content);
        lastSplit.current = parsed;
        lastSingle.current = content;
        return { ...parsed, html: content };
      });
    } else {
      setFiles((prev) => {
        const updated = { ...prev, [type]: content };
        // Use externalResources always
        const externalResources =
          typeof files.externalResources === "string"
            ? files.externalResources
            : lastSplit.current.externalResources || "";
        const single = mergeToHTML(
          updated.html,
          updated.css,
          updated.js,
          files.headContent || lastSplit.current.headContent || "",
          externalResources
        );
        lastSplit.current = { ...updated, headContent: files.headContent, externalResources };
        lastSingle.current = single;
        return { ...updated, headContent: files.headContent, externalResources };
      });
    }
  };

  // Handle mode switch, always keep resources
  const handleModeChange = (newMode: "single" | "split") => {
    setMode(newMode);
    setFiles((prev) => {
      if (newMode === "single") {
        const merged = mergeToHTML(
          prev.html,
          prev.css,
          prev.js,
          prev.headContent,
          prev.externalResources
        );
        lastSingle.current = merged;
        return {
          html: merged,
          css: prev.css,
          js: prev.js,
          headContent: prev.headContent,
          externalResources: prev.externalResources,
        };
      } else {
        const parsed = extractCodeFromHTML(prev.html);
        lastSplit.current = parsed;
        return { ...parsed };
      }
    });
  };

  return {
    files,
    setFiles: updateFile,
    mode,
    setMode: handleModeChange,
  };
}
