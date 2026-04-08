"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const problemsEs = [
  { icon: "⏱️", title: "3+ horas por propiedad", description: "Crear descripciones, copies y diseñar publicaciones para cada propiedad consume casi medio día de trabajo." },
  { icon: "📱", title: "Multiplicidad de plataformas", description: "Instagram, Facebook, TikTok, Twitter, portales... cada uno requiere contenido diferente y tiempo de publicación." },
  { icon: "😴", title: "Leads perdidos", description: "Sin seguimiento automatizado, el 80% de los potenciales clientes se van con la competencia." },
  { icon: "💸", title: "ROI negativo", description: "Inviertes en marketing pero no sabes qué funciona porque no hay analytics claro." },
];

const problemsEn = [
  { icon: "⏱️", title: "3+ hours per property", description: "Creating descriptions, copy, and designing posts for each property takes almost half a day of work." },
  { icon: "📱", title: "Multiple platforms", description: "Instagram, Facebook, TikTok, Twitter, portals... each requires different content and posting time." },
  { icon: "😴", title: "Lost leads", description: "Without automated follow-up, 80% of potential customers go to the competition." },
  { icon: "💸", title: "Negative ROI", description: "You invest in marketing but don't know what works because there's no clear analytics." },
];

export default function Problem() {
  const containerRef = useRef<HTMLElement>(null);
  const { language } = useLanguage();
  const problems = language === "es" ? problemsEs : problemsEn;

  useGSAP(() => {
    // Title animation
    gsap.from(".problem-title", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    // Cards stagger animation
    gsap.from(".problem-card", {
      y: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".problem-card",
        start: "top 85%",
      },
    });

    // Subtle parallax on icons
    gsap.to(".problem-icon", {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.2,
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 px-4 bg-[var(--bg-primary)]" id="problem">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="problem-title font-display text-4xl md:text-5xl font-bold text-white mb-4">
            {language === "es" ? "El Problema" : "The Problem"}
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            {language === "es" 
              ? "El marketing inmobiliario actual es ineficiente y consume tiempo valioso"
              : "Current real estate marketing is inefficient and consumes valuable time"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="problem-card group bg-[var(--bg-secondary)] border border-[var(--accent-border)] rounded-2xl p-8 hover:border-red-500/50 hover:bg-red-500/5 transition-all duration-300"
            >
              <div className="problem-icon text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">
                {problem.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                {problem.title}
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}