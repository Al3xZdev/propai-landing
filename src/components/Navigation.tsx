"use client";

import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Navigation({ onNavigate }: { onNavigate: (section: string) => void }) {
  const containerRef = useRef<HTMLElement>(null);
  const { language, setLanguage, t } = useLanguage();

  const handleNavClick = (section: string, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(section);
  };

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es");
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
        <a href="#features" onClick={(e) => handleNavClick('features', e)} className="cursor-pointer hover:text-[var(--text-primary)] transition-colors">{t('features')}</a>
        <a href="#pricing" onClick={(e) => handleNavClick('pricing', e)} className="cursor-pointer hover:text-[var(--text-primary)] transition-colors">{t('pricing')}</a>
        <a href="#contact" onClick={(e) => handleNavClick('contact', e)} className="cursor-pointer hover:text-[var(--text-primary)] transition-colors">{t('contact')}</a>
      </div>
      
      {/* CTA & Language Toggle */}
      <div className="flex items-center gap-3">
        {/* Language Toggle */}
        <button 
          className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium text-[var(--text-secondary)] border border-[var(--accent-border)] hover:border-[var(--accent)] hover:text-[var(--text-primary)] transition-colors"
          onClick={toggleLanguage}
        >
          <span className="text-xs">{language === "es" ? "🇦🇷" : "🇺🇸"}</span>
          <span className="uppercase">{language}</span>
        </button>
        
        {/* Schedule Demo Button */}
        <button 
          className="bg-[var(--accent)] text-[var(--bg-primary)] px-5 py-2 rounded-full text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors"
          onClick={() => onNavigate('contact')}
        >
          {t('scheduleDemo')}
        </button>
      </div>
    </nav>
  );
}
