"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  angle: number;
  duration: number;
  delay: number;
}

export default function StarField() {
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    // Generate static stars
    const newStars: Star[] = [...Array(80)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5,
    }));
    setStars(newStars);

    // Generate shooting stars
    const newShootingStars: ShootingStar[] = [...Array(5)].map((_, i) => ({
      id: i,
      startX: Math.random() * 100,
      startY: Math.random() * 40,
      angle: Math.random() * 30 + 15, // 15-45 degrees
      duration: Math.random() * 1 + 0.8,
      delay: Math.random() * 8,
    }));
    setShootingStars(newShootingStars);
  }, []);

  if (!mounted) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* Static twinkling stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Shooting stars */}
      {shootingStars.map((star) => (
        <motion.div
          key={`shooting-${star.id}`}
          className="absolute bg-gradient-to-r from-white via-cyan-300 to-transparent rounded-full"
          style={{
            left: `${star.startX}%`,
            top: `${star.startY}%`,
            width: 80,
            height: 2,
            transform: `rotate(${star.angle}deg)`,
            transformOrigin: "left center",
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: [0, 300],
            y: [0, star.angle * 3],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Ambient glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cyan-500/5" />
    </div>
  );
}
