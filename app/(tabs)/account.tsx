import { Stack } from 'expo-router';
import { View, Text, Pressable, Image } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Account() {
  return (
    <>
      <Stack.Screen options={{ title: 'Sửa hồ sơ' }} />

      <View className="flex-1 bg-gray-100">
        <View className="rounded-b-2xl bg-white p-4 shadow-sm">
          <View className="items-center">
            <View className="h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gray-200">
              <Image
                source={{ uri: 'https://via.placeholder.com/150' }}
                className="h-24 w-24"
                resizeMode="cover"
              />
              <Pressable className="absolute bottom-0 right-0 rounded-full bg-white p-1 shadow">
                <FontAwesome name="pencil" size={16} color="#f97316" />
              </Pressable>
            </View>
            <Text className="mt-3 text-lg font-semibold">Võ Tấn Đức</Text>
            <Text className="text-sm text-gray-500">Thiết lập ngay</Text>
          </View>
        </View>

        <View className="space-y-4 p-4">
          <Row label="Tên" value="Võ Tấn Đức" />
          <Row label="Tiểu sử" value="Thiết lập ngay" muted />

          <View className="rounded-xl bg-white p-2">
            <Row label="Giới tính" value="Nam" />
            <Separator />
            <Row label="Ngày sinh" value="**/**/2000" />
            <Separator />
            <Row label="Thông tin cá nhân" value="" chevron />
          </View>

          <View className="rounded-xl bg-white p-2">
            <Row label="Số điện thoại" value="*********95" />
            <Separator />
            <Row label="Email" value="Thiết lập ngay" valueClass="text-orange-500" chevron />
            <Separator />
            <Row label="Tài khoản liên kết" value="" chevron />
          </View>
        </View>
      </View>
    </>
  );
}

function Row({
  label,
  value,
  muted = false,
  chevron = false,
  valueClass = '',
}: {
  label: string;
  value?: string;
  muted?: boolean;
  chevron?: boolean;
  valueClass?: string;
}) {
  return (
    <Pressable className="flex-row items-center justify-between p-4" onPress={() => {}}>
      <Text className="text-base text-gray-700">{label}</Text>
      <View className="flex-row items-center">
        {value ? (
          <Text className={`${muted ? 'text-gray-400' : 'text-gray-700'} ${valueClass}`}>
            {value}
          </Text>
        ) : null}
        {chevron ? (
          <Ionicons name="chevron-forward" size={20} color="#c7c7cc" style={{ marginLeft: 8 }} />
        ) : null}
      </View>
    </Pressable>
  );
}

function Separator() {
  return <View className="mx-4 h-[1px] bg-gray-100" />;
}
