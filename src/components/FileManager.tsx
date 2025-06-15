import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileText, FileCode, Plus, Trash2, Edit2, Image, File, Copy, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { FileAddMenu } from "./FileAddMenu";
import { FileItemRow } from "./FileItemRow";

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
        <FileAddMenu
          show={showAddMenu}
          setShow={setShowAddMenu}
          onFileCreate={onFileCreate}
          onImageUpload={onImageUpload}
          fileInputRef={fileInputRef}
        />
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
          <FileItemRow
            key={item.name}
            item={item}
            editingItem={editingItem}
            editValue={editValue}
            onItemClick={handleItemClick}
            onEditStart={handleEditStart}
            onEditSave={handleEditSave}
            onEditCancel={handleEditCancel}
            setEditValue={setEditValue}
            onCopyImageUrl={copyImageUrl}
            onDelete={(item) => {
              if (item.type === "image") {
                onImageDelete(item.name);
              } else {
                onFileDelete(item.name);
              }
            }}
            getFileIcon={getFileIcon}
          />
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
