export type HomeCategory = {
  id: string;
  label: string;
  image: string;
};

export type HomeProduct = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  price: string;
  oldPrice: string;
  discount: string;
  rating: number;
  reviews: number;
};

export const homeCategories: HomeCategory[] = [
  {
    id: 'beauty',
    label: 'Beauty',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=320&q=60',
  },
  {
    id: 'fashion',
    label: 'Fashion',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=320&q=60',
  },
  {
    id: 'kids',
    label: 'Kids',
    image:
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=320&q=60',
  },
  {
    id: 'mens',
    label: 'Mens',
    image:
      'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?auto=format&fit=crop&w=320&q=60',
  },
  {
    id: 'womens',
    label: 'Womens',
    image:
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=320&q=60',
  },
];

export const homeProducts: HomeProduct[] = [
  {
    id: '1',
    title: 'Women Printed Kurta',
    subtitle: 'Neque porro quisquam est qui dolorem ipsum quia',
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=720&q=60',
    price: '$1500',
    oldPrice: '$2499',
    discount: '40% off',
    rating: 4,
    reviews: 56890,
  },
  {
    id: '2',
    title: 'HRX by Hrithik Roshan',
    subtitle: 'Neque porro quisquam est qui dolorem ipsum quia',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=720&q=60',
    price: '$2499',
    oldPrice: '$4999',
    discount: '50% off',
    rating: 4,
    reviews: 344567,
  },
  {
    id: '3',
    title: 'Labbin White Sneakers',
    subtitle: 'For Men and Female',
    image:
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=720&q=60',
    price: '$650',
    oldPrice: '$1250',
    discount: '70% off',
    rating: 4,
    reviews: 9981,
  },
];
