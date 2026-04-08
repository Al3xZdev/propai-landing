"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function CaseStudy() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".case-title", {
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

    gsap.from(".case-challenge", {
      scrollTrigger: {
        trigger: ".case-grid",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
      x: -30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    });

    gsap.from(".case-results", {
      scrollTrigger: {
        trigger: ".case-grid",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
      x: 30,
      opacity: 0,
      duration: 0.6,
      delay: 0.2,
      ease: "power3.out",
    });

    gsap.from(".case-quote", {
      scrollTrigger: {
        trigger: ".case-quote",
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-20 px-4 bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto">
        <div className="case-title text-center mb-12">
          <h2 className="font-display text-[36px] md:text-[48px] font-bold text-[var(--text-primary)] mb-4">
            Expectativas
          </h2>
          <p className="text-[18px] text-[var(--text-secondary)]">
            Lo que lograrás con PropAI
          </p>
        </div>

        <div className="case-grid grid md:grid-cols-2 gap-8">
          {/* Challenge */}
          <div className="case-challenge bg-[var(--bg-tertiary)] border border-[var(--accent-border)] rounded-[16px] p-8 hover:border-[var(--text-muted)] transition-colors duration-300">
            <h3 className="text-[22px] font-bold text-[var(--text-primary)] mb-4">📊 El Reto</h3>
            <ul className="text-[var(--text-secondary)] space-y-3">
              <li>• 15 agentes inmobiliarios</li>
              <li>• 30+ propiedades nuevas por mes</li>
              <li>• Marketing manual tomaba 25 horas/semana</li>
              <li>• Leads perdidos por falta de seguimiento</li>
              <li>• ROI de marketing no medible</li>
            </ul>
          </div>

          {/* Results */}
          <div className="case-results bg-[var(--bg-tertiary)] border border-[var(--cyan)]/30 rounded-[16px] p-8 hover:border-[var(--cyan)] hover:shadow-[0_0_40px_rgba(6,182,212,0.1)] transition-all duration-300">
            <h3 className="text-[22px] font-bold text-[var(--cyan)] mb-4">
              ✅ Los Resultados
            </h3>
            <ul className="text-[var(--text-secondary)] space-y-3">
              <li className="flex justify-between">
                <span>Tiempo en marketing</span>
                <span className="text-[var(--cyan)] font-bold">-85%</span>
              </li>
              <li className="flex justify-between">
                <span>Leads generados</span>
                <span className="text-[var(--cyan)] font-bold">+45%</span>
              </li>
              <li className="flex justify-between">
                <span>Conversiones</span>
                <span className="text-[var(--cyan)] font-bold">+30%</span>
              </li>
              <li className="flex justify-between">
                <span>Propiedades publicadas</span>
                <span className="text-[var(--cyan)] font-bold">100%</span>
              </li>
              <li className="flex justify-between">
                <span>ROI del marketing</span>
                <span className="text-[var(--cyan)] font-bold">3.5x</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="case-quote mt-8 text-center p-6 bg-[var(--bg-tertiary)] border border-[var(--accent-border)] rounded-[12px] hover:border-[var(--cyan)] hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] transition-all duration-300">
          <p className="text-[20px] text-[var(--text-primary)]">
            Recupera la inversión en 90 días y ten un marketing 100% medible y automatizado.
          </p>
        </div>
      </div>
    </section>
  );
}
