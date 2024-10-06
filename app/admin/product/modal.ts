export interface ProductCardProps {
  id: string;
  images: string[];
  name: string;
  description?: string;
  price: string;
  oldPrice: string;
  discount: string;
  rating?: number;
  reviews?: number;
  badgeText?: string;
  stock?: boolean;
}
