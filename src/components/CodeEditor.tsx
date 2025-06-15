
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface CodeEditorProps {
  language: 'html' | 'css' | 'javascript';
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);
      
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  const handleScroll = () => {
    if (textareaRef.current && preRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop;
      preRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  const highlightSyntax = (code: string) => {
    if (!code) return '';
    
    let highlighted = code;
    
    if (language === 'html') {
      // HTML syntax highlighting
      highlighted = highlighted
        .replace(/(&lt;\/?)([a-zA-Z][a-zA-Z0-9]*)(.*?)(&gt;)/g, '<span class="html-tag">$1$2</span><span class="html-attr">$3</span><span class="html-tag">$4</span>')
        .replace(/(&lt;!--.*?--&gt;)/g, '<span class="html-comment">$1</span>')
        .replace(/(=")([^"]*?)(")/g, '=<span class="html-string">"$2"</span>');
    } else if (language === 'css') {
      // CSS syntax highlighting
      highlighted = highlighted
        .replace(/([a-zA-Z-]+)(\s*{)/g, '<span class="css-selector">$1</span>$2')
        .replace(/([a-zA-Z-]+)(\s*:)/g, '<span class="css-property">$1</span>$2')
        .replace(/(:\s*)([^;]+)(;)/g, '$1<span class="css-value">$2</span>$3')
        .replace(/(\/\*.*?\*\/)/g, '<span class="css-comment">$1</span>');
    } else if (language === 'javascript') {
      // JavaScript syntax highlighting
      highlighted = highlighted
        .replace(/\b(function|var|let|const|if|else|for|while|return|true|false|null|undefined)\b/g, '<span class="js-keyword">$1</span>')
        .replace(/(["'])((?:\\.|[^\\])*?)\1/g, '<span class="js-string">$1$2$1</span>')
        .replace(/(\/\/.*$)/gm, '<span class="js-comment">$1</span>')
        .replace(/(\/\*.*?\*\/)/g, '<span class="js-comment">$1</span>');
    }
    
    return highlighted;
  };

  useEffect(() => {
    const handleInput = () => {
      if (textareaRef.current && preRef.current) {
        const highlighted = highlightSyntax(value.replace(/</g, '&lt;').replace(/>/g, '&gt;'));
        preRef.current.innerHTML = highlighted + '<br>';
      }
    };
    
    handleInput();
  }, [value, language]);

  return (
    <div className={cn("relative flex-1 overflow-hidden", className)}>
      <style dangerouslySetInnerHTML={{
        __html: `
          .html-tag { color: #e06c75; }
          .html-attr { color: #d19a66; }
          .html-string { color: #98c379; }
          .html-comment { color: #5c6370; font-style: italic; }
          .css-selector { color: #e06c75; }
          .css-property { color: #56b6c2; }
          .css-value { color: #98c379; }
          .css-comment { color: #5c6370; font-style: italic; }
          .js-keyword { color: #c678dd; }
          .js-string { color: #98c379; }
          .js-comment { color: #5c6370; font-style: italic; }
        `
      }} />
      
      <div className="absolute inset-0 flex">
        {/* Line numbers */}
        <div className="w-12 bg-gray-900 border-r border-gray-700 flex flex-col text-gray-500 text-sm">
          <div className="px-2 py-2 font-mono leading-6">
            {value.split('\n').map((_, index) => (
              <div key={index} className="text-right">
                {index + 1}
              </div>
            ))}
          </div>
        </div>
        
        {/* Code area */}
        <div className="flex-1 relative">
          <pre
            ref={preRef}
            className="absolute inset-0 p-4 font-mono text-sm leading-6 overflow-auto pointer-events-none whitespace-pre-wrap break-words"
            style={{ color: 'transparent' }}
          />
          
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onScroll={handleScroll}
            className="absolute inset-0 p-4 bg-transparent text-transparent caret-white font-mono text-sm leading-6 resize-none outline-none overflow-auto whitespace-pre-wrap break-words"
            style={{ 
              background: 'transparent',
              color: 'transparent',
              caretColor: '#fff'
            }}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
          />
        </div>
      </div>
    </div>
  );
};
