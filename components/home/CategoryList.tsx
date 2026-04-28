import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import type { Category as ICategory } from '@/lib/types/models';

type Props = {
  categories: ICategory[];
};

export function CategoryList({ categories }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-4"
      contentContainerStyle={{ paddingRight: 12 }}>
      <View className="flex-row gap-4">
        {categories.map((category) => (
          <TouchableOpacity key={category.id} activeOpacity={0.85} className="items-center">
            <Image
              source={{ uri: category.image }}
              className="h-[62px] w-[62px] rounded-full"
              resizeMode="cover"
            />
            <Text className="mt-2 text-[12px] text-[#4A4A4A]">{category.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
