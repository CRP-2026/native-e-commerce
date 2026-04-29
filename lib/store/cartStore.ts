import create from 'zustand';
import { Product } from '../types/models';

export interface CartItem {
  product: Product;
  quantity: number;
}

type CartState = {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartCount: () => number;
  getCartTotal: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addToCart: (product, quantity = 1) => {
    const items = get().items.slice();
    const idx = items.findIndex((i) => i.product.id === product.id);
    if (idx >= 0) {
      items[idx].quantity += quantity;
    } else {
      items.push({ product, quantity });
    }
    set({ items });
  },
  removeFromCart: (productId) => {
    set((state) => ({ items: state.items.filter((i) => i.product.id !== productId) }));
  },
  updateQuantity: (productId, quantity) => {
    const items = get().items.slice();
    const idx = items.findIndex((i) => i.product.id === productId);
    if (idx >= 0) {
      if (quantity <= 0) items.splice(idx, 1);
      else items[idx].quantity = quantity;
      set({ items });
    }
  },
  clearCart: () => set({ items: [] }),
  getCartCount: () => get().items.reduce((s, i) => s + i.quantity, 0),
  getCartTotal: () =>
    get().items.reduce((s, i) => {
      const price = parseFloat((i.product.price || '0').replace(/[^0-9.-]+/g, '')) || 0;
      return s + price * i.quantity;
    }, 0),
}));

export default useCartStore;
