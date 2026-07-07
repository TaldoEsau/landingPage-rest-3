// "use client";

// import { useRef, useEffect, useState, useCallback, useMemo } from "react";
// import { motion, useScroll, useTransform, useSpring } from "framer-motion";
// import { ChevronDown, Flame, Leaf, Droplets, Star } from "lucide-react";

// const TOTAL_FRAMES = 100;
// const FRAME_PATH = "/images/newImages/frames/pizza/pizza_explode_";

// function getFrameSrc(index: number): string {
//   const padded = String(index).padStart(3, "0");
//   return `${FRAME_PATH}${padded}.jpg`;
// }

// /* ─── Ingredient data with positions and timing ─── */
// interface Ingredient {
//   name: string;
//   icon: "flame" | "leaf" | "droplets" | "star";
//   description: string;
//   position: { x: string; y: string };
//   delay: number;
// }

// const INGREDIENTS: Ingredient[] = [
//   {
//     name: "Mussarela",
//     icon: "droplets",
//     description: "Queijo derretido na medida",
//     position: { x: "15%", y: "30%" },
//     delay: 0,
//   },
//   {
//     name: "Pimentão",
//     icon: "leaf",
//     description: "Fresco e crocante",
//     position: { x: "78%", y: "25%" },
//     delay: 0.1,
//   },
//   {
//     name: "Azeitonas",
//     icon: "star",
//     description: "Selecionadas a dedo",
//     position: { x: "82%", y: "60%" },
//     delay: 0.2,
//   },
//   {
//     name: "Molho",
//     icon: "flame",
//     description: "Tomates italianos",
//     position: { x: "12%", y: "65%" },
//     delay: 0.3,
//   },
// ];

// const ICON_MAP = {
//   flame: Flame,
//   leaf: Leaf,
//   droplets: Droplets,
//   star: Star,
// };

// /* ─── Phase data ─── */
// interface Phase {
//   label: string;
//   title: string;
//   subtitle: string;
// }

// const PHASES: Phase[] = [
//   {
//     label: "01 — A Pizza",
//     title: "Uma Obra\nde Arte",
//     subtitle: "Cada pizza é uma composição perfeita de sabores, texturas e tradição.",
//   },
//   {
//     label: "02 — A Explosão",
//     title: "Ingredientes\nque Encantam",
//     subtitle: "Selecionamos cada ingrediente com o cuidado que só uma paixão genuína proporciona.",
//   },
//   {
//     label: "03 — Os Detalhes",
//     title: "Frescor em\nCada Detalhe",
//     subtitle: "Do campo à mesa, qualidade que você sente no primeiro pedaço.",
//   },
//   {
//     label: "04 — A Perfeição",
//     title: "Perfeição\nRemontada",
//     subtitle: "Todos os ingredientes se unem para criar algo verdadeiramente especial.",
//   },
// ];

// export function PizzaExplode() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const imagesRef = useRef<HTMLImageElement[]>([]);
//   const [imagesLoaded, setImagesLoaded] = useState(false);
//   const [loadProgress, setLoadProgress] = useState(0);
//   const currentFrameRef = useRef(0);

//   const [activeIngredientIndex, setActiveIngredientIndex] = useState<number | null>(null);

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"],
//   });

//   const smooth = useSpring(scrollYProgress, {
//     stiffness: 40,
//     damping: 24,
//     mass: 0.6,
//   });

//   /* ─── Canvas transforms ─── */
//   const [isMobile, setIsMobile] = useState(false);
//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 768);
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   const canvasXMobile = useTransform(smooth, [0, 1], ["0%", "0%"]);
//   const canvasXDesktop = useTransform(
//     smooth,
//     [0, 0.20, 0.25, 0.48, 0.55, 0.72, 0.78, 1.00],
//     ["0%", "0%", "22%", "22%", "-22%", "-22%", "0%", "0%"]
//   );

//   const canvasX = isMobile ? canvasXMobile : canvasXDesktop;

//   // Scale: starts normal, zooms in during explosion, pulls back for reassembly
//   const canvasScale = useTransform(
//     smooth,
//     [0, 0.08, 0.25, 0.45, 0.55, 0.75, 0.88, 1],
//     [0.9, 1.0, 1.1, 1.15, 1.15, 1.05, 1.0, 0.95]
//   );

//   const canvasOpacity = useTransform(
//     smooth,
//     [0, 0.04, 0.92, 1],
//     [1, 1, 1, 0.8]
//   );

//   // Slight rotation for drama
//   const canvasRotate = useTransform(
//     smooth,
//     [0, 0.15, 0.35, 0.55, 0.75, 1],
//     [0, -1, 1, -0.5, 0.5, 0]
//   );

//   /* ─── Phase text transforms ─── */
//   // Phase 1: Pizza inteira (0 - 0.20)
//   const phase1Opacity = useTransform(smooth, [0.02, 0.08, 0.16, 0.22], [0, 1, 1, 0]);
//   const phase1Y = useTransform(smooth, [0.02, 0.08, 0.16, 0.22], [60, 0, 0, -40]);

//   // Phase 2: Explosão (0.22 - 0.48)
//   const phase2Opacity = useTransform(smooth, [0.24, 0.30, 0.42, 0.48], [0, 1, 1, 0]);
//   const phase2X = useTransform(smooth, [0.24, 0.30, 0.42, 0.48], [-80, 0, 0, 80]);

//   // Phase 3: Close nos ingredientes (0.48 - 0.72)
//   const phase3Opacity = useTransform(smooth, [0.50, 0.56, 0.66, 0.72], [0, 1, 1, 0]);
//   const phase3X = useTransform(smooth, [0.50, 0.56, 0.66, 0.72], [80, 0, 0, -80]);

