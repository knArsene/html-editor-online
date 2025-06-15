
import React from 'react';
import { Card } from '@/components/ui/card';
import { PreviewFrame } from '@/components/PreviewFrame';
import { Eye } from 'lucide-react';
import { PanelToolbar } from "@/components/PanelToolbar";
import { useIsMobile } from '@/hooks/use-mobile';

interface PreviewSectionProps {
  htmlContent: string;
  previewKey: number;
}

export const PreviewSection: React.FC<PreviewSectionProps> = ({
  htmlContent,
  previewKey
}) => {
  const isMobile = useIsMobile();

  // Handler: open live preview in a new tab at about:blank and write content into it
  const openPreviewInNewTab = () => {
    // Remove 'noopener,noreferrer' so we can write to the new window
    const newWindow = window.open("about:blank", "_blank");
    if (newWindow) {
      newWindow.document.open();
      newWindow.document.write(htmlContent);
      newWindow.document.close();
    }
  };

  return (
    <Card className="bg-card border-border flex flex-col shadow-2xl backdrop-blur-sm h-full">
      <PanelToolbar
        icon={<Eye className={`text-green-400 ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />}
        title="Live Preview"
        onFullscreen={!isMobile ? openPreviewInNewTab : undefined}
      >
        <div className="flex items-center space-x-2">
          <div className={`rounded-full bg-green-400 animate-pulse shadow-sm ${isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'}`}></div>
          <span className={`text-green-400 font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>Live</span>
        </div>
      </PanelToolbar>
      <div className={`flex-1 bg-transparent min-h-0 ${isMobile ? 'p-2' : 'p-4'}`}>
        <PreviewFrame
          key={previewKey}
          htmlContent={htmlContent}
          className="w-full h-full shadow-lg"
        />
      </div>
    </Card>
  );
};
