"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from("footer", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  }, { scope: containerRef });

  return (
    <footer ref={containerRef} className="py-12 px-4 bg-[var(--bg-secondary)] border-t border-[var(--accent-border)]">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-10 h-10 bg-[var(--accent-subtle)] border border-[var(--accent-border)] rounded-[10px] flex items-center justify-center">
            <span className="text-[var(--text-primary)] font-bold text-[20px]">P</span>
          </div>
          <span className="text-[24px] font-bold text-[var(--text-primary)]">PropAI</span>
        </div>
        <p className="text-[14px] text-[var(--text-secondary)] mb-2">Marketing Inteligente para Inmobiliarias</p>
        <p className="text-[12px] text-[var(--text-muted)]">
          © 2025 PropAI. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}