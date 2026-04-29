import { Stack, useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { resetOnboardingSeen } from '~/lib/onboardingStorage';
export default function Settings() {
  const router = useRouter();
  const handleResetOnboarding = async () => {
    await resetOnboardingSeen();
    Alert.alert('Done', 'Onboarding has been reset. Reopen app to see it again.');
    console.log('Onboarding has been reset. Reopen app to see it again.');
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Settings' }} />
      <View className="flex-1 items-center justify-center p-5">
        <Text className="mb-4 text-2xl font-bold">Settings</Text>
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
          <TouchableOpacity
            className="items-center rounded-lg border border-[#007AFF] py-3"
            onPress={() => router.push('/(auth)/forgot')}>
            <Text className="text-base font-semibold text-[#007AFF]">Test Forgot Screen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="items-center rounded-lg border border-[#F83758] py-3"
            onPress={handleResetOnboarding}>
            <Text className="text-base font-semibold text-[#F83758]">Reset Onboarding</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="items-center rounded-lg bg-[#F97316] py-3"
            onPress={() => router.push('/(tabs)/cart')}>
            <Text className="text-base font-semibold text-white">Open Cart (Test)</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