//   // Phase 4: Remontagem (0.72 - 0.98)
//   const phase4Opacity = useTransform(smooth, [0.74, 0.80, 0.92, 0.98], [0, 1, 1, 0]);
//   const phase4Y = useTransform(smooth, [0.74, 0.80, 0.92, 0.98], [60, 0, 0, -40]);

//   /* ─── Ingredient labels (visible during explosion phases) ─── */
//   const ingredientOpacity = useTransform(smooth, [0.25, 0.33, 0.44, 0.50], [0, 1, 1, 0]);

//   /* ─── Decorative elements ─── */
//   const scrollHintOpacity = useTransform(smooth, [0, 0.05], [1, 0]);

//   // Ring / circle decorations
//   const ringScale = useTransform(smooth, [0.20, 0.40, 0.60, 0.80], [0.5, 1.5, 1.8, 0.8]);
//   const ringOpacity = useTransform(smooth, [0.20, 0.30, 0.50, 0.60], [0, 0.15, 0.15, 0]);

//   // Counter progress (0 to 100% as scroll progresses)
//   const counterProgress = useTransform(smooth, [0, 1], [0, 100]);

//   /* ─── Background gradient shift ─── */
//   const bgOpacity1 = useTransform(smooth, [0, 0.3, 0.6, 1], [0.3, 0.6, 0.4, 0.2]);
//   const bgOpacity2 = useTransform(smooth, [0, 0.3, 0.6, 1], [0.1, 0.3, 0.5, 0.2]);

//   /* ─── Horizontal divider lines ─── */
//   const dividerWidth = useTransform(smooth, [0, 0.5, 1], ["0%", "60%", "100%"]);

//   // Preload all frames
//   useEffect(() => {
//     let loaded = 0;
//     const images: HTMLImageElement[] = [];

//     const promises = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
//       return new Promise<HTMLImageElement>((resolve, reject) => {
//         const img = new Image();
//         img.src = getFrameSrc(i);
//         img.onload = () => {
//           loaded++;
//           setLoadProgress(Math.floor((loaded / TOTAL_FRAMES) * 100));
//           resolve(img);
//         };
//         img.onerror = reject;
//       });
//     });

//     Promise.all(promises).then((loadedImages) => {
//       images.push(...loadedImages);
//       imagesRef.current = images;
//       setImagesLoaded(true);

//       const canvas = canvasRef.current;
//       if (canvas && images[0]) {
//         const ctx = canvas.getContext("2d", { willReadFrequently: false });
//         if (ctx) {
//           canvas.width = images[0].naturalWidth;
//           canvas.height = images[0].naturalHeight;
//           ctx.drawImage(images[0], 0, 0);
//         }
//       }
//     });
//   }, []);

//   // Draw frame based on scroll position with cross-fade interpolation
//   const drawFrame = useCallback((progress: number) => {
//     const canvas = canvasRef.current;
//     const images = imagesRef.current;
//     if (!canvas || images.length === 0) return;

//     const exactFrame = progress * (TOTAL_FRAMES - 1);
//     const frameIndex1 = Math.floor(exactFrame);
//     const frameIndex2 = Math.min(frameIndex1 + 1, TOTAL_FRAMES - 1);
//     const fraction = exactFrame - frameIndex1;

//     const img1 = images[frameIndex1];
//     const img2 = images[frameIndex2];

//     if (!img1) return;

//     // Ensure the logical canvas dimensions match the image natural dimensions (avoids browser default 300x150 crop)
//     if (canvas.width !== img1.naturalWidth || canvas.height !== img1.naturalHeight) {
//       canvas.width = img1.naturalWidth;
//       canvas.height = img1.naturalHeight;
//     }

//     const ctx = canvas.getContext("2d", { willReadFrequently: false });
//     if (!ctx) return;

//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     // Draw the current base frame
//     ctx.globalAlpha = 1.0;
//     ctx.drawImage(img1, 0, 0);

//     // Draw the next frame on top with fractional opacity (cross-fade blend)
//     if (img2 && fraction > 0.005) {
//       ctx.globalAlpha = fraction;
//       ctx.drawImage(img2, 0, 0);
//     }

//     // Reset alpha
//     ctx.globalAlpha = 1.0;
//   }, []);

//   // Subscribe to smooth scroll value
//   useEffect(() => {
//     const unsubscribe = smooth.on("change", (latest) => {
//       requestAnimationFrame(() => drawFrame(latest));
//     });
//     return unsubscribe;
//   }, [smooth, drawFrame]);

//   // Handle active ingredient for mobile HUD
//   useEffect(() => {
//     const unsubscribe = smooth.on("change", (latest) => {
//       if (latest >= 0.25 && latest < 0.31) {
//         setActiveIngredientIndex(0);
//       } else if (latest >= 0.31 && latest < 0.37) {
//         setActiveIngredientIndex(1);
//       } else if (latest >= 0.37 && latest < 0.43) {
//         setActiveIngredientIndex(2);
//       } else if (latest >= 0.43 && latest < 0.50) {
//         setActiveIngredientIndex(3);
//       } else {
//         setActiveIngredientIndex(null);
//       }
//     });
//     return unsubscribe;
//   }, [smooth]);

//   // Handle canvas resize and initial draw
//   useEffect(() => {
//     if (imagesLoaded) {
//       drawFrame(smooth.get());
//     }
//   }, [imagesLoaded, smooth, drawFrame]);

