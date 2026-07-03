"use client";

import { PizzaItem } from "@/types/landing";
import { ProductCard } from "@/components/ui/ProductCard";
import { Reveal } from "@/components/ui/Reveal";

interface CardapioDestaquesProps {
  pizzas: PizzaItem[];
}

export function CardapioDestaques({ pizzas }: CardapioDestaquesProps) {
  return (
    <section id="cardapio" className="py-16 sm:py-24 bg-[#FFFDF9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E63946] bg-[#E63946]/10 px-4 py-1.5 rounded-full inline-block mb-3 border border-[#E63946]/20">
              Nosso Cardápio Artesanal
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1D3557]">
              Destaques Irresistíveis dos 3 Irmãos
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#1D3557]/70 font-normal">
              Escolha sua pizza preferida feita com massa de fermentação natural de 48h, molho pelati italiano e assada na perfeição.
            </p>
          </div>
        </Reveal>

        {/* Product Grid */}
        {pizzas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pizzas.map((pizza, idx) => (
              <Reveal key={pizza.id} delay={0.1 * (idx % 3)}>
                <ProductCard pizza={pizza} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-[#F4A261]/40">
            <p className="text-base text-[#1D3557]/70">Nenhuma pizza encontrada para esta categoria.</p>
          </div>
        )}

      </div>
    </section>
  );
}
