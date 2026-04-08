"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { 
  FaWhatsapp, 
  FaFacebookF, 
  FaInstagram, 
  FaTiktok, 
  FaLinkedinIn, 
  FaTwitter 
} from "react-icons/fa";

export default function Hero({ onNavigate, isLocked }: { onNavigate: (section: string) => void; isLocked: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [contentParticles, setContentParticles] = useState<{ id: number; left: string; top: string; delay: string }[]>([]);
  const [bgParticles, setBgParticles] = useState<{ id: number; left: string; top: string; delay: string; duration: string }[]>([]);
  const { t, language } = useLanguage();

  // Generate particles on client only
  useEffect(() => {
    const newContentParticles = [...Array(12)].map((_, i) => ({
      id: i,
      left: `${10 + Math.random() * 80}%`,
      top: `${10 + Math.random() * 80}%`,
      delay: `${Math.random() * 3}s`,
    }));
    setContentParticles(newContentParticles);

    const newBgParticles = [...Array(15)].map((_, i) => ({
      id: i,
      left: `${5 + Math.random() * 90}%`,
      top: `${5 + Math.random() * 90}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${6 + Math.random() * 4}s`,
    }));
    setBgParticles(newBgParticles);
  }, []);

  const handleVerContenidoClick = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      width: 60px;
      height: 60px;
      background: #06b6d4;
      border-radius: 50%;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) scale(0);
      pointer-events: none;
      z-index: 100;
      transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    document.body.appendChild(overlay);
    
    requestAnimationFrame(() => {
      overlay.style.transform = 'translate(-50%, -50%) scale(30)';
    });
    
    setTimeout(() => {
      onNavigate('features');
      overlay.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s';
      overlay.style.opacity = '0';
      overlay.style.transform = 'translate(-50%, -50%) scale(32)';
      setTimeout(() => {
        overlay.remove();
        setIsTransitioning(false);
      }, 600);
    }, 500);
  };

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from(".marquee-item", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
    });
    
    tl.from(".hero-title", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.3");
    
    tl.from(".hero-subtitle", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    }, "-=0.4");
    
    tl.from(".stat-card", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power3.out",
    }, "-=0.3");
    
    tl.from(".cta-btn", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    }, "-=0.2");
    
    tl.from(".hero-badge", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    }, "-=0.3");

    // Content particles
    gsap.to(".content-particle", {
      y: "random(-30, 30)",
      x: "random(-20, 20)",
      duration: "random(4, 8)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Core pulse
    gsap.to(".core-pulse", {
      scale: 1.15,
      opacity: 0.7,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

  }, { scope: containerRef });

  const socialIcons = [
    { name: "WhatsApp", icon: FaWhatsapp, color: "bg-green-500", orbit: 1 },
    { name: "Facebook", icon: FaFacebookF, color: "bg-blue-600", orbit: 1.8 },
    { name: "Instagram", icon: FaInstagram, color: "bg-gradient-to-br from-purple-500 to-pink-500", orbit: 2.6 },
    { name: "TikTok", icon: FaTiktok, color: "bg-black", orbit: 3.4 },
    { name: "LinkedIn", icon: FaLinkedinIn, color: "bg-blue-700", orbit: 4.2 },
    { name: "Twitter", icon: FaTwitter, color: "bg-sky-500", orbit: 5 },
  ];

  useGSAP(() => {
    // The 3D orbit rotation is now handled by CSS keyframes
    
    gsap.from(".orbital-system", {
      opacity: 0,
      scale: 0.9,
      duration: 1.2,
      ease: "power3.out",
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-screen flex">
      
      {/* LEFT - Content with integrated particles */}
      <div className="relative w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center overflow-hidden">
        {/* Integrated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-primary)] via-[var(--bg-secondary)]/30 to-[var(--bg-secondary)]" />
        
        {/* Content particles - subtle */}
        <div className="absolute inset-0 pointer-events-none">
          {contentParticles.map((p) => (
            <div
              key={p.id}
              className="content-particle absolute w-1 h-1 bg-white/15 rounded-full"
              style={{
                left: p.left,
                top: p.top,
                animationDelay: p.delay,
              }}
            />
          ))}
        </div>

          {/* Content */}
        <div className="relative z-10 max-w-md">
          {/* Badge - Smart Marketing for Real Estate */}
          <div className="inline-flex items-center gap-2 bg-[var(--accent-subtle)] border border-[var(--accent-border)] rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-[var(--cyan)] rounded-full animate-pulse"></span>
            <span className="text-[var(--cyan)] text-sm font-medium">{language === "es" ? "Marketing Inteligente con IA" : "Smart Marketing with AI"}</span>
          </div>
          
          {/* Marquee */}
          <div 
            className="overflow-hidden bg-[var(--bg-tertiary)] rounded-lg py-3 mb-6 border border-[var(--accent-border)] cursor-pointer hover:border-[var(--text-secondary)] transition-colors"
            onClick={handleVerContenidoClick}
          >
            <div className="marquee-track flex gap-0 w-max animate-marquee">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="marquee-item flex items-center gap-2 px-5 text-sm font-medium text-[var(--text-primary)] whitespace-nowrap">
                  <span className="w-6 h-6 border border-[var(--text-primary)] rounded-full flex items-center justify-center text-xs">
                    →
                  </span>
                  {language === "es" ? "Ver contenido" : "View content"}
                </div>
              ))}
            </div>
          </div>

          {/* Title */}
          <h1 className="hero-title font-display text-4xl lg:text-5xl font-bold leading-tight text-[var(--text-primary)] mb-6">
            {t('heroTitle')}<br />
            <span className="text-[var(--cyan)]">{t('heroTitleHighlight')}</span>
          </h1>
          
          {/* Subtitle */}
          <p className="hero-subtitle text-[var(--text-secondary)] mb-8 leading-relaxed">
            {t('heroSubtitle')}
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="stat-card bg-[var(--accent-subtle)] border border-[var(--accent-border)] rounded-lg p-4">
              <div className="font-display text-2xl font-bold text-[var(--text-primary)]">80%</div>
              <div className="text-xs text-[var(--text-secondary)] mt-1">{t('statsLessTime')}</div>
            </div>
            <div className="stat-card bg-[var(--accent-subtle)] border border-[var(--accent-border)] rounded-lg p-4">
              <div className="font-display text-2xl font-bold text-[var(--text-primary)]">40%</div>
              <div className="text-xs text-[var(--text-secondary)] mt-1">{t('statsMoreLeads')}</div>
            </div>
            <div className="stat-card bg-[var(--accent-subtle)] border border-[var(--accent-border)] rounded-lg p-4">
              <div className="font-display text-2xl font-bold text-[var(--text-primary)]">3x</div>
              <div className="text-xs text-[var(--text-secondary)] mt-1">{t('statsROI')}</div>
            </div>
          </div>
          
          {/* CTA Button */}
          <button 
            className="cta-btn flex items-center gap-3 bg-[var(--accent)] text-[var(--bg-primary)] border-none rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wide hover:scale-105 transition-transform"
            onClick={() => onNavigate('contact')}
          >
            {t('scheduleDemo')}
            <span className="w-7 h-7 bg-[var(--bg-primary)] rounded-full flex items-center justify-center text-[var(--accent)] text-sm">
              →
            </span>
          </button>
        </div>
      </div>

        {/* RIGHT - Orbital Animation */}
        <div className="relative hidden lg:flex w-1/2 items-center justify-center overflow-hidden">
          {/* Subtle background gradient */}
          <div className="absolute inset-0 bg-gradient-to-l from-[var(--bg-secondary)]/50 to-[var(--bg-secondary)]" />
          
          {/* Background particles */}
          <div className="absolute inset-0 pointer-events-none">
            {bgParticles.map((p) => (
              <div
                key={p.id}
                className="absolute w-1 h-1 bg-white/10 rounded-full animate-float-slow"
                style={{
                  left: p.left,
                  top: p.top,
                  animationDelay: p.delay,
                  animationDuration: p.duration,
                }}
              />
            ))}
          </div>

          {/* Orbital System - Single centered container */}
          <div className="orbital-system relative w-[500px] h-[500px]">
            {/* Central AI Sphere - perfectly centered */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="core-pulse">
                <div className="absolute -inset-16 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl animate-pulse-glow" />
                <div className="relative w-28 h-28">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full blur-lg opacity-80" />
                  <div className="absolute inset-2 bg-gradient-to-br from-cyan-300 to-blue-500 rounded-full" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-white tracking-wider">AI</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Orbital rings - each properly centered and rotating */}
            {socialIcons.map((social, i) => {
              const IconComponent = social.icon;
              const orbitRadius = 85 + (i * 40); // Radius for each orbit: 85, 125, 165, 205, 245, 285
              const rotationDuration = 20 + (i * 4); // Speed varies per orbit
              const rotationDirection = i % 2 === 0 ? 'normal' : 'reverse';
              
              return (
                <div 
                  key={i}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    width: orbitRadius * 2,
                    height: orbitRadius * 2,
                    transform: 'translate(-50%, -50%)',
                    animation: `orbit-rotate-${i} ${rotationDuration}s linear infinite ${rotationDirection}`,
                  }}
                >
                  {/* Orbit ring line */}
                  <div className="absolute inset-0 rounded-full border border-white/10" />
                  
                  {/* Icon positioned on top of the orbit ring (12 o'clock position) */}
                  <div 
                    className="absolute"
                    style={{
                      top: 0,
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div 
                      className={`w-12 h-12 ${social.color} rounded-xl flex items-center justify-center text-white text-xl shadow-xl backdrop-blur-sm border-2 border-white/30 transition-transform duration-300 hover:scale-125`}
                    >
                      <IconComponent />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        {/* Badge */}
        <div className="hero-badge absolute top-5 right-5 flex items-center gap-2 bg-[rgba(26,26,26,0.9)] border border-[var(--accent-border)] rounded-full px-3 py-2 text-xs text-[var(--text-secondary)]">
          <div className="flex -space-x-1.5">
            <div className="w-6 h-6 rounded-full border border-[var(--bg-primary)] bg-green-400 text-[8px] flex items-center justify-center font-bold text-[var(--bg-primary)]">JK</div>
            <div className="w-6 h-6 rounded-full border border-[var(--bg-primary)] bg-blue-400 text-[8px] flex items-center justify-center font-bold text-[var(--bg-primary)]">MR</div>
            <div className="w-6 h-6 rounded-full border border-[var(--bg-primary)] bg-purple-400 text-[8px] flex items-center justify-center font-bold text-[var(--bg-primary)]">+</div>
          </div>
          {t('badgeAgencies')}
        </div>
      </div>

        <style>{`
          @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .animate-marquee { animation: marquee 12s linear infinite; }
          @keyframes float-slow {
            0%, 100% { transform: translateY(0) translateX(0); }
            25% { transform: translateY(-15px) translateX(8px); }
            50% { transform: translateY(-8px) translateX(-8px); }
            75% { transform: translateY(-20px) translateX(5px); }
          }
          .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
          @keyframes pulse-glow {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.2); opacity: 0.7; }
          }
          .animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }

          /* Orbital rotation keyframes - properly centered */
          @keyframes orbit-rotate-0 { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
          @keyframes orbit-rotate-1 { from { transform: translate(-50%, -50%) rotate(360deg); } to { transform: translate(-50%, -50%) rotate(0deg); } }
          @keyframes orbit-rotate-2 { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
          @keyframes orbit-rotate-3 { from { transform: translate(-50%, -50%) rotate(360deg); } to { transform: translate(-50%, -50%) rotate(0deg); } }
          @keyframes orbit-rotate-4 { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
          @keyframes orbit-rotate-5 { from { transform: translate(-50%, -50%) rotate(360deg); } to { transform: translate(-50%, -50%) rotate(0deg); } }
        `}</style>
    </section>
  );
}
