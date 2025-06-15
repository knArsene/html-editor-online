
import React from 'react';
import { Plus } from 'lucide-react';

interface FileManagerProps {
  files: string[];
  activeFile: string;
  onFileSelect: (file: string) => void;
  onFileCreate: () => void;
  onFileDelete?: (file: string) => void;
}

export const FileManager: React.FC<FileManagerProps> = ({
  files,
  activeFile,
  onFileSelect,
  onFileCreate,
  onFileDelete
}) => {
  return (
    <div className="bg-gray-800 border-gray-700 p-4 rounded mb-2">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Files</h3>
        {/* New File Button: use plus icon */}
        <button
          aria-label="Add file"
          className="p-1 rounded-full bg-blue-600 hover:bg-blue-700 text-white ml-2 flex items-center justify-center"
          onClick={onFileCreate}
          type="button"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-1">
        {files.length === 0 ? (
          <p className="text-gray-400 text-sm">No files. Add one with <Plus className="inline w-3 h-3" />.</p>
        ) : (
          files.map((file) => (
            <div
              key={file}
              className={`flex items-center space-x-2 p-2 rounded cursor-pointer transition-colors ${
                activeFile === file
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span
                className="flex-1 text-sm"
                onClick={() => onFileSelect(file)}
              >
                {file}
              </span>
              {onFileDelete && (
                <button
                  aria-label="Delete file"
                  className="ml-2 px-2 py-1 text-xs text-red-500 hover:text-white bg-transparent"
                  tabIndex={-1}
                  onClick={(e) => {
                    e.stopPropagation();
                    onFileDelete(file);
                  }}
                  type="button"
                >
                  🗑
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
