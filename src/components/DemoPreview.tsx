"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const platformTemplates = {
  instagram: [
    "¡Encontrá tu hogar perfecto! 🏠 Esta propiedad tiene todo lo que necesitás: ubicación privilegiada, espacios luminosos y el ambiente que tu familia merece. 💫\n\n📍 {address}\n💰 USD {price}\n\n📩 Escribinos para una visita virtual!\n.\n.\n#RealEstate #Propiedad #CasaNueva #SueñosCumplidos",
    "¿Buscás vivir cerca de todo? 👀 Esta propiedad es para vos!\n\n✨ Living amplio con vista al jardín\n✨ Cocina moderna completamente equipada\n✨ Dormitorio principal con vestidor\n✨ Patio con pileta para el verano\n\n📲 Contactanos AHORA y agendá tu visita!",
    "¡PRIMERA OPORTUNIDAD! 🌟 No te pierdas esta propiedad única\n\n📐 {area} m²\n🛏️ {bedrooms} habitaciones\n🚿 {bathrooms} baños\n\n⭐ Ideal para familia - escuelas y shops a minutos\n\n💬 Escribinos por MD o llamá ahora!"
  ],
  facebook: [
    "¡Buen día! 👋 Tenemos el placer de presentarles esta propiedad spectacular que acaba de salir al mercado.\n\nCaracterísticas:\n✅ Ubicación inmejorable\n✅ Ambios ambientes\n✅ Iluminación natural\n✅ Terminaciones de primera calidad\n\n¿Les interesa? Dejen un 💬 en los comentarios o escribannos por privado.",
    "¡ATENCIÓN COMPRADORES! 🚨 Esta propiedad no va a durar mucho en el mercado. Precios competitivos, financiación flexible y la mejor atención del mercado.\n\n📞 Llamanos hoy\n💬 O envíanos un mensaje privado\n🏠 Visitas disponibles desde esta semana"
  ],
  email: [
    { subject: "🏠 ¡Nueva propiedad que te puede interesar!", body: "¡Hola! Tenemos el agrado de presentarte esta oportunidad única.\n\n📍 {address}\n💰 USD {price}\n📐 {area} m²\n🛏️ {bedrooms} habitaciones | 🚿 {bathrooms} baños\n\n¿Te gustaría conocerla? Podemos coordinar una visita." },
    { subject: "💎 Oportunidad: Propiedad en excelente ubicación", body: "Te escribo porque acaba de salir al mercado una propiedad que matchea perfectamente con lo que buscás.\n\n✨ Ubicación estratégica - todo a minutos\n✨ Precio competitivo\n\n¡Espero tu respuesta!" }
  ]
};

