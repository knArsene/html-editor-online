
export const INITIAL_SINGLE_FILE = {
  'index.html': `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>My Project</title>
  <style>body{font-family:sans-serif;text-align:center;margin-top:50px}</style>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>This is your new project.</p>
</body>
</html>`
};

export const INITIAL_SPLIT_FILES = {
  'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Project</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Welcome to My Project</h1>
        <p>This is a sample project with separate HTML, CSS, and JavaScript files.</p>
        <button onclick="showMessage()">Click Me!</button>
    </div>
    <script src="script.js"></script>
</body>
</html>`,
  'styles.css': `/* Main Styles */
body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.container {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    text-align: center;
    max-width: 500px;
}

h1 {
    color: #333;
    margin-bottom: 1rem;
}

p {
    color: #666;
    line-height: 1.6;
    margin-bottom: 2rem;
}

button {
    background: #667eea;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s ease;
}

button:hover {
    background: #5a6fd8;
}`,
  'script.js': `// JavaScript functionality
function showMessage() {
    alert('Hello! This is JavaScript working with your HTML and CSS.');
    
    // Add some dynamic styling
    const button = document.querySelector('button');
    button.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Project loaded successfully!');
    
    // Add some interactive effects
    const container = document.querySelector('.container');
    if (container) {
        container.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        container.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
});`
};
