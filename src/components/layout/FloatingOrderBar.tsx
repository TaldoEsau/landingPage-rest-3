"use client";

import { useEffect, useState } from "react";
import { restaurantInfo } from "@/data/restaurantInfo";
import { ShoppingBag, Flame } from "lucide-react";

export function FloatingOrderBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 sm:hidden animate-in slide-in-from-bottom duration-300">
      <div className="bg-[#1D3557]/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#F4A261]/30 shadow-2xl flex items-center justify-between gap-3 text-white">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-[#E63946] flex items-center justify-center text-white shrink-0 animate-pulse">
            <Flame className="w-5 h-5 fill-white" />
          </div>
          <div>
            <span className="block text-xs font-bold leading-tight">Fazer Pedido</span>
            <span className="text-[10px] text-[#F4A261] font-medium">Entrega em até 30m</span>
          </div>
        </div>

        <a
          href={restaurantInfo.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#E63946] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-glow-red active:scale-95 transition-all"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Pedir Já</span>
        </a>
      </div>
    </div>
  );
}
