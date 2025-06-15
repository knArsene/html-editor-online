
import React, { useCallback, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { CodeEditor } from '@/components/CodeEditor';
import { PanelToolbar } from "@/components/PanelToolbar";
import { FileManager } from "@/components/FileManager";
import { Code } from "lucide-react";

interface EditorSectionProps {
  mode: 'single' | 'split';
  files: { [fileName: string]: string };
  activeFile: string;
  onActiveFileChange: (fileName: string) => void;
  onFileUpdate: (fileName: string, content: string) => void;
  onFileCreate: () => void;
  onFileDelete: (fileName: string) => void;
}

export const EditorSection: React.FC<EditorSectionProps> = ({
  mode,
  files,
  activeFile,
  onActiveFileChange,
  onFileUpdate,
  onFileCreate,
  onFileDelete
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

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
      default:
        return 'html';
    }
  };

  return (
    <Card id="editor-panel-root" className="bg-card border-border flex flex-col shadow-2xl backdrop-blur-sm">
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
      
      <div className="flex-1 flex flex-col">
        {mode === 'split' && (
          <FileManager
            files={Object.keys(files)}
            activeFile={activeFile}
            onFileSelect={onActiveFileChange}
            onFileCreate={onFileCreate}
            onFileDelete={onFileDelete}
          />
        )}
        
        <div className="flex-1">
          <CodeEditor
            language={getLanguageFromFileName(activeFile)}
            value={files[activeFile] || ''}
            onChange={(value) => onFileUpdate(activeFile, value)}
            className="h-full"
          />
        </div>
      </div>
    </Card>
  );
};
