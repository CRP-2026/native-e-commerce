import { Stack, useRouter, useSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Text, TextInput, View, Pressable } from 'react-native';
import addressStorage from '~/features/account/services/addressStorage';

export default function AddressFormScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.id as string | undefined;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    if (!id) return;
    void (async () => {
      const a = await addressStorage.getAddressById(id);
      if (a) {
        setName(a.name);
        setPhone(a.phone);
        setAddress(a.address);
        setCity(a.city ?? '');
      }
    })();
  }, [id]);

  async function save() {
    if (!name || !phone || !address) return Alert.alert('Missing', 'Please fill required fields');
    if (id) {
      await addressStorage.saveAddress({ id, name, phone, address, city, isDefault: false });
    } else {
      await addressStorage.createAddressPartial({ name, phone, address, city, isDefault: false });
    }
    router.replace('/addresses');
  }

  return (
    <>
      <Stack.Screen options={{ title: id ? 'Edit Address' : 'New Address' }} />
      <View className="flex-1 bg-white p-4">
        <Text className="mb-2 font-semibold">Name</Text>
        <TextInput value={name} onChangeText={setName} className="mb-3 rounded border p-3" />

        <Text className="mb-2 font-semibold">Phone</Text>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          className="mb-3 rounded border p-3"
          keyboardType="phone-pad"
        />

        <Text className="mb-2 font-semibold">Address</Text>
        <TextInput value={address} onChangeText={setAddress} className="mb-3 rounded border p-3" />

        <Text className="mb-2 font-semibold">City</Text>
        <TextInput value={city} onChangeText={setCity} className="mb-3 rounded border p-3" />

        <Pressable className="mt-4 items-center rounded-lg bg-[#007AFF] py-3" onPress={save}>
          <Text className="font-semibold text-white">Save Address</Text>
        </Pressable>
      </View>
    </>
  );
}
