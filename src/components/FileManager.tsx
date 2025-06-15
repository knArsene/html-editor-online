
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileText, FileCode } from 'lucide-react';

interface FileManagerProps {
  files: string[];
  activeFile: string;
  onFileSelect: (file: string) => void;
  onFileCreate: () => void;
}

export const FileManager: React.FC<FileManagerProps> = ({
  files,
  activeFile,
  onFileSelect,
  onFileCreate
}) => {
  const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop();
    if (ext === 'html') return <FileCode className="w-4 h-4 text-orange-400" />;
    if (ext === 'css') return <FileCode className="w-4 h-4 text-blue-400" />;
    if (ext === 'js') return <FileCode className="w-4 h-4 text-yellow-400" />;
    return <FileText className="w-4 h-4 text-gray-400" />;
  };

  return (
    <Card className="bg-gray-800 border-gray-700 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Files</h3>
        <Button onClick={onFileCreate} size="sm" className="bg-blue-600 hover:bg-blue-700">
          New File
        </Button>
      </div>
      
      <div className="space-y-1">
        {files.map((file) => (
          <div
            key={file}
            onClick={() => onFileSelect(file)}
            className={`flex items-center space-x-2 p-2 rounded cursor-pointer transition-colors ${
              activeFile === file
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            {getFileIcon(file)}
            <span className="text-sm">{file}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
