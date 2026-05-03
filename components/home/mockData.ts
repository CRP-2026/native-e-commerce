import type { Category as ICategory } from '~/lib/types/models';
import { getProductSummaries } from '~/features/product/services/productData';

export const homeCategories: ICategory[] = [
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

export const homeProducts = getProductSummaries();
