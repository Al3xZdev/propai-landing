import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./SmoothScroll";
import { LanguageProvider } from "@/context/LanguageContext";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne",
});

export const metadata: Metadata = {
  title: "PropAI - Marketing Inteligente para Inmobiliarias",
  description: "La única plataforma que genera contenido con IA, programa publicaciones automáticamente y gestiona tus leads en un solo lugar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${dmSans.variable} ${syne.variable} scroll-smooth`}>
      <body className="antialiased">
        <SmoothScroll>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}