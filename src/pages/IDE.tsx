import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CodeEditor } from '@/components/CodeEditor';
import { PreviewFrame } from '@/components/PreviewFrame';
import { Play, Download, RefreshCw, Code, Eye } from 'lucide-react';

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
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 40px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        h1 {
            font-size: 2.5em;
            margin-bottom: 20px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }
        p {
            font-size: 1.2em;
            margin-bottom: 30px;
            opacity: 0.9;
        }
        button {
            background: linear-gradient(45deg, #4CAF50, #45a049);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 50px;
            cursor: pointer;
            font-size: 18px;
            font-weight: bold;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }
        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }
        #output {
            margin-top: 20px;
            padding: 20px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            min-height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to Your First Web Page!</h1>
        <p>This is a beautiful HTML page with modern CSS and interactive JavaScript.</p>
        <button onclick="changeColor()">Click me to change colors!</button>
        <div id="output">Click the button to see magic happen! ✨</div>
    </div>

    <script>
        function changeColor() {
            const colors = [
                'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
                'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
                'linear-gradient(135deg, #45b7d1 0%, #96c93d 100%)',
                'linear-gradient(135deg, #96ceb4 0%, #ffecd2 100%)',
                'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)',
                'linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%)'
            ];
            const messages = [
                '🎨 Beautiful new gradient applied!',
                '✨ Colors changed successfully!',
                '🌈 Looking fantastic!',
                '🎉 Amazing color combination!',
                '💫 Stunning visual update!',
                '🔥 Perfect color choice!'
            ];
            
            const randomIndex = Math.floor(Math.random() * colors.length);
            const randomColor = colors[randomIndex];
            const randomMessage = messages[randomIndex];
            
            document.body.style.background = randomColor;
            document.getElementById('output').innerHTML = \`<p style="font-size: 1.1em; font-weight: bold;">\${randomMessage}</p>\`;
        }
    </script>
</body>
</html>`,
    css: `body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

p {
  font-size: 1.2em;
  margin-bottom: 30px;
  opacity: 0.9;
}

button {
  background: linear-gradient(45deg, #4CAF50, #45a049);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 50px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

#output {
  margin-top: 20px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}`,
    js: `function changeColor() {
  const colors = [
    'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
    'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
    'linear-gradient(135deg, #45b7d1 0%, #96c93d 100%)',
    'linear-gradient(135deg, #96ceb4 0%, #ffecd2 100%)',
    'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)',
    'linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%)'
  ];
  const messages = [
    '🎨 Beautiful new gradient applied!',
    '✨ Colors changed successfully!',
    '🌈 Looking fantastic!',
    '🎉 Amazing color combination!',
    '💫 Stunning visual update!',
    '🔥 Perfect color choice!'
  ];
  
  const randomIndex = Math.floor(Math.random() * colors.length);
  const randomColor = colors[randomIndex];
  const randomMessage = messages[randomIndex];
  
  document.body.style.background = randomColor;
  document.getElementById('output').innerHTML = \`<p style="font-size: 1.1em; font-weight: bold;">\${randomMessage}</p>\`;
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

  const resetCode = () => {
    if (confirm('Are you sure you want to reset all code? This action cannot be undone.')) {
      setFiles({
        html: '',
        css: '',
        js: ''
      });
      setPreviewKey(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-10 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Web IDE
              </h1>
              <Select value={mode} onValueChange={(value: 'single' | 'split') => setMode(value)}>
                <SelectTrigger className="w-44 bg-secondary border-border hover:bg-accent transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border text-popover-foreground">
                  <SelectItem value="single">Single File Mode</SelectItem>
                  <SelectItem value="split">Split Files Mode</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button onClick={runCode} className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg">
                <Play className="w-4 h-4 mr-2" />
                Run Code
              </Button>
              <Button onClick={resetCode} variant="outline" className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10 hover:border-orange-400 hover:text-orange-300 transition-colors">
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button onClick={downloadProject} variant="outline" className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400 hover:text-blue-300 transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-[calc(100vh-140px)]">
          {/* Code Editor Section */}
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
                  onChange={(value) => updateFile('html', value)}
                  className="flex-1"
                />
              ) : (
                <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
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
                htmlContent={generateCombinedHTML()}
                className="w-full h-full shadow-lg"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IDE;
