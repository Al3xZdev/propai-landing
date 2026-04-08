"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  left: string;
  top: string;
  delay: string;
  duration: string;
  size: string;
}

export default function BackgroundParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Generate 30 particles for the background
    const newParticles = [...Array(30)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${8 + Math.random() * 8}s`,
      size: `${1 + Math.random() * 2}px`,
    }));
    setParticles(newParticles);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute bg-white/10 rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
      <style>{`
        .fixed.inset-0.pointer-events-none.overflow-hidden > div {
          animation: float-bg 15s ease-in-out infinite;
        }
        @keyframes float-bg {
          0%, 100% { 
            transform: translateY(0) translateX(0); 
          }
          25% { 
            transform: translateY(-30px) translateX(15px); 
          }
          50% { 
            transform: translateY(-15px) translateX(-15px); 
          }
          75% { 
            transform: translateY(-40px) translateX(10px); 
          }
        }
        .fixed.inset-0.pointer-events-none.overflow-hidden > div:nth-child(odd) {
          animation-duration: 12s;
        }
        .fixed.inset-0.pointer-events-none.overflow-hidden > div:nth-child(even) {
          animation-duration: 18s;
        }
        .fixed.inset-0.pointer-events-none.overflow-hidden > div:nth-child(3n) {
          animation-duration: 20s;
        }
      `}</style>
    </div>
  );
}
