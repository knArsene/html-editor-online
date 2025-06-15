import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileText, FileCode, Plus, Trash2, Edit2, Image, File, Copy, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FileItem {
  name: string;
  type: 'file' | 'image';
  url?: string; // For images
}

interface FileManagerProps {
  files: string[];
  images: { name: string; url: string }[];
  activeFile: string;
  onFileSelect: (file: string) => void;
  onFileCreate: () => void;
  onFileDelete: (file: string) => void;
  onFileRename?: (oldName: string, newName: string) => void;
  onImageUpload: (name: string, file: File) => void;
  onImageDelete: (name: string) => void;
  onImageRename?: (oldName: string, newName: string) => void;
  onImageSelect?: (imageName: string) => void;
}

export const FileManager: React.FC<FileManagerProps> = ({
  files,
  images,
  activeFile,
  onFileSelect,
  onFileCreate,
  onFileDelete,
  onFileRename,
  onImageUpload,
  onImageDelete,
  onImageRename,
  onImageSelect
}) => {
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [showAddMenu, setShowAddMenu] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

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

  const handleEditStart = (itemName: string) => {
    setEditingItem(itemName);
    setEditValue(itemName);
  };

  const handleEditSave = () => {
    if (editingItem && editValue && editValue !== editingItem) {
      const isImage = images.some(img => img.name === editingItem);
      if (isImage && onImageRename) {
        onImageRename(editingItem, editValue);
      } else if (!isImage && onFileRename) {
        onFileRename(editingItem, editValue);
      }
    }
    setEditingItem(null);
    setEditValue('');
  };

  const handleEditCancel = () => {
    setEditingItem(null);
    setEditValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEditSave();
    } else if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const fileName = file.name;
      onImageUpload(fileName, file);
      setShowAddMenu(false);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (PNG, JPG, GIF, SVG, WebP)",
        variant: "destructive"
      });
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const copyImageUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "URL copied",
      description: "Image URL has been copied to clipboard"
    });
  };

  const handleItemClick = (item: FileItem) => {
    if (item.type === 'file') {
      onFileSelect(item.name);
    } else if (item.type === 'image' && onImageSelect) {
      onImageSelect(item.name);
    }
  };

  // Combine files and images for display
  const allItems: (FileItem & { isActive?: boolean })[] = [
    ...files.map(file => ({ name: file, type: 'file' as const, isActive: activeFile === file })),
    ...images.map(img => ({ name: img.name, type: 'image' as const, url: img.url }))
  ];

  return (
    <div className="bg-muted/20 border-b border-border px-3 py-2 min-h-[60px]">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
          <FileCode className="w-3 h-3" />
          Files & Images
        </h3>
        <div className="relative">
          <Button 
            onClick={() => setShowAddMenu(!showAddMenu)} 
            size="icon" 
            variant="ghost" 
            className="h-6 w-6 hover:bg-accent"
            title="Add file or image"
          >
            <Plus className="w-3 h-3" />
          </Button>
          
          {showAddMenu && (
            <div className="absolute right-0 top-8 bg-popover border rounded-md shadow-md p-1 z-10 min-w-[120px]">
              <button
                onClick={() => {
                  onFileCreate();
                  setShowAddMenu(false);
                }}
                className="w-full text-left px-2 py-1.5 text-xs hover:bg-accent rounded flex items-center gap-2"
              >
                <FileCode className="w-3 h-3" />
                Add File
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full text-left px-2 py-1.5 text-xs hover:bg-accent rounded flex items-center gap-2"
              >
                <Upload className="w-3 h-3" />
                Upload Image
              </button>
            </div>
          )}
        </div>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
      
      <div className="flex flex-wrap gap-1 items-center">
        {allItems.map((item) => (
          <div
            key={item.name}
            className={`relative flex items-center justify-between min-w-0 max-w-[180px] px-2 py-1 rounded text-xs cursor-pointer transition-all duration-200 group border ${
              item.isActive
                ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                : item.type === 'image'
                ? 'text-muted-foreground hover:bg-green-50 hover:text-green-700 border-transparent hover:border-green-200'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground border-transparent hover:border-border'
            }`}
          >
            {editingItem === item.name ? (
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
                  onClick={() => handleItemClick(item)} 
                  className="flex items-center gap-1.5 flex-1 min-w-0"
                >
                  {getFileIcon(item.name)}
                  <span className="truncate font-medium text-xs">{item.name}</span>
                  {item.type === 'image' && (
                    <span className="text-[10px] bg-green-100 text-green-700 px-1 rounded">IMG</span>
                  )}
                </div>
                
                <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-1">
                  {item.type === 'image' && item.url && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyImageUrl(item.url!);
                      }}
                      className="p-0.5 text-muted-foreground hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="Copy image URL"
                    >
                      <Copy className="w-2.5 h-2.5" />
                    </button>
                  )}
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditStart(item.name);
                    }}
                    className="p-0.5 text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-colors"
                    title="Rename"
                  >
                    <Edit2 className="w-2.5 h-2.5" />
                  </button>
                  
                  {(files.length > 1 || item.type === 'image') && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (item.type === 'image') {
                          onImageDelete(item.name);
                        } else {
                          onFileDelete(item.name);
                        }
                      }}
                      className="p-0.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-colors"
                      title="Delete"
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
      
      {showAddMenu && (
        <div 
          className="fixed inset-0 z-5" 
          onClick={() => setShowAddMenu(false)}
        />
      )}
    </div>
  );
};
