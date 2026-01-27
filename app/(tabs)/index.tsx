import { Stack } from 'expo-router';
import { View, Text } from 'react-native';

export default function ShopScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Shop' }} />
      <View className="flex-1 items-center justify-center p-5">
        <Text className="text-2xl font-bold mb-4">Shop Screen</Text>
        <Text className="text-gray-600 text-center">
          Welcome to the Shop! Products will be displayed here.
        </Text>
      </View>
    </>
  );
}
