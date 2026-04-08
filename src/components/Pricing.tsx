"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "Starter",
    description: "Para inmobiliarias pequeñas",
    features: [
      "25 propiedades/año",
      "1 usuario",
      "2 plataformas",
      "50 generaciones IA/mes",
      "Email soporte",
      "1 hora capacitación",
      "Analytics básico",
    ],
    highlighted: false,
  },
  {
    name: "Professional",
    description: "Para inmobiliarias en crecimiento",
    features: [
      "100 propiedades/año",
      "5 usuarios",
      "5 plataformas",
      "200 generaciones IA/mes",
      "Email + Chat soporte",
      "3 horas capacitación",
      "Analytics avanzado",
    ],
    highlighted: false,
  },
  {
    name: "Enterprise",
    description: "Para inmobiliarias grandes",
    features: [
      "Propiedades ilimitadas",
      "20 usuarios",
      "Todas las plataformas",
      "IA ilimitada",
      "Soporte priority 24/7",
      "Capacitación ilimitada",
      "Analytics completo",
      "API access",
    ],
    highlighted: true,
  },
];

export default function Pricing() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".pricing-title", {
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

    gsap.from(".pricing-card", {
      scrollTrigger: {
        trigger: ".pricing-grid",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power3.out",
    });
  }, { scope: containerRef });

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={containerRef} className="py-20 px-4 bg-[var(--bg-primary)]" id="precios">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="pricing-title text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
            Planes para cada tamaño
          </h2>
          <p className="text-[var(--text-secondary)]">
            Elige el plan que mejor se adapte a tus necesidades
          </p>
        </div>

        <div className="pricing-grid grid md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card ${
                plan.highlighted
                  ? "bg-gradient-to-b from-cyan-500/10 to-[var(--bg-tertiary)] border-2 border-[var(--cyan)]"
                  : "bg-[var(--bg-tertiary)] border border-[var(--accent-border)]"
              } rounded-2xl p-8 hover:border-[var(--cyan)] hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] transition-all duration-300`}
            >
              {plan.highlighted && (
                <div className="text-center mb-4">
                  <span className="inline-block bg-[var(--cyan)] text-[var(--bg-primary)] text-xs font-bold px-3 py-1 rounded-full">
                    MÁS POPULAR
                  </span>
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-[var(--text-primary)]">{plan.name}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{plan.description}</p>
              </div>
              <ul className="text-sm text-[var(--text-secondary)] space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-[var(--cyan)]">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={scrollToContact}
                className={`block w-full text-center py-3 rounded-lg font-semibold transition-all ${
                  plan.highlighted
                    ? "bg-[var(--accent)] text-[var(--bg-primary)] hover:opacity-90"
                    : "bg-[var(--accent-subtle)] text-[var(--text-primary)] hover:bg-[var(--accent-subtle)]/50"
                }`}
              >
                Contactar
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
