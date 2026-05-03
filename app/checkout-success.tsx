import { Stack, useRouter } from 'expo-router';
import { View, Text, Pressable } from 'react-native';

export default function CheckoutSuccess() {
  const router = useRouter();
  return (
    <>
      <Stack.Screen options={{ title: 'Order Placed' }} />
      <View className="flex-1 items-center justify-center bg-white p-6">
        <Text className="mb-4 text-2xl font-bold">Thank you!</Text>
        <Text className="text-center text-gray-600">Your order was placed successfully.</Text>
        <Pressable
          className="mt-6 items-center rounded-lg bg-[#007AFF] px-6 py-3"
          onPress={() => router.push('/(tabs)/order')}>
          <Text className="font-semibold text-white">View Orders</Text>
        </Pressable>
      </View>
    </>
  );
}