//   // Handle canvas resize listener
//   useEffect(() => {
//     const handleResize = () => {
//       const canvas = canvasRef.current;
//       const images = imagesRef.current;
//       if (!canvas || images.length === 0 || !images[0]) return;
//       canvas.width = images[0].naturalWidth;
//       canvas.height = images[0].naturalHeight;
//       drawFrame(smooth.get());
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [imagesLoaded, smooth, drawFrame]);

//   return (
//     <section
//       ref={containerRef}
//       id="ingredientes"
//       className="relative bg-black"
//       style={{ height: "600vh" }}
//     >
//       <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

//         {/* ─── Ambient Background Layers ─── */}
//         <motion.div
//           style={{ opacity: bgOpacity1 }}
//           className="absolute inset-0 bg-gradient-to-br from-[#C9A96E]/5 via-transparent to-transparent pointer-events-none"
//         />
//         <motion.div
//           style={{ opacity: bgOpacity2 }}
//           className="absolute inset-0 bg-gradient-to-tl from-red-950/5 via-transparent to-transparent pointer-events-none"
//         />

//         {/* ─── Decorative background geometric line ─── */}
//         <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />

//         {/* ─── Loading indicator ─── */}
//         {!imagesLoaded && (
//           <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-50">
//             <div className="relative mb-8">
//               <div className="w-16 h-16 rounded-full border-2 border-[#C9A96E]/20 flex items-center justify-center">
//                 <motion.div
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//                   className="absolute inset-0 rounded-full border-t-2 border-[#C9A96E]"
//                 />
//                 <span className="text-lg font-bold text-[#C9A96E]">
//                   {loadProgress}
//                 </span>
//               </div>
//             </div>
//             <span className="text-[10px] uppercase tracking-[0.5em] text-[#C9A96E]/60 font-medium">
//               Preparando a experiência
//             </span>
//             <div className="w-48 h-[1px] bg-white/5 rounded-full overflow-hidden mt-4">
//               <div
//                 className="h-full bg-gradient-to-r from-[#C9A96E]/40 to-[#C9A96E] transition-all duration-500"
//                 style={{ width: `${loadProgress}%` }}
//               />
//             </div>
//           </div>
//         )}

//         {/* ─── Interactive Stage Wrapper ─── */}
//         <div className="relative w-full max-w-6xl mx-auto h-[600px] flex items-center justify-center px-6">

//           {/* ─── The Canvas Container (Constrained aspect-ratio prevents pixelation, large layout displays the full frame) ─── */}
//           <motion.div
//             style={{
//               x: canvasX,
//               scale: canvasScale,
//               opacity: canvasOpacity,
//               rotate: canvasRotate,
//             }}
//             className="absolute w-[92vw] md:w-[68vw] max-w-[860px] aspect-video border border-[#C9A96E]/20 bg-[#030303] overflow-hidden rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] flex items-center justify-center transform-gpu will-change-transform z-10"
//           >
//             {/* Cinematic vignette inner overlay */}
//             <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none z-20" />
//             <canvas
//               ref={canvasRef}
//               className="w-full h-full object-cover"
//             />

//             {/* ─── 3D Overlapping labels: Inside the canvas container so they move together ─── */}
//             <motion.div
//               style={{ opacity: ingredientOpacity }}
//               className="absolute inset-0 z-30 pointer-events-none hidden lg:block"
//             >
//               {INGREDIENTS.map((ing, i) => {
//                 const Icon = ICON_MAP[ing.icon];

//                 // Anchored to the exact coordinates on the original 16:9 frame
//                 const labelPositions = [
//                   { left: "12%", top: "33%" }, // Mussarela
//                   { left: "74%", top: "27%" }, // Pimentão
//                   { left: "77%", top: "62%" }, // Azeitonas
//                   { left: "14%", top: "67%" }, // Molho
//                 ];

//                 return (
//                   <motion.div
//                     key={i}
//                     className="absolute transform-gpu flex items-center gap-2"
//                     style={{
//                       left: labelPositions[i].left,
//                       top: labelPositions[i].top,
//                     }}
//                   >
//                     {/* Glowing indicator dot */}
//                     <div className="w-2 h-2 rounded-full bg-[#C9A96E] glow-gold flex-shrink-0 animate-subtle-pulse" />

//                     {/* Label card */}
//                     <div className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-black/90 backdrop-blur-md border border-[#C9A96E]/20 shadow-2xl">
//                       <div className="w-5 h-5 rounded-full bg-[#C9A96E]/10 flex items-center justify-center">
//                         <Icon className="w-2.5 h-2.5 text-[#C9A96E]" />
//                       </div>
//                       <div>
//                         <span className="text-[10px] text-white font-semibold block leading-none">
//                           {ing.name}
//                         </span>
//                         <span className="text-[8px] text-white/40 block mt-0.5 whitespace-nowrap">
//                           {ing.description}
//                         </span>
//                       </div>
//                     </div>
//                   </motion.div>
//                 );
//               })}
//             </motion.div>
//           </motion.div>

//           {/* ─── Opposing Text Overlays (Desktop Only) ─── */}

//           {/* Phase 1: Centralized bottom text */}
//           <motion.div
//             style={{ opacity: phase1Opacity, y: phase1Y }}
//             className="absolute bottom-6 text-center max-w-xl z-20 pointer-events-none transform-gpu hidden md:flex flex-col items-center"
//           >
//             <span className="text-[9px] uppercase tracking-[0.5em] text-[#C9A96E] font-semibold block mb-2">
//               {PHASES[0].label}
//             </span>
//             <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-wide mb-3 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
//               {PHASES[0].title}
//             </h2>
//             <p className="text-xs sm:text-sm text-white/50 font-light leading-relaxed max-w-md mx-auto">
//               {PHASES[0].subtitle}
//             </p>
//           </motion.div>

