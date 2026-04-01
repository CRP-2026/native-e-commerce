import { Feather } from '@expo/vector-icons';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

export function HomeHeader() {
  return (
    <>
      <View className="mt-2 flex-row items-center justify-between">
        <TouchableOpacity
          activeOpacity={0.8}
          className="h-8 w-8 items-center justify-center rounded-full bg-[#EFEFEF]">
          <Feather name="menu" size={18} color="#232327" />
        </TouchableOpacity>

        <View className="flex-row items-center gap-2">
          <View className="h-8 w-8 items-center justify-center rounded-full bg-[#F83758]">
            <View className="h-5 w-5 rounded-full border-[3px] border-[#66B2FF]" />
          </View>
          <Text className="text-[28px] font-bold tracking-wide text-[#4A81D8]">Stylish</Text>
        </View>

        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=240&q=60',
          }}
          className="h-10 w-10 rounded-full"
        />
      </View>

      <View className="mt-4 h-[44px] flex-row items-center rounded-[9px] bg-white px-4 shadow-[0px_2px_9px_0px_rgba(0,0,0,0.06)]">
        <Feather name="search" size={18} color="#BBBBBB" />
        <TextInput
          className="ml-[10px] flex-1 text-[14px] text-[#232327]"
          placeholder="Search any Product.."
          placeholderTextColor="#BBBBBB"
        />
        <TouchableOpacity activeOpacity={0.8} className="h-6 w-6 items-center justify-center">
          <Feather name="mic" size={18} color="#7B7B7B" />
        </TouchableOpacity>
      </View>
    </>
  );
}
