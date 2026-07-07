"use client";

import { qualityPillars } from "@/data/menuData";
import { Reveal } from "@/components/ui/Reveal";
import { Sparkles, UtensilsCrossed, Heart, Star } from "lucide-react";

export function Diferenciais() {
  const getIcon = (name: string) => {
    switch (name) {
      case "Flame":
        return <Sparkles className="w-6 h-6 text-[#C9A96E]" />;
      case "Pizza":
        return <UtensilsCrossed className="w-6 h-6 text-[#C9A96E]" />;
      case "Leaf":
        return <Heart className="w-6 h-6 text-[#C9A96E]" />;
      case "Delivery":
        return <Star className="w-6 h-6 text-[#C9A96E]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#C9A96E]" />;
    }
  };

  return (
    <section id="diferenciais" className="py-24 sm:py-32 bg-black relative overflow-hidden">

      {/* Subtle decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-16 bg-gradient-to-b from-[#C9A96E]/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.5em] text-[#C9A96E] font-medium block mb-4">
              A Experiência
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-wide mb-5">
              O Que Nos Torna Únicos
            </h2>
            <div className="mx-auto w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent mb-5" />
            <p className="text-sm sm:text-base text-white/40 font-light leading-relaxed">
              Cada detalhe foi pensado para proporcionar uma experiência que vai além do sabor.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {qualityPillars.map((pillar, idx) => (
            <Reveal key={idx} delay={0.1 * idx}>
              <div className="group bg-[#0A0A0A] border border-white/[0.06] p-7 sm:p-8 hover:border-[#C9A96E]/20 transition-all duration-500 flex flex-col justify-between h-full relative overflow-hidden">
                
                {/* Subtle hover glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#C9A96E]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 border border-[#C9A96E]/20 flex items-center justify-center mb-6 group-hover:border-[#C9A96E]/40 transition-colors duration-500">
                    {getIcon(pillar.iconName)}
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-white mb-3 tracking-wide group-hover:text-[#C9A96E] transition-colors duration-500">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/35 font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="relative z-10 mt-6 pt-4 border-t border-white/[0.06]">
                  <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#C9A96E]/60 group-hover:text-[#C9A96E] transition-colors duration-500">
                    {pillar.highlightText}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
