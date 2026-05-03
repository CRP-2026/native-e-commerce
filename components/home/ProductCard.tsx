import { Ionicons } from '@expo/vector-icons';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { formatCurrency } from '~/lib/utils/formatters';
import type { ProductSummary } from '~/lib/types/products';

type Props = {
  product: ProductSummary;
};

export function ProductCard({ product }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      className="w-[162px] rounded-[10px] bg-[#F8F8F8] p-[6px]">
      <Image
        source={{ uri: product.image }}
        className="h-[140px] w-full rounded-[8px]"
        resizeMode="cover"
      />

      <View className="mt-3 gap-1">
        <Text className="text-[14px] font-semibold text-[#232327]" numberOfLines={1}>
          {product.name}
        </Text>
        <Text className="text-[12px] leading-[16px] text-[#6A6A6A]" numberOfLines={2}>
          {product.description}
        </Text>
        <View className="mt-1 flex-row items-center gap-2">
          <Text className="text-[15px] font-semibold text-[#232327]">
            {formatCurrency(product.price)}
          </Text>
          {product.discount ? (
            <Text className="text-[12px] text-[#F83758]">{product.discount}</Text>
          ) : null}
        </View>
        <View className="flex-row items-center gap-1">
          <Ionicons name="star" size={14} color="#FFC107" />
          <Ionicons name="star" size={14} color="#FFC107" />
          <Ionicons name="star" size={14} color="#FFC107" />
          <Ionicons name="star" size={14} color="#FFC107" />
          <Text className="text-[12px] text-[#575757]">
            {product.rating.toFixed(1)} {product.reviews}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
