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
    <div className={cn("relative flex-1 overflow-hidden bg-background", className)}>
      <style dangerouslySetInnerHTML={{
        __html: `
          /* A more vibrant and readable color scheme for syntax highlighting */
          .html-tag { color: #38bdf8; /* sky-400 */ }
          .html-attr { color: #facc15; /* amber-400 */ }
          .html-string { color: #34d399; /* emerald-400 */ }
          .html-comment { color: #94a3b8; font-style: italic; /* slate-400 */ }
          .css-selector { color: #fb7185; /* rose-400 */ }
          .css-property { color: #22d3ee; /* cyan-400 */ }
          .css-value { color: #34d399; /* emerald-400 */ }
          .css-comment { color: #94a3b8; font-style: italic; /* slate-400 */ }
          .js-keyword { color: #e879f9; font-weight: 600; /* fuchsia-400 */ }
          .js-string { color: #34d399; /* emerald-400 */ }
          .js-number { color: #a3e635; /* lime-400 */ }
          .js-comment { color: #94a3b8; font-style: italic; /* slate-400 */ }
        `
      }} />
      
      <div className="absolute inset-0 flex">
        {/* Line numbers */}
        <div className="w-14 bg-muted border-r border-border flex flex-col text-muted-foreground text-sm select-none">
          <div className="px-3 py-4 font-mono leading-6">
            {value.split('\n').map((_, index) => (
              <div key={index} className="text-right min-h-[24px] flex items-center justify-end">
                {index + 1}
              </div>
            ))}
          </div>
        </div>
        
        {/* Code area */}
        <div className="flex-1 relative bg-background">
          <pre
            ref={preRef}
            className="absolute inset-0 p-4 font-mono text-sm leading-6 overflow-auto pointer-events-none whitespace-pre-wrap break-words text-secondary-foreground"
          />
          
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onScroll={handleScroll}
            className="absolute inset-0 p-4 bg-transparent text-transparent caret-blue-500 font-mono text-sm leading-6 resize-none outline-none overflow-auto whitespace-pre-wrap break-words selection:bg-blue-500/30"
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
