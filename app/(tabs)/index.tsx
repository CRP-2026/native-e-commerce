import { Stack } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { CategoryList } from '../../components/home/CategoryList';
import { HomeHeader } from '../../components/home/HomeHeader';
import {
  FlatAndHeelsCard,
  HeroPromoBanner,
  MidSeasonBanner,
  NewArrivalsCard,
  SpecialOffersCard,
  SponsoredCard,
} from '../../components/home/HomePromos';
import { PillButton } from '../../components/home/PillButton';
import { ProductCard } from '../../components/home/ProductCard';
import { SectionBadge } from '../../components/home/SectionBadge';
import { homeCategories, homeProducts } from '../../components/home/mockData';
import type { Product } from '../../lib/types/models';

function ProductCarousel({ products }: { products: Product[] }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-4"
      contentContainerStyle={{ paddingRight: 12 }}>
      <View className="flex-row gap-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </View>
    </ScrollView>
  );
}

export default function HomeScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />

      <ScrollView className="flex-1 bg-[#F4F4F4]" showsVerticalScrollIndicator={false}>
        <View className="px-4 pb-8 pt-3">
          <HomeHeader />

          <View className="mt-4 flex-row items-center justify-between">
            <Text className="text-[18px] font-semibold leading-[22px] text-[#232327]">
              All Featured
            </Text>
            <View className="flex-row items-center gap-3">
              <PillButton
                label="Sort"
                icon={<Ionicons name="swap-vertical" size={14} color="#232327" />}
              />
              <PillButton
                label="Filter"
                icon={<Feather name="filter" size={14} color="#232327" />}
              />
            </View>
          </View>

          <CategoryList categories={homeCategories} />
          <HeroPromoBanner />
          <SectionBadge
            title="Deal of the Day"
            subtitle="22h 55m 20s remaining"
            background="#4A8AE8"
          />
          <ProductCarousel products={homeProducts} />
          <SpecialOffersCard />
          <FlatAndHeelsCard />

          <SectionBadge
            title="Trending Products"
            subtitle="Last Date 29/02/22"
            background="#F56F8C"
          />
          <ProductCarousel products={[...homeProducts].reverse()} />
          <MidSeasonBanner />
          <NewArrivalsCard />
          <SponsoredCard />
        </View>
      </ScrollView>
    </>
  );
}
