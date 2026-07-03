"use client";

import { qualityPillars } from "@/data/menuData";
import { Reveal } from "@/components/ui/Reveal";
import { Clock, Leaf, Pizza, Flame } from "lucide-react";

export function Diferenciais() {
  const getIcon = (name: string) => {
    switch (name) {
      case "Delivery":
        return <Clock className="w-7 h-7 text-[#E63946]" />;
      case "Leaf":
        return <Leaf className="w-7 h-7 text-[#2A9D8F]" />;
      case "Pizza":
        return <Pizza className="w-7 h-7 text-[#F4A261]" />;
      case "Flame":
        return <Flame className="w-7 h-7 text-[#E63946]" />;
      default:
        return <Pizza className="w-7 h-7 text-[#F4A261]" />;
    }
  };

  return (
    <section id="diferenciais" className="py-16 sm:py-24 bg-[#FFF8F0] border-y border-[#F4A261]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2A9D8F] bg-[#2A9D8F]/10 px-4 py-1.5 rounded-full inline-block mb-3 border border-[#2A9D8F]/20">
              Nossa Qualidade
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1D3557]">
              Por Que Escolher a Pizzaria 3 Irmãos?
            </h2>
            <p className="mt-3 text-sm text-[#1D3557]/70">
              Quatro pilares fundamentais que garantem uma experiência inesquecível em cada pedido.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {qualityPillars.map((pillar, idx) => (
            <Reveal key={idx} delay={0.1 * idx}>
              <div className="bg-white rounded-3xl p-7 border border-[#F4A261]/25 shadow-xs hover:shadow-md hover:border-[#E63946]/40 transition-all duration-300 flex flex-col justify-between h-full group">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#FFF8F0] border border-[#F4A261]/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {getIcon(pillar.iconName)}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#1D3557] group-hover:text-[#E63946] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-[#1D3557]/70 font-normal leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#F4A261]/15">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#2A9D8F]">
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
