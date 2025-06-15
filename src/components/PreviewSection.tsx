
import React from 'react';
import { Card } from '@/components/ui/card';
import { PreviewFrame } from '@/components/PreviewFrame';
import { Eye } from 'lucide-react';

interface PreviewSectionProps {
  htmlContent: string;
  previewKey: number;
}

export const PreviewSection: React.FC<PreviewSectionProps> = ({
  htmlContent,
  previewKey
}) => {
  return (
    <Card className="bg-card border-border flex flex-col shadow-2xl backdrop-blur-sm">
      <div className="flex items-center justify-between p-4 border-b border-border bg-card/80">
        <div className="flex items-center space-x-3">
          <Eye className="w-5 h-5 text-green-400" />
          <h2 className="text-lg font-semibold text-foreground">Live Preview</h2>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-sm"></div>
          <span className="text-sm text-green-400 font-medium">Live</span>
        </div>
      </div>
      
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