//           {/* Phase 2: Left-aligned text (canvas shifts right) */}
//           <motion.div
//             style={{ opacity: phase2Opacity, x: phase2X }}
//             className="absolute left-[6vw] w-[88vw] md:w-[26vw] text-left z-20 pointer-events-none transform-gpu hidden md:flex flex-col justify-center h-full"
//           >
//             <span className="text-[9px] uppercase tracking-[0.5em] text-[#C9A96E] font-semibold block mb-2">
//               {PHASES[1].label}
//             </span>
//             <h2 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-wide mb-3 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
//               {PHASES[1].title}
//             </h2>
//             <p className="text-xs text-white/50 font-light leading-relaxed mb-5">
//               {PHASES[1].subtitle}
//             </p>
//             <div className="flex flex-wrap gap-1.5">
//               {INGREDIENTS.map((ing, i) => (
//                 <span
//                   key={i}
//                   className="text-[9px] uppercase tracking-wider text-white/60 bg-white/5 border border-white/10 px-2 py-0.5 rounded-sm"
//                 >
//                   {ing.name}
//                 </span>
//               ))}
//             </div>
//           </motion.div>

//           {/* Phase 3: Right-aligned text (canvas shifts left) */}
//           <motion.div
//             style={{ opacity: phase3Opacity, x: phase3X }}
//             className="absolute right-[6vw] w-[88vw] md:w-[26vw] text-right z-20 pointer-events-none transform-gpu hidden md:flex flex-col justify-center items-end h-full"
//           >
//             <span className="text-[9px] uppercase tracking-[0.5em] text-[#C9A96E] font-semibold block mb-2">
//               {PHASES[2].label}
//             </span>
//             <h2 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-wide mb-3 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
//               {PHASES[2].title}
//             </h2>
//             <p className="text-xs text-white/50 font-light leading-relaxed mb-5">
//               {PHASES[2].subtitle}
//             </p>
//             <div className="flex gap-2">
//               {["100% Frescos", "Selecionados"].map((badge, i) => (
//                 <span
//                   key={i}
//                   className="text-[9px] uppercase tracking-widest text-[#C9A96E] font-semibold border border-[#C9A96E]/30 px-3 py-1 bg-black/40"
//                 >
//                   {badge}
//                 </span>
//               ))}
//             </div>
//           </motion.div>

//           {/* Phase 4: Centralized bottom text */}
//           <motion.div
//             style={{ opacity: phase4Opacity, y: phase4Y }}
//             className="absolute bottom-6 text-center max-w-xl z-20 pointer-events-none transform-gpu hidden md:flex flex-col items-center"
//           >
//             <span className="text-[9px] uppercase tracking-[0.5em] text-[#C9A96E] font-semibold block mb-2">
//               {PHASES[3].label}
//             </span>
//             <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-wide mb-3 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
//               {PHASES[3].title}
//             </h2>
//             <p className="text-xs sm:text-sm text-white/50 font-light leading-relaxed max-w-md mx-auto mb-5">
//               {PHASES[3].subtitle}
//             </p>
//             <a
//               href="https://wa.me/5518999999999"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="pointer-events-auto inline-flex items-center gap-3 px-6 py-3 bg-[#C9A96E] text-black font-semibold text-[10px] sm:text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-[#D4B87A] transition-colors duration-300 shadow-lg shadow-[#C9A96E]/10"
//             >
//               <Flame className="w-3.5 h-3.5" />
//               Peça Agora
//             </a>
//           </motion.div>

//           {/* ─── Mobile Only Text Overlay (Centered fallback for small viewports) ─── */}
//           <div className="absolute inset-x-0 bottom-6 text-center md:hidden pointer-events-none px-4 z-20">
//             <motion.div style={{ opacity: phase1Opacity }} className="absolute inset-x-0 bottom-0">
//               <h3 className="font-serif text-xl font-bold text-white mb-1">Uma Obra de Arte</h3>
//               <p className="text-[10px] text-white/40 font-light">Composição perfeita de sabores e texturas.</p>
//             </motion.div>
//             <motion.div style={{ opacity: phase2Opacity }} className="absolute inset-x-0 bottom-0">
//               <h3 className="font-serif text-xl font-bold text-white mb-1">Ingredientes que Encantam</h3>
//               <p className="text-[10px] text-white/40 font-light">Selecionados com paixão e carinho autêntico.</p>
//             </motion.div>
//             <motion.div style={{ opacity: phase3Opacity }} className="absolute inset-x-0 bottom-0">
//               <h3 className="font-serif text-xl font-bold text-white mb-1">Frescor em Cada Detalhe</h3>
//               <p className="text-[10px] text-white/40 font-light">Do campo direto para a sua mesa.</p>
//             </motion.div>
//             <motion.div style={{ opacity: phase4Opacity }} className="absolute inset-x-0 bottom-0 flex flex-col items-center">
//               <h3 className="font-serif text-xl font-bold text-white mb-1">Perfeição Remontada</h3>
//               <a
//                 href="https://wa.me/5518999999999"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="pointer-events-auto mt-2 inline-flex items-center gap-2 px-4 py-2 bg-[#C9A96E] text-black font-semibold text-[9px] uppercase tracking-wider rounded-sm"
//               >
//                 Peça Agora
//               </a>
//             </motion.div>
//           </div>

//         </div>

