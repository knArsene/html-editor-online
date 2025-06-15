
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Download, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImagePreviewProps {
  imageName: string;
  imageUrl: string;
  onClose: () => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageName,
  imageUrl,
  onClose
}) => {
  const { toast } = useToast();

  const copyImageUrl = () => {
    navigator.clipboard.writeText(imageUrl);
    toast({
      title: "URL copied",
      description: "Image URL has been copied to clipboard"
    });
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = imageName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openInNewTab = () => {
    window.open(imageUrl, '_blank');
  };

  return (
    <Card className="bg-card border-border flex flex-col shadow-2xl backdrop-blur-sm h-full">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-foreground">Image Preview</h3>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
            {imageName}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            onClick={copyImageUrl}
            size="sm"
            variant="ghost"
            className="h-7 w-7 p-0"
            title="Copy URL"
          >
            <Copy className="w-3 h-3" />
          </Button>
          <Button
            onClick={downloadImage}
            size="sm"
            variant="ghost"
            className="h-7 w-7 p-0"
            title="Download"
          >
            <Download className="w-3 h-3" />
          </Button>
          <Button
            onClick={openInNewTab}
            size="sm"
            variant="ghost"
            className="h-7 w-7 p-0"
            title="Open in new tab"
          >
            <ExternalLink className="w-3 h-3" />
          </Button>
          <Button
            onClick={onClose}
            size="sm"
            variant="ghost"
            className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
            title="Back to editor"
          >
            ×
          </Button>
        </div>
      </div>
      
      <div className="flex-1 p-4 bg-background/50 min-h-0 flex items-center justify-center">
        <div className="max-w-full max-h-full overflow-hidden rounded-lg shadow-lg">
          <img
            src={imageUrl}
            alt={imageName}
            className="max-w-full max-h-full object-contain"
            style={{ display: 'block' }}
          />
        </div>
      </div>
      
      <div className="p-4 border-t border-border bg-muted/50">
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">
            <strong>Usage in CSS:</strong>
          </div>
          <div className="bg-background rounded p-2 text-xs font-mono border">
            background-image: url('{imageUrl}');
          </div>
          <div className="text-xs text-muted-foreground">
            <strong>Usage in HTML:</strong>
          </div>
          <div className="bg-background rounded p-2 text-xs font-mono border">
            &lt;img src="{imageUrl}" alt="{imageName}" /&gt;
          </div>
        </div>
      </div>
    </Card>
  );
};
