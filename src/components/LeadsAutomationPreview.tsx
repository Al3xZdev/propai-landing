"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted';
  stage: string;
}

const sampleLeadsEs: Lead[] = [
  { id: 1, name: "Juan Pérez", email: "juan@email.com", phone: "+54 9 11 1234 5678", status: 'new', stage: 'sin contactar' },
  { id: 2, name: "María García", email: "maria@email.com", phone: "+54 9 11 2345 6789", status: 'contacted', stage: 'primer contacto' },
  { id: 3, name: "Carlos López", email: "carlos@email.com", phone: "+54 9 11 3456 7890", status: 'qualified', stage: 'interesado' },
  { id: 4, name: "Ana Martínez", email: "ana@email.com", phone: "+54 9 11 4567 8901", status: 'new', stage: 'sin contactar' },
  { id: 5, name: "Pedro Rodríguez", email: "pedro@email.com", phone: "+54 9 11 5678 9012", status: 'converted', stage: 'cerrado' },
];

const sampleLeadsEn: Lead[] = [
  { id: 1, name: "John Smith", email: "john@email.com", phone: "+1 234 567 8901", status: 'new', stage: 'not contacted' },
  { id: 2, name: "Mary Johnson", email: "mary@email.com", phone: "+1 234 567 8902", status: 'contacted', stage: 'first contact' },
  { id: 3, name: "Carlos Lopez", email: "carlos@email.com", phone: "+1 234 567 8903", status: 'qualified', stage: 'interested' },
  { id: 4, name: "Anna Davis", email: "anna@email.com", phone: "+1 234 567 8904", status: 'new', stage: 'not contacted' },
  { id: 5, name: "Peter Brown", email: "peter@email.com", phone: "+1 234 567 8905", status: 'converted', stage: 'closed' },
];

const sequencesEs = [
  { id: 1, name: "Bienvenida", steps: 3, leads: 12, active: true },
  { id: 2, name: "Seguimiento", steps: 5, leads: 8, active: true },
  { id: 3, name: "Clausura", steps: 4, leads: 3, active: false },
];

const sequencesEn = [
  { id: 1, name: "Welcome", steps: 3, leads: 12, active: true },
  { id: 2, name: "Follow-up", steps: 5, leads: 8, active: true },
  { id: 3, name: "Close", steps: 4, leads: 3, active: false },
];