//         {/* ─── Mobile Active Ingredient HUD ─── */}
//         {activeIngredientIndex !== null && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 20 }}
//             className="absolute bottom-20 inset-x-6 z-40 md:hidden pointer-events-none"
//           >
//             <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-black/95 backdrop-blur-md border border-[#C9A96E]/30 max-w-[260px] mx-auto shadow-2xl">
//               {(() => {
//                 const activeIng = INGREDIENTS[activeIngredientIndex];
//                 const Icon = ICON_MAP[activeIng.icon];
//                 return (
//                   <>
//                     <div className="w-8 h-8 rounded-full bg-[#C9A96E]/20 flex items-center justify-center flex-shrink-0">
//                       <Icon className="w-4 h-4 text-[#C9A96E]" />
//                     </div>
//                     <div>
//                       <span className="text-[10px] text-[#C9A96E] font-bold block uppercase tracking-wider">
//                         {activeIng.name}
//                       </span>
//                       <span className="text-[8px] text-white/50 block mt-0.5">
//                         {activeIng.description}
//                       </span>
//                     </div>
//                   </>
//                 );
//               })()}
//             </div>
//           </motion.div>
//         )}

//         {/* ─── Scroll down hint ─── */}
//         <motion.div
//           style={{ opacity: scrollHintOpacity }}
//           className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-40"
//         >
//           <span className="text-[9px] uppercase tracking-[0.5em] text-white/30 font-medium">
//             Deslize para descobrir
//           </span>
//           <motion.div
//             animate={{ y: [0, 6, 0] }}
//             transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
//           >
//             <ChevronDown className="w-4 h-4 text-[#C9A96E]/50" />
//           </motion.div>
//         </motion.div>

//         {/* ─── Phase indicator dots ─── */}
//         <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-40">
//           {PHASES.map((phase, i) => {
//             const phaseOpacities = [phase1Opacity, phase2Opacity, phase3Opacity, phase4Opacity];
//             return (
//               <motion.div
//                 key={i}
//                 style={{ opacity: phaseOpacities[i] }}
//                 className="flex items-center gap-2"
//               >
//                 <span className="text-[8px] text-[#C9A96E]/60 uppercase tracking-wider hidden md:block">
//                   {phase.label.split("—")[0].trim()}
//                 </span>
//                 <div className="w-2 h-2 rounded-full bg-[#C9A96E]" />
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* ─── Bottom progress bar ─── */}
//         <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 z-40">
//           <motion.div
//             style={{ scaleX: smooth }}
//             className="h-full bg-gradient-to-r from-[#C9A96E]/30 via-[#C9A96E] to-[#C9A96E]/30 origin-left"
//           />
//         </div>

//         {/* ─── Corner frame number (subtle) ─── */}
//         <div className="absolute top-6 left-6 md:top-8 md:left-8 z-40">
//           <span className="text-[9px] uppercase tracking-[0.3em] text-white/15 font-medium">
//             Ingredientes
//           </span>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ChevronDown, Flame, Leaf, Droplets, Star } from "lucide-react";

const TOTAL_FRAMES = 100;
const FRAME_PATH = "/images/newImages/frames/pizza/pizza_explode_";

function getFrameSrc(index: number): string {
  const padded = String(index).padStart(3, "0");
  return `${FRAME_PATH}${padded}.jpg`;
}

/* ─── Ingredient data with positions and timing ─── */
interface Ingredient {
  name: string;
  icon: "flame" | "leaf" | "droplets" | "star";
  description: string;
  position: { x: string; y: string };
  delay: number;
}

const INGREDIENTS: Ingredient[] = [
  {
    name: "Mussarela",
    icon: "droplets",
    description: "Queijo derretido na medida",
    position: { x: "15%", y: "30%" },
    delay: 0,
  },
  {
    name: "Pimentão",
    icon: "leaf",
    description: "Fresco e crocante",
    position: { x: "78%", y: "25%" },
    delay: 0.1,
  },
  {
    name: "Azeitonas",
    icon: "star",
    description: "Selecionadas a dedo",
    position: { x: "82%", y: "60%" },
    delay: 0.2,
  },
  {
    name: "Molho",
    icon: "flame",
    description: "Tomates italianos",
    position: { x: "12%", y: "65%" },
    delay: 0.3,
  },
];

const ICON_MAP = {
  flame: Flame,
  leaf: Leaf,
  droplets: Droplets,
  star: Star,
};

/* ─── Phase data ─── */
interface Phase {
  label: string;
  title: string;
  subtitle: string;
}

const PHASES: Phase[] = [
  {
    label: "01 — A Pizza",
    title: "Uma Obra\nde Arte",
    subtitle: "Cada pizza é uma composição perfeita de sabores, texturas e tradição.",
  },
  {
    label: "02 — A Explosão",
    title: "Ingredientes\nque Encantam",
    subtitle: "Selecionamos cada ingrediente com o cuidado que só uma paixão genuína proporciona.",
  },
  {
    label: "03 — Os Detalhes",
    title: "Frescor em\nCada Detalhe",
    subtitle: "Do campo à mesa, qualidade que você sente no primeiro pedaço.",
  },
  {
    label: "04 — A Perfeição",
    title: "Perfeição\nRemontada",
    subtitle: "Todos os ingredientes se unem para criar algo verdadeiramente especial.",
  },
];

