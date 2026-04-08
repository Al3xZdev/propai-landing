"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".testimonial-title", {
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

    gsap.from(".testimonial-card", {
      scrollTrigger: {
        trigger: ".testimonial-main",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power3.out",
    });

    gsap.from(".testimonial-stat", {
      scrollTrigger: {
        trigger: ".testimonial-stats",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power3.out",
    });

    gsap.to(".testimonial-card", {
      scrollTrigger: {
        trigger: ".testimonial-main",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
      y: -20,
      ease: "none",
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-20 px-4 bg-[var(--bg-primary)]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="testimonial-title font-display text-[36px] md:text-[48px] font-bold text-[var(--text-primary)] mb-4">
            Lo que dicen nuestros clientes
          </h2>
        </div>

        {/* Main testimonial */}
        <div className="testimonial-main testimonial-card bg-[var(--bg-secondary)] rounded-[16px] p-8 border border-[var(--accent-border)] mb-8 hover:border-[var(--cyan)] hover:shadow-[0_0_40px_rgba(6,182,212,0.1)] transition-all duration-300">
          <p className="text-[16px] text-[var(--text-secondary)] italic mb-6">
            "Desde que usamos PropAI, nuestro tiempo en marketing se redujo en un 80% y los leads aumentado un 40%. Es increíble cómo la IA simplifica todo nuestro trabajo diario."
          </p>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-[var(--cyan)] to-blue-600 border border-[var(--accent-border)] rounded-full flex items-center justify-center text-[var(--bg-primary)] font-bold text-[20px]">
              MG
            </div>
            <div>
              <p className="text-[var(--text-primary)] font-bold">María González</p>
              <p className="text-[var(--text-secondary)] text-[14px]">Directora, Inmobiliaria Premium</p>
            </div>
            <div className="ml-auto text-yellow-400 text-[20px]">★★★★★</div>
          </div>
        </div>

        {/* Stats */}
        <div className="testimonial-stats grid grid-cols-3 gap-4 text-center">
          <div className="testimonial-stat bg-[var(--bg-secondary)]/50 rounded-[12px] p-4 border border-[var(--accent-border)] hover:bg-[var(--accent-subtle)] hover:border-[var(--cyan)] transition-all duration-300 cursor-default">
            <div className="text-[28px] font-bold text-[var(--cyan)]">80%</div>
            <div className="text-[12px] text-[var(--text-secondary)]">menos tiempo</div>
          </div>
          <div className="testimonial-stat bg-[var(--bg-secondary)]/50 rounded-[12px] p-4 border border-[var(--accent-border)] hover:bg-[var(--accent-subtle)] hover:border-[var(--cyan)] transition-all duration-300 cursor-default">
            <div className="text-[28px] font-bold text-[var(--cyan)]">40%</div>
            <div className="text-[12px] text-[var(--text-secondary)]">más leads</div>
          </div>
          <div className="testimonial-stat bg-[var(--bg-secondary)]/50 rounded-[12px] p-4 border border-[var(--accent-border)] hover:bg-[var(--accent-subtle)] hover:border-[var(--cyan)] transition-all duration-300 cursor-default">
            <div className="text-[28px] font-bold text-[var(--cyan)]">3x</div>
            <div className="text-[12px] text-[var(--text-secondary)]">ROI</div>
          </div>
        </div>
      </div>
    </section>
  );
}
