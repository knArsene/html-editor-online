
import React from "react";
import { Fullscreen } from "lucide-react";
import { cn } from "@/lib/utils";

interface PanelToolbarProps {
  icon: React.ReactNode;
  title: string;
  onFullscreen?: () => void;
  children?: React.ReactNode;
}

export const PanelToolbar: React.FC<PanelToolbarProps> = ({
  icon,
  title,
  onFullscreen,
  children,
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border bg-card/80 relative">
      <div className="flex items-center space-x-3">
        {icon}
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      </div>
      <div className="flex items-center space-x-2">
        {children}
        {onFullscreen && (
          <button
            aria-label="Open fullscreen"
            onClick={onFullscreen}
            className="p-1 rounded hover:bg-accent transition-colors"
            type="button"
          >
            <Fullscreen className="w-5 h-5 text-muted-foreground" />
          </button>
        )}
      </div>
    </div>
  );
};
