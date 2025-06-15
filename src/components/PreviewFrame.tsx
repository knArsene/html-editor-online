
import React from 'react';
import { cn } from '@/lib/utils';

interface PreviewFrameProps {
  htmlContent: string;
  className?: string;
}

export const PreviewFrame: React.FC<PreviewFrameProps> = ({
  htmlContent,
  className
}) => {
  return (
    <div className={cn("relative bg-white rounded-lg overflow-hidden", className)}>
      <iframe
        srcDoc={htmlContent}
        className="w-full h-full border-0"
        title="Preview"
        sandbox="allow-scripts allow-same-origin"
        style={{ minHeight: '400px' }}
      />
    </div>
  );
};
