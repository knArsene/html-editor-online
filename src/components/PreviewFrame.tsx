
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface PreviewFrameProps {
  htmlContent: string;
  className?: string;
}

export const PreviewFrame: React.FC<PreviewFrameProps> = ({
  htmlContent,
  className
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (doc) {
        doc.open();
        doc.write(htmlContent);
        doc.close();
      }
    }
  }, [htmlContent]);

  return (
    <div className={cn("relative bg-white rounded-lg overflow-hidden", className)}>
      <iframe
        ref={iframeRef}
        className="w-full h-full border-0"
        title="Preview"
        sandbox="allow-scripts"
        style={{ minHeight: '400px' }}
      />
    </div>
  );
};
