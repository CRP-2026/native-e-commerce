import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack } from 'expo-router';
import React from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';

import { Button } from '~/components/Button';
import useCart from '~/features/cart/hooks/useCart';

export default function CartScreen() {
  const { items, updateQuantity, removeFromCart, getCartTotal } = useCart();

  const subtotal = items.reduce((s, i) => {
    const price = parseFloat((i.product.price || '0').replace(/[^0-9.-]+/g, '')) || 0;
    return s + price * i.quantity;
  }, 0);

  const shipping = items.length ? 15 : 0;
  const discount = 0;
  const total = subtotal + shipping - discount;

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Cart',
          headerShadowVisible: false,
        }}
      />

      <View className="flex-1 bg-[#FFF8F4]">
        <View className="absolute left-[-90px] top-[-100px] h-[240px] w-[240px] rounded-full bg-[#FFE6D8]" />
        <View className="absolute right-[-120px] top-[120px] h-[280px] w-[280px] rounded-full bg-[#FFECE2]" />

        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          <View className="px-5 pb-6 pt-2">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-[13px] uppercase tracking-[3px] text-[#F97316]">
                  Shopping bag
                </Text>
                <Text className="mt-2 text-[30px] font-bold text-[#1F1F1F]">My Cart</Text>
              </View>
              <View className="h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                <Ionicons name="cart-outline" size={20} color="#F97316" />
              </View>
            </View>

            <View className="mt-5 rounded-[28px] bg-white p-4 shadow-sm">
              <View className="flex-row items-center gap-3 rounded-[20px] bg-[#FFF4ED] px-4 py-3">
                <Ionicons name="location-outline" size={18} color="#F97316" />
                <View className="flex-1">
                  <Text className="text-[12px] uppercase tracking-[1.5px] text-[#F97316]">
                    Delivery address
                  </Text>
                  <Text className="mt-1 text-[14px] font-semibold text-[#1F1F1F]" numberOfLines={1}>
                    65 Nguyen Trai, Ward 7, District 5, HCMC
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#C7C7CC" />
              </View>
            </View>

            <View className="mt-4 gap-4">
              {items.length === 0 ? (
                <View className="rounded-[20px] bg-white p-6 shadow-sm">
                  <Text className="text-center text-[14px] text-[#7A7A7A]">
                    Your cart is empty.
                  </Text>
                </View>
              ) : (
                items.map((it) => (
                  <CartItemCard
                    key={it.product.id}
                    item={it}
                    onChange={updateQuantity}
                    onRemove={removeFromCart}
                  />
                ))
              )}
            </View>

            <View className="mt-4 rounded-[28px] bg-white p-4 shadow-sm">
              <Text className="text-[16px] font-semibold text-[#1F1F1F]">Promo code</Text>
              <View className="mt-3 flex-row items-center rounded-[18px] border border-[#F2E9E4] bg-[#FFF9F5] px-4 py-3">
                <Ionicons name="pricetag-outline" size={18} color="#F97316" />
                <Text className="ml-3 flex-1 text-[14px] text-[#8A8A8A]">Add code or voucher</Text>
                <Text className="text-[14px] font-semibold text-[#F97316]">Apply</Text>
              </View>
            </View>

            <View className="mt-4 rounded-[28px] bg-white p-4 shadow-sm">
              <SummaryRow label="Subtotal" value={formatMoney(subtotal)} />
              <SummaryRow label="Shipping" value={formatMoney(shipping)} />
              <SummaryRow
                label="Discount"
                value={`-${formatMoney(discount)}`}
                valueClass="text-[#12B76A]"
              />

              <View className="my-4 h-[1px] bg-[#F1F1F1]" />

              <SummaryRow label="Total" value={formatMoney(total)} total />

              <View className="mt-4">
                <Button title="Checkout" onPress={() => {}} />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

function CartItemCard({
  item,
  onChange,
  onRemove,
}: {
  item: { product: any; quantity: number };
  onChange: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <View className="overflow-hidden rounded-[28px] bg-white shadow-sm">
      <View className="flex-row p-3">
        <Image
          source={{ uri: item.product.image }}
          className="h-[112px] w-[112px] rounded-[22px]"
          resizeMode="cover"
        />

        <View className="ml-4 flex-1 justify-between py-1">
          <View>
            <View className="flex-row items-start justify-between gap-3">
              <View className="flex-1">
                <Text className="text-[16px] font-semibold text-[#1F1F1F]" numberOfLines={2}>
                  {item.product.title}
                </Text>
                <Text className="mt-1 text-[12px] leading-[16px] text-[#7A7A7A]" numberOfLines={2}>
                  {item.product.subtitle}
                </Text>
              </View>

              <Pressable
                className="h-9 w-9 items-center justify-center rounded-full bg-[#FFF4ED]"
                onPress={() => onRemove(item.product.id)}>
                <Ionicons name="trash-outline" size={18} color="#F97316" />
              </Pressable>
            </View>

            <View className="mt-3 flex-row items-center gap-2">
              <Text className="text-[17px] font-bold text-[#1F1F1F]">{item.product.price}</Text>
              {item.product.oldPrice ? (
                <Text className="text-[12px] text-[#A0A0A0] line-through">
                  {item.product.oldPrice}
                </Text>
              ) : null}
              {item.product.discount ? (
                <Text className="text-[12px] font-semibold text-[#F97316]">
                  {item.product.discount}
                </Text>
              ) : null}
            </View>
          </View>

          <View className="mt-3 flex-row items-center justify-between">
            <View className="flex-row items-center rounded-full bg-[#FFF4ED] p-1">
              <QuantityButton
                label="-"
                onPress={() => onChange(item.product.id, Math.max(0, item.quantity - 1))}
              />
              <Text className="min-w-[34px] text-center text-[14px] font-semibold text-[#1F1F1F]">
                {item.quantity}
              </Text>
              <QuantityButton
                label="+"
                filled
                onPress={() => onChange(item.product.id, item.quantity + 1)}
              />
            </View>

            <View className="flex-row items-center gap-1">
              <Ionicons name="star" size={14} color="#FFC107" />
              <Text className="text-[12px] font-medium text-[#5B5B5B]">
                {(item.product.rating || 0).toFixed(1)} •{' '}
                {(item.product.reviews || 0).toLocaleString()}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

function QuantityButton({
  label,
  filled = false,
  onPress,
}: {
  label: string;
  filled?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`h-8 w-8 items-center justify-center rounded-full ${filled ? 'bg-[#F97316]' : 'bg-transparent'}`}>
      <Text className={`text-[18px] font-semibold ${filled ? 'text-white' : 'text-[#F97316]'}`}>
        {label}
      </Text>
    </Pressable>
  );
}

function SummaryRow({
  label,
  value,
  valueClass = 'text-[#1F1F1F]',
  total = false,
}: {
  label: string;
  value: string;
  valueClass?: string;
  total?: boolean;
}) {
  return (
    <View className="mb-3 flex-row items-center justify-between">
      <Text
        className={`${total ? 'text-[16px] font-semibold text-[#1F1F1F]' : 'text-[14px] text-[#6B6B6B]'}`}>
        {label}
      </Text>
      <Text
        className={`${total ? 'text-[20px] font-bold' : 'text-[14px] font-semibold'} ${valueClass}`}>
        {value}
      </Text>
    </View>
  );
}

function formatMoney(value: number) {
  return `$${value.toFixed(2)}`;
}
