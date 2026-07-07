"use client";

import { restaurantInfo } from "@/data/restaurantInfo";
import { MapPin, Clock, MessageCircle } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

export function Footer() {
  return (
    <footer id="contato" className="bg-black pt-20 pb-10 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-14 border-b border-white/[0.04]">
          
          {/* Brand */}
          <div className="lg:col-span-4 space-y-5">
            <div>
              <span className="font-serif text-3xl font-bold tracking-[0.15em] text-white block">
                DAMA
              </span>
              <span className="text-[9px] uppercase tracking-[0.35em] text-[#C9A96E] font-medium">
                Pizzaria
              </span>
            </div>

            <p className="text-xs sm:text-sm text-white/30 font-light leading-relaxed max-w-xs">
              {restaurantInfo.tagline}. Um espaço único para momentos inesquecíveis com gastronomia artesanal.
            </p>

            <div className="flex items-center gap-4 pt-1">
              <a
                href={restaurantInfo.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/10 hover:border-[#C9A96E]/40 flex items-center justify-center text-white/40 hover:text-[#C9A96E] transition-all duration-300"
                aria-label="Instagram da Dama Pizzaria"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={restaurantInfo.socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/10 hover:border-[#C9A96E]/40 flex items-center justify-center text-white/40 hover:text-[#C9A96E] transition-all duration-300"
                aria-label="WhatsApp da Dama Pizzaria"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#C9A96E] font-semibold mb-5">
              Navegação
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-white/30 font-light">
              <li>
                <a href="#" className="hover:text-[#C9A96E] transition-colors duration-300">
                  Início
                </a>
              </li>
              <li>
                <a href="#experiencia" className="hover:text-[#C9A96E] transition-colors duration-300">
                  Experiência
                </a>
              </li>
              <li>
                <a href="#diferenciais" className="hover:text-[#C9A96E] transition-colors duration-300">
                  Diferenciais
                </a>
              </li>
              <li>
                <a href="#galeria" className="hover:text-[#C9A96E] transition-colors duration-300">
                  Galeria
                </a>
              </li>
              <li>
                <a href="#espaco" className="hover:text-[#C9A96E] transition-colors duration-300">
                  Nosso Espaço
                </a>
              </li>
            </ul>
          </div>

          {/* Location & Hours */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#C9A96E] font-semibold mb-5">
              Visite-nos
            </h4>
            
            <div className="space-y-4 text-xs sm:text-sm text-white/30 font-light">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C9A96E]/50 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-white/50 font-medium">{restaurantInfo.address}</span>
                  <span className="text-white/25">{restaurantInfo.cityState}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#C9A96E]/50 shrink-0" />
                <span>{restaurantInfo.openingHours}</span>
              </div>
            </div>

            <a
              href={restaurantInfo.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-medium text-[#C9A96E]/50 hover:text-[#C9A96E] transition-colors duration-300 pt-2"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Ver no Google Maps</span>
            </a>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-white/15 uppercase tracking-[0.2em]">
          <p>© {new Date().getFullYear()} Dama Pizzaria. Todos os direitos reservados.</p>
          <p>Santa Fé do Sul — SP</p>
        </div>

      </div>
    </footer>
  );
}
