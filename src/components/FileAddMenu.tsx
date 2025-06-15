
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileCode, Plus } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

interface FileAddMenuProps {
  show: boolean;
  setShow: (open: boolean) => void;
  onFileCreate: () => void;
  onImageUpload: (name: string, file: File) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

export const FileAddMenu: React.FC<FileAddMenuProps> = ({
  show,
  setShow,
  onFileCreate,
  onImageUpload,
  fileInputRef,
}) => {
  // File input handler scoped here (for image uploads)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      onImageUpload(file.name, file);
      setShow(false);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <Popover open={show} onOpenChange={setShow}>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6 hover:bg-accent"
            title="Add file or image"
            aria-label="Add file or image"
          >
            <Plus className="w-3 h-3" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0 w-40 rounded-lg shadow-xl border z-40 bg-background animate-fade-in"
          align="end"
          sideOffset={8}
        >
          <button
            onClick={() => {
              onFileCreate();
              setShow(false);
            }}
            className="w-full text-left px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground rounded-t-lg flex items-center gap-2 focus:bg-accent focus:text-accent-foreground focus:outline-none"
          >
            <FileCode className="w-4 h-4" />
            Add File
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full text-left px-3 py-2 text-sm transition-colors hover:bg-green-50 dark:hover:bg-green-900 hover:text-green-700 dark:hover:text-green-200 flex items-center gap-2 focus:bg-green-50 dark:focus:bg-green-900 focus:text-green-700 dark:focus:text-green-200 focus:outline-none"
          >
            <Upload className="w-4 h-4" />
            Upload Image
          </button>
        </PopoverContent>
      </Popover>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </>
  );
};
