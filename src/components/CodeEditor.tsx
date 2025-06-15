
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
      // HTML syntax highlighting with improved colors
      highlighted = highlighted
        .replace(/(&lt;\/?)([a-zA-Z][a-zA-Z0-9]*)(.*?)(&gt;)/g, '<span class="html-tag">$1$2</span><span class="html-attr">$3</span><span class="html-tag">$4</span>')
        .replace(/(&lt;!--.*?--&gt;)/g, '<span class="html-comment">$1</span>')
        .replace(/(=")([^"]*?)(")/g, '=<span class="html-string">"$2"</span>');
    } else if (language === 'css') {
      // CSS syntax highlighting with improved colors
      highlighted = highlighted
        .replace(/([a-zA-Z-#.]+)(\s*{)/g, '<span class="css-selector">$1</span>$2')
        .replace(/([a-zA-Z-]+)(\s*:)/g, '<span class="css-property">$1</span>$2')
        .replace(/(:\s*)([^;]+)(;)/g, '$1<span class="css-value">$2</span>$3')
        .replace(/(\/\*.*?\*\/)/g, '<span class="css-comment">$1</span>');
    } else if (language === 'javascript') {
      // JavaScript syntax highlighting with improved colors
      highlighted = highlighted
        .replace(/\b(function|var|let|const|if|else|for|while|return|true|false|null|undefined|class|import|export|from|default)\b/g, '<span class="js-keyword">$1</span>')
        .replace(/(["'])((?:\\.|[^\\])*?)\1/g, '<span class="js-string">$1$2$1</span>')
        .replace(/\b(\d+)\b/g, '<span class="js-number">$1</span>')
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
    <div className={cn("relative flex-1 overflow-hidden bg-gray-900", className)}>
      <style dangerouslySetInnerHTML={{
        __html: `
          .html-tag { color: #f97316; font-weight: 600; }
          .html-attr { color: #06b6d4; }
          .html-string { color: #22c55e; }
          .html-comment { color: #6b7280; font-style: italic; }
          .css-selector { color: #f59e0b; font-weight: 600; }
          .css-property { color: #3b82f6; }
          .css-value { color: #22c55e; }
          .css-comment { color: #6b7280; font-style: italic; }
          .js-keyword { color: #a855f7; font-weight: 600; }
          .js-string { color: #22c55e; }
          .js-number { color: #f97316; }
          .js-comment { color: #6b7280; font-style: italic; }
        `
      }} />
      
      <div className="absolute inset-0 flex">
        {/* Line numbers */}
        <div className="w-14 bg-gray-800 border-r border-gray-700 flex flex-col text-gray-400 text-sm select-none">
          <div className="px-3 py-4 font-mono leading-6">
            {value.split('\n').map((_, index) => (
              <div key={index} className="text-right min-h-[24px] flex items-center justify-end">
                {index + 1}
              </div>
            ))}
          </div>
        </div>
        
        {/* Code area */}
        <div className="flex-1 relative bg-gray-900">
          <pre
            ref={preRef}
            className="absolute inset-0 p-4 font-mono text-sm leading-6 overflow-auto pointer-events-none whitespace-pre-wrap break-words text-gray-100"
            style={{ color: 'transparent' }}
          />
          
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onScroll={handleScroll}
            className="absolute inset-0 p-4 bg-transparent text-transparent caret-white font-mono text-sm leading-6 resize-none outline-none overflow-auto whitespace-pre-wrap break-words selection:bg-blue-500/30"
            style={{ 
              background: 'transparent',
              color: 'transparent',
              caretColor: '#3b82f6'
            }}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            placeholder={`Start typing ${language.toUpperCase()} code...`}
          />
        </div>
      </div>
    </div>
  );
};
