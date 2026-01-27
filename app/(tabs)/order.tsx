import { Stack } from 'expo-router';
import { View, Text } from 'react-native';
export default function Order() {
  return (
    <>
      <Stack.Screen options={{ title: 'Order' }} />
      <View className="flex-1 items-center justify-center p-5">
        <Text className="text-2xl font-bold mb-4">Order</Text>
        <Text className="text-gray-500">This is Order screen</Text>
      </View>
    </>
  );
}