export default function LeadsAutomationPreview() {
  const containerRef = useRef<HTMLElement>(null);
  const { language } = useLanguage();
  const [leads, setLeads] = useState<Lead[]>(language === "es" ? sampleLeadsEs : sampleLeadsEn);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [selectedSequence, setSelectedSequence] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const sequences = language === "es" ? sequencesEs : sequencesEn;
  const [currentStep, setCurrentStep] = useState(0);

  useGSAP(() => {
    gsap.from(".leads-title", {
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

    gsap.from(".leads-content", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      delay: 0.2,
      ease: "power3.out",
    });
  }, { scope: containerRef });

  const runAutomation = () => {
    if (!selectedLead || !selectedSequence) {
      alert("Seleccioná un lead y una secuencia primero");
      return;
    }

    setShowAnimation(true);
    setCurrentStep(0);
    setIsRunning(true);

    // Simulate sequence execution
    const steps = [' 📧 Email de bienvenida enviado', ' 💬 WhatsApp de seguimiento', ' 📞 Llamada programada', ' ✅ Secuencia completada'];
    
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setCurrentStep(step);
      if (step >= steps.length) {
        clearInterval(interval);
        setTimeout(() => {
          setShowAnimation(false);
          setIsRunning(false);
          // Update lead status
          setLeads(prev => prev.map(l => 
            l.id === selectedLead.id 
              ? { ...l, status: 'contacted', stage: 'en secuencia' }
              : l
          ));
          setSelectedLead(null);
          setSelectedSequence(null);
        }, 1500);
      }
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'contacted': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'qualified': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'converted': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <section ref={containerRef} className="py-24 px-4 bg-[var(--bg-primary)]" id="leads">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="leads-title text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
            {language === "es" ? "Gestión de Leads con Secuencias Automatizadas" : "Lead Management with Automated Sequences"}
          </h2>
          <p className="text-[var(--text-secondary)]">
            {language === "es" 
              ? "No pierdas más clientes por falta de seguimiento. Automatiza tu embudo de ventas."
              : "Don't lose more customers due to lack of follow-up. Automate your sales funnel."}
          </p>
        </div>

        <div className="leads-content grid lg:grid-cols-3 gap-6">
          {/* LEFT - Leads List */}
          <div className="lg:col-span-1 bg-[var(--bg-tertiary)] border border-[var(--accent-border)] rounded-2xl p-4">
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">
              {language === "es" ? "📋 Lista de Leads" : "📋 Lead List"}
            </h3>
            <div className="space-y-2 max-h-[350px] overflow-y-auto">
              {leads.map((lead) => (
                <button
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    selectedLead?.id === lead.id
                      ? 'border-[var(--cyan)] bg-[var(--cyan)]/10'
                      : 'border-[var(--accent-border)] hover:border-[var(--cyan)]/50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-[var(--text-primary)]">{lead.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </div>
                  <div className="text-xs text-[var(--text-muted)]">{lead.stage}</div>
                </button>
              ))}
            </div>
          </div>

          {/* CENTER - Sequences */}
          <div className="lg:col-span-1 bg-[var(--bg-tertiary)] border border-[var(--accent-border)] rounded-2xl p-4">
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">⚡ Secuencias Activas</h3>
            <div className="space-y-2">
              {sequences.map((seq) => (
                <button
                  key={seq.id}
                  onClick={() => setSelectedSequence(seq.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    selectedSequence === seq.id
                      ? 'border-[var(--cyan)] bg-[var(--cyan)]/10'
                      : 'border-[var(--accent-border)] hover:border-[var(--cyan)]/50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-[var(--text-primary)]">{seq.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${seq.active ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'}`}>
                      {seq.active ? 'Activa' : 'Pausada'}
                    </span>
                  </div>
                  <div className="flex gap-4 text-xs text-[var(--text-muted)] mt-1">
                    <span>📝 {seq.steps} pasos</span>
                    <span>👥 {seq.leads} leads</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Action Button */}
            <button
              onClick={runAutomation}
              disabled={!selectedLead || !selectedSequence || isRunning}
              className="w-full mt-4 py-3 bg-[var(--accent)] text-[var(--bg-primary)] rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isRunning ? (
                <>⏳ Ejecutando...</>
              ) : (
                <>▶️ Ejecutar Secuencia</>
              )}
            </button>
          </div>

          {/* RIGHT - Activity Log */}
          <div className="lg:col-span-1 bg-[var(--bg-tertiary)] border border-[var(--accent-border)] rounded-2xl p-4">
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">📊 Actividad en Tiempo Real</h3>
            
            <AnimatePresence mode="wait">
              {showAnimation ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  {selectedLead && (
                    <>
                      <div className="text-sm text-[var(--text-secondary)]">
                        Ejecutando para: <span className="font-bold text-[var(--cyan)]">{selectedLead.name}</span>
                      </div>
                      <div className="text-xs text-[var(--text-muted)]">
                        Secuencia: <span className="text-[var(--text-primary)]">
                          {sequences.find(s => s.id === selectedSequence)?.name}
                        </span>
                      </div>
                    </>
                  )}
                  
                  <div className="mt-4 space-y-2">
                    {['📧 Enviando email de bienvenida...', '💬 Programando WhatsApp...', '📞 Agendando llamada...', '✅ Completado'].map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ 
                          opacity: i <= currentStep ? 1 : 0.3,
                          x: i <= currentStep ? 0 : -20,
                          color: i <= currentStep ? 'var(--cyan)' : 'var(--text-muted)'
                        }}
                        transition={{ duration: 0.3 }}
                        className="text-sm"
                      >
                        {i <= currentStep ? '✓' : '○'} {step}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-3"
                >
                  <div className="text-sm text-[var(--text-secondary)] mb-4">
                    Seleccioná un lead y una secuencia para ver la automatización en acción.
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[var(--bg-primary)] border border-[var(--accent-border)] rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-[var(--cyan)]">{leads.length}</div>
                      <div className="text-xs text-[var(--text-muted)]">Total Leads</div>
                    </div>
                    <div className="bg-[var(--bg-primary)] border border-[var(--accent-border)] rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-[var(--cyan)]">{leads.filter(l => l.status === 'converted').length}</div>
                      <div className="text-xs text-[var(--text-muted)]">Convertidos</div>
                    </div>
                    <div className="bg-[var(--bg-primary)] border border-[var(--accent-border)] rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-[var(--cyan)]">{sequences.filter(s => s.active).length}</div>
                      <div className="text-xs text-[var(--text-muted)]">Secuencias Activas</div>
                    </div>
                    <div className="bg-[var(--bg-primary)] border border-[var(--accent-border)] rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-[var(--cyan)]">23</div>
                      <div className="text-xs text-[var(--text-muted)]">Msgs Hoy</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <p className="text-xs text-[var(--text-muted)] text-center mt-6">
          Esta es una versión de prueba simplificada. 
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-[var(--cyan)] underline hover:no-underline"
          >
            Agendá una demo
          </button>{" "}
          para ver la versión completa con todas las funcionalidades.
        </p>
      </div>
    </section>
  );
}
