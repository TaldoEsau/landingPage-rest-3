"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center bg-black overflow-hidden">

      {/* Subtle radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(201,169,110,0.04)_0%,transparent_70%)] pointer-events-none" />

      {/* Thin decorative lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-transparent via-[#C9A96E]/30 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-t from-transparent via-[#C9A96E]/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">

        {/* Small top label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.5em] text-[#C9A96E] font-medium">
            Pizzaria · Santa Fé do Sul
          </span>
        </motion.div>

        {/* Main logo text */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-serif text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold tracking-[0.08em] text-white mt-6 mb-4 leading-none"
        >
          DAMA
        </motion.h1>

        {/* Decorative divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isLoaded ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="mx-auto w-48 sm:w-64 h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent mb-6"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="font-sans text-lg sm:text-xl md:text-2xl text-white/50 font-light italic tracking-wide max-w-lg mx-auto"
        >
          Onde a elegância encontra o sabor
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-10"
        >
          <a
            href="#experiencia"
            className="inline-block text-[11px] uppercase tracking-[0.3em] font-semibold text-[#C9A96E] border border-[#C9A96E]/30 hover:bg-[#C9A96E] hover:text-black px-10 py-3.5 transition-all duration-500"
          >
            Descubra
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] uppercase tracking-[0.4em] text-white/25 font-medium">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-[#C9A96E]/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
