
interface FileContent {
  [fileName: string]: string;
}

export const getFileTemplate = (fileName: string): string => {
  const ext = fileName.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'html':
      return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>New HTML File</h1>
</body>
</html>`;
    case 'css':
      return `/* CSS Styles */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
}`;
    case 'js':
      return `// JavaScript Code
console.log('New JavaScript file created');`;
    default:
      return '';
  }
};

export const generateCombinedHTML = (mode: 'single' | 'split', files: FileContent): string => {
  if (mode === 'single') {
    return files['index.html'] || '';
  }

  // In split mode, combine all files
  const htmlFile = files['index.html'] || '';
  const cssFiles = Object.entries(files).filter(([name]) => name.endsWith('.css'));
  const jsFiles = Object.entries(files).filter(([name]) => name.endsWith('.js'));

  let combinedHTML = htmlFile;

  // Inject CSS
  if (cssFiles.length > 0) {
    const cssContent = cssFiles.map(([, content]) => content).join('\n\n');
    if (cssContent.trim()) {
      if (combinedHTML.includes('</head>')) {
        combinedHTML = combinedHTML.replace('</head>', `<style>\n${cssContent}\n</style>\n</head>`);
      } else {
        combinedHTML = `<style>\n${cssContent}\n</style>\n${combinedHTML}`;
      }
    }
  }

  // Inject JS
  if (jsFiles.length > 0) {
    const jsContent = jsFiles.map(([, content]) => content).join('\n\n');
    if (jsContent.trim()) {
      if (combinedHTML.includes('</body>')) {
        combinedHTML = combinedHTML.replace('</body>', `<script>\n${jsContent}\n</script>\n</body>`);
      } else {
        combinedHTML = `${combinedHTML}\n<script>\n${jsContent}\n</script>`;
      }
    }
  }

  return combinedHTML;
};

export const downloadProject = (htmlContent: string) => {
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
