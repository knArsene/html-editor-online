
import { useState } from 'react';
import { INITIAL_SINGLE_FILE, INITIAL_SPLIT_FILES } from '../constants';

interface FileContent {
  [fileName: string]: string;
}

interface ImageData {
  name: string;
  url: string;
}

export const useIDEState = () => {
  const [mode, setMode] = useState<'single' | 'split'>('single');
  
  // Separate state for each mode
  const [singleModeFiles, setSingleModeFiles] = useState<FileContent>(INITIAL_SINGLE_FILE);
  const [splitModeFiles, setSplitModeFiles] = useState<FileContent>(INITIAL_SPLIT_FILES);
  const [singleModeActiveFile, setSingleModeActiveFile] = useState('index.html');
  const [splitModeActiveFile, setSplitModeActiveFile] = useState('index.html');
  
  // Image management state
  const [singleModeImages, setSingleModeImages] = useState<ImageData[]>([]);
  const [splitModeImages, setSplitModeImages] = useState<ImageData[]>([]);
  
  const [previewKey, setPreviewKey] = useState(0);

  // Get current files, images and active file based on mode
  const files = mode === 'single' ? singleModeFiles : splitModeFiles;
  const images = mode === 'single' ? singleModeImages : splitModeImages;
  const activeFile = mode === 'single' ? singleModeActiveFile : splitModeActiveFile;

  const updateFile = (fileName: string, content: string) => {
    if (mode === 'single') {
      setSingleModeFiles(prev => ({ ...prev, [fileName]: content }));
    } else {
      setSplitModeFiles(prev => ({ ...prev, [fileName]: content }));
    }
  };

  const setActiveFile = (fileName: string) => {
    if (mode === 'single') {
      setSingleModeActiveFile(fileName);
    } else {
      setSplitModeActiveFile(fileName);
    }
  };

  const handleImageUpload = (name: string, file: File) => {
    const url = URL.createObjectURL(file);
    const imageData = { name, url };
    
    if (mode === 'single') {
      setSingleModeImages(prev => [...prev, imageData]);
    } else {
      setSplitModeImages(prev => [...prev, imageData]);
    }
    
    return imageData;
  };

  const handleImageDelete = (name: string) => {
    if (mode === 'single') {
      setSingleModeImages(prev => {
        const image = prev.find(img => img.name === name);
        if (image) URL.revokeObjectURL(image.url);
        return prev.filter(img => img.name !== name);
      });
    } else {
      setSplitModeImages(prev => {
        const image = prev.find(img => img.name === name);
        if (image) URL.revokeObjectURL(image.url);
        return prev.filter(img => img.name !== name);
      });
    }
  };

  const handleImageRename = (oldName: string, newName: string) => {
    if (newName && newName.trim() && newName !== oldName) {
      if (mode === 'single') {
        setSingleModeImages(prev => 
          prev.map(img => img.name === oldName ? { ...img, name: newName } : img)
        );
      } else {
        setSplitModeImages(prev => 
          prev.map(img => img.name === oldName ? { ...img, name: newName } : img)
        );
      }
      return true;
    }
    return false;
  };

  const resetFiles = () => {
    if (mode === 'single') {
      setSingleModeFiles({ 'index.html': '' });
      setSingleModeActiveFile('index.html');
    } else {
      setSplitModeFiles(INITIAL_SPLIT_FILES);
      setSplitModeActiveFile('index.html');
    }
    setPreviewKey(prev => prev + 1);
  };

  return {
    mode,
    setMode,
    files,
    images,
    activeFile,
    previewKey,
    setPreviewKey,
    updateFile,
    setActiveFile,
    handleImageUpload,
    handleImageDelete,
    handleImageRename,
    resetFiles,
    // File management functions
    singleModeFiles,
    setSingleModeFiles,
    splitModeFiles,
    setSplitModeFiles,
    singleModeActiveFile,
    setSingleModeActiveFile,
    splitModeActiveFile,
    setSplitModeActiveFile
  };
};