export default function DemoPreview() {
  const containerRef = useRef<HTMLElement>(null);
  const [property, setProperty] = useState({
    address: '',
    price: '',
    area: '',
    bedrooms: '',
    bathrooms: ''
  });
  const [selectedPlatform, setSelectedPlatform] = useState('instagram');
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useGSAP(() => {
    gsap.from(".demo-title", {
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

    gsap.from(".demo-content", {
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

  const handleGenerate = () => {
    if (!property.address || !property.price) {
      alert("Por favor ingresa al menos la dirección y el precio");
      return;
    }

    setIsGenerating(true);
    setGeneratedContent(null);

    // Simulate AI generation delay
    setTimeout(() => {
      const templates = platformTemplates[selectedPlatform as keyof typeof platformTemplates];
      const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
      
      let content = '';
      if (typeof randomTemplate === 'string') {
        content = randomTemplate
          .replace('{address}', property.address)
          .replace('{price}', property.price)
          .replace('{area}', property.area || '120')
          .replace('{bedrooms}', property.bedrooms || '3')
          .replace('{bathrooms}', property.bathrooms || '2');
      } else {
        content = `${randomTemplate.subject}\n\n${randomTemplate.body
          .replace('{address}', property.address)
          .replace('{price}', property.price)
          .replace('{area}', property.area || '120')
          .replace('{bedrooms}', property.bedrooms || '3')
          .replace('{bathrooms}', property.bathrooms || '2')}`;
      }

      setGeneratedContent(content);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <section ref={containerRef} className="py-24 px-4 bg-[var(--bg-secondary)]" id="demo">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="demo-title text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
            Pruébalo gratis
          </h2>
          <p className="text-[var(--text-secondary)]">
            Genera contenido con IA en segundos
          </p>
        </div>

        <div className="demo-content grid md:grid-cols-2 gap-8">
          {/* LEFT - Input Form */}
          <div className="bg-[var(--bg-tertiary)] border border-[var(--accent-border)] rounded-2xl p-6">
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Datos de la propiedad</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[var(--text-secondary)] mb-1">Dirección *</label>
                <input
                  type="text"
                  value={property.address}
                  onChange={(e) => setProperty({...property, address: e.target.value})}
                  placeholder="Av. Principal 123, Buenos Aires"
                  className="w-full px-4 py-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--accent-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--cyan)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[var(--text-secondary)] mb-1">Precio (USD) *</label>
                  <input
                    type="text"
                    value={property.price}
                    onChange={(e) => setProperty({...property, price: e.target.value})}
                    placeholder="250,000"
                    className="w-full px-4 py-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--accent-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--cyan)]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[var(--text-secondary)] mb-1">Superficie (m²)</label>
                  <input
                    type="text"
                    value={property.area}
                    onChange={(e) => setProperty({...property, area: e.target.value})}
                    placeholder="120"
                    className="w-full px-4 py-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--accent-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--cyan)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[var(--text-secondary)] mb-1">Habitaciones</label>
                  <input
                    type="text"
                    value={property.bedrooms}
                    onChange={(e) => setProperty({...property, bedrooms: e.target.value})}
                    placeholder="3"
                    className="w-full px-4 py-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--accent-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--cyan)]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[var(--text-secondary)] mb-1">Baños</label>
                  <input
                    type="text"
                    value={property.bathrooms}
                    onChange={(e) => setProperty({...property, bathrooms: e.target.value})}
                    placeholder="2"
                    className="w-full px-4 py-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--accent-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--cyan)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-[var(--text-secondary)] mb-2">Plataforma</label>
                <div className="flex gap-2">
                  {['instagram', 'facebook', 'email'].map((platform) => (
                    <button
                      key={platform}
                      onClick={() => setSelectedPlatform(platform)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedPlatform === platform
                          ? 'bg-[var(--cyan)] text-[var(--bg-primary)]'
                          : 'bg-[var(--bg-primary)] border border-[var(--accent-border)] text-[var(--text-secondary)] hover:border-[var(--cyan)]'
                      }`}
                    >
                      {platform === 'instagram' ? '📸 Instagram' : platform === 'facebook' ? '📘 Facebook' : '📧 Email'}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-3 bg-[var(--accent)] text-[var(--bg-primary)] rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50"
              >
                {isGenerating ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span> Generando con IA...
                  </span>
                ) : (
                  "✨ Generar con IA"
                )}
              </button>

              <p className="text-xs text-[var(--text-muted)] text-center mt-3">
                Esta es una versión de prueba simplificada. 
                <br />
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-[var(--cyan)] underline hover:no-underline"
                >
                  Agendá una demo
                </button>{" "}
                para ver la versión completa con todas las funcionalidades.
              </p>
            </div>
          </div>

          {/* RIGHT - Generated Content */}
          <div className="bg-[var(--bg-tertiary)] border border-[var(--accent-border)] rounded-2xl p-6 flex flex-col">
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Contenido generado</h3>
            
            <div className="flex-1 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center"
                  >
                    <div className="text-4xl mb-4">🤖</div>
                    <p className="text-[var(--text-secondary)]">La IA está creando tu contenido...</p>
                  </motion.div>
                ) : generatedContent ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full"
                  >
                    <div className="bg-[var(--bg-primary)] border border-[var(--accent-border)] rounded-lg p-4 text-sm text-[var(--text-primary)] whitespace-pre-wrap leading-relaxed max-h-[300px] overflow-y-auto">
                      {generatedContent}
                    </div>
                    <button
                      onClick={() => navigator.clipboard.writeText(generatedContent)}
                      className="mt-4 w-full py-2 border border-[var(--accent-border)] text-[var(--text-secondary)] rounded-lg hover:border-[var(--cyan)] hover:text-[var(--cyan)] transition-all text-sm"
                    >
                      📋 Copiar contenido
                    </button>
                  </motion.div>
                ) : (
                  <div className="text-center text-[var(--text-muted)]">
                    <div className="text-4xl mb-4">💭</div>
                    <p>Ingresa los datos y genera contenido con IA</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
