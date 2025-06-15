
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-card/80 backdrop-blur-sm border-t border-border px-4 py-3 fixed bottom-0 left-0 right-0 z-20">
      <div className="container mx-auto flex flex-wrap justify-between items-center text-sm text-muted-foreground gap-y-2">
        <p>&copy; {new Date().getFullYear()} Web IDE. All rights reserved.</p>
        <div className="flex items-center gap-x-4 sm:gap-x-6">
          <a href="#" className="hover:text-foreground transition-colors">About</a>
          <a href="#" className="hover:text-foreground transition-colors">Blog</a>
          <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
        </div>
      </div>
    </footer>
  );
};
