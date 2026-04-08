"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const featuresEs = [
  { icon: "🤖", title: "IA Generativa", description: "Descripciones, copies y emails en segundos" },
  { icon: "📅", title: "Auto-Publicación", description: "Programa y olvida en IG, FB, TikTok" },
  { icon: "👥", title: "Gestión Leads", description: "Sequences automatizados" },
  { icon: "📊", title: "Analytics", description: "Métricas reales de rendimiento" },
];

const featuresEn = [
  { icon: "🤖", title: "Generative AI", description: "Descriptions, copy, and emails in seconds" },
  { icon: "📅", title: "Auto-Publishing", description: "Schedule and forget on IG, FB, TikTok" },
  { icon: "👥", title: "Lead Management", description: "Automated sequences" },
  { icon: "📊", title: "Analytics", description: "Real performance metrics" },
];

const timelineEs = [
  { day: "Día 1", event: "Fotos + Just Listed" },
  { day: "Día 3", event: "Video / Reel" },
  { day: "Día 5", event: "Open House" },
  { day: "Día 10", event: "Price Update" },
];

const timelineEn = [
  { day: "Day 1", event: "Photos + Just Listed" },
  { day: "Day 3", event: "Video / Reel" },
  { day: "Day 5", event: "Open House" },
  { day: "Day 10", event: "Price Update" },
];

export default function Solution() {
  const containerRef = useRef<HTMLElement>(null);
  const { language } = useLanguage();
  const features = language === "es" ? featuresEs : featuresEn;
  const timeline = language === "es" ? timelineEs : timelineEn;

  useGSAP(() => {
    // Title
    gsap.from(".solution-title", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    // Features - staggered
    gsap.from(".solution-feature", {
      scrollTrigger: {
        trigger: ".solution-features",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
    });

    // Timeline box
    gsap.from(".timeline-box", {
      scrollTrigger: {
        trigger: ".timeline-box",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    });

    // Timeline items
    gsap.from(".timeline-item", {
      scrollTrigger: {
        trigger: ".timeline-box",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "back.out(1.7)",
    });

    // Floating animation for feature icons
    gsap.to(".feature-icon", {
      y: -5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.3,
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 px-4 bg-[var(--bg-secondary)]" id="solution">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="solution-title font-display text-4xl md:text-5xl font-bold text-white mb-4">
            {language === "es" ? "La Solución" : "The Solution"}
          </h2>
          <p className="text-lg text-[var(--text-secondary)]">
            {language === "es" 
              ? "Todo tu marketing inmobiliario en una sola plataforma"
              : "All your real estate marketing in one platform"}
          </p>
        </div>

        {/* Features Grid */}
        <div className="solution-features grid md:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="solution-feature group glass rounded-2xl p-6 text-center hover:scale-105 hover:bg-[var(--accent-subtle)] transition-all duration-300 cursor-pointer"
            >
              <div className="feature-icon w-14 h-14 bg-[var(--accent-subtle)] rounded-xl flex items-center justify-center text-3xl mx-auto mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[var(--cyan)] transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="timeline-box glass rounded-2xl p-8">
          <h3 className="text-xl font-bold text-white text-center mb-8">
            {language === "es" ? "Cronograma Automático" : "Automatic Schedule"}
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {timeline.map((item, index) => (
              <div key={index} className="timeline-item flex items-center gap-4">
                <div className="px-6 py-4 rounded-xl bg-[var(--accent-subtle)] border border-[var(--accent-border)]/30 hover:border-[var(--cyan)] hover:bg-[var(--accent-subtle)]/50 transition-all">
                  <div className="text-sm font-bold text-[var(--cyan)]">{item.day}</div>
                  <div className="text-sm text-white">{item.event}</div>
                </div>
                {index < timeline.length - 1 && (
                  <span className="text-[var(--text-muted)] text-2xl">→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
