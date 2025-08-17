export interface CartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedTotal: number;
  thumbnail: string;
}

export interface Cart {
  id: number;
  userId: number;
  products: CartProduct[];
  total: number;
  discountedTotal: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface Product {
  id: number;
  title: string;
  images: string[];
  category: string;
  price: number;
  rating: number;

  sku?: string;
  stock?: number;
  availabilityStatus?: string;
  quantity?: number;
  totalQuantity?: number;
}

export interface Recipe {
  id: number;
  name: string;
  cuisine: string;
  difficulty: string;
  cookTimeMinutes: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  mealType: string[];
  image?: string;
}

interface Reactions {
  likes: number;
  dislikes: number;
}

export interface Post {
  title: string;
  body: string;
  tags: string[];
  views: number;
  reactions?: Reactions;
}

export interface MenuItem {
  name: string;
  link: string;
  icon: ReactNode;
}
