import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { useToast } from '~/components/ToastProvider';

import { Button } from '~/components/Button';
import { useCart } from '~/features/cart/hooks/useCart';
import { fetchProductById } from '~/lib/api/catalog';
import { ApiError } from '~/lib/api/errors';
import { getAppLocale, resolveApiError, strings } from '~/lib/i18n';
import type { ProductDetail } from '~/lib/types/products';
import type { Product } from '~/lib/types/models';
import { getDefaultVariant, getVariantById } from '~/lib/utils/productHelpers';
import { formatCurrency } from '~/lib/utils/formatters';

export default function ProductDetailScreen() {
  const locale = getAppLocale();
  const L = strings(locale);
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const params = useLocalSearchParams<{ id?: string | string[] }>();
  const resolvedProductId = Array.isArray(params.id) ? params.id[0] : params.id;
  const productId = resolvedProductId ?? '';

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(Boolean(productId));
  const [loadError, setLoadError] = useState<string | null>(null);

  const [selectedVariantId, setSelectedVariantId] = useState('');
  const [quantity, setQuantity] = useState(1);

  const load = useCallback(async () => {
    if (!productId) {
      setProduct(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setLoadError(null);
    try {
      const p = await fetchProductById(productId);
      setProduct(p);
      const def = getDefaultVariant(p);
      setSelectedVariantId(def.id);
      setQuantity(1);
    } catch (e) {
      const msg = e instanceof ApiError ? resolveApiError(e, locale) : L.errors.productLoadFailed;
      setLoadError(msg);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }, [productId, locale, L.errors.productLoadFailed]);

  useEffect(() => {
    void load();
  }, [load]);

  const selectedVariant = useMemo(() => {
    if (!product) return undefined;
    return getVariantById(product, selectedVariantId) ?? getDefaultVariant(product);
  }, [product, selectedVariantId]);

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: 'Product Details' }} />
        <View className="flex-1 items-center justify-center bg-white">
          <ActivityIndicator size="large" color="#F83758" />
        </View>
      </>
    );
  }

  if (loadError || !product) {
    return (
      <>
        <Stack.Screen options={{ title: 'Product Details' }} />
        <View className="flex-1 items-center justify-center bg-white px-6">
          <Text className="text-[18px] font-semibold text-[#232327]">Product not found</Text>
          <Text className="mt-2 text-center text-[14px] text-[#6A6A6A]">
            {loadError ?? 'The product you are looking for does not exist.'}
          </Text>
        </View>
      </>
    );
  }

  const price = selectedVariant?.price ?? product.price;
  const imageUri = selectedVariant?.image ?? product.image;
  const hasMultipleVariants = product.variants.length > 1;

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    const snapshot: Product = {
      ...product,
      price: selectedVariant.price,
      image: selectedVariant.image ?? product.image,
    };
    addToCart(snapshot, quantity, selectedVariant.id);
    addToast('success', L.common.success, L.cart.addSuccess);
  };

  return (
    <>
      <Stack.Screen options={{ title: product.name }} />

      <ScrollView className="flex-1 bg-[#F8FAFC]" showsVerticalScrollIndicator={false}>
        <View className="px-4 pb-6 pt-3">
          <View className="overflow-hidden rounded-[28px] bg-white shadow-sm">
            <Image source={{ uri: imageUri }} className="h-[320px] w-full" resizeMode="cover" />
          </View>

          <View className="mt-4 rounded-[28px] bg-white p-4 shadow-sm">
            <View className="flex-row items-start justify-between gap-4">
              <View className="flex-1">
                <Text className="text-[22px] font-bold text-[#232327]">{product.name}</Text>
                <Text className="mt-2 text-[14px] leading-[22px] text-[#6A6A6A]">
                  {product.description}
                </Text>
              </View>
              <View className="rounded-full bg-[#FFF1F3] px-3 py-1">
                <Text className="text-[12px] font-semibold text-[#F83758]">
                  {product.discount ?? 'New'}
                </Text>
              </View>
            </View>

            <View className="mt-4 flex-row items-center gap-2">
              <Text className="text-[24px] font-bold text-[#232327]">{formatCurrency(price)}</Text>
              {hasMultipleVariants ? (
                <Text className="text-[12px] text-[#6A6A6A]">
                  {product.variants.length} variants available
                </Text>
              ) : null}
            </View>

            <View className="mt-3 flex-row items-center gap-1">
              <Ionicons name="star" size={16} color="#FFC107" />
              <Text className="text-[13px] font-medium text-[#4A4A4A]">
                {product.rating.toFixed(1)} • {product.reviews.toLocaleString()} reviews
              </Text>
            </View>
          </View>

          <View className="mt-4 rounded-[28px] bg-white p-4 shadow-sm">
            <Text className="text-[16px] font-semibold text-[#232327]">Select variant</Text>

            <View className="mt-3 flex-row flex-wrap gap-2">
              {product.variants.map((variant) => {
                const isSelected = variant.id === selectedVariant?.id;
                const label = variant.color ?? 'Default';

                return (
                  <Pressable
                    key={variant.id}
                    onPress={() => setSelectedVariantId(variant.id)}
                    className={`rounded-full border px-4 py-2 ${
                      isSelected ? 'border-[#F83758] bg-[#FDE8ED]' : 'border-[#E6E6E6] bg-white'
                    }`}>
                    <Text
                      className={`text-[13px] font-medium ${isSelected ? 'text-[#F83758]' : 'text-[#4A4A4A]'}`}>
                      {label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <View className="mt-4 flex-row items-center justify-between">
              <Text className="text-[14px] text-[#6A6A6A]">Stock</Text>
              <Text className="text-[14px] font-semibold text-[#232327]">
                {selectedVariant?.stock ?? 0} left
              </Text>
            </View>
          </View>

          <View className="mt-4 rounded-[28px] bg-white p-4 shadow-sm">
            <Text className="text-[16px] font-semibold text-[#232327]">Quantity</Text>
            <View className="mt-3 flex-row items-center gap-3">
              <Pressable
                onPress={() => setQuantity((current) => Math.max(1, current - 1))}
                className="h-11 w-11 items-center justify-center rounded-full bg-[#FFF4ED]">
                <Text className="text-[22px] font-semibold text-[#F97316]">−</Text>
              </Pressable>
              <Text className="min-w-[44px] text-center text-[18px] font-semibold text-[#232327]">
                {quantity}
              </Text>
              <Pressable
                onPress={() =>
                  setQuantity((current) => Math.min(selectedVariant?.stock ?? current, current + 1))
                }
                className="h-11 w-11 items-center justify-center rounded-full bg-[#F97316]">
                <Text className="text-[22px] font-semibold text-white">+</Text>
              </Pressable>
            </View>

            <View className="mt-4">
              <Button title="Add to Cart" onPress={handleAddToCart} />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
