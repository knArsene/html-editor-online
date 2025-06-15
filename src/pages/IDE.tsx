
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { CodeEditor } from '@/components/CodeEditor';
import { PreviewFrame } from '@/components/PreviewFrame';
import { FileManager } from '@/components/FileManager';
import { Play, Settings, Download, Upload } from 'lucide-react';

interface FileContent {
  html: string;
  css: string;
  js: string;
}

const IDE = () => {
  const [files, setFiles] = useState<FileContent>({
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Project</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 40px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            backdrop-filter: blur(10px);
        }
        button {
            background: #4CAF50;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 20px;
        }
        button:hover {
            background: #45a049;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to Your First Web Page!</h1>
        <p>This is a simple HTML page with embedded CSS and JavaScript.</p>
        <button onclick="changeColor()">Click me to change colors!</button>
        <div id="output"></div>
    </div>

    <script>
        function changeColor() {
            const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            document.body.style.background = \`linear-gradient(135deg, \${randomColor} 0%, #764ba2 100%)\`;
            document.getElementById('output').innerHTML = \`<p>New color applied: \${randomColor}</p>\`;
        }
    </script>
</body>
</html>`,
    css: `body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
}

button {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
}

button:hover {
  background: #45a049;
}`,
    js: `function changeColor() {
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  document.body.style.background = \`linear-gradient(135deg, \${randomColor} 0%, #764ba2 100%)\`;
  document.getElementById('output').innerHTML = \`<p>New color applied: \${randomColor}</p>\`;
}`
  });

  const [mode, setMode] = useState<'single' | 'split'>('single');
  const [activeTab, setActiveTab] = useState('html');
  const [previewKey, setPreviewKey] = useState(0);

  const updateFile = (type: keyof FileContent, content: string) => {
    setFiles(prev => ({
      ...prev,
      [type]: content
    }));
  };

  const runCode = () => {
    setPreviewKey(prev => prev + 1);
  };

  const generateCombinedHTML = () => {
    if (mode === 'single') {
      return files.html;
    } else {
      // Split mode - combine files
      const htmlWithoutClosingTags = files.html.replace(/<\/head>|<\/body>|<\/html>/gi, '');
      const cssTag = files.css.trim() ? `<style>\n${files.css}\n</style>` : '';
      const jsTag = files.js.trim() ? `<script>\n${files.js}\n</script>` : '';
      
      return `${htmlWithoutClosingTags}
${cssTag}
</head>
<body>
${jsTag}
</body>
</html>`;
    }
  };

  const downloadProject = () => {
    const htmlContent = generateCombinedHTML();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'project.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Web IDE
              </h1>
              <Select value={mode} onValueChange={(value: 'single' | 'split') => setMode(value)}>
                <SelectTrigger className="w-40 bg-gray-800 border-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single File</SelectItem>
                  <SelectItem value="split">Split Files</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button onClick={runCode} className="bg-green-600 hover:bg-green-700">
                <Play className="w-4 h-4 mr-2" />
                Run
              </Button>
              <Button onClick={downloadProject} variant="outline" className="border-gray-700">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-140px)]">
          {/* Code Editor Section */}
          <Card className="bg-gray-800 border-gray-700 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h2 className="text-lg font-semibold">Code Editor</h2>
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col">
              {mode === 'single' ? (
                <CodeEditor
                  language="html"
                  value={files.html}
                  onChange={(value) => updateFile('html', value)}
                  className="flex-1"
                />
              ) : (
                <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                  <TabsList className="bg-gray-700 border-b border-gray-600 rounded-none">
                    <TabsTrigger value="html" className="data-[state=active]:bg-blue-600">
                      HTML
                    </TabsTrigger>
                    <TabsTrigger value="css" className="data-[state=active]:bg-blue-600">
                      CSS
                    </TabsTrigger>
                    <TabsTrigger value="js" className="data-[state=active]:bg-blue-600">
                      JavaScript
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="html" className="flex-1 m-0">
                    <CodeEditor
                      language="html"
                      value={files.html}
                      onChange={(value) => updateFile('html', value)}
                      className="h-full"
                    />
                  </TabsContent>
                  
                  <TabsContent value="css" className="flex-1 m-0">
                    <CodeEditor
                      language="css"
                      value={files.css}
                      onChange={(value) => updateFile('css', value)}
                      className="h-full"
                    />
                  </TabsContent>
                  
                  <TabsContent value="js" className="flex-1 m-0">
                    <CodeEditor
                      language="javascript"
                      value={files.js}
                      onChange={(value) => updateFile('js', value)}
                      className="h-full"
                    />
                  </TabsContent>
                </Tabs>
              )}
            </div>
          </Card>

          {/* Preview Section */}
          <Card className="bg-gray-800 border-gray-700 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h2 className="text-lg font-semibold">Live Preview</h2>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-sm text-green-400">Live</span>
              </div>
            </div>
            
            <div className="flex-1 p-4">
              <PreviewFrame
                key={previewKey}
                htmlContent={generateCombinedHTML()}
                className="w-full h-full"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IDE;
