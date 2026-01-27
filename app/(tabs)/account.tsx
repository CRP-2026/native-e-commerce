import { Stack } from 'expo-router';
import { View, Text } from 'react-native';

export default function AccountScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Account' }} />
      <View className="flex-1 items-center justify-center p-5">
        <Text className="text-2xl font-bold mb-4">Account</Text>
        <Text className="text-gray-600 text-center">
          Your account information will be displayed here.
        </Text>
      </View>
    </>
  );
}
