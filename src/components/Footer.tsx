
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

export const Footer: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <footer className={`bg-card/80 backdrop-blur-sm border-t border-border fixed bottom-0 left-0 right-0 z-20 ${isMobile ? 'px-2 py-2' : 'px-4 py-3'}`}>
      <div className={`container mx-auto flex ${isMobile ? 'flex-col gap-1' : 'flex-wrap justify-between items-center gap-y-2'} ${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
        <p className={isMobile ? 'text-center' : ''}>&copy; {new Date().getFullYear()} Web IDE. All rights reserved.</p>
        <div className={`flex items-center ${isMobile ? 'justify-center gap-x-3' : 'gap-x-4 sm:gap-x-6'}`}>
          <a href="/info?section=about" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">About</a>
          <a href="/info?section=blog" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Blog</a>
          <a href="/info?section=contact" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Contact</a>
          <a href="/info?section=terms" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Terms</a>
          <a href="/info?section=privacy" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Privacy</a>
        </div>
      </div>
    </footer>
  );
};
