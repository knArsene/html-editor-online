import { useState, useRef } from "react";

export interface FileContent {
  html: string; // Will hold the <body> contents only in split mode
  css: string;
  js: string;
  headContent?: string; // New: stores <meta>, <link>, etc.
}

// Extract <head> stuff, <style>, <script>, and <body> content from HTML
function extractCodeFromHTML(html: string) {
  // 1. Extract <head> inner content (to keep meta/link/font)
  let headContent = "";
  const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  if (headMatch) {
    headContent = headMatch[1]
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "") // drop embedded CSS
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ""); // drop embedded JS
  } else {
    // If no <head>, try to extract all <meta>, <link>, and <title> from anywhere
    const metaMatches = html.match(/<(meta|link|title)[^>]*>[\s\S]*?<\/?title>?/gi);
    if (metaMatches) headContent = metaMatches.join("\n");
  }
  // 2. Extract all <style>
  const styleBlocks = [];
  const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let styleMatch;
  while ((styleMatch = styleRegex.exec(html)) !== null) {
    styleBlocks.push(styleMatch[1].trim());
  }
  const css = styleBlocks.join('\n\n');

  // 3. Extract all <script>
  const scriptBlocks = [];
  const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
  let scriptMatch;
  while ((scriptMatch = scriptRegex.exec(html)) !== null) {
    scriptBlocks.push(scriptMatch[1].trim());
  }
  const js = scriptBlocks.join('\n\n');

  // 4. Extract <body> content, or fallback to everything inside <html> if no <body>
  let bodyContent = "";
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) {
    bodyContent = bodyMatch[1].trim();
  } else {
    // fallback: use all content minus <head>, <style>, <script>
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
    headContent,
  };
}

// Reconstruct full HTML with preserved <head> info, merged <style>, and <script>
function mergeToHTML(html: string, css: string, js: string, headContent?: string) {
  // Build the head: keep <meta>, <link>, etc
  let head = headContent ? headContent.trim() : "";

  // Insert CSS in head
  if (css.trim()) {
    head += `\n<style>\n${css}\n</style>\n`;
  }

  // Always add a title if missing
  if (!/title>/i.test(head)) {
    head += `<title>Web Project</title>\n`;
  }

  // Prepare the <body> (from html param)
  let body = html || "";

  //  Compose as proper document
  let output = `<!DOCTYPE html>
<html lang="en">
<head>
${head}
</head>
<body>
${body}
`;

  if (js.trim()) {
    output += `<script>\n${js}\n</script>\n`;
  }
  output += `</body>\n</html>`;
  return output;
}

export function useFileSync(initialFiles: FileContent, initialMode: "single" | "split") {
  // Maintain master file content
  const [files, setFiles] = useState<FileContent>(initialFiles);
  const [mode, setMode] = useState<"single" | "split">(initialMode);

  // Keep the last "split" and "single" representations
  const lastSplit = useRef<FileContent>(extractCodeFromHTML(initialFiles.html));
  const lastSingle = useRef<string>(initialFiles.html);

  // Sync logic: when updating any file, keep both representations updated.
  const updateFile = (type: keyof FileContent, content: string) => {
    if (mode === "single") {
      // Update HTML directly and parse out to split as well
      setFiles((prev) => {
        const updated = { ...prev, html: content };
        const parsed = extractCodeFromHTML(content);
        lastSplit.current = parsed;
        lastSingle.current = content;
        return { ...parsed, html: content };
      });
    } else {
      // Update split and merge to single
      setFiles((prev) => {
        const updated = { ...prev, [type]: content };
        // Use lastSplit.current.headContent or prev.headContent for <head>
        const headContent =
          typeof files.headContent === 'string'
            ? files.headContent
            : lastSplit.current.headContent || "";
        const single = mergeToHTML(
          updated.html,
          updated.css,
          updated.js,
          headContent
        );
        lastSplit.current = { ...updated, headContent };
        lastSingle.current = single;
        return { ...updated, headContent };
      });
    }
  };

  // When mode changes, sync files accordingly
  const handleModeChange = (newMode: "single" | "split") => {
    setMode(newMode);
    setFiles((prev) => {
      if (newMode === "single") {
        // Combine split files into a single HTML file
        const merged = mergeToHTML(
          prev.html,
          prev.css,
          prev.js,
          prev.headContent
        );
        lastSingle.current = merged;
        return { html: merged, css: prev.css, js: prev.js, headContent: prev.headContent };
      } else {
        // Split the single HTML file into individual parts
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
