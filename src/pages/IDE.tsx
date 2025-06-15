import React, { Suspense, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Footer } from '@/components/Footer';
import { useIsMobile } from '@/hooks/use-mobile';
import { useIDEState } from './IDE/hooks/useIDEState';
import { useFileOperations } from './IDE/hooks/useFileOperations';
import { generateCombinedHTML, downloadProject } from './IDE/utils/fileUtils';

// Lazy-load panels for faster initial load
const EditorPanel = React.lazy(() => import('./IDE/EditorPanel').then(m => ({ default: m.EditorPanel })));
const PreviewPanel = React.lazy(() => import('./IDE/PreviewPanel').then(m => ({ default: m.PreviewPanel })));
import { IDESidebar } from './IDE/IDESidebar';

const IDE = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const {
    mode,
    setMode,
    files,
    images,
    activeFile,
    previewKey,
    setPreviewKey,
    updateFile,
    setActiveFile,
    handleImageUpload,
    handleImageDelete,
    handleImageRename,
    resetFiles,
    singleModeFiles,
    setSingleModeFiles,
    splitModeFiles,
    setSplitModeFiles,
    singleModeActiveFile,
    setSingleModeActiveFile,
    splitModeActiveFile,
    setSplitModeActiveFile
  } = useIDEState();

  // Force single mode on mobile devices
  useEffect(() => {
    if (isMobile && mode === 'split') {
      setMode('single');
    }
  }, [isMobile, mode, setMode]);

  const { handleCreateFile, renameFile, deleteFile } = useFileOperations({
    mode,
    files,
    activeFile,
    singleModeFiles,
    setSingleModeFiles,
    splitModeFiles,
    setSplitModeFiles,
    singleModeActiveFile,
    setSingleModeActiveFile,
    splitModeActiveFile,
    setSplitModeActiveFile
  });

  const handleModeChange = (newMode: 'single' | 'split') => {
    // Don't allow split mode on mobile
    if (isMobile && newMode === 'split') {
      return;
    }
    setMode(newMode);
    setPreviewKey(prev => prev + 1);
  };

  const handleImageUploadWithToast = (name: string, file: File) => {
    const imageData = handleImageUpload(name, file);
    toast({
      title: "Image uploaded",
      description: `${name} is ready to use in your project`
    });
    return imageData;
  };

  const handleImageDeleteWithToast = (name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      handleImageDelete(name);
      toast({
        title: "Image deleted",
        description: `${name} has been removed from your project`
      });
    }
  };

  const handleImageRenameWithToast = (oldName: string, newName: string) => {
    const success = handleImageRename(oldName, newName);
    if (success) {
      toast({
        title: "Image renamed",
        description: `${oldName} renamed to ${newName}`
      });
    }
  };

  const runCode = () => setPreviewKey(prev => prev + 1);

  const handleDownloadProject = () => {
    const htmlContent = generateCombinedHTML(mode, files);
    downloadProject(htmlContent);
  };

  const resetCode = () => {
    if (confirm('Are you sure you want to reset all code? This action cannot be undone.')) {
      resetFiles();
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <IDESidebar
        mode={mode}
        onModeChange={handleModeChange}
        onRunCode={runCode}
        onResetCode={resetCode}
        onDownloadProject={handleDownloadProject}
      />

      <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-6">
        <div className={`flex ${isMobile ? 'flex-col' : 'gap-6'} ${isMobile ? 'h-[calc(100vh-120px)]' : 'h-[calc(100vh-194px)]'}`}>
          {isMobile ? (
            // Mobile: Stack vertically (always single mode)
            <div className="flex flex-col h-full gap-3">
              <div className="h-1/2 min-h-[300px]">
                <Suspense fallback={
                  <div className="flex items-center justify-center h-full">
                    <div className="w-8 h-8 rounded-full border-4 border-blue-400 border-t-transparent animate-spin mr-2" />
                    <span className="text-muted-foreground text-sm">Loading editor...</span>
                  </div>
                }>
                  <EditorPanel
                    mode="single"
                    files={files}
                    images={images}
                    activeFile={activeFile}
                    onActiveFileChange={setActiveFile}
                    onFileUpdate={updateFile}
                    onFileCreate={handleCreateFile}
                    onFileDelete={deleteFile}
                    onFileRename={renameFile}
                    onImageUpload={handleImageUploadWithToast}
                    onImageDelete={handleImageDeleteWithToast}
                    onImageRename={handleImageRenameWithToast}
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
                    htmlContent={generateCombinedHTML('single', files)}
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
                    onImageUpload={handleImageUploadWithToast}
                    onImageDelete={handleImageDeleteWithToast}
                    onImageRename={handleImageRenameWithToast}
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
                    htmlContent={generateCombinedHTML(mode, files)}
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
