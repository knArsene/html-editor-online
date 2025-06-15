import React, { useCallback, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { CodeEditor } from '@/components/CodeEditor';
import { ImagePreview } from '@/components/ImagePreview';
import { PanelToolbar } from "@/components/PanelToolbar";
import { FileManager } from "@/components/FileManager";
import { Code } from "lucide-react";

interface EditorSectionProps {
  mode: 'single' | 'split';
  files: { [fileName: string]: string };
  images: { name: string; url: string }[];
  activeFile: string;
  onActiveFileChange: (fileName: string) => void;
  onFileUpdate: (fileName: string, content: string) => void;
  onFileCreate: () => void;
  onFileDelete: (fileName: string) => void;
  onFileRename?: (oldName: string, newName: string) => void;
  onImageUpload: (name: string, file: File) => void;
  onImageDelete: (name: string) => void;
  onImageRename?: (oldName: string, newName: string) => void;
}

export const EditorSection: React.FC<EditorSectionProps> = ({
  mode,
  files,
  images,
  activeFile,
  onActiveFileChange,
  onFileUpdate,
  onFileCreate,
  onFileDelete,
  onFileRename,
  onImageUpload,
  onImageDelete,
  onImageRename
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [previewingImage, setPreviewingImage] = useState<string | null>(null);

  const handleFullscreenChange = useCallback(() => {
    setIsFullscreen(
      document.fullscreenElement === document.getElementById("editor-panel-root")
    );
  }, []);

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }
  }, [handleFullscreenChange]);

  const toggleEditorFullscreen = () => {
    const panel = document.getElementById("editor-panel-root");
    if (!panel) return;
    if (document.fullscreenElement === panel) {
      document.exitFullscreen?.();
    } else {
      panel.requestFullscreen?.();
    }
  };

  const getLanguageFromFileName = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'html':
        return 'html';
      case 'css':
        return 'css';
      case 'js':
        return 'javascript';
      case 'ts':
        return 'typescript';
      case 'json':
        return 'json';
      default:
        return 'html';
    }
  };

  const handleImageSelect = (imageName: string) => {
    setPreviewingImage(imageName);
  };

  const handleCloseImagePreview = () => {
    setPreviewingImage(null);
  };

  const currentPreviewImage = previewingImage 
    ? images.find(img => img.name === previewingImage)
    : null;

  return (
    <Card id="editor-panel-root" className="bg-card border-border flex flex-col shadow-2xl backdrop-blur-sm h-full">
      <PanelToolbar
        icon={<Code className="w-5 h-5 text-blue-400" />}
        title="Code Editor"
        onFullscreen={toggleEditorFullscreen}
      >
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm"></div>
        </div>
      </PanelToolbar>
      
      <div className="flex-1 flex flex-col min-h-0">
        {mode === 'split' && (
          <FileManager
            files={Object.keys(files)}
            images={images}
            activeFile={activeFile}
            onFileSelect={onActiveFileChange}
            onFileCreate={onFileCreate}
            onFileDelete={onFileDelete}
            onFileRename={onFileRename}
            onImageUpload={onImageUpload}
            onImageDelete={onImageDelete}
            onImageRename={onImageRename}
            onImageSelect={handleImageSelect}
          />
        )}
        
        <div className="flex-1 min-h-0">
          {currentPreviewImage ? (
            <ImagePreview
              imageName={currentPreviewImage.name}
              imageUrl={currentPreviewImage.url}
              onClose={handleCloseImagePreview}
            />
          ) : (
            <CodeEditor
              language={getLanguageFromFileName(activeFile)}
              value={files[activeFile] || ''}
              onChange={(value) => onFileUpdate(activeFile, value)}
              className="h-full w-full"
            />
          )}
        </div>
      </div>
    </Card>
  );
};
