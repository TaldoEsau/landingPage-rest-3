import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700", "800", "900"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Dama Pizzaria | Elegância e Sabor em Santa Fé do Sul",
  description:
    "Dama Pizzaria — Um espaço único onde a elegância encontra o sabor. Ambiente sofisticado, gastronomia artesanal com forno a lenha e momentos inesquecíveis em Santa Fé do Sul.",
  keywords: [
    "Dama Pizzaria",
    "Pizzaria Santa Fé do Sul",
    "Restaurante sofisticado",
    "Pizza artesanal",
    "Forno a lenha",
    "Ambiente elegante",
  ],
  openGraph: {
    title: "Dama Pizzaria | Onde a Elegância Encontra o Sabor",
    description:
      "Descubra um espaço pensado para proporcionar momentos únicos. Gastronomia artesanal e ambiente sofisticado.",
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: "/images/newImages/damapizzaria•Seguir - 1080w.jpg",
        width: 1200,
        height: 630,
        alt: "Dama Pizzaria — Ambiente Sofisticado",
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
    <html lang="pt-BR" className={`${playfair.variable} ${cormorant.variable}`}>
      <body className="antialiased bg-black text-white">
        {children}
      </body>
    </html>
  );
}
