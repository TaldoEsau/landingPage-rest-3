import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Pizzaria 3 Irmãos | A Verdadeira Tradição da Pizza Artesanal",
  description:
    "Pizzaria 3 Irmãos - Pizzas artesanais assadas no forno a lenha, massa de fermentação natural e ingredientes frescos. Faça seu pedido com entrega rápida em até 30 minutos!",
  keywords: [
    "Pizzaria 3 Irmãos",
    "Pizza artesanal",
    "Forno a lenha",
    "Delivery de pizza",
    "Pizza de fermentação natural",
    "Cardápio Pizzaria 3 Irmãos",
  ],
  openGraph: {
    title: "Pizzaria 3 Irmãos | Sabor que Une a Família",
    description:
      "Ingredientes selecionados, massa artesanal assada no forno a lenha e entrega rápida. Peça já!",
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: "/images/pizza.png",
        width: 1200,
        height: 630,
        alt: "Pizzaria 3 Irmãos Pizza Destaque",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased bg-[#FFFDF9] text-[#1D3557] selection:bg-[#E63946] selection:text-white">
        {children}
      </body>
    </html>
  );
}
