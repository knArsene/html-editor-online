
import { useToast } from '@/hooks/use-toast';
import { getFileTemplate } from '../utils/fileUtils';

interface FileContent {
  [fileName: string]: string;
}

interface UseFileOperationsProps {
  mode: 'single' | 'split';
  files: FileContent;
  activeFile: string;
  singleModeFiles: FileContent;
  setSingleModeFiles: (files: FileContent | ((prev: FileContent) => FileContent)) => void;
  splitModeFiles: FileContent;
  setSplitModeFiles: (files: FileContent | ((prev: FileContent) => FileContent)) => void;
  singleModeActiveFile: string;
  setSingleModeActiveFile: (file: string) => void;
  splitModeActiveFile: string;
  setSplitModeActiveFile: (file: string) => void;
}

export const useFileOperations = ({
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
}: UseFileOperationsProps) => {
  const { toast } = useToast();

  const handleCreateFile = (fileName?: string) => {
    if (!fileName) return;
    const filesToUse = mode === 'single' ? singleModeFiles : splitModeFiles;
    if (fileName && fileName.trim() && !filesToUse[fileName]) {
      const content = getFileTemplate(fileName);
      if (mode === 'single') {
        setSingleModeFiles(prev => ({ ...prev, [fileName]: content }));
        setSingleModeActiveFile(fileName);
      } else {
        setSplitModeFiles(prev => ({ ...prev, [fileName]: content }));
        setSplitModeActiveFile(fileName);
      }
    } else if (filesToUse[fileName]) {
      toast({
        title: 'File already exists',
        description: `A file named "${fileName}" already exists!`,
        variant: "destructive"
      });
    }
  };

  const renameFile = (oldName: string, newName: string) => {
    if (newName && newName.trim() && newName !== oldName && !files[newName]) {
      const content = files[oldName];
      const newFiles = { ...files };
      delete newFiles[oldName];
      newFiles[newName] = content;
      
      if (mode === 'single') {
        setSingleModeFiles(newFiles);
        if (activeFile === oldName) {
          setSingleModeActiveFile(newName);
        }
      } else {
        setSplitModeFiles(newFiles);
        if (activeFile === oldName) {
          setSplitModeActiveFile(newName);
        }
      }
    } else if (files[newName]) {
      alert('A file with this name already exists!');
    }
  };

  const deleteFile = (fileName: string) => {
    if (Object.keys(files).length <= 1) {
      alert('Cannot delete the last file');
      return;
    }
    if (confirm(`Are you sure you want to delete ${fileName}?`)) {
      const newFiles = { ...files };
      delete newFiles[fileName];
      
      if (mode === 'single') {
        setSingleModeFiles(newFiles);
        if (activeFile === fileName) {
          setSingleModeActiveFile(Object.keys(newFiles)[0]);
        }
      } else {
        setSplitModeFiles(newFiles);
        if (activeFile === fileName) {
          setSplitModeActiveFile(Object.keys(newFiles)[0]);
        }
      }
    }
  };

  return {
    handleCreateFile,
    renameFile,
    deleteFile
  };
};
