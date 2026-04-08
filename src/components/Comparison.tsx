"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function Comparison() {
  const containerRef = useRef<HTMLElement>(null);
  const { language } = useLanguage();
  
  const beforeItems = language === "es" ? [
    { label: "Tiempo por propiedad", value: "3 horas" },
    { label: "Plataformas", value: "1-2" },
    { label: "Descripciones únicas", value: "—" },
    { label: "Publicación automática", value: "—" },
    { label: "Follow-up leads", value: "—" },
    { label: "Analytics", value: "—" },
  ] : [
    { label: "Time per property", value: "3 hours" },
    { label: "Platforms", value: "1-2" },
    { label: "Unique descriptions", value: "—" },
    { label: "Auto-publishing", value: "—" },
    { label: "Lead follow-up", value: "—" },
    { label: "Analytics", value: "—" },
  ];

  const afterItems = language === "es" ? [
    { label: "Tiempo por propiedad", value: "2 minutos" },
    { label: "Plataformas", value: "4" },
    { label: "Descripciones únicas", value: "✓ IA" },
    { label: "Publicación automática", value: "✓" },
    { label: "Follow-up leads", value: "✓" },
    { label: "Analytics", value: "✓" },
  ] : [
    { label: "Time per property", value: "2 minutes" },
    { label: "Platforms", value: "4" },
    { label: "Unique descriptions", value: "✓ AI" },
    { label: "Auto-publishing", value: "✓" },
    { label: "Lead follow-up", value: "✓" },
    { label: "Analytics", value: "✓" },
  ];

  useGSAP(() => {
    gsap.from(".comparison-title", {
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

    gsap.from(".comparison-card", {
      scrollTrigger: {
        trigger: ".comparison-grid",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.2,
      ease: "power3.out",
    });

    gsap.from(".comparison-savings", {
      scrollTrigger: {
        trigger: ".comparison-savings",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      ease: "back.out(1.7)",
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-20 px-4 bg-[var(--bg-primary)]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="comparison-title font-display text-[36px] md:text-[48px] font-bold text-[var(--text-primary)] mb-4">
            {language === "es" ? "Antes vs Después" : "Before vs After"}
          </h2>
        </div>

        <div className="comparison-grid grid md:grid-cols-2 gap-6">
          {/* Before */}
          <div className="comparison-card bg-[var(--bg-secondary)] border border-[var(--accent-border)] rounded-[16px] p-8 hover:border-[var(--text-muted)] transition-colors duration-300">
            <h3 className="text-[20px] font-bold text-[var(--text-muted)] mb-6 text-center">
              {language === "es" ? "Manualmente" : "Manually"}
            </h3>
            <div className="space-y-4 text-[var(--text-secondary)]">
              {beforeItems.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between border-b border-[var(--accent-border)] pb-2"
                >
                  <span>{item.label}</span>
                  <span className="text-[var(--text-muted)] font-bold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* After */}
          <div className="comparison-card bg-[var(--bg-secondary)] border border-[var(--accent-border)] rounded-[16px] p-8 hover:border-[var(--cyan)] transition-colors duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]">
            <h3 className="text-[20px] font-bold text-[var(--text-primary)] mb-6 text-center">
              {language === "es" ? "Con PropAI" : "With PropAI"}
            </h3>
            <div className="space-y-4 text-[var(--text-secondary)]">
              {afterItems.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between border-b border-[var(--accent-border)] pb-2"
                >
                  <span>{item.label}</span>
                  <span className="text-[var(--cyan)] font-bold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="comparison-savings mt-8 text-center">
          <p className="text-[20px] text-[var(--text-primary)] font-bold">
            {language === "es" ? "Ahorra " : "Save "}
            <span className="text-[var(--cyan)]">
              {language === "es" ? "20+ horas semanales" : "20+ hours weekly"}
            </span>
            {language === "es" ? " en marketing" : " on marketing"}
          </p>
        </div>
      </div>
    </section>
  );
}