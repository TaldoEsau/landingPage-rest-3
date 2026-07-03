"use client";

import Image from "next/image";
import { restaurantInfo } from "@/data/restaurantInfo";
import { MapPin, Phone, Clock, MessageCircle, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1D3557] text-white pt-16 pb-12 border-t border-[#F4A261]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-gray-700/60">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 overflow-hidden rounded-full border-2 border-[#E63946] bg-white p-0.5 shadow-sm">
                <Image
                  src="/images/logo.png"
                  alt="Logo Pizzaria 3 Irmãos"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-white tracking-tight">
                  3 Irmãos
                </span>
                <span className="block text-[10px] uppercase tracking-widest text-[#F4A261] font-semibold">
                  Pizzaria Artesanal
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-300 font-normal leading-relaxed">
              {restaurantInfo.tagline}. Tradição em pizzas artesanais de fermentação natural assadas no forno a lenha com entrega rápida.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={restaurantInfo.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#E63946] flex items-center justify-center text-white transition-colors"
                aria-label="Instagram da Pizzaria 3 Irmãos"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={restaurantInfo.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#E63946] flex items-center justify-center text-white transition-colors"
                aria-label="Facebook da Pizzaria 3 Irmãos"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
              <a
                href={restaurantInfo.socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#2A9D8F] flex items-center justify-center text-white transition-colors"
                aria-label="WhatsApp da Pizzaria 3 Irmãos"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-base font-bold text-[#F4A261] uppercase tracking-wider">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-300 font-normal">
              <li>
                <a href="#cardapio" className="hover:text-[#E63946] transition-colors">
                  Cardápio de Pizzas
                </a>
              </li>
              <li>
                <a href="#diferenciais" className="hover:text-[#E63946] transition-colors">
                  Diferenciais de Qualidade
                </a>
              </li>
              <li>
                <a href="#promo" className="hover:text-[#E63946] transition-colors">
                  Combo Família Promocional
                </a>
              </li>
              <li>
                <a href="#avaliacoes" className="hover:text-[#E63946] transition-colors">
                  Avaliações no Google
                </a>
              </li>
              <li>
                <a href="#historia" className="hover:text-[#E63946] transition-colors">
                  História dos 3 Irmãos
                </a>
              </li>
            </ul>
          </div>

          {/* Location & Hours */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="font-serif text-base font-bold text-[#F4A261] uppercase tracking-wider">
              Atendimento e Localização
            </h4>
            
            <div className="space-y-3 text-xs sm:text-sm text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#E63946] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-white">{restaurantInfo.address}</span>
                  <span className="text-gray-400">{restaurantInfo.cityState}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#F4A261] shrink-0" />
                <span>{restaurantInfo.openingHours}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#2A9D8F] shrink-0" />
                <span>{restaurantInfo.phone}</span>
              </div>
            </div>

            <a
              href={restaurantInfo.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#F4A261] hover:text-white transition-colors underline pt-1"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Ver localização no Google Maps</span>
            </a>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Pizzaria 3 Irmãos. Todos os direitos reservados.</p>
          <p className="flex items-center justify-center gap-1">
            <span>Desenvolvido com</span>
            <Heart className="w-3.5 h-3.5 text-[#E63946] fill-[#E63946]" />
            <span>para a comunidade.</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
