import { Stack } from 'expo-router';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';
export default function Settings() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ title: 'Settings' }} />
      <View className="flex-1 items-center justify-center p-5">
        <Text className="text-2xl font-bold mb-4">Settings</Text>
        <Text className="text-gray-500">This is Settings screen</Text>
        <View className="mt-8 w-full max-w-[320px] gap-3">
          <TouchableOpacity
            className="items-center rounded-lg bg-[#007AFF] py-3"
            onPress={() => router.push('/(auth)/login')}>
            <Text className="text-base font-semibold text-white">Test Login Screen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="items-center rounded-lg border border-[#007AFF] py-3"
            onPress={() => router.push('/(auth)/signup')}>
            <Text className="text-base font-semibold text-[#007AFF]">Test Signup Screen</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}