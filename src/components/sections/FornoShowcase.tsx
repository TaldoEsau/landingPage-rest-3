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

  const smooth = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    mass: 0.6,
  });

  // === OVEN ===
  const ovenOpacity = useTransform(smooth, [0, 0.08, 0.90, 1], [0.3, 1, 1, 0.5]);
  const fireGlowScale = useTransform(smooth, [0, 0.2, 0.45, 0.7, 1], [0.4, 0.8, 1.3, 1.1, 0.7]);
  const fireGlowOpacity = useTransform(smooth, [0, 0.2, 0.45, 0.7, 1], [0.15, 0.4, 1, 0.6, 0.3]);
  const fireIntensity = useTransform(smooth, [0, 0.25, 0.5, 0.75, 1], [0.3, 0.6, 1, 0.8, 0.4]);

  // === PEEL + PIZZA MOVEMENT ===
  const peelX = useTransform(
    smooth,
    [0, 0.06, 0.14, 0.22, 0.28, 0.45, 0.62, 0.72, 0.82, 0.92, 1],
    [-380, -300, -200, -80, 0, 5, 0, -5, 0, 5, 0]
  );
  const peelY = useTransform(
    smooth,
    [0, 0.06, 0.14, 0.22, 0.28, 0.45, 0.62, 0.72, 0.82, 0.92, 1],
    [100, 70, 30, 0, -15, -20, -10, 10, 35, 55, 65]
  );
  const peelTilt = useTransform(
    smooth,
    [0, 0.10, 0.20, 0.28, 0.45, 0.62, 0.72, 0.85, 1],
    [-20, -12, -5, 0, 1, -1, 3, 1, 0]
  );
  const overallScale = useTransform(
    smooth,
    [0, 0.10, 0.20, 0.28, 0.45, 0.62, 0.75, 0.88, 1],
    [0.30, 0.42, 0.55, 0.65, 0.72, 0.82, 1.05, 1.20, 1.25]
  );

  const handleBreath = useTransform(
    smooth,
    [0, 0.28, 0.45, 0.62, 0.80, 1],
    [0, 0, 1.5, 0, -1, 0]
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
  const info1Y = useTransform(smooth, [0.05, 0.16], [60, 0]);

  const info2Opacity = useTransform(smooth, [0.32, 0.48, 0.64, 0.72], [0, 1, 1, 0]);
  const info2Y = useTransform(smooth, [0.32, 0.48], [60, 0]);

  const info3Opacity = useTransform(smooth, [0.76, 0.90], [0, 1]);
  const info3Y = useTransform(smooth, [0.76, 0.90], [60, 0]);

  return (
    <section
      ref={containerRef}
      id="forno-showcase"
      className="relative h-[300vh] bg-[#0A0A0E] text-white selection:bg-[#E63946] selection:text-white"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="relative z-20 text-center max-w-3xl mx-auto">
          <motion.div style={{ opacity: ovenOpacity }}>
            <span className="inline-flex items-center gap-2 bg-[#E63946]/15 border border-[#E63946]/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#E63946] mb-3">
              <Flame className="w-4 h-4 fill-[#E63946] animate-pulse" />
              <span>Forno a Lenha Artesanal</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Da Pá Para o Forno.<br className="hidden sm:block" /> Do Forno Para Sua Mesa.
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-gray-500 font-medium">
              Acompanhe a pizza sendo assada no forno a lenha a 450ºC
            </p>
          </motion.div>
        </div>

        {/* Central Animation Stage */}
        <div className="relative w-full max-w-5xl mx-auto h-[440px] sm:h-[520px] flex items-center justify-center z-10">

          {/* ===== REALISTIC OVEN ===== */}
          <div className="absolute inset-x-[5%] inset-y-0 pointer-events-none">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 rounded-t-[45%] bg-gradient-to-b from-[#3D2212] via-[#2A1608] to-[#1A0D04] border-2 border-[#5C3A1E]/40 shadow-[0_0_80px_rgba(230,57,70,0.1)]">
                {[12, 22, 32, 42, 52, 62, 72].map((top, i) => (
                  <div
                    key={i}
                    className="absolute left-[8%] right-[8%] h-[1px] bg-[#5C3A1E]/20"
                    style={{ top: `${top}%` }}
                  />
                ))}
                {[20, 40, 60, 80].map((left, i) => (
                  <div
                    key={i}
                    className="absolute top-[10%] bottom-[15%] w-[1px] bg-[#5C3A1E]/15"
                    style={{ left: `${left}%` }}
                  />
                ))}
              </div>

              <motion.div
                style={{ opacity: fireIntensity }}
                className="absolute inset-[10%] rounded-t-[48%] bg-gradient-to-b from-[#1A0505] via-[#0D0202] to-[#0A0A0E] shadow-[inset_0_0_80px_rgba(230,57,70,0.2),inset_0_-20px_60px_rgba(244,162,97,0.15)]"
              >
                <div className="absolute bottom-[8%] left-[15%] right-[15%] h-[25%]">
                  <motion.div
                    style={{ opacity: fireIntensity }}
                    className="absolute inset-0 rounded-[50%] bg-gradient-to-t from-[#E63946]/40 via-[#F4A261]/20 to-transparent blur-[15px]"
                  />
                  {[15, 30, 50, 70, 85].map((left, i) => (
                    <motion.div
                      key={i}
                      className="absolute bottom-0"
                      style={{ left: `${left}%` }}
                    >
                      <motion.div
                        className="w-3 sm:w-4 bg-gradient-to-t from-[#E63946] via-[#F4A261] to-[#FFD700]/0 rounded-t-full"
                        animate={{
                          height: [8 + i * 2, 18 + i * 3, 10 + i * 2],
                          opacity: [0.6, 1, 0.7],
                        }}
                        transition={{
                          duration: 0.8 + i * 0.15,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.12,
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <div className="absolute inset-[9%] rounded-t-[47%] border-t-2 border-[#F4A261]/20 pointer-events-none" />
            </div>
          </div>

          {/* Background Fire Glow */}
          <motion.div
            style={{ scale: fireGlowScale, opacity: fireGlowOpacity }}
            className="absolute w-[400px] h-[400px] sm:w-[550px] sm:h-[550px] rounded-full bg-[radial-gradient(circle,rgba(230,57,70,0.5)_0%,rgba(244,162,97,0.2)_35%,transparent_65%)] blur-[90px] pointer-events-none"
          />

          {/* Animated Ember Particles */}
          <motion.div style={{ opacity: embersOpacity }} className="absolute inset-0 pointer-events-none z-10">
            {[
              { left: "28%", top: "32%", size: 3, color: "#E63946", yDist: -80, xDist: 15, duration: 2.4, delay: 0.2 },
              { left: "42%", top: "50%", size: 2, color: "#F4A261", yDist: -110, xDist: -20, duration: 3.1, delay: 0.8 },
              { left: "60%", top: "38%", size: 4, color: "#FFD700", yDist: -70, xDist: 25, duration: 2.1, delay: 0.4 },
              { left: "35%", top: "55%", size: 2, color: "#E63946", yDist: -95, xDist: -15, duration: 2.8, delay: 1.2 },
              { left: "52%", top: "28%", size: 3, color: "#F4A261", yDist: -120, xDist: 10, duration: 3.4, delay: 0.1 },
              { left: "68%", top: "45%", size: 2, color: "#FFD700", yDist: -85, xDist: -30, duration: 2.6, delay: 1.5 },
              { left: "30%", top: "62%", size: 4, color: "#E63946", yDist: -65, xDist: 20, duration: 2.3, delay: 0.6 },
              { left: "48%", top: "40%", size: 2, color: "#F4A261", yDist: -105, xDist: -10, duration: 3.0, delay: 1.0 },
              { left: "62%", top: "52%", size: 3, color: "#FFD700", yDist: -90, xDist: 18, duration: 2.5, delay: 0.3 },
              { left: "38%", top: "35%", size: 2, color: "#E63946", yDist: -115, xDist: -22, duration: 3.2, delay: 1.7 },
              { left: "55%", top: "65%", size: 4, color: "#F4A261", yDist: -75, xDist: 12, duration: 2.2, delay: 0.9 },
              { left: "45%", top: "48%", size: 3, color: "#FFD700", yDist: -100, xDist: -18, duration: 2.9, delay: 1.4 },
            ].map((ember, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
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
                  opacity: [0.9, 0],
                  scale: [1, 0.1],
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

          {/* Smoke/Steam */}
          <motion.div style={{ opacity: smokeOpacity }} className="absolute top-[2%] left-1/2 -translate-x-1/2 pointer-events-none z-10">
            {[...Array(7)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-12 h-12 rounded-full bg-white/[0.03] blur-xl"
                animate={{
                  y: [0, -120 - i * 30],
                  x: [0, (i % 2 === 0 ? 1 : -1) * (20 + i * 8)],
                  opacity: [0.35, 0],
                  scale: [0.4, 3],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.8,
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
            className="relative z-20"
          >
            <motion.div
              style={{ rotate: handleBreath, width: '280px', aspectRatio: '420 / 680' }}
              className="relative"
            >
              {/* Peel SVG */}
              <PizzaPeelSVG className="w-full h-full drop-shadow-[0_12px_35px_rgba(74,40,17,0.5)]" />

              {/*
                Pizza positioned on the circular head of the peel.
                Arc center in SVG: (200, 100)
                In viewBox (-10, -60, 420, 680):
                  x% = (200 - (-10)) / 420 = 50%
                  y% = (100 - (-60)) / 680 = 23.5%
                Arc radius 150 → diameter 300
                  width% = 300 / 420 = 71.4%
                  height% = 300 / 680 = 44.1%
              */}
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
                  className="absolute inset-[-18%] rounded-full bg-[radial-gradient(circle,rgba(255,215,0,0.35)_0%,rgba(244,162,97,0.15)_45%,transparent_70%)] blur-md"
                />

                <div className="relative w-full h-full">
                  <Image
                    src="/images/transparent/pizza-oven.png"
                    alt="Pizza Assando no Forno a Lenha"
                    fill
                    className="object-contain drop-shadow-[0_12px_30px_rgba(230,57,70,0.35)]"
                    priority
                  />

                  {/* Heat shimmer overlay */}
                  <motion.div
                    style={{ opacity: pizzaGoldenGlow }}
                    className="absolute inset-0 rounded-full bg-gradient-to-t from-[#F4A261]/10 to-transparent mix-blend-overlay pointer-events-none"
                  />
                </div>

                {/* Temperature Badge */}
                <motion.div
                  style={{ opacity: pizzaGoldenGlow }}
                  className="absolute -top-2 -right-2 z-20 bg-[#E63946] text-white text-[9px] sm:text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-[0_0_18px_rgba(230,57,70,0.6)] flex items-center gap-1"
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
            className="absolute left-2 sm:left-6 lg:left-10 top-[22%] bg-[#12121a]/95 backdrop-blur-2xl p-4 sm:p-5 rounded-2xl border border-[#F4A261]/30 shadow-[0_8px_32px_rgba(244,162,97,0.12)] max-w-[200px] sm:max-w-[220px] z-30"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#F4A261]/15 flex items-center justify-center text-[#F4A261]">
                <Clock className="w-4 h-4" />
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
            className="absolute right-2 sm:right-6 lg:right-10 top-[22%] bg-[#12121a]/95 backdrop-blur-2xl p-4 sm:p-5 rounded-2xl border border-[#E63946]/30 shadow-[0_8px_32px_rgba(230,57,70,0.12)] max-w-[200px] sm:max-w-[220px] z-30 text-right"
          >
            <div className="flex items-center gap-2 justify-end mb-2">
              <span className="text-[10px] sm:text-[11px] font-extrabold text-[#E63946] uppercase tracking-wider">
                Forno a 450ºC
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#E63946]/15 flex items-center justify-center text-[#E63946]">
                <Flame className="w-4 h-4 fill-current" />
              </div>
            </div>
            <p className="text-[10px] sm:text-[11px] text-gray-300 leading-relaxed">
              Calor da lenha derrete o queijo e doura a massa em apenas 90 segundos.
            </p>
          </motion.div>

          {/* INFO CARD 3 - Final CTA */}
          <motion.div
            style={{ opacity: info3Opacity, y: info3Y }}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-br from-[#1D3557] to-[#0F1D2F] p-5 sm:p-6 rounded-2xl border border-[#F4A261]/30 shadow-[0_12px_40px_rgba(244,162,97,0.15)] max-w-sm w-[92%] z-40 text-center"
          >
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F4A261] uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 fill-current animate-pulse" />
              <span>Pizza Pronta!</span>
            </div>
            <h4 className="font-serif text-base sm:text-lg font-bold text-white mb-3">
              Quentinha na Sua Porta
            </h4>
            <a
              href={restaurantInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#E63946] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-[0_0_25px_rgba(230,57,70,0.4)] hover:bg-[#d62839] hover:shadow-[0_0_35px_rgba(230,57,70,0.6)] transition-all duration-300 hover:scale-105"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Peça no WhatsApp</span>
            </a>
          </motion.div>
        </div>

        {/* Scroll Progress + Hint */}
        <div className="relative z-20 max-w-sm mx-auto w-full text-center">
          <motion.div
            style={{ opacity: scrollHintOpacity }}
            className="flex flex-col items-center gap-1 mb-3"
          >
            <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest">
              Role para ver o forno em ação
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
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
