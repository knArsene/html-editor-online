import { useState, useRef } from "react";

export interface FileContent {
  html: string; // Only <body> content in split mode
  css: string;
  js: string;
  headContent?: string; // Stores <meta>, <link>, etc.
  externalResources?: string; // Explicitly stores ALL meta/link/title etc from <head>
}

// Improved extraction: robustly collects ALL meta/link/title from entire HTML, not just <head>
function extractCodeFromHTML(html: string) {
  let headContent = "";
  let externalResources = "";
  // Find all meta, link, and title tags everywhere (in or outside <head>)
  const resourceRegex = /(<meta[\s\S]*?>|<link[\s\S]*?>|<title>[\s\S]*?<\/title>)/gi;
  const resources = html.match(resourceRegex);
  if (resources) {
    externalResources = resources.join("\n");
  }

  // Extract any extra stuff inside <head> (raw tags, not resources/styles/scripts)
  const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  if (headMatch) {
    headContent = headMatch[1]
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(resourceRegex, "")
      .trim();
  }

  // Extract all <style>
  let styleBlocks = [];
  const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let styleMatch;
  while ((styleMatch = styleRegex.exec(html)) !== null) {
    styleBlocks.push(styleMatch[1].trim());
  }
  const css = styleBlocks.join('\n\n');

  // Extract all <script>
  let scriptBlocks = [];
  const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
  let scriptMatch;
  while ((scriptMatch = scriptRegex.exec(html)) !== null) {
    scriptBlocks.push(scriptMatch[1].trim());
  }
  const js = scriptBlocks.join('\n\n');

  // Extract <body>, or fallback to everything else minus handled bits
  let bodyContent = "";
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) {
    bodyContent = bodyMatch[1].trim();
  } else {
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
    externalResources: externalResources.trim(),
  };
}

// Robust merge: always re-inject all externalResources (meta, link, font, etc)
function mergeToHTML(html: string, css: string, js: string, headContent?: string, externalResources?: string) {
  let head = "";

  // 1. Inject all meta/link/title
  if (externalResources && externalResources.trim()) {
    head += externalResources.trim() + "\n";
  }

  // 2. Add extra raw headContent (any custom head stuff, not styles/scripts/resources)
  if (headContent && headContent.trim()) {
    head += headContent.trim() + "\n";
  }

  // 3. Insert all CSS
  if (css && css.trim()) {
    head += `<style>\n${css}\n</style>\n`;
  }

  // 4. Ensure <title> exists
  if (!/title>/i.test(head)) {
    head += `<title>Web Project</title>\n`;
  }

  // Build body and add JS in body
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

  // Update file, preserving all externalResources
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
        // Always preserve latest externalResources for merge
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

  // Switch mode, always keep externalResources
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
        // When splitting, always re-extract all head/link/meta resources for future re-merges
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
