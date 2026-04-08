"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

interface FAQItem {
  question: string;
  answer: string;
  icon?: string;
}

const faqsEs: FAQItem[] = [
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

const faqsEn: FAQItem[] = [
  {
    question: "How long does implementation take?",
    answer: "Usually 5-7 business days. We set everything up, upload your existing properties, and train your team. We handle the complete integration with your current platforms.",
    icon: "⏱️",
  },
  {
    question: "Do I need technical knowledge?",
    answer: "No, not at all. We handle all the technical setup. You just need to provide photos and basic data for your properties. The AI does the rest automatically.",
    icon: "🔧",
  },
  {
    question: "What if I want to cancel?",
    answer: "You can cancel anytime with 30 days notice. No penalties, hidden clauses, or forced commitment. Your data will always be yours.",
    icon: "🛡️",
  },
  {
    question: "Do social networks connect directly?",
    answer: "Yes, we securely connect your Instagram, Facebook, and WhatsApp accounts. We use official APIs from each platform to guarantee the best reach.",
    icon: "📱",
  },
  {
    question: "Do you offer support in English?",
    answer: "Of course! Our entire support team operates in English, available via email, live chat, and phone depending on your plan.",
    icon: "💬",
  },
];

export default function FAQ() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const { language } = useLanguage();

  const faqs = language === "es" ? faqsEs : faqsEn;

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
            {language === "es" ? "Preguntas Frecuentes" : "Frequently Asked Questions"}
          </h2>
          <p className="text-[var(--cyan)] text-lg">
            {language === "es" ? "Todo lo que necesitas saber sobre PropAI" : "Everything you need to know about PropAI"}
          </p>
        </div>

        {/* FAQ Accordion - Each answer expands below its question */}
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className={`faq-list-item rounded-xl overflow-hidden transition-all duration-300 ${
                activeIndex === index
                  ? "bg-[var(--bg-tertiary)] border border-[var(--cyan)]"
                  : "bg-[var(--bg-tertiary)] border border-[var(--accent-border)]"
              }`}
              initial={false}
              animate={{
                backgroundColor: activeIndex === index ? "rgba(30, 41, 59, 1)" : "rgba(30, 41, 59, 1)"
              }}
            >
              {/* Question - Clickable */}
              <motion.button
                onClick={() => setActiveIndex(activeIndex === index ? -1 : index)}
                className="w-full text-left p-5 flex items-center justify-between"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-2xl">{faq.icon}</span>
                  <span className={`font-semibold text-base ${
                    activeIndex === index ? "text-[var(--cyan)]" : "text-[var(--text-primary)]"
                  }`}>
                    {faq.question}
                  </span>
                </div>
                <motion.span
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`text-xl ${activeIndex === index ? "text-[var(--cyan)]" : "text-[var(--text-muted)]"}`}
                >
                  ▼
                </motion.span>
              </motion.button>

              {/* Answer - Expands below question */}
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pl-14">
                      <p className="text-[var(--text-secondary)] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
