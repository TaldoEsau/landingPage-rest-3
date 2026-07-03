"use client";

import Image from "next/image";
import { mainCombo } from "@/data/menuData";
import { restaurantInfo } from "@/data/restaurantInfo";
import { Reveal } from "@/components/ui/Reveal";
import { ShoppingBag, Sparkles, CheckCircle2 } from "lucide-react";

export function BannerPromo() {
  const comboUrl = `https://wa.me/${restaurantInfo.whatsappNumber}?text=${mainCombo.whatsappMessage}`;

  return (
    <section id="promo" className="py-20 sm:py-28 bg-[#1D3557] text-white relative overflow-hidden">
      
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E63946]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F4A261]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-[#1D3557] to-[#14233c] rounded-3xl border border-[#F4A261]/30 p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Promo Text Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <Reveal>
                <div className="inline-flex items-center gap-2 bg-[#E63946] text-white px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-glow-red">
                  <Sparkles className="w-4 h-4 fill-white" />
                  <span>{mainCombo.badge}</span>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                  {mainCombo.title}
                </h2>
                <p className="mt-2 text-lg text-[#F4A261] font-semibold">
                  {mainCombo.subtitle}
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <p className="text-sm sm:text-base text-gray-200 font-normal leading-relaxed">
                  {mainCombo.description}
                </p>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="space-y-2 pt-2 text-xs sm:text-sm text-gray-300">
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2A9D8F]" />
                    <span>2 Pizzas Grandes (Clássicas ou Especiais)</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2A9D8F]" />
                    <span>1 Guaraná Antarctica 2 Litros bem gelado</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2A9D8F]" />
                    <span>Borda Recheada de Catupiry ou Chocolate Cortesia</span>
                  </div>
                </div>
              </Reveal>

              {/* Price & CTA Action */}
              <Reveal delay={0.5}>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                  <div className="text-center lg:text-left">
                    <span className="block text-xs text-gray-400 line-through">
                      De R$ {mainCombo.originalPrice.toFixed(2).replace(".", ",")}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs font-medium text-gray-300">Por apenas</span>
                      <span className="font-serif text-4xl sm:text-5xl font-extrabold text-[#F4A261]">
                        R$ {mainCombo.promoPrice.toFixed(2).replace(".", ",")}
                      </span>
                    </div>
                  </div>

                  <a
                    href={comboUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 bg-[#E63946] text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider shadow-glow-red hover:bg-[#d62839] hover:scale-105 transition-all duration-300"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>Garantir Combo no WhatsApp</span>
                  </a>
                </div>
              </Reveal>

            </div>

            {/* Promo Graphic Column */}
            <div className="lg:col-span-5 relative flex justify-center">
              <Reveal delay={0.3}>
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 mx-auto">
                  <div className="absolute inset-0 rounded-full bg-[#F4A261]/20 blur-xl" />
                  <Image
                    src={mainCombo.imageUrl}
                    alt="Combo Família 3 Irmãos"
                    fill
                    className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </Reveal>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
