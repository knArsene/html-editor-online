
import React from 'react';
import { EditorSection } from '@/components/EditorSection';

interface EditorPanelProps {
  mode: 'single' | 'split';
  files: { [fileName: string]: string };
  images: { name: string; url: string }[];
  activeFile: string;
  onActiveFileChange: (fileName: string) => void;
  onFileUpdate: (fileName: string, content: string) => void;
  onFileCreate: (fileName?: string) => void;
  onFileDelete: (fileName: string) => void;
  onFileRename: (oldName: string, newName: string) => void;
  onImageUpload: (name: string, file: File) => void;
  onImageDelete: (name: string) => void;
  onImageRename: (oldName: string, newName: string) => void;
}

export const EditorPanel: React.FC<EditorPanelProps> = React.memo((props) => (
  <EditorSection {...props} />
));
