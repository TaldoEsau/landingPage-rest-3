"use client";

import { useState } from "react";
import Image from "next/image";
import { restaurantInfo } from "@/data/restaurantInfo";
import { Reveal } from "@/components/ui/Reveal";
import {
  ArrowUpRight,
  Clock,
  Star,
  ShoppingBag,
  Leaf,
  ChevronLeft,
  ChevronRight,
  Flame,
} from "lucide-react";

const heroPreviewItems = [
  {
    id: "item-1",
    title: "Especial 3 Irmãos",
    description: "Peperoni artesanal, gorgonzola cremoso & manjericão fresco",
    price: "R$ 69,90",
    image: "/images/transparent/pizza-especial.png",
    active: true,
  },
  {
    id: "item-2",
    title: "Margherita Gourmet",
    description: "Muçarela de búfala, tomates pelati e azeite extravirgem",
    price: "R$ 59,90",
    image: "/images/transparent/pizza-margherita.png",
    active: false,
  },
  {
    id: "item-3",
    title: "Calabresa Defumada",
    description: "Calabresa artesanal, cebola roxa e catupiry original",
    price: "R$ 54,90",
    image: "/images/transparent/pizza-calabresa.png",
    active: false,
  },
];

export function Hero() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const nextCard = () => {
    setActiveCardIndex((prev) => (prev + 1) % heroPreviewItems.length);
  };

  const prevCard = () => {
    setActiveCardIndex(
      (prev) => (prev - 1 + heroPreviewItems.length) % heroPreviewItems.length
    );
  };

  const currentItem = heroPreviewItems[activeCardIndex];

  return (
    <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-32 bg-[#0D0D12] text-white overflow-hidden selection:bg-[#E63946] selection:text-white">
      
      {/* Fiery & Warm Ambient Background Glows */}
      <div className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-[#E63946]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#F4A261]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 left-1/3 w-[300px] h-[300px] bg-[#2A9D8F]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid Pattern Texture Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLUMN: Bold Typography & Action Controls */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Green Organic Badge (Matching Reference) */}
            <Reveal delay={0.1}>
              <div className="inline-flex items-center gap-2 bg-[#2A9D8F]/20 border border-[#2A9D8F]/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#2A9D8F]">
                <div className="w-5 h-5 rounded-full bg-[#2A9D8F] flex items-center justify-center text-[#0D0D12]">
                  <Leaf className="w-3 h-3 fill-current" />
                </div>
                <span>100% Fermentação Natural & Ingredientes Frescos</span>
              </div>
            </Reveal>

            {/* Massive Bold Headline (Reference UberEats Typography Style) */}
            <Reveal delay={0.2}>
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.98] text-white">
                O SABOR DA <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E63946] via-[#F4A261] to-[#FFFDF9]">
                  VERDADEIRA PIZZA
                </span> <br />
                ARTESANAL.
              </h1>
            </Reveal>

            {/* Subheadline */}
            <Reveal delay={0.3}>
              <p className="text-base sm:text-lg text-gray-300 max-w-xl font-normal leading-relaxed">
                Massa maturada a frio por 48 horas, molho pelati italiano e o verdadeiro toque defumado do forno a lenha. Feita pelos <strong className="text-white">3 Irmãos</strong> para quem não aceita menos do que a perfeição.
              </p>
            </Reveal>

            {/* Pill Action Buttons (Matching Reference Design) */}
            <Reveal delay={0.4}>
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <a
                  href={restaurantInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white text-[#0D0D12] hover:bg-[#F4A261] px-8 py-4 rounded-full text-sm font-extrabold uppercase tracking-wider shadow-xl transition-all duration-300 hover:scale-105 group"
                >
                  <span>Pedir Agora</span>
                  <div className="w-7 h-7 rounded-full bg-[#0D0D12] text-white flex items-center justify-center group-hover:bg-white group-hover:text-[#0D0D12] transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </a>

                <a
                  href="#cardapio"
                  className="inline-flex items-center gap-3 bg-transparent border-2 border-white/20 hover:border-white text-white px-7 py-4 rounded-full text-sm font-bold tracking-wider hover:bg-white/10 transition-all duration-300 group"
                >
                  <span>Explorar Cardápio</span>
                  <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              </div>
            </Reveal>

            {/* Social Proof & Google Ratings Row (Bottom Left - Reference Style) */}
            <Reveal delay={0.5}>
              <div className="pt-6 border-t border-white/10 flex items-center gap-5">
                {/* Avatar Stack */}
                <div className="flex -space-x-3 overflow-hidden">
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-[#0D0D12] object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="Cliente Pizzaria 3 Irmãos"
                  />
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-[#0D0D12] object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                    alt="Cliente Pizzaria 3 Irmãos"
                  />
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-[#0D0D12] object-cover"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                    alt="Cliente Pizzaria 3 Irmãos"
                  />
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E63946] ring-2 ring-[#0D0D12] text-[11px] font-bold text-white">
                    +50k
                  </div>
                </div>

                {/* Rating Stars & Count */}
                <div>
                  <div className="flex items-center gap-1 text-[#F4A261] text-xs font-bold">
                    <Star className="w-4 h-4 fill-[#F4A261]" />
                    <Star className="w-4 h-4 fill-[#F4A261]" />
                    <Star className="w-4 h-4 fill-[#F4A261]" />
                    <Star className="w-4 h-4 fill-[#F4A261]" />
                    <Star className="w-4 h-4 fill-[#F4A261]" />
                  </div>
                  <p className="text-xs text-gray-300 font-medium mt-0.5">
                    <span className="font-bold text-white">4.9</span> (740+ avaliações no Google)
                  </p>
                </div>
              </div>
            </Reveal>

          </div>

          {/* RIGHT COLUMN: Giant Transparent Pizza & Floating Preview Cards */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center pt-6 lg:pt-0">
            
            {/* Delivery Time Floating Glass Badge (Top Right - Reference Style) */}
            <div className="absolute top-0 right-4 z-20 bg-[#1A1A24]/90 backdrop-blur-xl p-4 rounded-2xl border border-white/15 shadow-2xl flex items-center gap-3.5 animate-bounce duration-1000">
              <div className="w-10 h-10 rounded-xl bg-[#E63946]/20 flex items-center justify-center text-[#E63946] shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[11px] font-medium text-gray-400">Entrega Rápida</span>
                <span className="text-sm font-extrabold text-white">Em até 30 Min</span>
              </div>
            </div>

            {/* Main Transparent Floating Pizza Image */}
            <div className="relative w-80 h-80 sm:w-[420px] sm:h-[420px] lg:w-[480px] lg:h-[480px] my-4 group">
              {/* Backlight Glow Circle */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#E63946]/30 to-[#F4A261]/20 blur-2xl animate-pulse" />
              
              <Image
                src={currentItem.image}
                alt="Pizza Artesanal Transparent 3 Irmãos"
                fill
                className="object-contain drop-shadow-[0_20px_40px_rgba(230,57,70,0.4)] group-hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />

              {/* Flame Badge */}
              <div className="absolute bottom-6 left-4 bg-[#E63946] text-white px-3.5 py-1.5 rounded-full text-xs font-extrabold shadow-lg flex items-center gap-1.5">
                <Flame className="w-4 h-4 fill-white" />
                <span>Forno a Lenha</span>
              </div>
            </div>

            {/* Bottom Floating Food Preview Cards Carousel (Matching Reference Screenshot Cards) */}
            <div className="w-full max-w-lg mt-2 relative z-20">
              
              <div className="flex items-center justify-between gap-3 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                  Destaques da Cozinha
                </span>
                
                {/* Carousel Controls */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={prevCard}
                    className="w-8 h-8 rounded-full bg-[#1A1A24] border border-white/10 hover:border-white/40 text-white flex items-center justify-center transition-all active:scale-95"
                    aria-label="Anterior"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextCard}
                    className="w-8 h-8 rounded-full bg-[#E63946] text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-md"
                    aria-label="Próximo"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {heroPreviewItems.map((item, idx) => {
                  const isSelected = idx === activeCardIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setActiveCardIndex(idx)}
                      className={`cursor-pointer rounded-2xl p-3.5 transition-all duration-300 flex flex-col justify-between ${
                        isSelected
                          ? "bg-gradient-to-br from-[#E63946] to-[#d62839] text-white shadow-xl scale-105 border border-[#F4A261]/50"
                          : "bg-[#1A1A24]/90 text-gray-300 hover:bg-[#222230] border border-white/10"
                      }`}
                    >
                      <div>
                        <div className="relative w-14 h-14 mx-auto mb-2">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <h4 className="font-serif text-xs font-bold line-clamp-1 text-center">
                          {item.title}
                        </h4>
                        <p className={`text-[10px] line-clamp-2 mt-1 text-center ${isSelected ? "text-gray-100" : "text-gray-400"}`}>
                          {item.description}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-white/15 flex items-center justify-between">
                        <span className="font-bold text-xs">{item.price}</span>
                        <a
                          href={restaurantInfo.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                            isSelected
                              ? "bg-white text-[#E63946]"
                              : "bg-white/10 text-white hover:bg-[#E63946]"
                          }`}
                        >
                          <ShoppingBag className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
