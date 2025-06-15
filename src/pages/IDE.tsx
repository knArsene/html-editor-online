
import React, { useState } from 'react';
import { IDEHeader } from '@/components/IDEHeader';
import { EditorSection } from '@/components/EditorSection';
import { PreviewSection } from '@/components/PreviewSection';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

interface FileContent {
  [fileName: string]: string;
}

const INITIAL_SINGLE_FILE = {
  'index.html': `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>My Project</title>
  <style>body{font-family:sans-serif;text-align:center;margin-top:50px}</style>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>This is your new project.</p>
</body>
</html>`
};

const INITIAL_SPLIT_FILES = {
  'index.html': '',
  'style.css': '',
  'script.js': ''
};

const IDE = () => {
  const [mode, setMode] = useState<'single' | 'split'>('single');
  
  // Separate state for each mode
  const [singleModeFiles, setSingleModeFiles] = useState<FileContent>(INITIAL_SINGLE_FILE);
  const [splitModeFiles, setSplitModeFiles] = useState<FileContent>(INITIAL_SPLIT_FILES);
  const [singleModeActiveFile, setSingleModeActiveFile] = useState('index.html');
  const [splitModeActiveFile, setSplitModeActiveFile] = useState('index.html');
  
  const [previewKey, setPreviewKey] = useState(0);

  // Get current files and active file based on mode
  const files = mode === 'single' ? singleModeFiles : splitModeFiles;
  const activeFile = mode === 'single' ? singleModeActiveFile : splitModeActiveFile;

  const handleModeChange = (newMode: 'single' | 'split') => {
    setMode(newMode);
    setPreviewKey(prev => prev + 1);
  };

  const updateFile = (fileName: string, content: string) => {
    if (mode === 'single') {
      setSingleModeFiles(prev => ({ ...prev, [fileName]: content }));
    } else {
      setSplitModeFiles(prev => ({ ...prev, [fileName]: content }));
    }
  };

  const setActiveFile = (fileName: string) => {
    if (mode === 'single') {
      setSingleModeActiveFile(fileName);
    } else {
      setSplitModeActiveFile(fileName);
    }
  };

  const createFile = () => {
    const fileName = prompt('Enter file name (e.g., "styles.css", "utils.js", "about.html"):');
    if (fileName && fileName.trim() && !files[fileName]) {
      if (mode === 'single') {
        setSingleModeFiles(prev => ({ ...prev, [fileName]: '' }));
        setSingleModeActiveFile(fileName);
      } else {
        setSplitModeFiles(prev => ({ ...prev, [fileName]: '' }));
        setSplitModeActiveFile(fileName);
      }
    }
  };

  const deleteFile = (fileName: string) => {
    if (Object.keys(files).length <= 1) {
      alert('Cannot delete the last file');
      return;
    }
    if (confirm(`Are you sure you want to delete ${fileName}?`)) {
      const newFiles = { ...files };
      delete newFiles[fileName];
      
      if (mode === 'single') {
        setSingleModeFiles(newFiles);
        if (activeFile === fileName) {
          setSingleModeActiveFile(Object.keys(newFiles)[0]);
        }
      } else {
        setSplitModeFiles(newFiles);
        if (activeFile === fileName) {
          setSplitModeActiveFile(Object.keys(newFiles)[0]);
        }
      }
    }
  };

  const runCode = () => setPreviewKey(prev => prev + 1);

  const generateCombinedHTML = () => {
    if (mode === 'single') {
      return files['index.html'] || '';
    }

    // In split mode, combine all files
    const htmlFile = files['index.html'] || '';
    const cssFiles = Object.entries(files).filter(([name]) => name.endsWith('.css'));
    const jsFiles = Object.entries(files).filter(([name]) => name.endsWith('.js'));

    let combinedHTML = htmlFile;

    // Inject CSS
    if (cssFiles.length > 0) {
      const cssContent = cssFiles.map(([, content]) => content).join('\n\n');
      if (cssContent.trim()) {
        if (combinedHTML.includes('</head>')) {
          combinedHTML = combinedHTML.replace('</head>', `<style>\n${cssContent}\n</style>\n</head>`);
        } else {
          combinedHTML = `<style>\n${cssContent}\n</style>\n${combinedHTML}`;
        }
      }
    }

    // Inject JS
    if (jsFiles.length > 0) {
      const jsContent = jsFiles.map(([, content]) => content).join('\n\n');
      if (jsContent.trim()) {
        if (combinedHTML.includes('</body>')) {
          combinedHTML = combinedHTML.replace('</body>', `<script>\n${jsContent}\n</script>\n</body>`);
        } else {
          combinedHTML = `${combinedHTML}\n<script>\n${jsContent}\n</script>`;
        }
      }
    }

    return combinedHTML;
  };

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

  const resetCode = () => {
    if (confirm('Are you sure you want to reset all code? This action cannot be undone.')) {
      if (mode === 'single') {
        setSingleModeFiles({ 'index.html': '' });
        setSingleModeActiveFile('index.html');
      } else {
        setSplitModeFiles(INITIAL_SPLIT_FILES);
        setSplitModeActiveFile('index.html');
      }
      setPreviewKey(prev => prev + 1);
    }
  };

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
        <div className="h-[calc(100vh-140px)]">
          <ResizablePanelGroup direction="horizontal" className="min-h-full">
            <ResizablePanel defaultSize={50} minSize={30}>
              <EditorSection
                mode={mode}
                files={files}
                activeFile={activeFile}
                onActiveFileChange={setActiveFile}
                onFileUpdate={updateFile}
                onFileCreate={createFile}
                onFileDelete={deleteFile}
              />
            </ResizablePanel>
            
            <ResizableHandle 
              withHandle 
              className="w-2 bg-transparent hover:bg-blue-500/20 transition-colors border-l border-transparent hover:border-blue-500 group"
            />
            
            <ResizablePanel defaultSize={50} minSize={30}>
              <PreviewSection
                htmlContent={generateCombinedHTML()}
                previewKey={previewKey}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  );
};

export default IDE;
