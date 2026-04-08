"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { 
  FaWhatsapp, 
  FaFacebookF, 
  FaInstagram,
  FaPaperclip,
  FaPaperPlane,
  FaImage,
  FaFilePdf,
  FaSearch,
  FaEllipsisV,
  FaPhone,
  FaVideo
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

interface Message {
  id: number;
  sender: "lead" | "agent";
  text: string;
  time: string;
  type?: "text" | "image" | "pdf";
  url?: string;
}

interface Lead {
  id: number;
  name: string;
  avatar: string;
  platform: "whatsapp" | "facebook" | "instagram";
  lastMessage: string;
  time: string;
  unread: number;
  status: "online" | "offline" | "typing";
  messages: Message[];
}

const mockLeadsEs: Lead[] = [
  {
    id: 1,
    name: "María González",
    avatar: "MG",
    platform: "whatsapp",
    lastMessage: "Me gustaría ver el departamento en Palermo",
    time: "10:32",
    unread: 2,
    status: "online",
    messages: [
      { id: 1, sender: "lead", text: "Hola! Vi la propiedad que publicaron", time: "10:28" },
      { id: 2, sender: "lead", text: "Me gustaría ver el departamento en Palermo", time: "10:32" },
    ]
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    avatar: "CR",
    platform: "instagram",
    lastMessage: "Gracias por la información",
    time: "09:15",
    unread: 0,
    status: "offline",
    messages: [
      { id: 1, sender: "agent", text: "Aquí tienes el PDF con los detalles de la propiedad", time: "09:10" },
      { id: 2, sender: "lead", text: "Gracias por la información", time: "09:15" },
    ]
  },
  {
    id: 3,
    name: "Ana Martínez",
    avatar: "AM",
    platform: "facebook",
    lastMessage: "¿Tienen fotos del jardín?",
    time: "Ayer",
    unread: 1,
    status: "online",
    messages: [
      { id: 1, sender: "lead", text: "Buenas tardes!", time: "Ayer" },
      { id: 2, sender: "lead", text: "¿Tienen fotos del jardín?", time: "Ayer" },
    ]
  },
];

const mockLeadsEn: Lead[] = [
  {
    id: 1,
    name: "María González",
    avatar: "MG",
    platform: "whatsapp",
    lastMessage: "I would like to see the apartment in Palermo",
    time: "10:32",
    unread: 2,
    status: "online",
    messages: [
      { id: 1, sender: "lead", text: "Hi! I saw the property you posted", time: "10:28" },
      { id: 2, sender: "lead", text: "I would like to see the apartment in Palermo", time: "10:32" },
    ]
  },
  {
    id: 2,
    name: "Carlos Rodriguez",
    avatar: "CR",
    platform: "instagram",
    lastMessage: "Thanks for the information",
    time: "09:15",
    unread: 0,
    status: "offline",
    messages: [
      { id: 1, sender: "agent", text: "Here is the PDF with the property details", time: "09:10" },
      { id: 2, sender: "lead", text: "Thanks for the information", time: "09:15" },
    ]
  },
  {
    id: 3,
    name: "Ana Martinez",
    avatar: "AM",
    platform: "facebook",
    lastMessage: "Do you have photos of the garden?",
    time: "Yesterday",
    unread: 1,
    status: "online",
    messages: [
      { id: 1, sender: "lead", text: "Good afternoon!", time: "Yesterday" },
      { id: 2, sender: "lead", text: "Do you have photos of the garden?", time: "Yesterday" },
    ]
  },
];

const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case "whatsapp": return <FaWhatsapp className="text-green-500" />;
    case "facebook": return <FaFacebookF className="text-blue-500" />;
    case "instagram": return <FaInstagram className="text-pink-500" />;
    default: return null;
  }
};

const getPlatformBg = (platform: string) => {
  switch (platform) {
    case "whatsapp": return "bg-green-500/20";
    case "facebook": return "bg-blue-500/20";
    case "instagram": return "bg-pink-500/20";
    default: return "bg-gray-500/20";
  }
};

