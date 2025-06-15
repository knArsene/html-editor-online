
import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AddFileDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onAdd: (fileName: string) => void;
}

export const AddFileDialog: React.FC<AddFileDialogProps> = ({
  open,
  setOpen,
  onAdd,
}) => {
  const [fileName, setFileName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    if (fileName.trim() !== '') {
      onAdd(fileName.trim());
      setFileName('');
      setOpen(false);
    }
  };

  const handleCancel = () => {
    setFileName('');
    setOpen(false);
  };

  React.useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xs p-4 rounded-lg shadow-2xl border bg-background">
        <DialogHeader>
          <DialogTitle className="text-sm mb-2 text-center">Add New File</DialogTitle>
        </DialogHeader>
        <Input
          ref={inputRef}
          value={fileName}
          onChange={e => setFileName(e.target.value)}
          placeholder="Enter file name e.g. file.ts"
          className="text-sm py-1 px-2 mb-2"
          autoFocus
          onKeyDown={e => {
            if (e.key === "Enter") handleAdd();
            if (e.key === "Escape") handleCancel();
          }}
        />
        <DialogFooter className="flex justify-end gap-2 mt-1">
          <Button variant="outline" size="sm" onClick={handleCancel}>Cancel</Button>
          <Button size="sm" onClick={handleAdd} disabled={!fileName.trim()}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
