"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { restaurantInfo } from "@/data/restaurantInfo";
import { Flame, Sparkles, ShoppingBag, Thermometer, Clock, ChevronDown } from "lucide-react";

function PizzaPeelSVG({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-10 -60 420 680"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <path
          id="peel"
          d="
            M 50 100
            A 150 150 0 1 1 350 100
            C 350 220, 215 250, 215 310
            L 215 580
            A 15 15 0 0 1 185 580
            L 185 310
            C 185 250, 50 220, 50 100 Z"
        />
        <clipPath id="peel-clip">
          <use href="#peel" />
        </clipPath>
        <linearGradient id="darkWood" x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="#804a25" />
          <stop offset="50%" stopColor="#693c1d" />
          <stop offset="100%" stopColor="#4a2811" />
        </linearGradient>
        <linearGradient id="lightWood" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e8ceaa" />
          <stop offset="40%" stopColor="#f5dfc1" />
          <stop offset="100%" stopColor="#d4b48c" />
        </linearGradient>
        <mask id="hole-mask">
          <rect x="-10" y="-60" width="420" height="680" fill="white" />
          <circle cx="200" cy="565" r="6" fill="black" />
        </mask>
      </defs>
      <use href="#peel" fill="#2b1507" transform="translate(4, 5)" />
      <g mask="url(#hole-mask)">
        <use href="#peel" fill="url(#darkWood)" />
        <rect
          x="175" y="-60" width="50" height="740"
          fill="url(#lightWood)"
          clipPath="url(#peel-clip)"
        />
        <use href="#peel" fill="none" stroke="#945931" strokeWidth="2" />
        <use
          href="#peel"
          fill="none"
          stroke="#361a09"
          strokeWidth="4"
          clipPath="url(#peel-clip)"
          transform="translate(2, 2)"
          opacity="0.6"
        />
      </g>
    </svg>
  );
}

