export interface PizzaItem {
  id: string;
  name: string;
  category: 'classicas' | 'especiais' | 'doces' | 'combos' | 'bebidas';
  description: string;
  ingredients: string[];
  price: number;
  promoPrice?: number;
  imageUrl: string;
  badge?: string;
  isChefRecommendation?: boolean;
  isVegetarian?: boolean;
}

export interface CategoryFilter {
  id: 'todas' | 'classicas' | 'especiais' | 'doces' | 'combos' | 'bebidas';
  label: string;
  count?: number;
}

export interface GoogleReview {
  author_name: string;
  author_url?: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  details?: string;
}

export interface GooglePlaceDetails {
  name: string;
  formatted_address: string;
  rating: number;
  user_ratings_total: number;
  url: string;
  reviews: GoogleReview[];
}

export interface PromotionCombo {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  originalPrice: number;
  promoPrice: number;
  imageUrl: string;
  whatsappMessage: string;
}

export interface QualityPillar {
  title: string;
  description: string;
  iconName: 'Delivery' | 'Leaf' | 'Pizza' | 'Flame';
  highlightText: string;
}
