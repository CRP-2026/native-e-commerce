import { Stack, useRouter } from 'expo-router';
import { View, Text, Pressable } from 'react-native';

export default function CheckoutFailure() {
  const router = useRouter();
  return (
    <>
      <Stack.Screen options={{ title: 'Payment Failed' }} />
      <View className="flex-1 items-center justify-center bg-white p-6">
        <Text className="mb-4 text-2xl font-bold text-red-600">Payment Failed</Text>
        <Text className="text-center text-gray-600">
          There was a problem processing your payment.
        </Text>
        <Pressable
          className="mt-6 items-center rounded-lg bg-[#F97316] px-6 py-3"
          onPress={() => router.push('/checkout')}>
          <Text className="font-semibold text-white">Try Again</Text>
        </Pressable>
      </View>
    </>
  );
}
