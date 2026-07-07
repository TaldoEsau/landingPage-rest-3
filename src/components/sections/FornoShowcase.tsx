"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";

const TOTAL_FRAMES = 100;
const FRAME_PATH = "/images/newImages/frames/quero_que_faca_um_video_com_es_";

function getFrameSrc(index: number): string {
  const padded = String(index).padStart(3, "0");
  return `${FRAME_PATH}${padded}.jpg`;
}

export function FornoShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const currentFrameRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 24,
    mass: 0.6,
  });

  // Dynamic Horizontal Translation for the Canvas Container (slides left, right, center)
  // X values are in percentages of translation
  const canvasX = useTransform(
    smooth,
    [0, 0.1, 0.32, 0.42, 0.65, 0.75, 0.95, 1],
    ["-25%", "-25%", "-25%", "25%", "25%", "0%", "0%", "0%"]
  );

  // Responsive values (mobile vs desktop) for X transform can be handled via CSS or responsive classes.
  // We'll use translateX transform mapped to scroll. To make it mobile-friendly, we can reduce the translation on small screens.
  const canvasScale = useTransform(
    smooth,
    [0, 0.1, 0.65, 0.75, 0.95, 1],
    [0.85, 0.9, 0.9, 1.05, 1.05, 0.9]
  );

  const canvasOpacity = useTransform(
    smooth,
    [0, 0.05, 0.95, 1],
    [0.5, 1, 1, 0]
  );

  // Text overlays that appear at specific scroll points with side slide-ins
  const text1Opacity = useTransform(smooth, [0.05, 0.12, 0.28, 0.34], [0, 1, 1, 0]);
  const text1X = useTransform(smooth, [0.05, 0.12, 0.28, 0.34], [50, 0, 0, -50]);

  const text2Opacity = useTransform(smooth, [0.38, 0.45, 0.60, 0.67], [0, 1, 1, 0]);
  const text2X = useTransform(smooth, [0.38, 0.45, 0.60, 0.67], [-50, 0, 0, 50]);

  const text3Opacity = useTransform(smooth, [0.72, 0.79, 0.95, 1], [0, 1, 1, 0]);
  const text3Y = useTransform(smooth, [0.72, 0.79, 0.95, 1], [30, 0, 0, -30]);

  const scrollHintOpacity = useTransform(smooth, [0, 0.06], [1, 0]);

  // Preload all frames
  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = [];

    const promises = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
      return new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.src = getFrameSrc(i);
        img.onload = () => {
          loaded++;
          setLoadProgress(Math.floor((loaded / TOTAL_FRAMES) * 100));
          resolve(img);
        };
        img.onerror = reject;
      });
    });

    Promise.all(promises).then((loadedImages) => {
      images.push(...loadedImages);
      imagesRef.current = images;
      setImagesLoaded(true);

      // Draw first frame immediately
      const canvas = canvasRef.current;
      if (canvas && images[0]) {
        const ctx = canvas.getContext("2d", { willReadFrequently: false });
        if (ctx) {
          canvas.width = images[0].naturalWidth;
          canvas.height = images[0].naturalHeight;
          ctx.drawImage(images[0], 0, 0);
        }
      }
    });
  }, []);

  // Draw frame based on scroll position with cross-fade interpolation
  const drawFrame = useCallback((progress: number) => {
    const canvas = canvasRef.current;
    const images = imagesRef.current;
    if (!canvas || images.length === 0) return;

    const exactFrame = progress * (TOTAL_FRAMES - 1);
    const frameIndex1 = Math.floor(exactFrame);
    const frameIndex2 = Math.min(frameIndex1 + 1, TOTAL_FRAMES - 1);
    const fraction = exactFrame - frameIndex1;

    const ctx = canvas.getContext("2d", { willReadFrequently: false });
    if (!ctx) return;

    const img1 = images[frameIndex1];
    const img2 = images[frameIndex2];

    if (!img1) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the current base frame
    ctx.globalAlpha = 1.0;
    ctx.drawImage(img1, 0, 0);

    // Draw the next frame on top with fractional opacity (cross-fade blend)
    if (img2 && fraction > 0.005) {
      ctx.globalAlpha = fraction;
      ctx.drawImage(img2, 0, 0);
    }

    // Reset alpha
    ctx.globalAlpha = 1.0;
  }, []);

  // Subscribe to smooth scroll value
  useEffect(() => {
    const unsubscribe = smooth.on("change", (latest) => {
      requestAnimationFrame(() => drawFrame(latest));
    });
    return unsubscribe;
  }, [smooth, drawFrame]);

  // Handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const images = imagesRef.current;
      if (!canvas || images.length === 0 || !images[0]) return;
      canvas.width = images[0].naturalWidth;
      canvas.height = images[0].naturalHeight;
      drawFrame(smooth.get());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [imagesLoaded, smooth, drawFrame]);

  return (
    <section
      ref={containerRef}
      id="experiencia"
      className="relative h-[500vh] bg-black"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center px-6 sm:px-12">

        {/* Loading indicator */}
        {!imagesLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-30">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#C9A96E] font-medium mb-4">
              Carregando experiência
            </span>
            <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#C9A96E] transition-all duration-300"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <span className="text-[10px] text-white/30 mt-2 tracking-wider">
              {loadProgress}%
            </span>
          </div>
        )}

        {/* Interactive layout stage */}
        <div className="relative w-full max-w-6xl mx-auto h-[600px] flex items-center justify-center">

          {/* Canvas Container window — Arched capsules shape with gold border */}
          <motion.div
            style={{
              x: canvasX,
              scale: canvasScale,
              opacity: canvasOpacity,
            }}
            className="absolute w-[280px] sm:w-[320px] md:w-[380px] aspect-[3/4] border border-[#C9A96E]/20 bg-[#0A0A0A] overflow-hidden rounded-t-[140px] rounded-b-[20px] shadow-2xl flex items-center justify-center transform-gpu will-change-transform z-10"
          >
            {/* Elegant vignette inner overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none z-10" />
            <canvas
              ref={canvasRef}
              className="w-full h-full object-cover scale-[1.05]"
            />
          </motion.div>

          {/* --- Opposing Text Overlays --- */}

          {/* Phase 1: Left-aligned Canvas, Right-aligned Text */}
          <motion.div
            style={{ opacity: text1Opacity, x: text1X }}
            className="absolute right-0 w-full md:w-[45%] text-left hidden md:block z-20 pointer-events-none transform-gpu"
          >
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.5em] text-[#C9A96E] font-medium block mb-4">
              O Conceito
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-wide mb-6 leading-tight">
              A Essência da Elegância
            </h2>
            <p className="text-sm sm:text-base text-white/45 font-light leading-[1.8] mb-8">
              A silhueta clássica em movimento expressa a nossa busca pela harmonia e precisão. Na Dama Pizzaria, cada gesto é planejado para criar momentos de pura sofisticação.
            </p>
            <div className="flex items-center gap-3 text-[#C9A96E] text-xs font-semibold uppercase tracking-[0.2em]">
              <span>Explore o espaço</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </motion.div>

          {/* Phase 2: Right-aligned Canvas, Left-aligned Text */}
          <motion.div
            style={{ opacity: text2Opacity, x: text2X }}
            className="absolute left-0 w-full md:w-[45%] text-left hidden md:block z-20 pointer-events-none transform-gpu"
          >
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.5em] text-[#C9A96E] font-medium block mb-4">
              A Atmosfera
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-wide mb-6 leading-tight">
              Estilo e Detalhe Singular
            </h2>
            <p className="text-sm sm:text-base text-white/45 font-light leading-[1.8] mb-8">
              Dos contrastes marcantes da nossa decoração à suavidade de cada textura, o salão da Dama convida à contemplação e ao conforto completo de uma experiência gastronômica autoral.
            </p>
            <div className="flex items-center gap-3 text-[#C9A96E] text-xs font-semibold uppercase tracking-[0.2em]">
              <span>Sinta a tradição</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </motion.div>

          {/* Phase 3: Centered text overlay at the end */}
          <motion.div
            style={{ opacity: text3Opacity, y: text3Y }}
            className="absolute text-center max-w-xl z-20 pointer-events-none transform-gpu"
          >
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.5em] text-[#C9A96E] font-medium block mb-4">
              A Experiência
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-bold text-white tracking-wide mb-6">
              Sabor e Arte
            </h2>
            <p className="text-sm sm:text-base text-white/45 font-light leading-[1.8] mx-auto max-w-md">
              A combinação perfeita entre um design inspirador e a tradicional massa assada lentamente no forno a lenha.
            </p>
          </motion.div>

          {/* --- Mobile Only Text Overlay (Centered fallback for small viewports) --- */}
          <div className="absolute inset-x-0 bottom-4 text-center md:hidden pointer-events-none px-4 z-20">
            <motion.div style={{ opacity: text1Opacity }} className="absolute inset-x-0 bottom-0">
              <h3 className="font-serif text-2xl font-bold text-white mb-2">A Essência da Elegância</h3>
              <p className="text-xs text-white/40 font-light">A busca constante pela precisão e harmonia.</p>
            </motion.div>
            <motion.div style={{ opacity: text2Opacity }} className="absolute inset-x-0 bottom-0">
              <h3 className="font-serif text-2xl font-bold text-white mb-2">Atmosfera Singular</h3>
              <p className="text-xs text-white/40 font-light">Contraste marcante e iluminação intimista.</p>
            </motion.div>
            <motion.div style={{ opacity: text3Opacity }} className="absolute inset-x-0 bottom-0">
              <h3 className="font-serif text-2xl font-bold text-white mb-2">Sabor e Arte</h3>
              <p className="text-xs text-white/40 font-light">A tradicional massa assada no forno a lenha.</p>
            </motion.div>
          </div>

        </div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: scrollHintOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-20"
        >
          <span className="text-[9px] uppercase tracking-[0.4em] text-white/30 font-medium">
            Role para animar
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-[#C9A96E]/40" />
          </motion.div>
        </motion.div>

        {/* Scroll progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 z-20">
          <motion.div
            style={{ scaleX: smooth }}
            className="h-full bg-gradient-to-r from-[#C9A96E]/50 to-[#C9A96E] origin-left"
          />
        </div>
      </div>
    </section>
  );
}
