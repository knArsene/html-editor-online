import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, FileCode, Plus, Trash2 } from 'lucide-react';

interface FileManagerProps {
  files: string[];
  activeFile: string;
  onFileSelect: (file: string) => void;
  onFileCreate: () => void;
  onFileDelete: (file: string) => void;
}

export const FileManager: React.FC<FileManagerProps> = ({
  files,
  activeFile,
  onFileSelect,
  onFileCreate,
  onFileDelete
}) => {
  const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop();
    if (ext === 'html') return <FileCode className="w-4 h-4 text-orange-400" />;
    if (ext === 'css') return <FileCode className="w-4 h-4 text-blue-400" />;
    if (ext === 'js') return <FileCode className="w-4 h-4 text-yellow-400" />;
    return <FileText className="w-4 h-4 text-gray-400" />;
  };

  return (
    <div className="bg-muted border-b border-border p-3">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-foreground">Files</h3>
        <Button onClick={onFileCreate} size="icon" variant="default" className="h-7 w-7">
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-1">
        {files.map((file) => (
          <div
            key={file}
            className={`flex items-center justify-between space-x-1 px-2 py-1 rounded text-xs cursor-pointer transition-colors group ${
              activeFile === file
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            <div onClick={() => onFileSelect(file)} className="flex items-center space-x-1 flex-1">
              {getFileIcon(file)}
              <span>{file}</span>
            </div>
            {files.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onFileDelete(file);
                }}
                className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
