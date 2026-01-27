import { Stack } from 'expo-router';
import { View, Text } from 'react-native';

export default function CartScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Cart' }} />
      <View className="flex-1 items-center justify-center p-5">
        <Text className="text-2xl font-bold mb-4">Shopping Cart</Text>
        <Text className="text-gray-600 text-center">
          Your cart items will be displayed here.
        </Text>
      </View>
    </>
  );
}
