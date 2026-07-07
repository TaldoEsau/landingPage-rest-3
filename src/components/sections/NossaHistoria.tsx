"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { restaurantInfo } from "@/data/restaurantInfo";

export function NossaHistoria() {
  return (
    <section id="espaco" className="py-24 sm:py-32 bg-[#0A0A0A] relative overflow-hidden">

      {/* Subtle decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-16 bg-gradient-to-b from-[#C9A96E]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Image Column */}
          <div className="lg:col-span-5 relative">
            <Reveal>
              <div className="relative w-full h-[400px] sm:h-[500px] overflow-hidden group">
                <Image
                  src="/images/newImages/damapizzaria•Seguir - 1080w.jpg"
                  alt="Dama Pizzaria — Ambiente Sofisticado"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Corner frame accent */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-[#C9A96E]/30" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-[#C9A96E]/30" />

                {/* Bottom label */}
                <div className="absolute bottom-6 left-6">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-[#C9A96E] font-medium">
                    Santa Fé do Sul — SP
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <Reveal>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.5em] text-[#C9A96E] font-medium block mb-2">
                Nosso Espaço
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-wide">
                Um Refúgio Para os Sentidos
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="w-16 h-[1px] bg-gradient-to-r from-[#C9A96E]/40 to-transparent" />
            </Reveal>

            <Reveal delay={0.3}>
              <p className="text-sm sm:text-base text-white/45 font-light leading-[1.8]">
                A <strong className="text-white font-medium">Dama Pizzaria</strong> foi concebida como um espaço onde cada detalhe importa. Tijolos aparentes que contam histórias, madeira de demolição que traz calor, e uma iluminação pensada para criar a atmosfera perfeita de acolhimento.
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <p className="text-sm sm:text-base text-white/45 font-light leading-[1.8]">
                Nosso salão une o rústico ao contemporâneo — um xadrez marcante na parede que é a nossa assinatura visual, mesas de madeira que convidam a longas conversas, e o aroma inconfundível da pizza artesanal que sai direto do forno a lenha para a sua mesa.
              </p>
            </Reveal>

            <Reveal delay={0.5}>
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/[0.06]">
                {restaurantInfo.stats.slice(0, 3).map((stat, idx) => (
                  <div key={idx} className="text-center lg:text-left">
                    <span className="font-serif text-xl sm:text-2xl font-bold text-[#C9A96E] block mb-1">
                      {stat.value}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.6}>
              <div className="pt-4">
                <a
                  href={restaurantInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-[11px] uppercase tracking-[0.3em] font-semibold text-[#C9A96E] border border-[#C9A96E]/30 hover:bg-[#C9A96E] hover:text-black px-8 py-3 transition-all duration-500"
                >
                  Visite-nos
                </a>
              </div>
            </Reveal>
          </div>

        </div>

      </div>
    </section>
  );
}