export function PizzaExplode() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const currentFrameRef = useRef(0);

  const [activeIngredientIndex, setActiveIngredientIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 35,
    mass: 0.4,
  });

  /* ─── Canvas transforms ─── */
  // Scale: starts normal, zooms in during explosion, pulls back for reassembly
  const canvasScale = useTransform(
    smooth,
    [0, 0.08, 0.25, 0.45, 0.55, 0.75, 0.88, 1],
    [0.9, 1.0, 1.1, 1.15, 1.15, 1.05, 1.0, 0.95]
  );

  const canvasOpacity = useTransform(
    smooth,
    [0, 0.04, 0.92, 1],
    [1, 1, 1, 0.8]
  );

  // Slight rotation for drama
  const canvasRotate = useTransform(
    smooth,
    [0, 0.15, 0.35, 0.55, 0.75, 1],
    [0, -1, 1, -0.5, 0.5, 0]
  );

  /* ─── Phase text transforms ─── */
  // Phase 1: Pizza inteira (0 - 0.20)
  const phase1Opacity = useTransform(smooth, [0.02, 0.08, 0.16, 0.22], [0, 1, 1, 0]);
  const phase1Y = useTransform(smooth, [0.02, 0.08, 0.16, 0.22], [60, 0, 0, -40]);

  // Phase 2: Explosão (0.22 - 0.48)
  const phase2Opacity = useTransform(smooth, [0.24, 0.30, 0.42, 0.48], [0, 1, 1, 0]);
  const phase2X = useTransform(smooth, [0.24, 0.30, 0.42, 0.48], [-80, 0, 0, 80]);

  // Phase 3: Close nos ingredientes (0.48 - 0.72)
  const phase3Opacity = useTransform(smooth, [0.50, 0.56, 0.66, 0.72], [0, 1, 1, 0]);
  const phase3X = useTransform(smooth, [0.50, 0.56, 0.66, 0.72], [80, 0, 0, -80]);

  // Phase 4: Remontagem (0.72 - 0.98)
  const phase4Opacity = useTransform(smooth, [0.74, 0.80, 0.92, 0.98], [0, 1, 1, 0]);
  const phase4Y = useTransform(smooth, [0.74, 0.80, 0.92, 0.98], [60, 0, 0, -40]);

  /* ─── Ingredient labels (visible during explosion phases) ─── */
  const ingredientOpacity = useTransform(smooth, [0.25, 0.33, 0.44, 0.50], [0, 1, 1, 0]);

  /* ─── Decorative elements ─── */
  const scrollHintOpacity = useTransform(smooth, [0, 0.05], [1, 0]);

  // Ring / circle decorations
  const ringScale = useTransform(smooth, [0.20, 0.40, 0.60, 0.80], [0.5, 1.5, 1.8, 0.8]);
  const ringOpacity = useTransform(smooth, [0.20, 0.30, 0.50, 0.60], [0, 0.15, 0.15, 0]);

  // Counter progress (0 to 100% as scroll progresses)
  const counterProgress = useTransform(smooth, [0, 1], [0, 100]);

  /* ─── Background gradient shift ─── */
  const bgOpacity1 = useTransform(smooth, [0, 0.3, 0.6, 1], [0.3, 0.6, 0.4, 0.2]);
  const bgOpacity2 = useTransform(smooth, [0, 0.3, 0.6, 1], [0.1, 0.3, 0.5, 0.2]);

  /* ─── Horizontal divider lines ─── */
  const dividerWidth = useTransform(smooth, [0, 0.5, 1], ["0%", "60%", "100%"]);

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

  // Draw frame based on scroll position
  const drawFrame = useCallback((progress: number) => {
    const canvas = canvasRef.current;
    const images = imagesRef.current;
    if (!canvas || images.length === 0) return;

    const frameIndex = Math.min(
      Math.floor(progress * (TOTAL_FRAMES - 1)),
      TOTAL_FRAMES - 1
    );

    if (frameIndex === currentFrameRef.current) return;
    currentFrameRef.current = frameIndex;

    const ctx = canvas.getContext("2d", { willReadFrequently: false });
    if (!ctx || !images[frameIndex]) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(images[frameIndex], 0, 0);
  }, []);

  // Subscribe to smooth scroll value
  useEffect(() => {
    const unsubscribe = smooth.on("change", (latest) => {
      requestAnimationFrame(() => drawFrame(latest));
    });
    return unsubscribe;
  }, [smooth, drawFrame]);

  // Handle active ingredient for mobile HUD
  useEffect(() => {
    const unsubscribe = smooth.on("change", (latest) => {
      if (latest >= 0.25 && latest < 0.31) {
        setActiveIngredientIndex(0);
      } else if (latest >= 0.31 && latest < 0.37) {
        setActiveIngredientIndex(1);
      } else if (latest >= 0.37 && latest < 0.43) {
        setActiveIngredientIndex(2);
      } else if (latest >= 0.43 && latest < 0.50) {
        setActiveIngredientIndex(3);
      } else {
        setActiveIngredientIndex(null);
      }
    });
    return unsubscribe;
  }, [smooth]);

  // Handle canvas resize and initial draw
  useEffect(() => {
    if (imagesLoaded) {
      drawFrame(smooth.get());
    }
  }, [imagesLoaded, smooth, drawFrame]);

  // Handle canvas resize listener
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
      id="ingredientes"
      className="relative bg-black"
      style={{ height: "600vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* ─── Ambient Background Layers ─── */}
        <motion.div
          style={{ opacity: bgOpacity1 }}
          className="absolute inset-0 bg-gradient-to-br from-[#C9A96E]/10 via-transparent to-transparent pointer-events-none"
        />
        <motion.div
          style={{ opacity: bgOpacity2 }}
          className="absolute inset-0 bg-gradient-to-tl from-red-900/10 via-transparent to-transparent pointer-events-none"
        />

        {/* ─── Decorative expanding ring ─── */}
        <motion.div
          style={{ scale: ringScale, opacity: ringOpacity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full border border-[#C9A96E]/30 pointer-events-none transform-gpu"
        />
        <motion.div
          style={{ scale: ringScale, opacity: ringOpacity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[850px] md:h-[850px] rounded-full border border-[#C9A96E]/10 pointer-events-none transform-gpu"
        />

        {/* ─── Loading indicator ─── */}
        {!imagesLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-50">
            <div className="relative mb-8">
              <div className="w-16 h-16 rounded-full border-2 border-[#C9A96E]/20 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-t-2 border-[#C9A96E]"
                />
                <span className="text-lg font-bold text-[#C9A96E]">
                  {loadProgress}
                </span>
              </div>
            </div>
            <span className="text-[10px] uppercase tracking-[0.5em] text-[#C9A96E]/60 font-medium">
              Preparando a experiência
            </span>
            <div className="w-48 h-[1px] bg-white/5 rounded-full overflow-hidden mt-4">
              <div
                className="h-full bg-gradient-to-r from-[#C9A96E]/40 to-[#C9A96E] transition-all duration-500"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* ─── Main Canvas Container ─── */}
        <motion.div
          style={{
            scale: canvasScale,
            opacity: canvasOpacity,
            rotate: canvasRotate,
          }}
          className="absolute inset-0 flex items-center justify-center transform-gpu will-change-transform z-10"
        >
          {/* Cinematic vignette overlay */}
          <div className="absolute inset-0 z-20 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 80% 80% at center, transparent 40%, rgba(0,0,0,0.7) 100%),
                linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 30%),
                linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 20%)
              `
            }}
          />
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover"
            style={{ objectFit: "cover" }}
          />
        </motion.div>

        {/* ═══════════════════════════════════════════════════════
            TEXT OVERLAYS — Each phase has unique positioning & style
            ═══════════════════════════════════════════════════════ */}

        {/* ─── Phase 1: "Uma Obra de Arte" — Bottom center, cinematic intro ─── */}
        <motion.div
          style={{ opacity: phase1Opacity, y: phase1Y }}
          className="absolute inset-x-0 bottom-0 z-30 pointer-events-none transform-gpu"
        >
          <div className="max-w-4xl mx-auto px-6 pb-16 md:pb-24 text-center">
            {/* Thin horizontal line */}
            <motion.div
              style={{ width: dividerWidth }}
              className="h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent mx-auto mb-6"
            />
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.6em] text-[#C9A96E]/80 font-medium block mb-3 md:mb-4">
              {PHASES[0].label}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-wide mb-4 md:mb-6 leading-[1.1] whitespace-pre-line drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
              {PHASES[0].title}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/50 font-light leading-relaxed max-w-lg mx-auto">
              {PHASES[0].subtitle}
            </p>
          </div>
        </motion.div>

        {/* ─── Phase 2: "Ingredientes que Encantam" — Left side, slides from left ─── */}
        <motion.div
          style={{ opacity: phase2Opacity, x: phase2X }}
          className="absolute left-0 top-0 bottom-0 z-30 pointer-events-none transform-gpu flex items-center"
        >
          <div className="w-[90vw] md:w-[42vw] lg:w-[38vw] pl-6 sm:pl-10 md:pl-16 lg:pl-20">
            {/* Accent vertical bar */}
            <div className="flex items-start gap-4 md:gap-6">
              <div className="hidden md:block w-[2px] h-32 bg-gradient-to-b from-[#C9A96E] to-transparent mt-2 flex-shrink-0" />
              <div>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.6em] text-[#C9A96E]/80 font-medium block mb-3">
                  {PHASES[1].label}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide mb-4 md:mb-6 leading-[1.1] whitespace-pre-line drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
                  {PHASES[1].title}
                </h2>
                <p className="text-sm sm:text-base text-white/50 font-light leading-relaxed max-w-md mb-6 md:mb-8">
                  {PHASES[1].subtitle}
                </p>
                {/* Ingredient mini-cards */}
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {INGREDIENTS.map((ing, i) => {
                    const Icon = ICON_MAP[ing.icon];
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
                      >
                        <Icon className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#C9A96E]" />
                        <span className="text-[10px] md:text-xs text-white/70 font-medium uppercase tracking-wider">
                          {ing.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── Phase 3: "Frescor em Cada Detalhe" — Right side, slides from right ─── */}
        <motion.div
          style={{ opacity: phase3Opacity, x: phase3X }}
          className="absolute right-0 top-0 bottom-0 z-30 pointer-events-none transform-gpu flex items-center"
        >
          <div className="w-[90vw] md:w-[42vw] lg:w-[38vw] pr-6 sm:pr-10 md:pr-16 lg:pr-20 text-right ml-auto">
            <div className="flex items-start gap-4 md:gap-6 justify-end">
              <div>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.6em] text-[#C9A96E]/80 font-medium block mb-3">
                  {PHASES[2].label}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide mb-4 md:mb-6 leading-[1.1] whitespace-pre-line drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
                  {PHASES[2].title}
                </h2>
                <p className="text-sm sm:text-base text-white/50 font-light leading-relaxed max-w-md ml-auto mb-6 md:mb-8">
                  {PHASES[2].subtitle}
                </p>
                {/* Quality badges */}
                <div className="flex flex-wrap gap-3 justify-end">
                  {["100% Frescos", "Selecionados", "Artesanal"].map((badge, i) => (
                    <div
                      key={i}
                      className="px-4 py-2 border border-[#C9A96E]/30 rounded-sm bg-black/40 backdrop-blur-sm"
                    >
                      <span className="text-[10px] md:text-xs text-[#C9A96E] font-semibold uppercase tracking-[0.2em]">
                        {badge}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden md:block w-[2px] h-32 bg-gradient-to-b from-[#C9A96E] to-transparent mt-2 flex-shrink-0" />
            </div>
          </div>
        </motion.div>

        {/* ─── Phase 4: "Perfeição Remontada" — Center, grand finale ─── */}
        <motion.div
          style={{ opacity: phase4Opacity, y: phase4Y }}
          className="absolute inset-0 z-30 pointer-events-none transform-gpu flex items-center justify-center"
        >
          <div className="text-center max-w-2xl mx-auto px-6">
            {/* Decorative double lines */}
            <div className="flex items-center justify-center gap-4 mb-6 md:mb-8">
              <div className="w-12 md:w-20 h-[1px] bg-gradient-to-r from-transparent to-[#C9A96E]/60" />
              <Star className="w-3 h-3 md:w-4 md:h-4 text-[#C9A96E]/60" />
              <div className="w-12 md:w-20 h-[1px] bg-gradient-to-l from-transparent to-[#C9A96E]/60" />
            </div>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.6em] text-[#C9A96E]/80 font-medium block mb-3 md:mb-4">
              {PHASES[3].label}
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-wide mb-4 md:mb-6 leading-[1.1] whitespace-pre-line drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
              {PHASES[3].title}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/50 font-light leading-relaxed max-w-lg mx-auto mb-8 md:mb-10">
              {PHASES[3].subtitle}
            </p>
            {/* CTA button */}
            <a
              href="https://wa.me/5518999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto inline-flex items-center gap-3 px-8 py-3.5 bg-[#C9A96E] text-black font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] rounded-sm hover:bg-[#D4B87A] transition-colors duration-300 shadow-lg shadow-[#C9A96E]/20"
            >
              <Flame className="w-4 h-4" />
              Peça Agora
            </a>
          </div>
        </motion.div>

        {/* ─── Floating ingredient labels during explosion ─── */}
        <motion.div
          style={{ opacity: ingredientOpacity }}
          className="absolute inset-0 z-25 pointer-events-none hidden md:block"
        >
          {INGREDIENTS.map((ing, i) => {
            const Icon = ICON_MAP[ing.icon];
            return (
              <motion.div
                key={i}
                initial={{ scale: 0.8, opacity: 0 }}
                className="absolute transform-gpu"
                style={{
                  left: ing.position.x,
                  top: ing.position.y,
                }}
              >
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/60 backdrop-blur-md border border-[#C9A96E]/20 shadow-xl shadow-black/30">
                  <div className="w-6 h-6 rounded-full bg-[#C9A96E]/15 flex items-center justify-center">
                    <Icon className="w-3 h-3 text-[#C9A96E]" />
                  </div>
                  <div>
                    <span className="text-[10px] text-white font-semibold block leading-none">
                      {ing.name}
                    </span>
                    <span className="text-[8px] text-white/40 block mt-0.5">
                      {ing.description}
                    </span>
                  </div>
                </div>
                {/* Connection line dot */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#C9A96E]/60" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* ─── Mobile Active Ingredient HUD ─── */}
        {activeIngredientIndex !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-20 inset-x-6 z-40 md:hidden pointer-events-none"
          >
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-black/90 backdrop-blur-md border border-[#C9A96E]/30 max-w-[280px] mx-auto shadow-2xl">
              {(() => {
                const activeIng = INGREDIENTS[activeIngredientIndex];
                const Icon = ICON_MAP[activeIng.icon];
                return (
                  <>
                    <div className="w-8 h-8 rounded-full bg-[#C9A96E]/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-[#C9A96E]" />
                    </div>
                    <div>
                      <span className="text-[11px] text-[#C9A96E] font-bold block uppercase tracking-wider">
                        {activeIng.name}
                      </span>
                      <span className="text-[9px] text-white/50 block mt-0.5">
                        {activeIng.description}
                      </span>
                    </div>
                  </>
                );
              })()}
            </div>
          </motion.div>
        )}

        {/* ─── Scroll down hint ─── */}
        <motion.div
          style={{ opacity: scrollHintOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-40"
        >
          <span className="text-[9px] uppercase tracking-[0.5em] text-white/30 font-medium">
            Deslize para descobrir
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-[#C9A96E]/50" />
          </motion.div>
        </motion.div>

        {/* ─── Phase indicator dots ─── */}
        <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-40">
          {PHASES.map((phase, i) => {
            const phaseOpacities = [phase1Opacity, phase2Opacity, phase3Opacity, phase4Opacity];
            return (
              <motion.div
                key={i}
                style={{ opacity: phaseOpacities[i] }}
                className="flex items-center gap-2"
              >
                <span className="text-[8px] text-[#C9A96E]/60 uppercase tracking-wider hidden md:block">
                  {phase.label.split("—")[0].trim()}
                </span>
                <div className="w-2 h-2 rounded-full bg-[#C9A96E]" />
              </motion.div>
            );
          })}
        </div>

        {/* ─── Bottom progress bar ─── */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 z-40">
          <motion.div
            style={{ scaleX: smooth }}
            className="h-full bg-gradient-to-r from-[#C9A96E]/30 via-[#C9A96E] to-[#C9A96E]/30 origin-left"
          />
        </div>

        {/* ─── Corner frame number (subtle) ─── */}
        <div className="absolute top-6 left-6 md:top-8 md:left-8 z-40">
          <span className="text-[9px] uppercase tracking-[0.3em] text-white/15 font-medium">
            Ingredientes
          </span>
        </div>
      </div>
    </section>
  );
}
