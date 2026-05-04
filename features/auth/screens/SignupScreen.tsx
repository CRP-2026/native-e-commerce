import { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';

import { register } from '~/lib/api/auth';
import { ApiError } from '~/lib/api/errors';
import { afterAuthLogin } from '~/lib/auth/session';

function getSignupErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.code === 'email_exists' || error.status === 409) {
      return 'Email này đã được đăng ký.';
    }
    if (error.code === 'validation_error' || error.status === 422) {
      return 'Thông tin đăng ký không hợp lệ. Vui lòng kiểm tra lại các trường.';
    }
    return error.message || 'Đăng ký thất bại.';
  }
  return 'Đăng ký thất bại. Vui lòng thử lại.';
}

export default function SignupScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSignup = async () => {
    if (!name.trim()) {
      Alert.alert('Missing', 'Nhập họ tên.');
      return;
    }
    if (!email.trim()) {
      Alert.alert('Missing', 'Nhập email.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Invalid password', 'Mật khẩu tối thiểu 6 ký tự.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Mismatch', 'Mật khẩu xác nhận không khớp.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await register(name.trim(), email.trim(), password);
      await afterAuthLogin(res.access_token);
      Alert.alert('Đăng ký thành công', 'Tài khoản đã được tạo. Bạn đã được đăng nhập.', [
        {
          text: 'OK',
          onPress: () => router.replace('/(tabs)'),
        },
      ]);
    } catch (e) {
      Alert.alert('Đăng ký thất bại', getSignupErrorMessage(e));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white" showsVerticalScrollIndicator={false}>
      <View className="px-[29px] pb-8 pt-[63px]">
        <Text className="mb-10 text-[44px] font-bold leading-[52px] text-black">
          Create an{'\n'}account
        </Text>

        <View className="gap-4">
          <View className="h-[55px] flex-row items-center rounded-[10px] border border-[#A8A8A9] bg-[#F3F3F3] px-3">
            <FontAwesome
              name="user"
              size={18}
              color="#676767"
              style={{ marginRight: 10, width: 20, textAlign: 'center' }}
            />
            <TextInput
              className="flex-1 text-xs font-medium text-[#676767]"
              placeholder="Full name"
              value={name}
              onChangeText={setName}
              placeholderTextColor="#676767"
            />
          </View>

          <View className="h-[55px] flex-row items-center rounded-[10px] border border-[#A8A8A9] bg-[#F3F3F3] px-3">
            <FontAwesome
              name="envelope"
              size={16}
              color="#676767"
              style={{ marginRight: 10, width: 20, textAlign: 'center' }}
            />
            <TextInput
              className="flex-1 text-xs font-medium text-[#676767]"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#676767"
            />
          </View>

          <View className="h-[55px] flex-row items-center rounded-[10px] border border-[#A8A8A9] bg-[#F3F3F3] px-3">
            <FontAwesome5
              name="lock"
              size={16}
              color="#676767"
              style={{ marginRight: 10, width: 20, textAlign: 'center' }}
            />
            <TextInput
              className="flex-1 text-xs font-medium text-[#676767]"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholderTextColor="#676767"
            />
            <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color="#676767"
              />
            </TouchableOpacity>
          </View>

          <View className="h-[55px] flex-row items-center rounded-[10px] border border-[#A8A8A9] bg-[#F3F3F3] px-3">
            <FontAwesome5
              name="lock"
              size={16}
              color="#676767"
              style={{ marginRight: 10, width: 20, textAlign: 'center' }}
            />
            <TextInput
              className="flex-1 text-xs font-medium text-[#676767]"
              placeholder="Confirm password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              placeholderTextColor="#676767"
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword((prev) => !prev)}>
              <Ionicons
                name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color="#676767"
              />
            </TouchableOpacity>
          </View>
        </View>

        <Text className="text-md mt-[18px] w-[85%] leading-[18px] text-[#676767]">
          By clicking the <Text className="text-[#FF4B26]">Register</Text> button, you agree to the
          public offer
        </Text>

        <TouchableOpacity
          className={`mt-7 h-[55px] items-center justify-center rounded bg-[#F83758] ${submitting ? 'opacity-60' : ''}`}
          onPress={handleSignup}
          disabled={submitting}>
          <Text className="text-[20px] font-semibold text-white">Create Account</Text>
        </TouchableOpacity>

        <View className="mt-10 items-center">
          <Text className="mb-5 text-xs font-medium text-[#575757]">- OR Continue with -</Text>
          <View className="flex-row gap-[10px]">
            <TouchableOpacity className="h-[54px] w-[54px] items-center justify-center rounded-full border border-[#F83758] bg-[#FCF3F6]">
              <FontAwesome name="google" size={24} color="#DB4437" />
            </TouchableOpacity>
            <TouchableOpacity className="h-[54px] w-[54px] items-center justify-center rounded-full border border-[#F83758] bg-[#FCF3F6]">
              <FontAwesome name="apple" size={24} color="#000000" />
            </TouchableOpacity>
            <TouchableOpacity className="h-[54px] w-[54px] items-center justify-center rounded-full border border-[#F83758] bg-[#FCF3F6]">
              <FontAwesome name="facebook" size={24} color="#3b5998" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="mt-12 flex-row items-center justify-center">
          <Text className="text-md text-[#575757]">I Already Have an Account </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text className="text-md font-semibold text-[#F83758] underline">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
