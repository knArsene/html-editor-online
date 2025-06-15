
import React, { useState } from 'react';
import { IDEHeader } from '@/components/IDEHeader';
import { EditorSection } from '@/components/EditorSection';
import { PreviewSection } from '@/components/PreviewSection';

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
      <IDEHeader
        mode={mode}
        onModeChange={setMode}
        onRunCode={runCode}
        onResetCode={resetCode}
        onDownloadProject={downloadProject}
      />

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-[calc(100vh-140px)]">
          <EditorSection
            mode={mode}
            files={files}
            activeTab={activeTab}
            onActiveTabChange={setActiveTab}
            onFileUpdate={updateFile}
          />

          <PreviewSection
            htmlContent={generateCombinedHTML()}
            previewKey={previewKey}
          />
        </div>
      </div>
    </div>
  );
};

export default IDE;
