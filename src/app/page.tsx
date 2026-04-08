"use client";

import { useState, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import DemoPreview from "@/components/DemoPreview";
import LeadsAutomationPreview from "@/components/LeadsAutomationPreview";
import UnifiedInbox from "@/components/UnifiedInbox";
import Comparison from "@/components/Comparison";
import CaseStudy from "@/components/CaseStudy";
import Competitors from "@/components/Competitors";
import FAQ from "@/components/FAQ";
import Guarantee from "@/components/Guarantee";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import BackgroundParticles from "@/components/BackgroundParticles";
import StarField from "@/components/StarField";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isLocked, setIsLocked] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    
    if (section === 'features' && isLocked) {
      // Unlock and scroll to features
      setIsLocked(false);
      // Small delay to allow state update
      setTimeout(() => {
        const element = document.getElementById(section);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else if (section === 'contact' && isLocked) {
      // Also unlock if clicking contact while locked
      setIsLocked(false);
      setTimeout(() => {
        const element = document.getElementById(section);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else if (section === 'contact') {
      // Go to contact section
      const element = document.getElementById(section);
      element?.scrollIntoView({ behavior: "smooth" });
    } else if (section === 'hero') {
      // Go to hero - lock content
      setIsLocked(true);
      const element = document.getElementById(section);
      element?.scrollIntoView({ behavior: "smooth" });
    } else if (!isLocked) {
      // Only navigate if unlocked
      const element = document.getElementById(section);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "features", "problem", "solution", "demo", "leads", "inbox", "comparison", "casestudy", "competitors", "faq", "pricing", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }

      // Lock content when scrolling back to top (hero)
      if (window.scrollY < 100 && !isLocked) {
        // User is at top, check if they scrolled up from below
        const heroHeight = window.innerHeight * 0.8;
        if (scrollPosition < heroHeight) {
          // Keep unlocked while in hero area to allow re-reading
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLocked]);

  return (
    <main ref={mainRef} className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <StarField />
      <BackgroundParticles />
      <Navigation onNavigate={handleNavigate} />
      
      <section id="hero">
        <Hero onNavigate={handleNavigate} isLocked={isLocked} />
      </section>

      {/* Only show these sections when unlocked */}
      <div 
        className={`transition-opacity duration-700 ${isLocked ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        style={{ display: isLocked ? 'none' : 'block' }}
      >
        <section id="features">
          <Features />
        </section>

        <section id="problem">
          <Problem />
        </section>

        <section id="solution">
          <Solution />
        </section>

        <section id="demo">
          <DemoPreview />
        </section>

        <section id="leads">
          <LeadsAutomationPreview />
        </section>

        <section id="inbox">
          <UnifiedInbox />
        </section>

        <section id="comparison">
          <Comparison />
        </section>

        <section id="casestudy">
          <CaseStudy />
        </section>

        <section id="competitors">
          <Competitors />
        </section>

        <section id="faq">
          <FAQ />
        </section>

        <section id="guarantee">
          <Guarantee />
        </section>

        <section id="pricing">
          <Pricing />
        </section>

        <section id="contact">
          <CTA />
        </section>
      </div>

      <Footer />
    </main>
  );
}
