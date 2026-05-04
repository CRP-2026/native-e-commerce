import type { Category } from '~/lib/types/models';
import type { ProductDetail, ProductFilter, ProductSummary } from '~/lib/types/products';

import { apiGet } from '~/lib/api/client';

function buildProductsQuery(filter?: ProductFilter): string {
  const q = new URLSearchParams();
  if (filter?.categoryId) q.set('category_id', filter.categoryId);
  if (filter?.minPrice != null) q.set('min_price', String(filter.minPrice));
  if (filter?.maxPrice != null) q.set('max_price', String(filter.maxPrice));
  if (filter?.search) q.set('search', filter.search);
  const s = q.toString();
  return s ? `?${s}` : '';
}

export async function fetchCategories(): Promise<Category[]> {
  return apiGet<Category[]>('categories');
}

export async function fetchProducts(filter?: ProductFilter): Promise<ProductSummary[]> {
  const q = buildProductsQuery(filter);
  return apiGet<ProductSummary[]>(`products${q}`);
}

export async function fetchProductById(id: string): Promise<ProductDetail> {
  return apiGet<ProductDetail>(`products/${encodeURIComponent(id)}`);
}
