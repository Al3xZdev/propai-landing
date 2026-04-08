"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis with optimized settings
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => {
        // More natural easing curve - starts slow, speeds up, slows at end
        return t < 0.5
          ? 4 * t * t * t
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
      },
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 2,
      lerp: 0.12,
    });

    // Sync with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Use GSAP ticker for smooth RAF
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Reduce lag and improve performance
    gsap.ticker.lagSmoothing(300);

    // Add inertia for a more premium feel
    lenis.on('scroll', (e) => {
      // Subtle momentum effect
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(() => {});
    };
  }, []);

  return <>{children}</>;
}
