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
  // Handler: open live preview in a new tab as HTML (using a data URL)
  const openPreviewInNewTab = () => {
    // Create a Blob and object URL for the HTML
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank", "noopener,noreferrer");
    // Best practice: clean up URL after use
    setTimeout(() => URL.revokeObjectURL(url), 60000);
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
