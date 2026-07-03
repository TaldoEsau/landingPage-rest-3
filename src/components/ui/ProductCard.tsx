"use client";

import Image from "next/image";
import { PizzaItem } from "@/types/landing";
import { restaurantInfo } from "@/data/restaurantInfo";
import { ShoppingBag, Star, Leaf } from "lucide-react";

interface ProductCardProps {
  pizza: PizzaItem;
}

export function ProductCard({ pizza }: ProductCardProps) {
  const whatsappUrl = `https://wa.me/${restaurantInfo.whatsappNumber}?text=Ol%C3%A1!%20Gostaria%20de%20pedir%20a%20pizza%20*${encodeURIComponent(
    pizza.name
  )}*%20no%20valor%20de%20R%24%20${pizza.price.toFixed(2).replace(".", ",")}.`;

  return (
    <div className="group relative flex flex-col justify-between rounded-3xl border border-[#F4A261]/25 bg-white p-6 shadow-sm hover:shadow-xl hover:border-[#E63946]/40 transition-all duration-300 hover:-translate-y-1.5 overflow-hidden">
      
      {/* Top Section */}
      <div>
        {/* Badge header */}
        <div className="flex items-center justify-between gap-2 mb-4">
          {pizza.badge ? (
            <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
              pizza.isVegetarian
                ? "bg-[#2A9D8F]/15 text-[#2A9D8F] border border-[#2A9D8F]/30"
                : "bg-[#E63946]/10 text-[#E63946] border border-[#E63946]/20"
            }`}>
              {pizza.isVegetarian && <Leaf className="w-3 h-3" />}
              {pizza.badge}
            </span>
          ) : (
            <span className="text-[11px] font-semibold text-[#1D3557]/60 uppercase tracking-wider">
              Artisanal Pizza
            </span>
          )}

          {pizza.isChefRecommendation && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#F4A261] bg-[#F4A261]/10 px-2.5 py-0.5 rounded-full">
              <Star className="w-3 h-3 fill-[#F4A261]" /> Chef Choice
            </span>
          )}
        </div>

        {/* Floating Pizza Image */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto my-3 group-hover:scale-105 transition-transform duration-500 ease-out">
          <Image
            src={pizza.imageUrl}
            alt={pizza.name}
            fill
            className="object-contain drop-shadow-md"
            sizes="(max-width: 640px) 192px, 224px"
          />
        </div>

        {/* Title & Description */}
        <div className="mt-4">
          <h3 className="font-serif text-xl font-bold text-[#1D3557] group-hover:text-[#E63946] transition-colors line-clamp-1">
            {pizza.name}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-[#1D3557]/70 font-normal leading-relaxed line-clamp-3">
            {pizza.description}
          </p>
        </div>

        {/* Ingredients Chips */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {pizza.ingredients.map((ing, idx) => (
            <span
              key={idx}
              className="text-[10px] font-medium bg-[#FFF8F0] text-[#1D3557]/80 px-2.5 py-1 rounded-md border border-[#F4A261]/20"
            >
              {ing}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Section: Price & Order Action */}
      <div className="mt-6 pt-4 border-t border-[#F4A261]/15 flex items-center justify-between gap-4">
        <div>
          <span className="block text-[10px] font-semibold text-[#1D3557]/60 uppercase">Preço</span>
          <div className="flex items-baseline gap-1">
            <span className="font-serif text-2xl font-extrabold text-[#E63946]">
              R$ {pizza.price.toFixed(2).replace(".", ",")}
            </span>
          </div>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-[#1D3557] text-white hover:bg-[#E63946] px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
          aria-label={`Pedir ${pizza.name} no WhatsApp`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Pedir</span>
        </a>
      </div>

    </div>
  );
}
