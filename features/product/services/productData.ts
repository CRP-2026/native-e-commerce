import type { Product, ProductDetail, ProductSummary, ProductVariant } from '~/lib/types/products';

const PRODUCTS: ProductDetail[] = [
  {
    id: 'jewelry-set-01',
    name: 'Pearl & Gold Jewelry Set',
    description: 'Elegant jewelry set with two selectable finishes for daily wear and gifting.',
    image:
      'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=60',
    images: [
      'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=60',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=60',
    ],
    price: 1299000,
    variants: [
      {
        id: 'jewelry-set-01-gold',
        color: 'Gold',
        price: 1299000,
        stock: 12,
        image:
          'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=60',
      },
      {
        id: 'jewelry-set-01-silver',
        color: 'Silver',
        price: 1199000,
        stock: 7,
        image:
          'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=60',
      },
    ],
    rating: 4.8,
    reviews: 248,
    categoryId: 'accessories',
    discount: '10% off',
  },
  {
    id: 'jewelry-ring-01',
    name: 'Minimal Ring Collection',
    description: 'A lightweight ring that ships in a single default size variant.',
    image:
      'https://images.unsplash.com/photo-1614179924047-79a1b0845c9f?auto=format&fit=crop&w=900&q=60',
    price: 599000,
    variants: [
      {
        id: 'jewelry-ring-01-default',
        price: 599000,
        stock: 25,
        image:
          'https://images.unsplash.com/photo-1614179924047-79a1b0845c9f?auto=format&fit=crop&w=900&q=60',
      },
    ],
    rating: 4.6,
    reviews: 109,
    categoryId: 'rings',
  },
  {
    id: 'jewelry-earring-01',
    name: 'Crystal Drop Earrings',
    description: 'A versatile earring set with three color finishes and stock per variant.',
    image:
      'https://images.unsplash.com/photo-1617038220319-7f80d8f9b4c5?auto=format&fit=crop&w=900&q=60',
    price: 789000,
    variants: [
      {
        id: 'jewelry-earring-01-gold',
        color: 'Gold',
        price: 789000,
        stock: 18,
        image:
          'https://images.unsplash.com/photo-1617038220319-7f80d8f9b4c5?auto=format&fit=crop&w=900&q=60',
      },
      {
        id: 'jewelry-earring-01-rose',
        color: 'Rose Gold',
        price: 829000,
        stock: 9,
        image:
          'https://images.unsplash.com/photo-1617038220319-7f80d8f9b4c5?auto=format&fit=crop&w=900&q=60',
      },
      {
        id: 'jewelry-earring-01-silver',
        color: 'Silver',
        price: 759000,
        stock: 5,
        image:
          'https://images.unsplash.com/photo-1617038220319-7f80d8f9b4c5?auto=format&fit=crop&w=900&q=60',
      },
    ],
    rating: 4.7,
    reviews: 87,
    categoryId: 'earrings',
    discount: 'Best seller',
  },
];

export function getProductSummaries(): ProductSummary[] {
  return PRODUCTS;
}

export function getProductById(id: string): ProductDetail | undefined {
  return PRODUCTS.find((product) => product.id === id);
}

export function getProducts(): Product[] {
  return PRODUCTS;
}

export function getProductVariant(product: Product, variantId: string): ProductVariant | undefined {
  return product.variants.find((variant) => variant.id === variantId);
}

export function getDefaultVariant(product: Product): ProductVariant {
  return product.variants[0] ?? {
    id: `${product.id}-default`,
    price: product.price,
    stock: 0,
  };
}
