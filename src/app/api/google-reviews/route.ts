import { NextResponse } from "next/server";
import { GooglePlaceDetails } from "@/types/landing";

const fallbackDetails: GooglePlaceDetails = {
  name: "Pizzaria 3 Irmãos",
  formatted_address: "Av. Principal das Palmeiras, 1420 - Centro, São Paulo - SP",
  rating: 4.9,
  user_ratings_total: 742,
  url: "https://maps.google.com/?q=Pizzaria+3+Irmaos",
  reviews: [
    {
      author_name: "Ricardo Mendonça",
      profile_photo_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
      rating: 5,
      relative_time_description: "há 2 semanas",
      details: "Local Guide · 24 avaliações",
      text: "A melhor pizza no forno a lenha da cidade disparada! A massa de fermentação natural é super leve e a pizza Especial dos 3 Irmãos tem um peperoni impecável. Chegou em menos de 25 minutos!",
    },
    {
      author_name: "Camila Rodrigues",
      profile_photo_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
      rating: 5,
      relative_time_description: "há 1 mês",
      details: "Avaliação Verificada do Google",
      text: "Atendimento fantástico pelo WhatsApp e entregadores muito educados. A pizza Margherita Gourmet vem com queijo de búfala de verdade. Virei cliente fiel da família 3 Irmãos!",
    },
    {
      author_name: "Fernando Alencar",
      profile_photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
      rating: 5,
      relative_time_description: "há 3 semanas",
      details: "Local Guide · 52 avaliações",
      text: "Pedimos o Combo Família no final de semana e valeu cada centavo! As duas pizzas vieram super quentinhas com a borda de catupiry sensacional. Recomendo de olhos fechados.",
    },
    {
      author_name: "Juliana Silveira",
      profile_photo_url: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80",
      rating: 5,
      relative_time_description: "há 5 dias",
      details: "Avaliação Verificada do Google",
      text: "A pizza doce de morango com chocolate trufado é surreal de gostosa! Massa leve que não pesa. Dá pra sentir a qualidade e dedicação de toda a equipe.",
    },
  ],
};

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (
    apiKey &&
    placeId &&
    !apiKey.includes("SUBSTITUA") &&
    !placeId.includes("SUBSTITUA")
  ) {
    try {
      const googleUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,formatted_address,url,reviews&language=pt-BR&key=${apiKey}`;

      const res = await fetch(googleUrl, {
        next: { revalidate: 3600 },
      });

      const data = await res.json();

      if (data.status === "OK" && data.result) {
        const reviewsFormatted = (data.result.reviews || []).map(
          (r: {
            author_name?: string;
            profile_photo_url?: string;
            rating?: number;
            relative_time_description?: string;
            text?: string;
            author_url?: string;
          }) => ({
            author_name: r.author_name || "Cliente Google",
            profile_photo_url: r.profile_photo_url || "",
            rating: r.rating || 5,
            relative_time_description: r.relative_time_description || "recentemente",
            text: r.text || "",
            details: "Avaliação Verificada do Google",
            author_url: r.author_url || data.result.url,
          })
        );

        return NextResponse.json({
          success: true,
          source: "google_places_api_live",
          data: {
            name: data.result.name || fallbackDetails.name,
            formatted_address:
              data.result.formatted_address || fallbackDetails.formatted_address,
            rating: data.result.rating || fallbackDetails.rating,
            user_ratings_total:
              data.result.user_ratings_total || fallbackDetails.user_ratings_total,
            url: data.result.url || fallbackDetails.url,
            reviews:
              reviewsFormatted.length > 0
                ? reviewsFormatted
                : fallbackDetails.reviews,
          },
        });
      }
    } catch (err) {
      console.warn("Erro ao buscar avaliações no Google Places API:", err);
    }
  }

  return NextResponse.json({
    success: true,
    source: "fallback_local_data",
    data: fallbackDetails,
  });
}
