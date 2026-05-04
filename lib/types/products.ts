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
  shortDescription?: string | null;
  currency?: string;
  attributes?: Record<string, unknown> | null;
}

/** List card + catalog list response (subset of ProductDetail allowed). */
export type ProductSummary = Pick<
  ProductDetail,
  'id' | 'name' | 'image' | 'description' | 'price' | 'rating' | 'reviews' | 'discount' | 'variants'
> & { categoryId?: string };

export type ProductFilter = {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
};