export default function UnifiedInbox() {
  const containerRef = useRef<HTMLElement>(null);
  const { language } = useLanguage();
  const leads = language === "es" ? mockLeadsEs : mockLeadsEn;
  
  const [selectedLead, setSelectedLead] = useState<Lead>(leads[0]);
  const [newMessage, setNewMessage] = useState("");
  const [showAttachments, setShowAttachments] = useState(false);

  useGSAP(() => {
    gsap.from(".inbox-title", {
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

    gsap.from(".inbox-leads-list > *", {
      scrollTrigger: {
        trigger: ".inbox-leads-list",
        start: "top 75%",
      },
      x: -30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power3.out",
    });

    gsap.from(".inbox-chat-area", {
      scrollTrigger: {
        trigger: ".inbox-chat-area",
        start: "top 75%",
      },
      y: 20,
      opacity: 0,
      duration: 0.5,
      delay: 0.2,
      ease: "power3.out",
    });
  }, { scope: containerRef });

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    // In a real app, this would send the message
    setNewMessage("");
  };

  const isSpanish = language === "es";

  return (
    <section ref={containerRef} className="py-24 px-4 bg-[var(--bg-primary)]" id="inbox">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="inbox-title font-display text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            {isSpanish ? "Bandeja Unificada" : "Unified Inbox"}
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            {isSpanish 
              ? "Gestiona todas tus conversaciones de WhatsApp, Facebook e Instagram en un solo lugar. Comparte archivos, imágenes y PDFs sin cambiar de pestaña."
              : "Manage all your WhatsApp, Facebook, and Instagram conversations in one place. Share files, images, and PDFs without switching tabs."}
          </p>
        </div>

        {/* Inbox Demo */}
        <div className="inbox-container bg-[var(--bg-secondary)] border border-[var(--accent-border)] rounded-2xl overflow-hidden shadow-2xl">
          <div className="grid md:grid-cols-3 min-h-[500px]">
            {/* LEFT - Leads List */}
            <div className="inbox-leads-list md:col-span-1 border-r border-[var(--accent-border)]">
              {/* Search */}
              <div className="p-4 border-b border-[var(--accent-border)]">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input 
                    type="text"
                    placeholder={isSpanish ? "Buscar conversaciones..." : "Search conversations..."}
                    className="w-full pl-10 pr-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--accent-border)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--cyan)]"
                  />
                </div>
              </div>

              {/* Leads */}
              <div className="overflow-y-auto max-h-[400px]">
                {leads.map((lead) => (
                  <button
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className={`w-full p-4 flex items-start gap-3 hover:bg-[var(--accent-subtle)] transition-colors border-b border-[var(--accent-border)] ${
                      selectedLead.id === lead.id ? "bg-[var(--accent-subtle)]" : ""
                    }`}
                  >
                    <div className={`relative w-12 h-12 rounded-full ${getPlatformBg(lead.platform)} flex items-center justify-center`}>
                      <span className="text-lg font-bold text-[var(--text-primary)]">{lead.avatar}</span>
                      {lead.status === "online" && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[var(--bg-secondary)]" />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-[var(--text-primary)]">{lead.name}</span>
                        {getPlatformIcon(lead.platform)}
                      </div>
                      <p className="text-sm text-[var(--text-muted)] truncate">{lead.lastMessage}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-[var(--text-muted)]">{lead.time}</span>
                        {lead.unread > 0 && (
                          <span className="bg-[var(--cyan)] text-[var(--bg-primary)] text-xs font-bold px-2 py-0.5 rounded-full">
                            {lead.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT - Chat Area */}
            <div className="inbox-chat-area md:col-span-2 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-[var(--accent-border)] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`relative w-10 h-10 rounded-full ${getPlatformBg(selectedLead.platform)} flex items-center justify-center`}>
                    <span className="font-bold text-[var(--text-primary)]">{selectedLead.avatar}</span>
                    {selectedLead.status === "online" && (
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-[var(--bg-secondary)]" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--text-primary)]">{selectedLead.name}</h4>
                    <div className="flex items-center gap-2">
                      {getPlatformIcon(selectedLead.platform)}
                      <span className="text-xs text-[var(--text-muted)]">
                        {selectedLead.status === "online" 
                          ? (isSpanish ? "En línea" : "Online")
                          : (isSpanish ? "Desconectado" : "Offline")}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="p-2 rounded-full hover:bg-[var(--accent-subtle)] text-[var(--text-muted)] hover:text-[var(--cyan)] transition-colors">
                    <FaPhone />
                  </button>
                  <button className="p-2 rounded-full hover:bg-[var(--accent-subtle)] text-[var(--text-muted)] hover:text-[var(--cyan)] transition-colors">
                    <FaVideo />
                  </button>
                  <button className="p-2 rounded-full hover:bg-[var(--accent-subtle)] text-[var(--text-muted)] hover:text-[var(--cyan)] transition-colors">
                    <FaEllipsisV />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {selectedLead.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "agent" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[70%] p-3 rounded-2xl ${
                      msg.sender === "agent" 
                        ? "bg-[var(--cyan)] text-[var(--bg-primary)] rounded-br-md"
                        : "bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-bl-md"
                    }`}>
                      <p className="text-sm">{msg.text}</p>
                      <span className={`text-xs mt-1 block ${
                        msg.sender === "agent" ? "text-[var(--bg-primary)]/70" : "text-[var(--text-muted)]"
                      }`}>
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Attachments Preview */}
              <AnimatePresence>
                {showAttachments && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-4 pb-2 overflow-hidden"
                  >
                    <div className="flex gap-2 p-3 bg-[var(--bg-tertiary)] rounded-lg">
                      <button className="flex items-center gap-2 px-3 py-2 bg-[var(--accent-subtle)] rounded-lg text-sm text-[var(--text-secondary)] hover:text-[var(--cyan)] transition-colors">
                        <FaImage />
                        {isSpanish ? "Imagen" : "Image"}
                      </button>
                      <button className="flex items-center gap-2 px-3 py-2 bg-[var(--accent-subtle)] rounded-lg text-sm text-[var(--text-secondary)] hover:text-[var(--cyan)] transition-colors">
                        <FaFilePdf />
                        PDF
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Message Input */}
              <div className="p-4 border-t border-[var(--accent-border)]">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setShowAttachments(!showAttachments)}
                    className="p-2 rounded-full hover:bg-[var(--accent-subtle)] text-[var(--text-muted)] hover:text-[var(--cyan)] transition-colors"
                  >
                    <FaPaperclip />
                  </button>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder={isSpanish ? "Escribe un mensaje..." : "Type a message..."}
                    className="flex-1 px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--accent-border)] rounded-full text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--cyan)]"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="p-3 bg-[var(--cyan)] text-[var(--bg-primary)] rounded-full hover:scale-105 transition-transform"
                  >
                    <FaPaperPlane />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features List */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            {
              icon: "💬",
              title: isSpanish ? "Multi-plataforma" : "Multi-platform",
              desc: isSpanish 
                ? "WhatsApp, Facebook e Instagram en una sola interfaz"
                : "WhatsApp, Facebook, and Instagram in one interface",
            },
            {
              icon: "📎",
              title: isSpanish ? "Comparte archivos" : "Share files",
              desc: isSpanish 
                ? "Imágenes, PDFs y documentos instantáneamente"
                : "Images, PDFs, and documents instantly",
            },
            {
              icon: "⚡",
              title: isSpanish ? "Respuestas rápidas" : "Quick replies",
              desc: isSpanish 
                ? "Plantillas para responder más rápido"
                : "Templates to respond faster",
            },
          ].map((feature, index) => (
            <div 
              key={index}
              className="text-center p-6 bg-[var(--bg-secondary)] border border-[var(--accent-border)] rounded-xl hover:border-[var(--cyan)] hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] transition-all duration-300"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{feature.title}</h3>
              <p className="text-sm text-[var(--text-secondary)]">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}