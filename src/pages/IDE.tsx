
import React, { useState } from 'react';
import { IDEHeader } from '@/components/IDEHeader';
import { EditorSection } from '@/components/EditorSection';
import { PreviewSection } from '@/components/PreviewSection';
import { FileManager } from '@/components/FileManager';
import { Plus } from 'lucide-react';

const DEFAULT_SINGLE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome</title>
</head>
<body>
    <!-- Start coding here! -->
</body>
</html>`;

export type FileMap = { [filename: string]: string };

const DEFAULT_FILES: FileMap = {
  "index.html": "",
  "style.css": "",
  "script.js": ""
};

const DEFAULT_SINGLE_FILE = {
  html: DEFAULT_SINGLE_HTML,
  css: "",
  js: ""
};

const IDE = () => {
  // "single": just one big HTML blob, "split": multiple named files
  const [mode, setMode] = useState<"single" | "split">("single");

  // In SPLIT mode: map of filename to content
  const [files, setFiles] = useState<FileMap>({ ...DEFAULT_FILES });

  // In SPLIT mode: track current file being edited
  const [activeFile, setActiveFile] = useState("index.html");

  // In SINGLE mode:
  const [single, setSingle] = useState({ ...DEFAULT_SINGLE_FILE });

  // For preview <iframe>
  const [previewKey, setPreviewKey] = useState(0);

  // Handler: switch modes
  const handleModeChange = (newMode: "single" | "split") => {
    setMode(newMode);
    if (newMode === "split") {
      // When first switching, clear files (user must add files manually)
      setFiles({});
      setActiveFile(""); // no file selected at start
    } else {
      // When back to single, prefill with empty HTML
      setSingle({ ...DEFAULT_SINGLE_FILE });
    }
  };

  // Handler: adding a new file
  const handleFileCreate = () => {
    let name = window.prompt("Enter new file name (e.g. style.css):", "");
    if (!name) return;
    name = name.trim();
    if (!name) return;
    if (files[name]) {
      alert("A file with that name already exists.");
      return;
    }
    setFiles(prev => ({ ...prev, [name]: "" }));
    setActiveFile(name);
  };

  // Handler: delete a file
  const handleFileDelete = (file: string) => {
    if (!window.confirm(`Delete file "${file}"?`)) return;
    setFiles(prev => {
      const newFiles = { ...prev };
      delete newFiles[file];
      return newFiles;
    });
    if (activeFile === file) {
      const remaining = Object.keys(files).filter(f => f !== file);
      setActiveFile(remaining[0] || "");
    }
  };

  // Editor content get/set for SPLIT mode
  const getEditorValue = () => {
    if (mode === "single") {
      return single;
    }
    // For split, show the content for selected file (default to blank)
    if (!activeFile) return { html: "", css: "", js: "" };
    // EditorSection expects {html, css, js}, but for custom files we'll show a blank js editor.
    const ext = activeFile.split('.').pop();
    let out = { html: "", css: "", js: "" };
    if (ext === "html") out.html = files[activeFile] || "";
    else if (ext === "css") out.css = files[activeFile] || "";
    else if (ext === "js") out.js = files[activeFile] || "";
    else out.html = files[activeFile] || "";
    return out;
  };
  const handleEditorChange = (type: "html" | "css" | "js", val: string) => {
    if (mode === "single") {
      setSingle(prev => ({ ...prev, [type]: val }));
    } else if (activeFile) {
      setFiles(prev => ({ ...prev, [activeFile]: val }));
    }
  };

  // Combine files for preview: for split mode, try to combine html/css/js if those files exist, otherwise blank
  const generateCombinedHTML = () => {
    if (mode === "single") {
      return single.html;
    }
    const html = files["index.html"] || "";
    const css = files["style.css"] || "";
    const js = files["script.js"] || "";
    let out = html;
    // Insert <style> if present
    if (css.trim()) {
      out = out.replace(/<\/head>/i, `<style>\n${css}\n</style>\n</head>`);
      if (!/<\/head>/i.test(out)) {
        // No head: prepend style top
        out = `<style>\n${css}\n</style>\n` + out;
      }
    }
    // Insert <script> if present
    if (js.trim()) {
      out = out.replace(/<\/body>/i, `<script>\n${js}\n</script>\n</body>`);
      if (!/<\/body>/i.test(out)) {
        // No body: append at end
        out += `\n<script>\n${js}\n</script>\n`;
      }
    }
    return out;
  };

  // Download Project
  const downloadProject = () => {
    const htmlContent = generateCombinedHTML();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'project.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Reset (single: blank, split: remove all files)
  const resetCode = () => {
    if (!window.confirm('Are you sure you want to reset all code?')) return;
    if (mode === "single") {
      setSingle({ ...DEFAULT_SINGLE_FILE });
    } else {
      setFiles({});
      setActiveFile("");
    }
    setPreviewKey(prev => prev + 1);
  };

  // "Run" just triggers previewKey update
  const runCode = () => setPreviewKey(prev => prev + 1);

  // For EditorSection: only show if there's a file selected in split, or all in single
  const showEditor = mode === "single" || !!activeFile;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <IDEHeader
        mode={mode}
        onModeChange={handleModeChange}
        onRunCode={runCode}
        onResetCode={resetCode}
        onDownloadProject={downloadProject}
      />
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-[calc(100vh-140px)]">
          <div className="flex flex-col h-full">
            {/* File manager only for split mode */}
            {mode === "split" && (
              <FileManager
                files={Object.keys(files)}
                activeFile={activeFile}
                onFileSelect={setActiveFile}
                onFileCreate={handleFileCreate}
                onFileDelete={handleFileDelete}
              />
            )}
            {/* Code editor */}
            {showEditor && (
              <EditorSection
                mode={mode}
                files={getEditorValue()}
                activeTab={activeFile.split('.').pop() || "html"}
                onActiveTabChange={() => {}}
                onFileUpdate={handleEditorChange}
              />
            )}
          </div>
          <PreviewSection
            htmlContent={generateCombinedHTML()}
            previewKey={previewKey}
          />
        </div>
      </div>
    </div>
  );
};
export default IDE;
