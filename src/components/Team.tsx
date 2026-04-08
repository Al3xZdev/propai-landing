"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    initial: "A",
    gradient: "from-blue-500 to-cyan-500",
    name: "Alejandro",
    role: "CEO & Fundador",
    description:
      "10+ años en PropTech. Ex-Director de marketing en 2 inmobiliarias grandes.",
  },
  {
    initial: "S",
    gradient: "from-violet-500 to-purple-500",
    name: "Sofía",
    role: "CTO",
    description:
      "Ingeniera de software con experiencia en IA y APIs de redes sociales.",
  },
  {
    initial: "M",
    gradient: "from-orange-500 to-amber-500",
    name: "Matías",
    role: "Head of Product",
    description:
      "Especialista en UX/UI con conocimiento profundo del mercado inmobiliario.",
  },
];

export default function Team() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".team-title", {
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

    gsap.from(".team-card", {
      scrollTrigger: {
        trigger: ".team-grid",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.2,
      ease: "power3.out",
    });

    gsap.from(".team-footer", {
      scrollTrigger: {
        trigger: ".team-footer",
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
        <div className="text-center mb-12">
          <h2 className="team-title font-display text-[36px] md:text-[48px] font-bold text-[var(--text-primary)] mb-4">
            Nuestro Equipo
          </h2>
          <p className="text-[18px] text-[var(--text-secondary)]">
            Expertos en tecnología y marketing inmobiliario
          </p>
        </div>

        <div className="team-grid grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="team-card bg-[var(--bg-tertiary)] rounded-[16px] p-8 border border-[var(--accent-border)] text-center hover:border-[var(--cyan)] hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] transition-all duration-300"
            >
              <div
                className={`w-24 h-24 bg-gradient-to-br ${member.gradient} rounded-full flex items-center justify-center text-white font-bold text-[28px] mx-auto mb-4`}
              >
                {member.initial}
              </div>
              <h3 className="text-[22px] font-bold text-[var(--text-primary)]">{member.name}</h3>
              <p className="text-[var(--cyan)] mb-3 text-[16px] font-medium">{member.role}</p>
              <p className="text-[var(--text-secondary)] text-[14px]">{member.description}</p>
            </div>
          ))}
        </div>

        <div className="team-footer mt-12 text-center">
          <p className="text-[var(--text-secondary)]">
            + Equipo de desarrollo, soporte y atención al cliente
          </p>
        </div>
      </div>
    </section>
  );
}
