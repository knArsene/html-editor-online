import { useState, useRef } from "react";

export interface FileContent {
  html: string;
  css: string;
  js: string;
}

function extractCodeFromHTML(html: string) {
  // Get all <style> contents, join together
  const styleBlocks = [];
  const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let styleMatch;
  while ((styleMatch = styleRegex.exec(html)) !== null) {
    styleBlocks.push(styleMatch[1].trim());
  }
  const css = styleBlocks.join('\n\n');

  // Get all <script> contents, join together
  const scriptBlocks = [];
  const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
  let scriptMatch;
  while ((scriptMatch = scriptRegex.exec(html)) !== null) {
    scriptBlocks.push(scriptMatch[1].trim());
  }
  const js = scriptBlocks.join('\n\n');

  // remove <style> and <script> blocks
  let cleanHtml = html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "");

  // handle empty lines caused by removals
  cleanHtml = cleanHtml.replace(/^\s*[\r\n]/gm, "");

  return {
    html: cleanHtml,
    css,
    js,
  };
}

function mergeToHTML(html: string, css: string, js: string) {
  // Ensure <head> and <body> exist
  let merged = html;

  // Insert CSS in <head>
  if (css.trim()) {
    if (/<head[^>]*>/i.test(merged)) {
      merged = merged.replace(/<head([^>]*)>/i, `<head$1>\n<style>\n${css}\n</style>`);
    } else {
      merged = merged.replace(/<html([^>]*)>/i, `<html$1><head><style>\n${css}\n</style></head>`);
    }
  }

  // Insert JS before </body> (or at end)
  if (js.trim()) {
    if (/<\/body>/.test(merged)) {
      merged = merged.replace(/<\/body>/i, `<script>\n${js}\n</script>\n</body>`);
    } else {
      merged = merged + `\n<script>\n${js}\n</script>`;
    }
  }

  return merged;
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
        const single = mergeToHTML(updated.html, updated.css, updated.js);
        lastSplit.current = updated;
        lastSingle.current = single;
        return updated;
      });
    }
  };

  // When mode changes, sync files accordingly
  const handleModeChange = (newMode: "single" | "split") => {
    setMode(newMode);
    setFiles((prev) => {
      if (newMode === "single") {
        // Combine split files into a single HTML file
        const merged = mergeToHTML(prev.html, prev.css, prev.js);
        lastSingle.current = merged;
        return { html: merged, css: prev.css, js: prev.js };
      } else {
        // Split the single HTML file into individual parts
        const parsed = extractCodeFromHTML(prev.html);
        lastSplit.current = parsed;
        return { html: parsed.html, css: parsed.css, js: parsed.js };
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
