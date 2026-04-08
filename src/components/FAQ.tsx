"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface FAQItem {
  question: string;
  answer: string;
  icon?: string;
}

const faqs: FAQItem[] = [
  {
    question: "¿Cuánto tiempo tarda la implementación?",
    answer: "Generalmente 5-7 días hábiles. Configuramos todo, subimos tus propiedades existentes y capacitamos a tu equipo. Nos encargamos de la integración completa con tus plataformas actuales.",
    icon: "⏱️",
  },
  {
    question: "¿Necesito conocimientos técnicos?",
    answer: "No, para nada. Nos encargamos de todo el setup técnico. Solo necesitas proporcionar las fotos y datos básicos de tus propiedades. La IA hace el resto automáticamente.",
    icon: "🔧",
  },
  {
    question: "¿Qué pasa si quiero cancelar?",
    answer: "Puedes cancelar en cualquier momento con 30 días de anticipación. No hay penalizaciones, cláusulas ocultas ni permanencia forzada. Tu datos siempre serán tuyos.",
    icon: "🛡️",
  },
  {
    question: "¿Las redes sociales se conectan directamente?",
    answer: "Sí, conectamos tus cuentas de Instagram, Facebook y Whatsapp de forma segura. Usamos las APIs oficiales de cada plataforma para garantizar el mejor alcance.",
    icon: "📱",
  },
  {
    question: "¿Ofrecen soporte en español?",
    answer: "¡Por supuesto! Todo nuestro equipo de soporte opera en español, disponible por email, chat en vivo y teléfono según tu plan contratado.",
    icon: "💬",
  },
];

export default function FAQ() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useGSAP(() => {
    gsap.from(".faq-section-title", {
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

    gsap.from(".faq-list-item", {
      scrollTrigger: {
        trigger: ".faq-list-container",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
      y: 30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: "power3.out",
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 px-4 bg-[var(--bg-primary)]" id="faq">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="faq-section-title text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-[var(--cyan)] text-lg">
            Todo lo que necesitas saber sobre PropAI
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* LEFT - Questions List */}
          <div className="faq-list-container space-y-3">
            {faqs.map((faq, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`faq-list-item w-full text-left p-5 rounded-xl transition-all duration-300 relative overflow-hidden ${
                  activeIndex === index
                    ? "bg-gradient-to-r from-cyan-600/80 to-blue-600/80 shadow-[0_0_30px_rgba(6,182,212,0.3)]"
                    : "bg-[var(--bg-tertiary)] border border-[var(--accent-border)] hover:bg-[var(--accent-subtle)] hover:border-[var(--cyan)]/50"
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {/* Active glow background */}
                {activeIndex === index && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 animate-pulse" />
                )}
                
                <div className="relative flex items-center justify-between">
                  <span className="text-2xl mr-3">{faq.icon}</span>
                  <span className={`flex-1 font-semibold text-base ${
                    activeIndex === index ? "text-white" : "text-[var(--text-primary)]"
                  }`}>
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`text-xl ${activeIndex === index ? "text-cyan-400" : "text-[var(--text-muted)]"}`}
                  >
                    ▼
                  </motion.span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* RIGHT - Dynamic Panel */}
          <div className="relative">
            {/* Glassmorphism panel */}
            <div className="sticky top-24">
              <div className="bg-[var(--bg-tertiary)]/50 backdrop-blur-xl border border-[var(--accent-border)] rounded-2xl p-8 min-h-[300px]">
                <AnimatePresence mode="wait">
                  {isMounted && (
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      {/* Icon */}
                      <div className="text-5xl mb-6">
                        {faqs[activeIndex].icon}
                      </div>
                      
                      {/* Question */}
                      <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
                        {faqs[activeIndex].question}
                      </h3>
                      
                      {/* Answer */}
                      <p className="text-[var(--text-secondary)] leading-relaxed text-lg">
                        {faqs[activeIndex].answer}
                      </p>

                      {/* Decorative elements */}
                      <div className="mt-8 flex items-center gap-2">
                        <div className="h-1 w-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
                        <span className="text-xs text-[var(--text-muted)]">
                          PropAI FAQ
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Glow effect behind panel */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-cyan-500/20 rounded-3xl blur-2xl -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
