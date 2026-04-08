"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function Guarantee() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from(".guarantee-icon", {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      ease: "back.out(1.7)",
    });
    
    tl.from(".guarantee-title", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    }, "-=0.3");
    
    tl.from(".guarantee-box", {
      y: 40,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    }, "-=0.3");
    
    tl.from(".guarantee-feature", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power3.out",
    }, "-=0.3");
    
    tl.from(".guarantee-cta", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    }, "-=0.2");

    // Continuous glow animation
    gsap.to(".guarantee-glow", {
      scale: 1.1,
      opacity: 0.3,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, { scope: containerRef });

  const scrollToContact = () => {
    const element = document.getElementById("contacto");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={containerRef} className="py-24 px-4 bg-[var(--bg-primary)] relative overflow-hidden">
      {/* Background glow */}
      <div className="guarantee-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="mb-8">
          <div className="guarantee-icon text-7xl mb-4">🛡️</div>
          <h2 className="guarantee-title text-4xl font-bold text-white mb-4">
            Garantía de Satisfacción
          </h2>
        </div>

        <div className="guarantee-box bg-[var(--bg-secondary)] border border-[var(--cyan)]/30 rounded-2xl p-8 mb-8 backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-white mb-4">
            30 Días de Garantía
          </h3>
          <p className="text-lg text-[var(--text-secondary)]">
            Si en los primeros 30 días no estás satisfecho con los resultados,
            devolvemos tu dinero. Sin preguntas, sin complicaciones.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="guarantee-feature bg-[var(--bg-tertiary)] border border-[var(--accent-border)] rounded-xl p-6 hover:border-[var(--cyan)]/50 transition-colors">
            <div className="text-4xl mb-3">🔒</div>
            <p className="text-white font-bold">Datos Seguros</p>
            <p className="text-[var(--text-muted)] text-sm mt-1">
              Encriptación SSL y GDPR compliant
            </p>
          </div>
          <div className="guarantee-feature bg-[var(--bg-tertiary)] border border-[var(--accent-border)] rounded-xl p-6 hover:border-[var(--cyan)]/50 transition-colors">
            <div className="text-4xl mb-3">⚡</div>
            <p className="text-white font-bold">99.9% Uptime</p>
            <p className="text-[var(--text-muted)] text-sm mt-1">
              Garantizado con redundancia
            </p>
          </div>
          <div className="guarantee-feature bg-[var(--bg-tertiary)] border border-[var(--accent-border)] rounded-xl p-6 hover:border-[var(--cyan)]/50 transition-colors">
            <div className="text-4xl mb-3">🔄</div>
            <p className="text-white font-bold">Backups Diarios</p>
            <p className="text-[var(--text-muted)] text-sm mt-1">
              Tus datos siempre seguros
            </p>
          </div>
        </div>

        <button 
          onClick={scrollToContact}
          className="guarantee-cta inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
        >
          📅 Agendar Demo sin Compromiso
        </button>
      </div>
    </section>
  );
}