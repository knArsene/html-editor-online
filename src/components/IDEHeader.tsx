
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Download, Menu } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';

interface IDEHeaderProps {
  mode: 'single' | 'split';
  onModeChange: (value: 'single' | 'split') => void;
  onRunCode: () => void;
  onResetCode: () => void;
  onDownloadProject: () => void;
}

export const IDEHeader: React.FC<IDEHeaderProps> = ({
  mode,
  onModeChange,
  onRunCode,
  onResetCode,
  onDownloadProject
}) => {
  const isMobile = useIsMobile();

  return (
    <div className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-10 shadow-lg">
      <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
            <h1 className={`font-bold text-foreground shrink-0 ${isMobile ? 'text-lg' : 'text-xl sm:text-2xl'}`}>
              HTML Editor
            </h1>
            {!isMobile && (
              <Select value={mode} onValueChange={onModeChange}>
                <SelectTrigger className="w-[140px] sm:w-[180px] bg-secondary border-border hover:bg-accent transition-colors text-foreground text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border text-popover-foreground">
                  <SelectItem value="single">Single File mode</SelectItem>
                  <SelectItem value="split">Split Files mode</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
          
          <div className="flex items-center space-x-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  onClick={onRunCode} 
                  variant="outline" 
                  className="border-green-500/50 text-green-400 hover:bg-green-500/10 hover:border-green-400 hover:text-green-300 transition-colors" 
                  size={isMobile ? "sm" : "icon"}
                >
                  <Play className={isMobile ? "w-3 h-3" : "w-4 h-4"} />
                  {isMobile && <span className="ml-1 text-xs">Run</span>}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Run Code</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  onClick={onDownloadProject} 
                  variant="outline" 
                  className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400 hover:text-blue-300 transition-colors" 
                  size={isMobile ? "sm" : "icon"}
                >
                  <Download className={isMobile ? "w-3 h-3" : "w-4 h-4"} />
                  {isMobile && <span className="ml-1 text-xs">Save</span>}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download Project</p>
              </TooltipContent>
            </Tooltip>
            
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};
