"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { FornoShowcase } from "@/components/sections/FornoShowcase";
import { Diferenciais } from "@/components/sections/Diferenciais";
import { Categorias } from "@/components/sections/Categorias";
import { CardapioDestaques } from "@/components/sections/CardapioDestaques";
import { BannerPromo } from "@/components/sections/BannerPromo";
import { AvaliacoesGoogle } from "@/components/sections/AvaliacoesGoogle";
import { NossaHistoria } from "@/components/sections/NossaHistoria";
import { Footer } from "@/components/layout/Footer";
import { FloatingOrderBar } from "@/components/layout/FloatingOrderBar";
import { pizzaMenu } from "@/data/menuData";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>("todas");

  const filteredPizzas =
    activeCategory === "todas"
      ? pizzaMenu
      : pizzaMenu.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-[#0D0D12] text-white selection:bg-[#E63946] selection:text-white">
      {/* Sticky Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-grow">
        <Hero />
        <FornoShowcase />
        <Diferenciais />
        <Categorias
          activeCategory={activeCategory}
          onSelectCategory={(id) => setActiveCategory(id)}
        />
        <CardapioDestaques pizzas={filteredPizzas} />
        <BannerPromo />
        <AvaliacoesGoogle />
        <NossaHistoria />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Floating Action Bar */}
      <FloatingOrderBar />
    </div>
  );
}
