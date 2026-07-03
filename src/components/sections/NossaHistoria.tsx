"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Users, Heart, Flame } from "lucide-react";

export function NossaHistoria() {
  return (
    <section id="historia" className="py-20 sm:py-28 bg-[#FFFDF9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Image Column */}
          <div className="lg:col-span-5 relative flex justify-center">
            <Reveal>
              <div className="relative w-full max-w-md h-[360px] sm:h-[420px] rounded-3xl overflow-hidden border-4 border-white shadow-xl group">
                <Image
                  src="/images/pizza2.png"
                  alt="Massa Artesanal Pizzaria 3 Irmãos"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1D3557]/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#F4A261]">Desde 2009</span>
                  <h3 className="font-serif text-xl font-bold mt-1">Paixão Compartilhada em Família</h3>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Story Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <Reveal>
              <span className="text-xs font-bold uppercase tracking-widest text-[#E63946] bg-[#E63946]/10 px-4 py-1.5 rounded-full border border-[#E63946]/20">
                Nossa História & Tradição
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1D3557] mt-3">
                De uma Cozinha de Família Para a Sua Mesa
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-sm sm:text-base text-[#1D3557]/80 font-normal leading-relaxed">
                A <strong>Pizzaria 3 Irmãos</strong> nasceu do sonho compartilhado por três irmãos apaixonados pela verdadeira gastronomia artesanal. Crescidos entre o aroma de molhos borbulhantes e o calor dos fornos a lenha, decidimos transformar essa tradição em um refúgio para quem aprecia pizza de verdade.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="text-sm sm:text-base text-[#1D3557]/80 font-normal leading-relaxed">
                Nossa receita de massa passa por um cuidadoso processo de fermentação de 48 horas, o que garante leveza incomparável, bordas aeradas e sabor inesquecível. Cada pizza é aberta à mão e assada no ponto exato para encantar você e quem você ama.
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#F4A261]/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E63946]/10 flex items-center justify-center text-[#E63946] shrink-0">
                    <Heart className="w-5 h-5 fill-[#E63946]" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-[#1D3557]">Amor pela Arte</span>
                    <span className="text-[10px] text-[#1D3557]/70">Receitas de Família</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F4A261]/15 flex items-center justify-center text-[#F4A261] shrink-0">
                    <Flame className="w-5 h-5 fill-[#F4A261]" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-[#1D3557]">Forno a Lenha</span>
                    <span className="text-[10px] text-[#1D3557]/70">Lenha Sustentável</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#2A9D8F]/10 flex items-center justify-center text-[#2A9D8F] shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-[#1D3557]">3 Irmãos</span>
                    <span className="text-[10px] text-[#1D3557]/70">Gestão Familiar</span>
                  </div>
                </div>
              </div>
            </Reveal>

          </div>

        </div>

      </div>
    </section>
  );
}
