"use client";

import { useRef } from "react";

export default function Navigation({ onNavigate }: { onNavigate: (section: string) => void }) {
  const containerRef = useRef<HTMLElement>(null);

  const handleNavClick = (section: string, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(section);
  };

  return (
    <nav ref={containerRef} className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-[var(--accent-border)] bg-[var(--bg-secondary)]/80 backdrop-blur-md">
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={(e) => handleNavClick('hero', e)}>
        <div className="w-10 h-10 bg-[var(--accent)] rounded-lg flex items-center justify-center">
          <span className="text-[var(--bg-primary)] font-bold text-xl">P</span>
        </div>
        <span className="text-xl font-bold text-[var(--text-primary)]">PropAI</span>
      </div>
      
      {/* Nav Links */}
      <div className="hidden md:flex gap-6 text-sm font-medium text-[var(--text-secondary)]">
        <a href="#features" onClick={(e) => handleNavClick('features', e)} className="cursor-pointer hover:text-[var(--text-primary)] transition-colors">Características</a>
        <a href="#pricing" onClick={(e) => handleNavClick('pricing', e)} className="cursor-pointer hover:text-[var(--text-primary)] transition-colors">Precios</a>
        <a href="#contact" onClick={(e) => handleNavClick('contact', e)} className="cursor-pointer hover:text-[var(--text-primary)] transition-colors">Contacto</a>
      </div>
      
      {/* CTA */}
      <button 
        className="bg-[var(--accent)] text-[var(--bg-primary)] px-5 py-2 rounded-full text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors"
        onClick={() => onNavigate('contact')}
      >
        Agendar Demo
      </button>
    </nav>
  );
}
