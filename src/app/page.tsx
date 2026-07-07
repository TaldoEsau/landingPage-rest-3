"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { FornoShowcase } from "@/components/sections/FornoShowcase";
import { Diferenciais } from "@/components/sections/Diferenciais";
import { GaleriaAmbiente } from "@/components/sections/GaleriaAmbiente";
import { NossaHistoria } from "@/components/sections/NossaHistoria";
import { AvaliacoesGoogle } from "@/components/sections/AvaliacoesGoogle";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        <Hero />
        <FornoShowcase />
        <Diferenciais />
        <GaleriaAmbiente />
        <NossaHistoria />
        <AvaliacoesGoogle />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
