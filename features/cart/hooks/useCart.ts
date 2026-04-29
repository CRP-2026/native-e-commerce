import useCartStore from '~/lib/store/cartStore';
import { useCallback } from 'react';

export const useCart = () => {
	const items = useCartStore((s) => s.items);
	const addToCart = useCartStore((s) => s.addToCart);
	const removeFromCart = useCartStore((s) => s.removeFromCart);
	const updateQuantity = useCartStore((s) => s.updateQuantity);
	const clearCart = useCartStore((s) => s.clearCart);
	const getCartCount = useCartStore((s) => s.getCartCount);
	const getCartTotal = useCartStore((s) => s.getCartTotal);

	const add = useCallback((product, qty = 1) => addToCart(product, qty), [addToCart]);

	return {
		items,
		addToCart: add,
		removeFromCart,
		updateQuantity,
		clearCart,
		getCartCount,
		getCartTotal,
	};
};

export default useCart;
