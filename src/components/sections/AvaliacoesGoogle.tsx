"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { ReviewAvatar } from "@/components/ui/ReviewAvatar";
import { GooglePlaceDetails, GoogleReview } from "@/types/landing";
import { Star, ExternalLink } from "lucide-react";

export function AvaliacoesGoogle() {
  const [placeData, setPlaceData] = useState<GooglePlaceDetails | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/google-reviews")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setPlaceData(json.data);
        }
      })
      .catch((err) => console.warn("Erro ao buscar avaliações do Google:", err));
  }, []);

  const data = placeData;
  const reviewsList = data?.reviews || [];
  const marqueeReviews = [...reviewsList, ...reviewsList, ...reviewsList, ...reviewsList];

  // Auto-scroll contínuo via requestAnimationFrame
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || reviewsList.length === 0) return;

    let animationId: number;
    let isHovered = false;

    const handleMouseEnter = () => { isHovered = true; };
    const handleMouseLeave = () => { isHovered = false; };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("touchstart", handleMouseEnter, { passive: true });
    container.addEventListener("touchend", handleMouseLeave, { passive: true });

    const scrollStep = () => {
      if (!isHovered && container) {
        container.scrollLeft += 0.75;
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scrollStep);
    };

    animationId = requestAnimationFrame(scrollStep);

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("touchstart", handleMouseEnter);
      container.removeEventListener("touchend", handleMouseLeave);
    };
  }, [reviewsList]);

  return (
    <section id="avaliacoes" className="py-20 sm:py-28 bg-gradient-to-b from-[#FFFDF9] via-[#FFF8F0] to-[#FFFDF9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#2A9D8F] bg-[#2A9D8F]/10 px-4 py-1.5 rounded-full mb-3 border border-[#2A9D8F]/20">
                Google Meu Negócio
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1D3557]">
                O Que Dizem Nossos Clientes
              </h2>
              <p className="mt-2 text-sm text-[#1D3557]/70">
                Depoimentos reais de quem já comprovou o sabor único da Pizzaria 3 Irmãos.
              </p>
            </div>

            {/* Google Rating Aggregate Card */}
            <div className="flex items-center gap-5 bg-white p-4 sm:p-5 rounded-2xl border border-[#F4A261]/30 shadow-sm shrink-0">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif text-3xl font-extrabold text-[#E63946]">
                    {data ? data.rating.toFixed(1).replace(".", ",") : "4,9"}
                  </span>
                  <div className="flex text-[#F4A261] text-sm">
                    <Star className="w-4 h-4 fill-[#F4A261]" />
                    <Star className="w-4 h-4 fill-[#F4A261]" />
                    <Star className="w-4 h-4 fill-[#F4A261]" />
                    <Star className="w-4 h-4 fill-[#F4A261]" />
                    <Star className="w-4 h-4 fill-[#F4A261]" />
                  </div>
                </div>
                <p className="text-xs text-[#1D3557]/70 font-medium mt-0.5">
                  {data?.user_ratings_total || 742} avaliações verificadas
                </p>
              </div>

              <a
                href={data?.url || "https://maps.google.com/?q=Pizzaria+3+Irmaos"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#1D3557] hover:bg-[#E63946] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all duration-300 hover:scale-105"
              >
                <span>Avaliar</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Marquee Carousel Container */}
      <div className="relative w-full overflow-hidden">
        {/* Side Gradients */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 sm:w-28 bg-gradient-to-r from-[#FFF8F0] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 sm:w-28 bg-gradient-to-l from-[#FFF8F0] to-transparent" />

        <div
          ref={scrollRef}
          className="no-scrollbar flex gap-6 overflow-x-auto px-6 py-4 scroll-smooth"
        >
          {marqueeReviews.map((review: GoogleReview, idx: number) => (
            <div
              key={`${review.author_name}-${idx}`}
              className="flex w-[300px] sm:w-[350px] shrink-0 flex-col justify-between rounded-3xl border border-[#F4A261]/25 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-[#E63946]/40"
            >
              <div>
                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <ReviewAvatar photoUrl={review.profile_photo_url} name={review.author_name} />
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-serif text-sm font-bold text-[#1D3557]">
                      {review.author_name}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="flex text-[#F4A261] text-xs">★★★★★</div>
                      <span className="text-[11px] text-[#1D3557]/60">
                        {review.relative_time_description}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Review Text */}
                <p className="mt-4 text-xs sm:text-sm leading-relaxed text-[#1D3557]/80 font-normal line-clamp-4 italic">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              {/* Google Verified Footer */}
              <div className="mt-5 flex items-center justify-between border-t border-[#F4A261]/15 pt-3.5 text-[11px] text-[#1D3557]/60 font-medium">
                <span className="flex items-center gap-1.5 text-[#1D3557]">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                  </svg>
                  Avaliação Google
                </span>
                <span>{review.details || "Verificado"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
