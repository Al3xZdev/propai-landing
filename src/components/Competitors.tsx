"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const competitors = [
  {
    feature: "IA para generar contenido",
    propAI: { value: true, highlight: true },
    buffer: { value: false },
    hootsuite: { value: false },
    agencia: { value: "Parcial" },
  },
  {
    feature: "Especializado en Real Estate",
    propAI: { value: true, highlight: true },
    buffer: { value: false },
    hootsuite: { value: false },
    agencia: { value: "Parcial" },
  },
  {
    feature: "Gestión de Leads integrada",
    propAI: { value: true, highlight: true },
    buffer: { value: false },
    hootsuite: { value: "Parcial" },
    agencia: { value: "+$" },
  },
  {
    feature: "Cronograma automático",
    propAI: { value: true, highlight: true },
    buffer: { value: "Básico" },
    hootsuite: { value: "Básico" },
    agencia: { value: false },
  },
  {
    feature: "En español",
    propAI: { value: true, highlight: true },
    buffer: { value: false },
    hootsuite: { value: false },
    agencia: { value: "Parcial" },
  },
];

export default function Competitors() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".comp-title", {
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

    gsap.from(".comp-table", {
      scrollTrigger: {
        trigger: ".comp-table",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    });

    gsap.from(".comp-footer", {
      scrollTrigger: {
        trigger: ".comp-footer",
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
    <section ref={containerRef} className="py-20 px-4 bg-[var(--bg-primary)]">
      <div className="max-w-6xl mx-auto">
        <div className="comp-title text-center mb-12">
          <h2 className="font-display text-[36px] md:text-[48px] font-bold text-[var(--text-primary)] mb-4">
            ¿Por qué PropAI?
          </h2>
          <p className="text-[18px] text-[var(--text-secondary)]">
            Comparación con otras soluciones del mercado
          </p>
        </div>

        <div className="comp-table overflow-x-auto">
          <table className="w-full text-center">
            <thead>
              <tr className="border-b border-[var(--accent-border)]">
                <th className="py-4 px-4 text-[var(--text-muted)] text-left text-[14px]">Feature</th>
                <th className="py-4 px-4 text-[var(--cyan)] font-bold text-[14px]">PropAI</th>
                <th className="py-4 px-4 text-[var(--text-muted)] text-[14px]">Buffer</th>
                <th className="py-4 px-4 text-[var(--text-muted)] text-[14px]">Hootsuite</th>
                <th className="py-4 px-4 text-[var(--text-muted)] text-[14px]">Agencia</th>
              </tr>
            </thead>
            <tbody className="text-[var(--text-primary)]">
              {competitors.map((row, index) => (
                <tr key={index} className="border-b border-[var(--accent-border)] hover:bg-[var(--accent-subtle)] transition-colors">
                  <td className="py-4 px-4 text-left text-[14px]">{row.feature}</td>
                  <td className="py-4 px-4">
                    {row.propAI.value === true ? (
                      <span className="text-[var(--cyan)] font-bold">✓</span>
                    ) : (
                      <span className="text-[var(--cyan)] font-bold">
                        {row.propAI.value}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-[var(--text-secondary)] text-[14px]">
                    {row.buffer.value === true ? (
                      <span className="text-red-400">✓</span>
                    ) : row.buffer.value === false ? (
                      <span className="text-red-400">✗</span>
                    ) : (
                      <span
                        className={
                          row.buffer.value === "Básico"
                            ? "text-yellow-400"
                            : ""
                        }
                      >
                        {row.buffer.value}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-[var(--text-secondary)] text-[14px]">
                    {row.hootsuite.value === true ? (
                      <span className="text-red-400">✓</span>
                    ) : row.hootsuite.value === false ? (
                      <span className="text-red-400">✗</span>
                    ) : (
                      <span
                        className={
                          row.hootsuite.value === "Básico"
                            ? "text-yellow-400"
                            : ""
                        }
                      >
                        {row.hootsuite.value}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-[var(--text-secondary)] text-[14px]">
                    {row.agencia.value === true ? (
                      <span className="text-red-400">✓</span>
                    ) : row.agencia.value === false ? (
                      <span className="text-red-400">✗</span>
                    ) : (
                      <span
                        className={
                          row.agencia.value === "Parcial"
                            ? "text-yellow-400"
                            : ""
                        }
                      >
                        {row.agencia.value}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="comp-footer mt-8 p-6 bg-[var(--bg-secondary)] border border-[var(--cyan)]/30 rounded-[12px] text-center hover:border-[var(--cyan)] hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] transition-all duration-300">
          <p className="text-[18px] text-[var(--text-primary)]">
            <span className="text-[var(--cyan)] font-bold">PropAI</span> es la única
            solución todo-en-uno especializada en el mercado inmobiliario
            hispanohablante.
          </p>
        </div>
      </div>
    </section>
  );
}
