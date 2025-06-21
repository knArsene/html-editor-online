
import React from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

export const Footer: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <footer className={`bg-card/80 backdrop-blur-sm border-t border-border fixed bottom-0 left-0 right-0 z-20 ${isMobile ? 'px-2 py-2' : 'px-4 py-3'}`}>
      <div className={`container mx-auto flex ${isMobile ? 'flex-col gap-1' : 'flex-wrap justify-between items-center gap-y-2'} ${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
        <p className={isMobile ? 'text-center' : ''}>&copy; {new Date().getFullYear()} Web IDE. All rights reserved.</p>
        <div className={`flex items-center ${isMobile ? 'justify-center gap-x-3' : 'gap-x-4 sm:gap-x-6'}`}>
          <Link to="/info?section=about" className="hover:text-foreground transition-colors">About</Link>
          <Link to="/info?section=blog" className="hover:text-foreground transition-colors">Blog</Link>
          <Link to="/info?section=contact" className="hover:text-foreground transition-colors">Contact</Link>
          <Link to="/info?section=terms" className="hover:text-foreground transition-colors">Terms</Link>
          <Link to="/info?section=privacy" className="hover:text-foreground transition-colors">Privacy</Link>
        </div>
      </div>
    </footer>
  );
};
