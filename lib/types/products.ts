import { Product } from './models';
export interface ProductVariant {
  id: string;
  color?: string;
  sku?: string;
  price: number;
  stock: number;
  image?: string;
}

export interface ProductDetail extends Product {
  images?: string[];
  description: string;
}

export type ProductFilter = {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
};
