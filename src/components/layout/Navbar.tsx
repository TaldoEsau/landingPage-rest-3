"use client";

import { useState, useEffect } from "react";
import { restaurantInfo } from "@/data/restaurantInfo";
import { Menu, X } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Início", href: "#" },
    { label: "Experiência", href: "#experiencia" },
    { label: "Nosso Espaço", href: "#espaco" },
    { label: "Galeria", href: "#galeria" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass-dark border-b border-white/[0.06] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        
        {/* Brand Logo — Typographic */}
        <a href="#" className="group flex flex-col items-start">
          <span className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.15em] text-white group-hover:text-[#C9A96E] transition-colors duration-300">
            DAMA
          </span>
          <span className="text-[9px] uppercase tracking-[0.35em] text-[#C9A96E] font-medium -mt-0.5">
            Pizzaria
          </span>
        </a>

        {/* Center Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[13px] uppercase tracking-[0.2em] text-white/60 hover:text-white font-medium transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#C9A96E] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden sm:flex items-center gap-5">
          <a
            href={restaurantInfo.socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-[#C9A96E] transition-colors duration-300"
            aria-label="Instagram da Dama Pizzaria"
          >
            <InstagramIcon className="w-4.5 h-4.5" />
          </a>

          <a
            href={restaurantInfo.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#C9A96E] border border-[#C9A96E]/40 hover:bg-[#C9A96E] hover:text-black px-6 py-2.5 transition-all duration-300"
          >
            Reservar Mesa
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-white hover:text-[#C9A96E] transition-colors focus:outline-none"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-dark border-t border-white/[0.06] px-6 pt-6 pb-8">
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-[0.2em] text-white/70 hover:text-[#C9A96E] transition-colors font-medium py-1 border-b border-white/[0.04]"
              >
                {link.label}
              </a>
            ))}
            <a
              href={restaurantInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center text-xs uppercase tracking-[0.2em] font-semibold text-[#C9A96E] border border-[#C9A96E]/40 hover:bg-[#C9A96E] hover:text-black px-6 py-3 transition-all duration-300 mt-2"
            >
              Reservar Mesa
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
