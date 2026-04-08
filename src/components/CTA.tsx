"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const containerRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    properties: "",
  });

  useGSAP(() => {
    gsap.from(".cta-title", {
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

    gsap.from(".cta-form", {
      scrollTrigger: {
        trigger: ".cta-form",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      delay: 0.2,
      ease: "power3.out",
    });

    gsap.from(".cta-contact", {
      scrollTrigger: {
        trigger: ".cta-contact",
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
      y: 20,
      opacity: 0,
      duration: 0.5,
      delay: 0.4,
      ease: "power3.out",
    });
  }, { scope: containerRef });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("¡Gracias! Nos pondremos en contacto contigo en las próximas 24h.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section ref={containerRef} className="py-20 px-4 bg-[var(--bg-primary)]" id="contacto">
      <div className="max-w-3xl mx-auto">
        <div className="cta-title text-center mb-8">
          <h2 className="font-display text-[36px] md:text-[48px] font-bold text-[var(--text-primary)] mb-4">
            ¿Listo para transformar tu marketing?
          </h2>
          <p className="text-[16px] text-[var(--text-secondary)]">
            Agenda una demo personalizada sin compromiso
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="cta-form glass p-8 rounded-[16px] border border-[var(--accent-border)] hover:border-[var(--cyan)] hover:shadow-[0_0_50px_rgba(6,182,212,0.15)] transition-all duration-300"
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-[var(--text-primary)] mb-2 font-medium text-[14px]">
                Nombre completo *
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Tu nombre"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-[10px] bg-[var(--accent-subtle)] border border-[var(--accent-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--cyan)] focus:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-[var(--text-primary)] mb-2 font-medium text-[14px]">
                Nombre de tu inmobiliaria *
              </label>
              <input
                type="text"
                name="company"
                required
                placeholder="Tu empresa"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-[10px] bg-[var(--accent-subtle)] border border-[var(--accent-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--cyan)] focus:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-300"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-[var(--text-primary)] mb-2 font-medium text-[14px]">
                Email profesional *
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-[10px] bg-[var(--accent-subtle)] border border-[var(--accent-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--cyan)] focus:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-[var(--text-primary)] mb-2 font-medium text-[14px]">
                Teléfono (WhatsApp)
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="+1 234 567 890"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-[10px] bg-[var(--accent-subtle)] border border-[var(--accent-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--cyan)] focus:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-300"
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-[var(--text-primary)] mb-2 font-medium text-[14px]">
              ¿Cuántas propiedades manejan al mes?
            </label>
            <select
              name="properties"
              value={formData.properties}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-[10px] bg-[var(--accent-subtle)] border border-[var(--accent-border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--cyan)] focus:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-300"
            >
              <option value="" className="text-[var(--bg-primary)]">Selecciona...</option>
              <option value="1-5" className="text-[var(--bg-primary)]">1-5 propiedades</option>
              <option value="6-20" className="text-[var(--bg-primary)]">6-20 propiedades</option>
              <option value="21-50" className="text-[var(--bg-primary)]">21-50 propiedades</option>
              <option value="50+" className="text-[var(--bg-primary)]">50+ propiedades</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-[var(--accent)] text-[var(--bg-primary)] rounded-[10px] font-semibold text-[16px] hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300"
          >
            Agendar Demo Personalizada
          </button>
          <p className="text-center text-[var(--text-secondary)] text-[12px] mt-4">
            * Nos pondremos en contacto contigo en las próximas 24h
          </p>
        </form>

        <div className="cta-contact mt-12 text-center">
          <p className="text-[var(--text-secondary)]">O escríbenos directamente:</p>
          <p className="text-[var(--cyan)] text-[18px] hover:underline cursor-pointer">hola@propai.com</p>
        </div>
      </div>
    </section>
  );
}
