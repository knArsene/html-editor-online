
import React from 'react';
import { IDEHeader } from '@/components/IDEHeader';

interface IDESidebarProps {
  mode: 'single' | 'split';
  onModeChange: (mode: 'single' | 'split') => void;
  onRunCode: () => void;
  onResetCode: () => void;
  onDownloadProject: () => void;
}

export const IDESidebar: React.FC<IDESidebarProps> = React.memo(
  ({ mode, onModeChange, onRunCode, onResetCode, onDownloadProject }) => {
    return (
      <IDEHeader
        mode={mode}
        onModeChange={onModeChange}
        onRunCode={onRunCode}
        onResetCode={onResetCode}
        onDownloadProject={onDownloadProject}
      />
    );
  }
);
