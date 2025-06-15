
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileText, FileCode, Plus, Trash2, Edit2, Image, File } from 'lucide-react';

interface FileManagerProps {
  files: string[];
  activeFile: string;
  onFileSelect: (file: string) => void;
  onFileCreate: () => void;
  onFileDelete: (file: string) => void;
  onFileRename?: (oldName: string, newName: string) => void;
}

export const FileManager: React.FC<FileManagerProps> = ({
  files,
  activeFile,
  onFileSelect,
  onFileCreate,
  onFileDelete,
  onFileRename
}) => {
  const [editingFile, setEditingFile] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    const iconProps = { className: "w-3 h-3 flex-shrink-0" };
    
    switch (ext) {
      case 'html':
        return <FileCode {...iconProps} style={{ color: '#e34c26' }} />;
      case 'css':
        return <FileCode {...iconProps} style={{ color: '#1572b6' }} />;
      case 'js':
        return <FileCode {...iconProps} style={{ color: '#f7df1e' }} />;
      case 'ts':
        return <FileCode {...iconProps} style={{ color: '#3178c6' }} />;
      case 'json':
        return <FileCode {...iconProps} style={{ color: '#ffd700' }} />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'svg':
      case 'webp':
        return <Image {...iconProps} style={{ color: '#4ade80' }} />;
      case 'md':
        return <FileText {...iconProps} style={{ color: '#ffffff' }} />;
      default:
        return <File {...iconProps} style={{ color: '#6b7280' }} />;
    }
  };

  const handleEditStart = (filename: string) => {
    setEditingFile(filename);
    setEditValue(filename);
  };

  const handleEditSave = () => {
    if (editingFile && editValue && editValue !== editingFile && onFileRename) {
      onFileRename(editingFile, editValue);
    }
    setEditingFile(null);
    setEditValue('');
  };

  const handleEditCancel = () => {
    setEditingFile(null);
    setEditValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEditSave();
    } else if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  return (
    <div className="bg-muted/20 border-b border-border px-3 py-2 min-h-[60px]">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
          <FileCode className="w-3 h-3" />
          Files
        </h3>
        <Button 
          onClick={onFileCreate} 
          size="icon" 
          variant="ghost" 
          className="h-6 w-6 hover:bg-accent"
          title="Add new file"
        >
          <Plus className="w-3 h-3" />
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-1 items-center">
        {files.map((file) => (
          <div
            key={file}
            className={`relative flex items-center justify-between min-w-0 max-w-[180px] px-2 py-1 rounded text-xs cursor-pointer transition-all duration-200 group border ${
              activeFile === file
                ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground border-transparent hover:border-border'
            }`}
          >
            {editingFile === file ? (
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleEditSave}
                className="h-5 text-xs px-1 min-w-16 w-full"
                autoFocus
              />
            ) : (
              <>
                <div 
                  onClick={() => onFileSelect(file)} 
                  className="flex items-center gap-1.5 flex-1 min-w-0"
                >
                  {getFileIcon(file)}
                  <span className="truncate font-medium text-xs">{file}</span>
                </div>
                
                <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-1">
                  {onFileRename && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditStart(file);
                      }}
                      className="p-0.5 text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-colors"
                      title="Rename file"
                    >
                      <Edit2 className="w-2.5 h-2.5" />
                    </button>
                  )}
                  {files.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onFileDelete(file);
                      }}
                      className="p-0.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-colors"
                      title="Delete file"
                    >
                      <Trash2 className="w-2.5 h-2.5" />
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
