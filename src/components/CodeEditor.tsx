
import React, { useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

interface CodeEditorProps {
  language: 'html' | 'css' | 'javascript' | 'typescript' | 'json';
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  language,
  value,
  onChange,
  className
}) => {
  const { theme } = useTheme();
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    
    // Configure editor options
    editor.updateOptions({
      fontSize: 14,
      fontFamily: 'JetBrains Mono, Fira Code, Monaco, Consolas, monospace',
      lineHeight: 24,
      wordWrap: 'on',
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      tabSize: 2,
      insertSpaces: true,
      detectIndentation: true,
      formatOnPaste: true,
      formatOnType: true,
      autoClosingBrackets: 'always',
      autoClosingQuotes: 'always',
      autoSurround: 'languageDefined',
      bracketPairColorization: { enabled: true },
      guides: {
        bracketPairs: true,
        indentation: true
      },
      // Fix cursor positioning issues
      stopRenderingLineAfter: -1,
      renderWhitespace: 'none',
      renderControlCharacters: false,
      disableLayerHinting: true,
      fontLigatures: false,
      suggest: {
        showKeywords: true,
        showSnippets: true,
        showFunctions: true,
        showConstructors: true,
        showFields: true,
        showVariables: true,
        showClasses: true,
        showStructs: true,
        showInterfaces: true,
        showModules: true,
        showProperties: true,
        showEvents: true,
        showOperators: true,
        showUnits: true,
        showValues: true,
        showConstants: true,
        showEnums: true,
        showEnumMembers: true,
        showColors: true,
        showFiles: true,
        showReferences: true,
        showFolders: true,
        showTypeParameters: true
      }
    });

    // Force editor to recalculate line endings and cursor positions
    editor.getModel()?.setValue(editor.getModel()?.getValue() || '');

    // Add custom CSS snippets
    if (language === 'css') {
      monaco.languages.registerCompletionItemProvider('css', {
        provideCompletionItems: () => {
          return {
            suggestions: [
              {
                label: 'flexbox-center',
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: 'display: flex;\njustify-content: center;\nalign-items: center;',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'Flexbox center alignment'
              },
              {
                label: 'gradient-bg',
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: 'background: linear-gradient(135deg, #${1:667eea} 0%, #${2:764ba2} 100%);',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'Linear gradient background'
              }
            ]
          };
        }
      });
    }

    // Add HTML snippets
    if (language === 'html') {
      monaco.languages.registerCompletionItemProvider('html', {
        provideCompletionItems: () => {
          return {
            suggestions: [
              {
                label: 'html5-boilerplate',
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>${1:Document}</title>\n</head>\n<body>\n    ${2}\n</body>\n</html>',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'HTML5 boilerplate template'
              }
            ]
          };
        }
      });
    }

    // Add JavaScript snippets
    if (language === 'javascript') {
      monaco.languages.registerCompletionItemProvider('javascript', {
        provideCompletionItems: () => {
          return {
            suggestions: [
              {
                label: 'arrow-function',
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: 'const ${1:functionName} = (${2:params}) => {\n    ${3}\n};',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'Arrow function template'
              },
              {
                label: 'async-function',
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: 'const ${1:functionName} = async (${2:params}) => {\n    try {\n        ${3}\n    } catch (error) {\n        console.error(error);\n    }\n};',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'Async function with error handling'
              }
            ]
          };
        }
      });
    }
  };

  const handleChange = (value: string | undefined) => {
    onChange(value || '');
  };

  // Map language names to Monaco editor language IDs
  const getMonacoLanguage = (lang: string) => {
    switch (lang) {
      case 'javascript':
        return 'javascript';
      case 'typescript':
        return 'typescript';
      case 'css':
        return 'css';
      case 'html':
        return 'html';
      case 'json':
        return 'json';
      default:
        return 'plaintext';
    }
  };

  return (
    <div className={cn("relative flex-1 overflow-hidden", className)}>
      <Editor
        height="100%"
        language={getMonacoLanguage(language)}
        value={value}
        onChange={handleChange}
        onMount={handleEditorDidMount}
        theme={theme === 'dark' ? 'vs-dark' : 'light'}
        options={{
          selectOnLineNumbers: true,
          roundedSelection: false,
          readOnly: false,
          cursorStyle: 'line',
          automaticLayout: true,
          glyphMargin: false,
          folding: true,
          showFoldingControls: 'mouseover',
          foldingHighlight: true,
          lineDecorationsWidth: 0,
          lineNumbersMinChars: 3,
          renderLineHighlight: 'gutter',
          // Fix line ending detection issues
          stopRenderingLineAfter: -1,
          renderWhitespace: 'none',
          renderControlCharacters: false,
          disableLayerHinting: true,
          fontLigatures: false,
          scrollbar: {
            vertical: 'auto',
            horizontal: 'auto',
            verticalScrollbarSize: 12,
            horizontalScrollbarSize: 12
          }
        }}
        loading={
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              <span>Loading editor...</span>
            </div>
          </div>
        }
      />
    </div>
  );
};
