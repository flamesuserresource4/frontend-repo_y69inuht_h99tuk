export interface Product {
  id?: string;
  title: string;
  description?: string;
  price: number;
  category: string;
  ingredients: string[];
  image_url?: string;
  gallery?: string[];
  in_stock?: boolean;
  stock_count?: number;
  rating?: number;
  reviews_count?: number;
  popularity?: number;
  tags?: string[];
}
