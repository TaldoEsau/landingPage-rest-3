"use client";

import { CategoryFilter } from "@/types/landing";
import { categories } from "@/data/menuData";

interface CategoriasProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

export function Categorias({ activeCategory, onSelectCategory }: CategoriasProps) {
  return (
    <div className="bg-[#FFFDF9] border-y border-[#F4A261]/20 py-6 sticky top-[68px] z-30 shadow-xs backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-start sm:justify-center gap-3 overflow-x-auto no-scrollbar py-1 scroll-smooth">
          {categories.map((cat: CategoryFilter) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`shrink-0 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-[#E63946] text-white shadow-glow-red scale-105"
                    : "bg-white text-[#1D3557] border border-[#F4A261]/30 hover:border-[#E63946] hover:bg-[#FFF8F0]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
