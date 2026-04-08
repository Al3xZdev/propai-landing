"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const pillData = [
  { text: 'Marketing', accent: false, x: 10, y: 15, dur: 3.2 },
  { text: 'Automation', accent: false, x: 60, y: 8, dur: 2.8 },
  { text: '24/7', accent: false, x: 75, y: 25, dur: 3.6 },
  { text: 'IA', accent: false, x: 5, y: 35, dur: 4.1 },
  { text: 'Leads', accent: false, x: 25, y: 45, dur: 3.0 },
  { text: 'ROI', accent: false, x: 80, y: 50, dur: 3.8 },
  { text: 'Scale', accent: false, x: 8, y: 65, dur: 2.6 },
  { text: 'Automate', accent: false, x: 45, y: 70, dur: 3.4 },
  { text: 'Innovate', accent: false, x: 70, y: 75, dur: 2.9 },
  { text: 'Transform', accent: false, x: 30, y: 82, dur: 3.7 },
  { text: 'Growth', accent: false, x: 55, y: 88, dur: 4.0 },
  { text: '●', accent: true, x: 40, y: 30, dur: 2.5 },
  { text: '●', accent: true, x: 20, y: 75, dur: 3.1 },
];

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const floatTweens = useRef<gsap.core.Tween[]>([]);
  const { t, language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const triggerPoint = window.innerHeight * 0.5;
      if (scrollPosition > triggerPoint) {
        setIsVisible(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useGSAP(() => {
    gsap.from(".features-title", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    });
    
    const cards = [".feat-card-1", ".feat-card-2", ".feat-card-3", ".physics-card"];
    
    cards.forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        duration: 0.5,
        delay: i * 0.1,
        ease: "power3.out",
      });
    });
  }, { scope: containerRef });

  // Floating animation - original version with enhanced hover
  useEffect(() => {
    if (!cardRef.current || !isVisible) return;

    const pills = cardRef.current.querySelectorAll('.physics-pill');

    // Kill existing animations
    floatTweens.current.forEach(tween => tween.kill());
    floatTweens.current = [];

    // Original floating animation
    pills.forEach((pill, i) => {
      const el = pill as HTMLElement;
      const baseX = parseFloat(el.style.left) || 50;
      const baseY = parseFloat(el.style.top) || 50;
      
      // Random floating movement
      const tween = gsap.to(el, {
        x: "random(-20, 20)",
        y: "random(-20, 20)",
        rotation: "random(-15, 15)",
        duration: "random(2, 4)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2,
      });
      
      floatTweens.current.push(tween);
    });

    // Enhanced hover effect - speed up and spread more
    if (isHovered) {
      floatTweens.current.forEach((tween, i) => {
        gsap.to(tween, {
          timeScale: 2,
          duration: 0.3,
        });
      });
    } else {
      floatTweens.current.forEach((tween, i) => {
        gsap.to(tween, {
          timeScale: 1,
          duration: 0.3,
        });
      });
    }
  }, [isHovered, isVisible]);

  // Generate random animations for original floating
  useEffect(() => {
    if (!cardRef.current || !isVisible) return;

    const pills = cardRef.current.querySelectorAll('.physics-pill');
    
    pills.forEach((pill, i) => {
      const el = pill as HTMLElement;
      const animIndex = Math.floor(Math.random() * 3);
      el.style.animation = `float${animIndex} ${pillData[i].dur}s ease-in-out infinite alternate`;
      el.style.animationDelay = `${Math.random() * 2}s`;
    });
  }, [isVisible]);

  return (
    <div ref={containerRef} className="p-7 bg-[var(--bg-primary)]">
      <h2 className="features-title font-display text-[28px] font-bold leading-[1.15] mb-6 max-w-[560px] text-[var(--text-primary)]">
        {language === "es" ? "La plataforma de automatización de marketing que transforma tu inmobiliaria" : "The marketing automation platform that transforms your real estate agency"}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Card 1 */}
        <div 
          className="feat-card-1 bg-[var(--bg-tertiary)] border border-[var(--accent-border)] rounded-[14px] p-6 flex flex-col justify-between hover:border-[var(--cyan)] hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] transition-all duration-300"
          style={{ minHeight: '200px' }}
        >
          <div>
            <div className="text-[13px] font-semibold text-[var(--text-secondary)] mb-2.5">1.</div>
            <div className="font-display text-[20px] font-bold leading-[1.2] mb-3 text-[var(--text-primary)]">
              {language === "es" ? "Automatización Inteligente" : "Intelligent Automation"}
            </div>
            <div className="text-[12px] leading-[1.7] text-[var(--text-secondary)]">
              {language === "es" 
                ? "Deja que la IA gestione las tareas repetitivas: publicación automática en múltiples plataformas, generación de descripciones únicas y seguimiento de leads sin que tengas que mover un dedo."
                : "Let AI handle repetitive tasks: automatic posting on multiple platforms, unique description generation, and lead tracking without lifting a finger."}
            </div>
          </div>
          <div className="w-9 h-9 border border-[var(--accent-border)] rounded-full flex items-center justify-center text-[14px] text-[var(--text-secondary)] mt-4 cursor-pointer hover:bg-[var(--accent-subtle)] transition-colors">
            →
          </div>
        </div>

        {/* Column 2: Cards 2 y 3 */}
        <div className="flex flex-col gap-3">
          <div 
            className="feat-card-2 bg-[var(--bg-tertiary)] border border-[var(--accent-border)] rounded-[14px] p-6 hover:border-[var(--cyan)] hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] transition-all duration-300"
            style={{ minHeight: '90px' }}
          >
            <div className="text-[13px] font-semibold text-[var(--text-secondary)] mb-2">2.</div>
            <div className="font-display text-[20px] font-bold leading-[1.2] text-[var(--text-primary)]">
              {language === "es" ? "Multiplica tu Productividad" : "Multiply your Productivity"}
            </div>
            <div className="text-[12px] leading-[1.7] text-[var(--text-secondary)] mt-2">
              {language === "es" 
                ? "De 3 horas por propiedad a solo 2 minutos. Libera hasta 20 horas semanales para enfocarte en cerrar ventas."
                : "From 3 hours per property to just 2 minutes. Free up to 20 hours per week to focus on closing deals."}
            </div>
            <div className="w-9 h-9 border border-[var(--accent-border)] rounded-full flex items-center justify-center text-[14px] text-[var(--text-secondary)] mt-2 cursor-pointer hover:bg-[var(--accent-subtle)] transition-colors">
              →
            </div>
          </div>
          
          <div 
            className="feat-card-3 bg-[var(--accent)] text-[var(--bg-primary)] rounded-[14px] p-6 hover:scale-[1.02] transition-all duration-300"
            style={{ minHeight: '110px' }}
          >
            <div className="text-[13px] font-semibold opacity-50 mb-2">3.</div>
            <div className="font-display text-[20px] font-bold leading-[1.2] mb-2 text-[var(--bg-primary)]">
              {language === "es" ? "No Intrusivo" : "Non-intrusive"}
            </div>
            <div className="text-[12px] leading-[1.7] opacity-65 text-[var(--bg-primary)]">
              {language === "es" 
                ? "No requiere cambios en sistemas existentes, facilitando la implementación."
                : "No changes to existing systems required, making implementation easy."}
            </div>
            <div className="w-9 h-9 border border-[var(--bg-primary)]/30 rounded-full flex items-center justify-center text-[14px] text-[var(--bg-primary)] mt-3 cursor-pointer hover:bg-[var(--bg-primary)]/10 transition-colors">
              →
            </div>
          </div>
        </div>

        {/* Physics Card con Floating Pills - Original version */}
        <div 
          ref={cardRef}
          className="physics-card bg-[var(--bg-tertiary)] border border-dashed border-[var(--text-secondary)]/30 rounded-[14px] relative overflow-hidden hover:border-[var(--cyan)] hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] transition-all duration-300"
          style={{ minHeight: '240px' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isVisible && pillData.map((p, i) => (
            <div
              key={i}
              className={`physics-pill absolute ${p.accent ? 'bg-[var(--cyan)] text-[var(--bg-primary)]' : 'bg-[var(--bg-primary)] border border-[var(--accent-border)] text-[var(--text-secondary)]'} rounded-full px-3.5 py-1.5 text-[10px] font-medium whitespace-nowrap cursor-default user-select-none`}
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
              }}
            >
              {p.text}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float0 { 
          0% { transform: translateY(0) rotate(-2deg); } 
          100% { transform: translateY(-8px) rotate(2deg); } 
        }
        @keyframes float1 { 
          0% { transform: translateY(0) rotate(3deg); } 
          100% { transform: translateY(-10px) rotate(-3deg); } 
        }
        @keyframes float2 { 
          0% { transform: translateY(0) rotate(0deg); } 
          100% { transform: translateY(-6px) rotate(4deg); } 
        }
      `}</style>
    </div>
  );
}
