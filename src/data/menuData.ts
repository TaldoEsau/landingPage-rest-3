import { PizzaItem, CategoryFilter, PromotionCombo, QualityPillar } from "@/types/landing";

export const categories: CategoryFilter[] = [
  { id: "todas", label: "Todas as Pizzas" },
  { id: "especiais", label: "Especiais dos Irmãos" },
  { id: "classicas", label: "Clássicas Tradicionais" },
  { id: "combos", label: "Combos Família" },
  { id: "doces", label: "Pizzas Doces" },
];

export const pizzaMenu: PizzaItem[] = [
  {
    id: "pizza-3-irmaos-especial",
    name: "Especial dos 3 Irmãos",
    category: "especiais",
    description: "Molho rústico de tomate italiano, muçarela especial, peperoni artesanal premium, gorgonzola cremoso e manjericão fresco picado.",
    ingredients: ["Molho Rústico", "Muçarela Especial", "Peperoni", "Gorgonzola", "Manjericão"],
    price: 69.90,
    imageUrl: "/images/transparent/pizza-especial.png",
    badge: "Mais Pedida",
    isChefRecommendation: true,
  },
  {
    id: "pizza-margherita-gourmet",
    name: "Margherita Forno a Lenha",
    category: "classicas",
    description: "Massa de fermentação natural de 48h, molho pelati italiano, rodelas finas de tomate sweet grape, muçarela de búfala e azeite extravirgem.",
    ingredients: ["Molho Pelati", "Tomate Sweet Grape", "Muçarela de Búfala", "Azeite de Oliva"],
    price: 59.90,
    imageUrl: "/images/transparent/pizza-margherita.png",
    badge: "100% Artesanal",
    isVegetarian: true,
  },
  {
    id: "pizza-calabresa-artesanal",
    name: "Calabresa Defumada Suprema",
    category: "classicas",
    description: "Calabresa artesanal levemente apimentada, cebola roxa marinada no azeite, catupiry original e azeitonas pretas azapa.",
    ingredients: ["Calabresa Defumada", "Cebola Roxa", "Catupiry Original", "Azeitonas Azapa"],
    price: 54.90,
    imageUrl: "/images/transparent/pizza-calabresa.png",
    badge: "Tradição da Casa",
  },
  {
    id: "pizza-frango-catupiry-gourmet",
    name: "Frango Supremo ao Catupiry",
    category: "especiais",
    description: "Peito de frango desfiado temperado com ervas finas, catupiry borda recheada, milho verde selecionado e alho frito dourado.",
    ingredients: ["Frango com Ervas", "Catupiry Original", "Milho Verde", "Alho Crocante"],
    price: 64.90,
    imageUrl: "/images/transparent/pizza-hero.png",
    badge: "Sugestão do Chef",
    isChefRecommendation: true,
  },
  {
    id: "pizza-quatro-queijos-premium",
    name: "Quatro Queijos Seleção Reserva",
    category: "especiais",
    description: "Combinação harmoniosa de muçarela curada, requeijão cremoso de roça, provolone defumado e lâminas sutis de gorgonzola.",
    ingredients: ["Muçarela Curada", "Requeijão de Roça", "Provolone Defumado", "Gorgonzola"],
    price: 68.90,
    imageUrl: "/images/transparent/pizza-oven.png",
    badge: "Sabor Marcante",
  },
  {
    id: "pizza-chocolate-morango",
    name: "Chocolatissimo com Morangos",
    category: "doces",
    description: "Massa levemente crocante coberta com puro chocolate ao leite trufado, morangos frescos fatiados e raspas de chocolate meio amargo.",
    ingredients: ["Chocolate Trufado", "Morangos Frescos", "Raspas de Chocolate"],
    price: 49.90,
    imageUrl: "/images/transparent/pizza-margherita.png",
    badge: "Sobremesa Irresistível",
  },
];

export const mainCombo: PromotionCombo = {
  id: "combo-familia-3irmaos",
  title: "Combo Família 3 Irmãos",
  subtitle: "O Banquete Perfeito Para a Sua Noite!",
  description: "Peça 2 Pizzas Grandes da linha Clássica ou Especial + 1 Guaraná Antarctica 2L + 1 Borda Recheada de Catupiry ou Chocolate de cortesia.",
  badge: "Economize R$ 28,00",
  originalPrice: 147.80,
  promoPrice: 119.80,
  imageUrl: "/images/transparent/pizza-hero.png",
  whatsappMessage: "Ol%C3%A1!%20Quero%20aproveitar%20o%20*Combo%20Fam%C3%ADlia%203%20Irm%C3%A3os*%20por%20R%24%20119%2C80!",
};

export const qualityPillars: QualityPillar[] = [
  {
    title: "Entrega Super Rápida",
    description: "Sua pizza chega quentinha e crocante na sua porta em até 30 minutos.",
    iconName: "Delivery",
    highlightText: "Até 30 Minutos",
  },
  {
    title: "Ingredientes Selecionados",
    description: "Produtos 100% frescos, hortaliças orgânicas e queijos artesanais rigorosamente testados.",
    iconName: "Leaf",
    highlightText: "100% Frescos",
  },
  {
    title: "Massa de Fermentação Natural",
    description: "Massa leve, aerada e de digestão perfeita após 48 horas de maturação a frio.",
    iconName: "Pizza",
    highlightText: "Maturação 48h",
  },
  {
    title: "Assado no Forno a Lenha",
    description: "O sabor defumado autêntico e a crosta dourada que só a lenha de reflorestamento proporciona.",
    iconName: "Flame",
    highlightText: "Forno a Lenha",
  },
];
