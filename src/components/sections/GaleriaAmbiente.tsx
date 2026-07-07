"use client";

import { useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

const galleryImages = [
  {
    src: "/images/newImages/damapizzaria•Seguir - 1080w (1).jpg",
    alt: "Dama Pizzaria — Ambiente e identidade",
    caption: "Identidade",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/images/newImages/damapizzaria•Seguir - 1080w.jpg",
    alt: "Dama Pizzaria — Pizza artesanal no espaço",
    caption: "Gastronomia",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    src: "/images/newImages/damapizzaria•SeguirDama Pizzaria - Santa Fé do Sul - 1080w (3).jpg",
    alt: "Dama Pizzaria — Pizza no forno",
    caption: "Forno a Lenha",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    src: "/images/newImages/damapizzaria•SeguirDama Pizzaria - Santa Fé do Sul - 1080w (5).jpg",
    alt: "Dama Pizzaria — Duas pizzas servidas",
    caption: "Para Compartilhar",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    src: "/images/newImages/damapizzaria•SeguirDama Pizzaria - Santa Fé do Sul - 1080w (6).jpg",
    alt: "Dama Pizzaria — Pizza gourmet",
    caption: "Sabor Autêntico",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    src: "/images/newImages/damapizzaria•SeguirDama Pizzaria - Santa Fé do Sul - 1080w (4).jpg",
    alt: "Dama Pizzaria — Pizza doce artesanal",
    caption: "Doce Tentação",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    src: "/images/newImages/damapizzaria•SeguirDama Pizzaria - Santa Fé do Sul - 1080w.jpg",
    alt: "Dama Pizzaria — Pizza com queijo artesanal",
    caption: "Artesanal",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    src: "/images/newImages/damapizzaria•SeguirDama Pizzaria - Santa Fé do Sul - 1080w (1).jpg",
    alt: "Dama Pizzaria — Close da pizza",
    caption: "Detalhes",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    src: "/images/newImages/damapizzaria•SeguirDama Pizzaria - Santa Fé do Sul - 1080w (2).jpg",
    alt: "Dama Pizzaria — Ingredientes frescos",
    caption: "Ingredientes",
    span: "md:col-span-2 md:row-span-1",
  },
];

export function GaleriaAmbiente() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section id="galeria" className="py-24 sm:py-32 bg-black relative overflow-hidden">

      {/* Subtle decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-16 bg-gradient-to-b from-[#C9A96E]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.5em] text-[#C9A96E] font-medium block mb-4">
              Galeria
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-wide mb-5">
              Nossos Momentos
            </h2>
            <div className="mx-auto w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent mb-5" />
            <p className="text-sm sm:text-base text-white/40 font-light leading-relaxed">
              Cada imagem conta uma história de sabor, tradição e elegância.
            </p>
          </div>
        </Reveal>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4">
          {galleryImages.map((image, idx) => (
            <Reveal key={idx} delay={0.05 * idx}>
              <div
                className={`${image.span} relative group cursor-pointer overflow-hidden`}
                onClick={() => setSelectedImage(idx)}
              >
                <div className="relative w-full h-64 md:h-full min-h-[240px]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500" />
                  
                  {/* Caption on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="text-[10px] uppercase tracking-[0.4em] text-[#C9A96E] font-medium block mb-1">
                        {image.caption}
                      </span>
                      <div className="w-8 h-[1px] bg-[#C9A96E]/40 mx-auto" />
                    </div>
                  </div>

                  {/* Subtle border on hover */}
                  <div className="absolute inset-0 border border-transparent group-hover:border-[#C9A96E]/20 transition-colors duration-500 pointer-events-none" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-8 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-4xl max-h-[85vh]">
            <Image
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].alt}
              width={1200}
              height={800}
              className="w-full h-auto max-h-[85vh] object-contain"
            />
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-center">
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#C9A96E]/60 font-medium">
                {galleryImages[selectedImage].caption}
              </span>
            </div>
          </div>
          
          {/* Close hint */}
          <span className="absolute top-6 right-8 text-[10px] uppercase tracking-[0.3em] text-white/30 font-medium">
            Clique para fechar
          </span>
        </div>
      )}
    </section>
  );
}
