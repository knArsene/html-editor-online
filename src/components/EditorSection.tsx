
import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeEditor } from '@/components/CodeEditor';
import { Code } from 'lucide-react';

interface FileContent {
  html: string;
  css: string;
  js: string;
}

interface EditorSectionProps {
  mode: 'single' | 'split';
  files: FileContent;
  activeTab: string;
  onActiveTabChange: (tab: string) => void;
  onFileUpdate: (type: keyof FileContent, content: string) => void;
}

export const EditorSection: React.FC<EditorSectionProps> = ({
  mode,
  files,
  activeTab,
  onActiveTabChange,
  onFileUpdate
}) => {
  return (
    <Card className="bg-card border-border flex flex-col shadow-2xl backdrop-blur-sm">
      <div className="flex items-center justify-between p-4 border-b border-border bg-card/80">
        <div className="flex items-center space-x-3">
          <Code className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-semibold text-foreground">Code Editor</h2>
        </div>
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm"></div>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col">
        {mode === 'single' ? (
          <CodeEditor
            language="html"
            value={files.html}
            onChange={(value) => onFileUpdate('html', value)}
            className="flex-1"
          />
        ) : (
          <Tabs value={activeTab} onValueChange={onActiveTabChange} className="flex-1 flex flex-col">
            <TabsList className="bg-muted border-b border-border rounded-none p-1">
              <TabsTrigger value="html" className="text-muted-foreground data-[state=active]:bg-orange-500 data-[state=active]:text-white font-medium px-4">
                HTML
              </TabsTrigger>
              <TabsTrigger value="css" className="text-muted-foreground data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium px-4">
                CSS
              </TabsTrigger>
              <TabsTrigger value="js" className="text-muted-foreground data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium px-4">
                JavaScript
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="html" className="flex-1 m-0">
              <CodeEditor
                language="html"
                value={files.html}
                onChange={(value) => onFileUpdate('html', value)}
                className="h-full"
              />
            </TabsContent>
            
            <TabsContent value="css" className="flex-1 m-0">
              <CodeEditor
                language="css"
                value={files.css}
                onChange={(value) => onFileUpdate('css', value)}
                className="h-full"
              />
            </TabsContent>
            
            <TabsContent value="js" className="flex-1 m-0">
              <CodeEditor
                language="javascript"
                value={files.js}
                onChange={(value) => onFileUpdate('js', value)}
                className="h-full"
              />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </Card>
  );
};
