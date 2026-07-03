"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { restaurantInfo } from "@/data/restaurantInfo";
import { Menu, X, ShoppingBag, Search, ShoppingCart } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0D0D12]/90 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 overflow-hidden rounded-full border border-white/20 bg-[#14141A] p-0.5 shadow-md">
            <Image
              src="/images/logo.png"
              alt="Logo Pizzaria 3 Irmãos"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              priority
            />
          </div>
          <div>
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-[#F4A261] transition-colors">
              3 Irmãos
            </span>
            <span className="block text-[9px] uppercase tracking-widest text-[#E63946] font-extrabold -mt-1">
              Pizzaria Artesanal
            </span>
          </div>
        </a>

        {/* Center Floating Navigation Bar (Inspired by Screenshot) */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#1A1A24]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-inner">
          <a
            href="#"
            onClick={() => setActiveTab("home")}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
              activeTab === "home"
                ? "bg-white text-[#0D0D12] shadow-md font-bold"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Início
          </a>
          <a
            href="#cardapio"
            onClick={() => setActiveTab("cardapio")}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
              activeTab === "cardapio"
                ? "bg-white text-[#0D0D12] shadow-md font-bold"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Cardápio
          </a>
          <a
            href="#forno-showcase"
            onClick={() => setActiveTab("forno")}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
              activeTab === "forno"
                ? "bg-white text-[#0D0D12] shadow-md font-bold"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Forno a Lenha
          </a>
          <a
            href="#avaliacoes"
            onClick={() => setActiveTab("avaliacoes")}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
              activeTab === "avaliacoes"
                ? "bg-white text-[#0D0D12] shadow-md font-bold"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Avaliações
          </a>
          <a
            href="#historia"
            onClick={() => setActiveTab("historia")}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
              activeTab === "historia"
                ? "bg-white text-[#0D0D12] shadow-md font-bold"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Nossa História
          </a>
        </nav>

        {/* Right Action Icons & Button */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="#cardapio"
            className="w-10 h-10 rounded-full bg-[#1A1A24] border border-white/10 hover:border-white/30 flex items-center justify-center text-gray-300 hover:text-white transition-all"
            aria-label="Buscar no Cardápio"
          >
            <Search className="w-4 h-4" />
          </a>

          <a
            href={restaurantInfo.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-10 h-10 rounded-full bg-[#1A1A24] border border-white/10 hover:border-[#E63946]/50 flex items-center justify-center text-gray-300 hover:text-[#E63946] transition-all"
            aria-label="Carrinho de Pedidos"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E63946] text-white text-[9px] font-bold flex items-center justify-center">
              1
            </span>
          </a>

          <a
            href={restaurantInfo.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#E63946] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-glow-red hover:bg-[#d62839] hover:scale-105 transition-all duration-300"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Pedir Agora</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-white hover:text-[#E63946] transition-colors focus:outline-none"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0D0D12]/95 backdrop-blur-2xl border-b border-white/10 px-6 pt-4 pb-6 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-4 text-base font-semibold text-white">
            <a
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#F4A261] py-2 border-b border-white/10"
            >
              Início
            </a>
            <a
              href="#cardapio"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#F4A261] py-2 border-b border-white/10"
            >
              Cardápio Completo
            </a>
            <a
              href="#forno-showcase"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#F4A261] py-2 border-b border-white/10"
            >
              Experiência Forno a Lenha
            </a>
            <a
              href="#avaliacoes"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#F4A261] py-2 border-b border-white/10"
            >
              Avaliações do Google
            </a>
            <a
              href="#historia"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#F4A261] py-2 border-b border-white/10"
            >
              Nossa História
            </a>
            <a
              href={restaurantInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#E63946] text-white px-5 py-3 rounded-full text-sm font-bold uppercase tracking-wider shadow-glow-red mt-2"
            >
              <ShoppingBag className="w-5 h-5" />
              Pedir Agora pelo WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