export function FornoShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Tuned spring for high-refresh 60fps mobile scroll without physics lag
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.4,
  });

  // === OVEN & FIRE ===
  const ovenOpacity = useTransform(smooth, [0, 0.08, 0.90, 1], [0.3, 1, 1, 0.5]);
  const fireGlowScale = useTransform(smooth, [0, 0.2, 0.45, 0.7, 1], [0.5, 0.9, 1.2, 1.0, 0.7]);
  const fireGlowOpacity = useTransform(smooth, [0, 0.2, 0.45, 0.7, 1], [0.2, 0.5, 0.9, 0.6, 0.3]);
  const fireIntensity = useTransform(smooth, [0, 0.25, 0.5, 0.75, 1], [0.3, 0.6, 1, 0.8, 0.4]);

  // === PEEL + PIZZA MOVEMENT ===
  const peelX = useTransform(
    smooth,
    [0, 0.06, 0.14, 0.22, 0.28, 0.45, 0.62, 0.72, 0.82, 0.92, 1],
    [-320, -250, -160, -60, 0, 4, 0, -4, 0, 4, 0]
  );
  const peelY = useTransform(
    smooth,
    [0, 0.06, 0.14, 0.22, 0.28, 0.45, 0.62, 0.72, 0.82, 0.92, 1],
    [90, 60, 25, 0, -12, -18, -8, 8, 30, 45, 55]
  );
  const peelTilt = useTransform(
    smooth,
    [0, 0.10, 0.20, 0.28, 0.45, 0.62, 0.72, 0.85, 1],
    [-16, -10, -4, 0, 1, -1, 2, 1, 0]
  );
  const overallScale = useTransform(
    smooth,
    [0, 0.10, 0.20, 0.28, 0.45, 0.62, 0.75, 0.88, 1],
    [0.35, 0.45, 0.58, 0.68, 0.75, 0.85, 1.05, 1.18, 1.22]
  );

  const handleBreath = useTransform(
    smooth,
    [0, 0.28, 0.45, 0.62, 0.80, 1],
    [0, 0, 1.2, 0, -1, 0]
  );

  const pizzaGoldenGlow = useTransform(
    smooth,
    [0, 0.20, 0.40, 0.62, 0.80, 1],
    [0, 0.1, 0.5, 1, 0.7, 0.4]
  );

  const smokeOpacity = useTransform(smooth, [0.40, 0.60, 0.80, 1], [0, 0.5, 0.6, 0.2]);
  const embersOpacity = useTransform(smooth, [0.12, 0.30, 0.65, 0.82], [0, 1, 1, 0]);
  const scrollHintOpacity = useTransform(smooth, [0, 0.08], [1, 0]);

  // === INFO CARDS ===
  const info1Opacity = useTransform(smooth, [0.05, 0.16, 0.30, 0.38], [0, 1, 1, 0]);
  const info1Y = useTransform(smooth, [0.05, 0.16], [40, 0]);

  const info2Opacity = useTransform(smooth, [0.32, 0.48, 0.64, 0.72], [0, 1, 1, 0]);
  const info2Y = useTransform(smooth, [0.32, 0.48], [40, 0]);

  const info3Opacity = useTransform(smooth, [0.76, 0.90], [0, 1]);
  const info3Y = useTransform(smooth, [0.76, 0.90], [40, 0]);

  return (
    <section
      ref={containerRef}
      id="forno-showcase"
      className="relative h-[280vh] sm:h-[300vh] bg-[#0A0A0E] text-white selection:bg-[#E63946] selection:text-white"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-6 sm:py-8 px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="relative z-20 text-center max-w-3xl mx-auto">
          <motion.div style={{ opacity: ovenOpacity }} className="transform-gpu">
            <span className="inline-flex items-center gap-2 bg-[#E63946]/15 border border-[#E63946]/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#E63946] mb-2 sm:mb-3">
              <Flame className="w-3.5 h-3.5 fill-[#E63946]" />
              <span>Forno a Lenha Artesanal</span>
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Da Pá Para o Forno.<br className="hidden sm:block" /> Do Forno Para Sua Mesa.
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-400 font-medium">
              Acompanhe a pizza sendo assada no forno a lenha a 450ºC
            </p>
          </motion.div>
        </div>

        {/* Central Animation Stage */}
        <div className="relative w-full max-w-5xl mx-auto h-[400px] sm:h-[520px] flex items-center justify-center z-10">

          {/* ===== REALISTIC OVEN (Hardware Accelerated) ===== */}
          <div className="absolute inset-x-[4%] inset-y-0 pointer-events-none transform-gpu">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 rounded-t-[45%] bg-gradient-to-b from-[#3D2212] via-[#2A1608] to-[#1A0D04] border border-[#5C3A1E]/40 shadow-lg">
                {[15, 35, 55, 75].map((top, i) => (
                  <div
                    key={i}
                    className="absolute left-[8%] right-[8%] h-[1px] bg-[#5C3A1E]/20"
                    style={{ top: `${top}%` }}
                  />
                ))}
              </div>

              <motion.div
                style={{ opacity: fireIntensity }}
                className="absolute inset-[8%] sm:inset-[10%] rounded-t-[48%] bg-gradient-to-b from-[#1A0505] via-[#0D0202] to-[#0A0A0E] shadow-inner transform-gpu"
              >
                <div className="absolute bottom-[6%] left-[12%] right-[12%] h-[25%]">
                  <motion.div
                    style={{ opacity: fireIntensity }}
                    className="absolute inset-0 rounded-[50%] bg-gradient-to-t from-[#E63946]/35 via-[#F4A261]/15 to-transparent blur-md"
                  />
                  {[20, 45, 75].map((left, i) => (
                    <motion.div
                      key={i}
                      className="absolute bottom-0"
                      style={{ left: `${left}%` }}
                    >
                      <motion.div
                        className="w-3 bg-gradient-to-t from-[#E63946] via-[#F4A261] to-transparent rounded-t-full"
                        animate={{
                          height: [10 + i * 2, 20 + i * 2, 12 + i * 2],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                          duration: 1.2 + i * 0.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Background Fire Glow (Lightweight Blur for Mobile GPU) */}
          <motion.div
            style={{ scale: fireGlowScale, opacity: fireGlowOpacity }}
            className="absolute w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] rounded-full bg-[radial-gradient(circle,rgba(230,57,70,0.4)_0%,rgba(244,162,97,0.15)_40%,transparent_70%)] blur-2xl pointer-events-none transform-gpu"
          />

          {/* Animated Ember Particles (Optimized for Mobile) */}
          <motion.div style={{ opacity: embersOpacity }} className="absolute inset-0 pointer-events-none z-10 transform-gpu">
            {[
              { left: "30%", top: "35%", size: 3, color: "#E63946", yDist: -60, xDist: 10, duration: 2.2, delay: 0.1 },
              { left: "45%", top: "52%", size: 2, color: "#F4A261", yDist: -80, xDist: -15, duration: 2.8, delay: 0.5 },
              { left: "62%", top: "40%", size: 3, color: "#FFD700", yDist: -55, xDist: 20, duration: 2.0, delay: 0.3 },
              { left: "38%", top: "58%", size: 2, color: "#E63946", yDist: -70, xDist: -10, duration: 2.5, delay: 0.9 },
              { left: "55%", top: "30%", size: 3, color: "#F4A261", yDist: -90, xDist: 8, duration: 3.0, delay: 0.2 },
              { left: "68%", top: "48%", size: 2, color: "#FFD700", yDist: -65, xDist: -20, duration: 2.4, delay: 1.1 },
            ].map((ember, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full transform-gpu"
                style={{
                  left: ember.left,
                  top: ember.top,
                  width: `${ember.size}px`,
                  height: `${ember.size}px`,
                  backgroundColor: ember.color,
                }}
                animate={{
                  y: [0, ember.yDist],
                  x: [0, ember.xDist],
                  opacity: [0.85, 0],
                  scale: [1, 0.2],
                }}
                transition={{
                  duration: ember.duration,
                  repeat: Infinity,
                  delay: ember.delay,
                  ease: "easeOut",
                }}
              />
            ))}
          </motion.div>

          {/* Smoke/Steam (Hidden on small mobile for maximum smoothness) */}
          <motion.div style={{ opacity: smokeOpacity }} className="hidden sm:block absolute top-[2%] left-1/2 -translate-x-1/2 pointer-events-none z-10 transform-gpu">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-10 h-10 rounded-full bg-white/[0.04] blur-lg"
                animate={{
                  y: [0, -90 - i * 20],
                  x: [0, (i % 2 === 0 ? 1 : -1) * (15 + i * 5)],
                  opacity: [0.3, 0],
                  scale: [0.5, 2.2],
                }}
                transition={{
                  duration: 3.5 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.6,
                  ease: "easeOut",
                }}
              />
            ))}
          </motion.div>

          {/* === PIZZA PEEL (SVG) + PIZZA === */}
          <motion.div
            style={{
              x: peelX,
              y: peelY,
              scale: overallScale,
              rotate: peelTilt,
            }}
            className="relative z-20 transform-gpu will-change-transform"
          >
            <motion.div
              style={{ rotate: handleBreath, width: '260px', aspectRatio: '420 / 680' }}
              className="relative sm:w-[280px]"
            >
              {/* Peel SVG */}
              <PizzaPeelSVG className="w-full h-full drop-shadow-md" />

              <div
                className="absolute"
                style={{
                  top: '23.5%',
                  left: '50%',
                  width: '90%',
                  height: '55%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {/* Baking glow ring */}
                <motion.div
                  style={{ opacity: pizzaGoldenGlow }}
                  className="absolute inset-[-15%] rounded-full bg-[radial-gradient(circle,rgba(255,215,0,0.3)_0%,rgba(244,162,97,0.1)_40%,transparent_70%)] blur-sm"
                />

                <div className="relative w-full h-full">
                  <Image
                    src="/images/transparent/pizza-oven.png"
                    alt="Pizza Assando no Forno a Lenha"
                    fill
                    className="object-contain drop-shadow-lg"
                    priority
                  />
                </div>

                {/* Temperature Badge */}
                <motion.div
                  style={{ opacity: pizzaGoldenGlow }}
                  className="absolute -top-1 -right-1 z-20 bg-[#E63946] text-white text-[9px] sm:text-[10px] font-extrabold px-2.5 py-0.5 sm:py-1 rounded-full shadow-md flex items-center gap-1"
                >
                  <Thermometer className="w-3 h-3" />
                  <span>450ºC</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* INFO CARD 1 */}
          <motion.div
            style={{ opacity: info1Opacity, y: info1Y }}
            className="absolute left-2 sm:left-6 lg:left-10 top-[20%] sm:top-[22%] bg-[#12121a]/95 backdrop-blur-md p-3.5 sm:p-5 rounded-2xl border border-[#F4A261]/30 shadow-xl max-w-[180px] sm:max-w-[220px] z-30 transform-gpu"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#F4A261]/15 flex items-center justify-center text-[#F4A261]">
                <Clock className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-extrabold text-[#F4A261] uppercase tracking-wider">
                Maturação 48h
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-gray-300 leading-relaxed">
              Massa de fermentação natural descansada por 48 horas. Leveza e borda aerada.
            </p>
          </motion.div>

          {/* INFO CARD 2 */}
          <motion.div
            style={{ opacity: info2Opacity, y: info2Y }}
            className="absolute right-2 sm:right-6 lg:right-10 top-[20%] sm:top-[22%] bg-[#12121a]/95 backdrop-blur-md p-3.5 sm:p-5 rounded-2xl border border-[#E63946]/30 shadow-xl max-w-[180px] sm:max-w-[220px] z-30 text-right transform-gpu"
          >
            <div className="flex items-center gap-2 justify-end mb-1.5">
              <span className="text-[10px] sm:text-[11px] font-extrabold text-[#E63946] uppercase tracking-wider">
                Forno a 450ºC
              </span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#E63946]/15 flex items-center justify-center text-[#E63946]">
                <Flame className="w-3.5 h-3.5 fill-current" />
              </div>
            </div>
            <p className="text-[10px] sm:text-[11px] text-gray-300 leading-relaxed">
              Calor da lenha derrete o queijo e doura a massa em apenas 90 segundos.
            </p>
          </motion.div>

          {/* INFO CARD 3 - Final CTA */}
          <motion.div
            style={{ opacity: info3Opacity, y: info3Y }}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-[#14233c]/95 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-[#F4A261]/30 shadow-2xl max-w-sm w-[92%] z-40 text-center transform-gpu"
          >
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F4A261] uppercase tracking-wider mb-1.5">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>Pizza Pronta!</span>
            </div>
            <h4 className="font-serif text-sm sm:text-lg font-bold text-white mb-2.5">
              Quentinha na Sua Porta
            </h4>
            <a
              href={restaurantInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#E63946] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#d62839] transition-all hover:scale-105"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Peça no WhatsApp</span>
            </a>
          </motion.div>
        </div>

        {/* Scroll Progress + Hint */}
        <div className="relative z-20 max-w-xs sm:max-w-sm mx-auto w-full text-center">
          <motion.div
            style={{ opacity: scrollHintOpacity }}
            className="flex flex-col items-center gap-1 mb-2"
          >
            <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest">
              Role para ver o forno em ação
            </span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-4 h-4 text-[#F4A261]" />
            </motion.div>
          </motion.div>
          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div
              style={{ scaleX: smooth }}
              className="h-full bg-gradient-to-r from-[#E63946] via-[#F4A261] to-[#FFD700] origin-left"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
