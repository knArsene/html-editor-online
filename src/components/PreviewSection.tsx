
import React from 'react';
import { Card } from '@/components/ui/card';
import { PreviewFrame } from '@/components/PreviewFrame';
import { Eye } from 'lucide-react';
import { PanelToolbar } from "@/components/PanelToolbar";

interface PreviewSectionProps {
  htmlContent: string;
  previewKey: number;
}

export const PreviewSection: React.FC<PreviewSectionProps> = ({
  htmlContent,
  previewKey
}) => {
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
    <Card className="bg-card border-border flex flex-col shadow-2xl backdrop-blur-sm">
      <PanelToolbar
        icon={<Eye className="w-5 h-5 text-green-400" />}
        title="Live Preview"
        onFullscreen={openPreviewInNewTab}
      >
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-sm"></div>
          <span className="text-sm text-green-400 font-medium">Live</span>
        </div>
      </PanelToolbar>
      <div className="flex-1 p-4 bg-transparent">
        <PreviewFrame
          key={previewKey}
          htmlContent={htmlContent}
          className="w-full h-full shadow-lg"
        />
      </div>
    </Card>
  );
};
