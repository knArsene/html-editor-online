
import React from 'react';
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-card/80 backdrop-blur-sm border-t border-border px-4 py-3 fixed bottom-0 left-0 right-0 z-20">
      <div className="container mx-auto flex flex-wrap justify-between items-center text-sm text-muted-foreground gap-y-2">
        <p>&copy; {new Date().getFullYear()} Web IDE. All rights reserved.</p>
        <div className="flex items-center gap-x-4 sm:gap-x-6">
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
