"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { restaurantInfo } from "@/data/restaurantInfo";
import { Flame, Sparkles, ShoppingBag, Thermometer, Clock, ShieldCheck } from "lucide-react";

export function FornoShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Scroll Transforms for Pizza Peel (Pá de Pizza) & Pizza Movement
  // Phase 1: Pizza Peel enters oven
  // Phase 2: Pizza bakes inside oven at 450°C
  // Phase 3: Pizza Peel scoops and pulls out glowing golden pizza towards the screen
  
  const ovenOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.8]);
  const fireGlowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.4, 1.1]);
  
  // Pizza Peel Position (x & y & scale & rotate)
  const peelX = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [-250, 0, 0, 0]);
  const peelY = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [150, -20, 20, 0]);
  const pizzaScale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.6, 0.85, 1.15, 1]);
  const pizzaRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-15, 0, 5]);

  // Information Cards Opacity & Y Progress
  const info1Opacity = useTransform(scrollYProgress, [0.15, 0.35, 0.5, 0.6], [0, 1, 1, 0]);
  const info1Y = useTransform(scrollYProgress, [0.15, 0.35], [40, 0]);

  const info2Opacity = useTransform(scrollYProgress, [0.45, 0.65, 0.8, 0.9], [0, 1, 1, 0]);
  const info2Y = useTransform(scrollYProgress, [0.45, 0.65], [40, 0]);

  const info3Opacity = useTransform(scrollYProgress, [0.75, 0.95], [0, 1]);
  const info3Y = useTransform(scrollYProgress, [0.75, 0.95], [40, 0]);

  return (
    <section
      ref={containerRef}
      id="forno-showcase"
      className="relative h-[280vh] bg-[#0A0A0E] text-white selection:bg-[#E63946] selection:text-white"
    >
      {/* Sticky Container Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="relative z-20 text-center max-w-3xl mx-auto">
          <motion.div style={{ opacity: ovenOpacity }}>
            <span className="inline-flex items-center gap-2 bg-[#E63946]/20 border border-[#E63946]/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#E63946] mb-3">
              <Flame className="w-4 h-4 fill-[#E63946] animate-pulse" />
              <span>Experiência Interativa do Forno a Lenha</span>
            </span>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Da Pá Para o Forno. Do Forno Para Sua Mesa.
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-400 font-medium">
              Role para baixo e acompanhe a pizza sendo assada no forno a lenha a 450ºC.
            </p>
          </motion.div>
        </div>

        {/* Central Animation Stage (Oven + Pizza Peel + Fire Glow) */}
        <div className="relative w-full max-w-4xl mx-auto h-[420px] sm:h-[500px] flex items-center justify-center z-10">
          
          {/* Fire Ambient Light & Glow */}
          <motion.div
            style={{ scale: fireGlowScale }}
            className="absolute w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] rounded-full bg-gradient-to-t from-[#E63946] via-[#F4A261]/40 to-transparent blur-[100px] pointer-events-none opacity-80"
          />

          {/* Oven Arch Frame Illustration */}
          <div className="absolute inset-0 border-4 border-dashed border-[#F4A261]/20 rounded-t-full flex items-center justify-center pointer-events-none">
            <div className="w-[85%] h-[85%] rounded-t-full bg-gradient-to-b from-[#1A0A0A] to-[#0A0A0E] opacity-90 shadow-inner" />
          </div>

          {/* Pizza Peel (Pá de Pizza) & Pizza Image Container */}
          <motion.div
            style={{
              x: peelX,
              y: peelY,
              scale: pizzaScale,
              rotate: pizzaRotate,
            }}
            className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[420px] lg:h-[420px] flex items-center justify-center"
          >
            {/* Wooden Handle / Pizza Peel Graphic Backing */}
            <div className="absolute -bottom-24 w-12 h-64 bg-gradient-to-b from-[#8B4513] to-[#5C2E0B] rounded-full shadow-2xl transform rotate-45 pointer-events-none" />

            {/* Glowing Pizza Image */}
            <div className="relative w-full h-full">
              <Image
                src="/images/transparent/pizza-oven.png"
                alt="Pizza Assando no Forno a Lenha"
                fill
                className="object-contain drop-shadow-[0_25px_50px_rgba(230,57,70,0.5)]"
                priority
              />

              {/* Flame Particles Accent */}
              <div className="absolute top-2 right-4 bg-[#E63946] text-white text-[10px] font-extrabold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                <Thermometer className="w-3 h-3" />
                <span>450ºC</span>
              </div>
            </div>
          </motion.div>

          {/* DYNAMIC SCROLL INFO OVERLAY 1 (0.15 - 0.5) */}
          <motion.div
            style={{ opacity: info1Opacity, y: info1Y }}
            className="absolute left-4 sm:left-10 top-1/3 bg-[#1A1A24]/95 backdrop-blur-xl p-5 rounded-3xl border border-[#F4A261]/40 shadow-2xl max-w-xs z-30"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-xl bg-[#F4A261]/20 flex items-center justify-center text-[#F4A261]">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-xs font-extrabold text-[#F4A261] uppercase tracking-wider">
                Passo 1: Maturação 48h
              </span>
            </div>
            <p className="text-xs text-gray-200 leading-relaxed font-normal">
              Massa de fermentação natural descansada por 48 horas. Leveza perfeita, borda aerada e fácil digestão.
            </p>
          </motion.div>

          {/* DYNAMIC SCROLL INFO OVERLAY 2 (0.45 - 0.8) */}
          <motion.div
            style={{ opacity: info2Opacity, y: info2Y }}
            className="absolute right-4 sm:right-10 top-1/3 bg-[#1A1A24]/95 backdrop-blur-xl p-5 rounded-3xl border border-[#E63946]/40 shadow-2xl max-w-xs z-30 text-right"
          >
            <div className="flex items-center gap-3 mb-2 justify-end">
              <span className="text-xs font-extrabold text-[#E63946] uppercase tracking-wider">
                Passo 2: Forno a 450ºC
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#E63946]/20 flex items-center justify-center text-[#E63946]">
                <Flame className="w-4 h-4 fill-current" />
              </div>
            </div>
            <p className="text-xs text-gray-200 leading-relaxed font-normal">
              O calor intenso da lenha de reflorestamento derrete o queijo e doura a massa em apenas 90 segundos.
            </p>
          </motion.div>

          {/* DYNAMIC SCROLL INFO OVERLAY 3 (0.75 - 1.0) - FINAL REVEAL */}
          <motion.div
            style={{ opacity: info3Opacity, y: info3Y }}
            className="absolute bottom-2 bg-gradient-to-r from-[#1D3557] to-[#14233c] p-6 rounded-3xl border border-[#F4A261]/40 shadow-2xl max-w-md w-full z-40 text-center"
          >
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F4A261] uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 fill-current" />
              <span>Sua Pizza Pronta & Crocante!</span>
            </div>
            <h4 className="font-serif text-lg font-bold text-white mb-2">
              Pronta Para Ser Entregue Quentinha na Sua Porta
            </h4>
            <a
              href={restaurantInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#E63946] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider shadow-glow-red hover:bg-[#d62839] transition-all hover:scale-105"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Peça Esta Pizza no WhatsApp</span>
            </a>
          </motion.div>

        </div>

        {/* Scroll Progress Bar Indicator */}
        <div className="relative z-20 max-w-md mx-auto w-full text-center">
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="h-full bg-gradient-to-r from-[#E63946] to-[#F4A261] origin-left"
            />
          </div>
          <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest mt-2 block">
            Role para ver o processo completo do forno
          </span>
        </div>

      </div>
    </section>
  );
}
