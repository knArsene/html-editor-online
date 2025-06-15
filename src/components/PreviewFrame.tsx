
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
    <div className={cn("relative bg-background rounded-xl overflow-hidden border shadow-lg", className)}>
      <iframe
        srcDoc={htmlContent}
        className="w-full h-full border-0 rounded-xl"
        title="Live Preview"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        style={{ minHeight: '400px' }}
      />
    </div>
  );
};
