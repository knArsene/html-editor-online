
import React from "react";
import { Input } from "@/components/ui/input";
import { Copy, Edit2, Trash2 } from "lucide-react";
import { FileItem } from "./FileManager"; // type import

interface FileItemRowProps {
  item: FileItem & { isActive?: boolean; url?: string };
  editingItem: string | null;
  editValue: string;
  onItemClick: (item: FileItem) => void;
  onEditStart: (name: string) => void;
  onEditSave: () => void;
  onEditCancel: () => void;
  setEditValue: (name: string) => void;
  onCopyImageUrl: (url: string) => void;
  onDelete: (item: FileItem) => void;
  getFileIcon: (filename: string) => React.ReactNode;
}

export const FileItemRow: React.FC<FileItemRowProps> = ({
  item,
  editingItem,
  editValue,
  onItemClick,
  onEditStart,
  onEditSave,
  onEditCancel,
  setEditValue,
  onCopyImageUrl,
  onDelete,
  getFileIcon,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onEditSave();
    } else if (e.key === "Escape") {
      onEditCancel();
    }
  };

  return (
    <div
      className={`relative flex items-center justify-between min-w-0 max-w-[180px] px-2 py-1 rounded text-xs cursor-pointer transition-all duration-200 group border ${
        item.isActive
          ? "bg-primary text-primary-foreground border-primary shadow-sm"
          : item.type === "image"
          ? "text-muted-foreground hover:bg-green-50 dark:hover:bg-green-900 hover:text-green-700 dark:hover:text-green-200 border-transparent hover:border-green-200"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground border-transparent hover:border-border"
      }`}
    >
      {editingItem === item.name ? (
        <Input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={onEditSave}
          className="h-5 text-xs px-1 min-w-16 w-full
            bg-background text-foreground
            border border-border
            placeholder:text-muted-foreground
            focus:outline-none focus:ring-2 focus:ring-blue-400
            transition-all
            dark:bg-background dark:text-foreground dark:placeholder:text-muted-foreground"
          autoFocus
        />
      ) : (
        <>
          <div
            onClick={() => onItemClick(item)}
            className="flex items-center gap-1.5 flex-1 min-w-0"
          >
            {getFileIcon(item.name)}
            <span className="truncate font-medium text-xs">{item.name}</span>
            {item.type === "image" && (
              <span className="text-[10px] bg-green-100 text-green-700 px-1 rounded">
                IMG
              </span>
            )}
          </div>
          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-1">
            {item.type === "image" && item.url && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCopyImageUrl(item.url!);
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
                onEditStart(item.name);
              }}
              className="p-0.5 text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-colors"
              title="Rename"
            >
              <Edit2 className="w-2.5 h-2.5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(item);
              }}
              className="p-0.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-colors"
              title="Delete"
            >
              <Trash2 className="w-2.5 h-2.5" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
