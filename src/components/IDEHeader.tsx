
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Download, RefreshCw } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

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
  return (
    <div className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-10 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Web IDE
            </h1>
            <Select value={mode} onValueChange={onModeChange}>
              <SelectTrigger className="w-44 bg-secondary border-border hover:bg-accent transition-colors text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border text-popover-foreground">
                <SelectItem value="single">Single File Mode</SelectItem>
                <SelectItem value="split">Split Files Mode</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button onClick={onRunCode} className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg">
              <Play className="w-4 h-4 mr-2" />
              Run Code
            </Button>
            <Button onClick={onResetCode} variant="outline" className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10 hover:border-orange-400 hover:text-orange-300 transition-colors">
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button onClick={onDownloadProject} variant="outline" className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400 hover:text-blue-300 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};
