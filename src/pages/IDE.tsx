
import React, { Suspense, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Footer } from '@/components/Footer';
import { useIsMobile } from '@/hooks/use-mobile';

// Lazy-load panels for faster initial load
const EditorPanel = React.lazy(() => import('./IDE/EditorPanel').then(m => ({ default: m.EditorPanel })));
const PreviewPanel = React.lazy(() => import('./IDE/PreviewPanel').then(m => ({ default: m.PreviewPanel })));
import { IDESidebar } from './IDE/IDESidebar';

interface FileContent {
  [fileName: string]: string;
}

interface ImageData {
  name: string;
  url: string;
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
  'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Project</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Welcome to My Project</h1>
        <p>This is a sample project with separate HTML, CSS, and JavaScript files.</p>
        <button onclick="showMessage()">Click Me!</button>
    </div>
    <script src="script.js"></script>
</body>
</html>`,
  'styles.css': `/* Main Styles */
body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.container {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    text-align: center;
    max-width: 500px;
}

h1 {
    color: #333;
    margin-bottom: 1rem;
}

p {
    color: #666;
    line-height: 1.6;
    margin-bottom: 2rem;
}

button {
    background: #667eea;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s ease;
}

button:hover {
    background: #5a6fd8;
}`,
  'script.js': `// JavaScript functionality
function showMessage() {
    alert('Hello! This is JavaScript working with your HTML and CSS.');
    
    // Add some dynamic styling
    const button = document.querySelector('button');
    button.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Project loaded successfully!');
    
    // Add some interactive effects
    const container = document.querySelector('.container');
    if (container) {
        container.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        container.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
});`
};

const IDE = () => {
  const [mode, setMode] = useState<'single' | 'split'>('single');
  const isMobile = useIsMobile();
  
  // Separate state for each mode
  const [singleModeFiles, setSingleModeFiles] = useState<FileContent>(INITIAL_SINGLE_FILE);
  const [splitModeFiles, setSplitModeFiles] = useState<FileContent>(INITIAL_SPLIT_FILES);
  const [singleModeActiveFile, setSingleModeActiveFile] = useState('index.html');
  const [splitModeActiveFile, setSplitModeActiveFile] = useState('index.html');
  
  // Image management state
  const [singleModeImages, setSingleModeImages] = useState<ImageData[]>([]);
  const [splitModeImages, setSplitModeImages] = useState<ImageData[]>([]);
  
  const [previewKey, setPreviewKey] = useState(0);
  const { toast } = useToast();

  // Get current files, images and active file based on mode
  const files = mode === 'single' ? singleModeFiles : splitModeFiles;
  const images = mode === 'single' ? singleModeImages : splitModeImages;
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

  // Image management functions
  const handleImageUpload = (name: string, file: File) => {
    const url = URL.createObjectURL(file);
    const imageData = { name, url };
    
    if (mode === 'single') {
      setSingleModeImages(prev => [...prev, imageData]);
    } else {
      setSplitModeImages(prev => [...prev, imageData]);
    }
    
    toast({
      title: "Image uploaded",
      description: `${name} is ready to use in your project`
    });
  };

  const handleImageDelete = (name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      if (mode === 'single') {
        setSingleModeImages(prev => {
          const image = prev.find(img => img.name === name);
          if (image) URL.revokeObjectURL(image.url);
          return prev.filter(img => img.name !== name);
        });
      } else {
        setSplitModeImages(prev => {
          const image = prev.find(img => img.name === name);
          if (image) URL.revokeObjectURL(image.url);
          return prev.filter(img => img.name !== name);
        });
      }
      
      toast({
        title: "Image deleted",
        description: `${name} has been removed from your project`
      });
    }
  };

  const handleImageRename = (oldName: string, newName: string) => {
    if (newName && newName.trim() && newName !== oldName) {
      if (mode === 'single') {
        setSingleModeImages(prev => 
          prev.map(img => img.name === oldName ? { ...img, name: newName } : img)
        );
      } else {
        setSplitModeImages(prev => 
          prev.map(img => img.name === oldName ? { ...img, name: newName } : img)
        );
      }
      
      toast({
        title: "Image renamed",
        description: `${oldName} renamed to ${newName}`
      });
    }
  };

  // Helper for file templates (already exists)
  const getFileTemplate = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'html':
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>New HTML File</h1>
</body>
</html>`;
      case 'css':
        return `/* CSS Styles */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
}`;
      case 'js':
        return `// JavaScript Code
console.log('New JavaScript file created');`;
      default:
        return '';
    }
  };

  // Add state to handle deferred file creation name (from custom dialog)
  const [pendingFileName, setPendingFileName] = useState<string | null>(null);

  // Update file creation to NOT use prompt, but accept filename from dialog
  // If a filename is provided, create and set active. (called from FileAddMenu via AddFileDialog)
  const handleCreateFile = (fileName?: string) => {
    if (!fileName) return; // Guard: filename required
    const filesToUse = mode === 'single' ? singleModeFiles : splitModeFiles;
    if (fileName && fileName.trim() && !filesToUse[fileName]) {
      const content = getFileTemplate(fileName);
      if (mode === 'single') {
        setSingleModeFiles(prev => ({ ...prev, [fileName]: content }));
        setSingleModeActiveFile(fileName);
      } else {
        setSplitModeFiles(prev => ({ ...prev, [fileName]: content }));
        setSplitModeActiveFile(fileName);
      }
    } else if (filesToUse[fileName]) {
      toast({
        title: 'File already exists',
        description: `A file named "${fileName}" already exists!`,
        variant: "destructive"
      });
    }
  };

  const renameFile = (oldName: string, newName: string) => {
    if (newName && newName.trim() && newName !== oldName && !files[newName]) {
      const content = files[oldName];
      const newFiles = { ...files };
      delete newFiles[oldName];
      newFiles[newName] = content;
      
      if (mode === 'single') {
        setSingleModeFiles(newFiles);
        if (activeFile === oldName) {
          setSingleModeActiveFile(newName);
        }
      } else {
        setSplitModeFiles(newFiles);
        if (activeFile === oldName) {
          setSplitModeActiveFile(newName);
        }
      }
    } else if (files[newName]) {
      alert('A file with this name already exists!');
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
      <IDESidebar
        mode={mode}
        onModeChange={handleModeChange}
        onRunCode={runCode}
        onResetCode={resetCode}
        onDownloadProject={downloadProject}
      />

      <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-6">
        <div className={`flex ${isMobile ? 'flex-col' : 'gap-6'} ${isMobile ? 'h-[calc(100vh-120px)]' : 'h-[calc(100vh-194px)]'}`}>
          {isMobile ? (
            // Mobile: Stack vertically
            <div className="flex flex-col h-full gap-3">
              <div className="h-1/2 min-h-[300px]">
                <Suspense fallback={
                  <div className="flex items-center justify-center h-full">
                    <div className="w-8 h-8 rounded-full border-4 border-blue-400 border-t-transparent animate-spin mr-2" />
                    <span className="text-muted-foreground text-sm">Loading editor...</span>
                  </div>
                }>
                  <EditorPanel
                    mode={mode}
                    files={files}
                    images={images}
                    activeFile={activeFile}
                    onActiveFileChange={setActiveFile}
                    onFileUpdate={updateFile}
                    onFileCreate={handleCreateFile}
                    onFileDelete={deleteFile}
                    onFileRename={renameFile}
                    onImageUpload={handleImageUpload}
                    onImageDelete={handleImageDelete}
                    onImageRename={handleImageRename}
                  />
                </Suspense>
              </div>

              <div className="h-1/2 min-h-[300px]">
                <Suspense fallback={
                  <div className="flex items-center justify-center h-full">
                    <div className="w-6 h-6 rounded-full border-4 border-green-400 border-t-transparent animate-spin mr-2" />
                    <span className="text-green-500/80 text-sm">Loading preview...</span>
                  </div>
                }>
                  <PreviewPanel
                    htmlContent={generateCombinedHTML()}
                    previewKey={previewKey}
                  />
                </Suspense>
              </div>
            </div>
          ) : (
            // Desktop: Side by side with resizable panels
            <ResizablePanelGroup direction="horizontal" className="min-h-full flex-1">
              <ResizablePanel defaultSize={50} minSize={30}>
                <Suspense fallback={
                  <div className="flex items-center justify-center h-full">
                    <div className="w-10 h-10 rounded-full border-4 border-blue-400 border-t-transparent animate-spin mr-2" />
                    <span className="text-muted-foreground">Loading editor...</span>
                  </div>
                }>
                  <EditorPanel
                    mode={mode}
                    files={files}
                    images={images}
                    activeFile={activeFile}
                    onActiveFileChange={setActiveFile}
                    onFileUpdate={updateFile}
                    onFileCreate={handleCreateFile}
                    onFileDelete={deleteFile}
                    onFileRename={renameFile}
                    onImageUpload={handleImageUpload}
                    onImageDelete={handleImageDelete}
                    onImageRename={handleImageRename}
                  />
                </Suspense>
              </ResizablePanel>

              <ResizableHandle 
                withHandle 
                className="w-2 bg-transparent hover:bg-blue-500/20 transition-colors border-l border-transparent hover:border-blue-500 group"
              />

              <ResizablePanel defaultSize={50} minSize={30}>
                <Suspense fallback={
                  <div className="flex items-center justify-center h-full">
                    <div className="w-8 h-8 rounded-full border-4 border-green-400 border-t-transparent animate-spin mr-2" />
                    <span className="text-green-500/80">Loading preview...</span>
                  </div>
                }>
                  <PreviewPanel
                    htmlContent={generateCombinedHTML()}
                    previewKey={previewKey}
                  />
                </Suspense>
              </ResizablePanel>
            </ResizablePanelGroup>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default IDE;
