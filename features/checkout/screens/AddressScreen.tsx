import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { Button } from '~/components/Button';
import type { Address } from '~/lib/types/models';

const addresses: Address[] = [
  {
    id: 'addr-1',
    name: 'Vo Tan Duc',
    phone: '0901123456',
    address: '65 Nguyen Trai, Ward 7, District 5',
    city: 'Ho Chi Minh City',
    isDefault: true,
  },
  {
    id: 'addr-2',
    name: 'Vo Tan Duc - Office',
    phone: '0901123456',
    address: '12 Nguyen Hue, District 1',
    city: 'Ho Chi Minh City',
    isDefault: false,
  },
  {
    id: 'addr-3',
    name: 'Vo Tan Duc - Home',
    phone: '0901123456',
    address: '88 Le Loi, District 3',
    city: 'Ho Chi Minh City',
    isDefault: false,
  },
];

export default function AddressScreen() {
  const router = useRouter();
  const [selectedAddressId, setSelectedAddressId] = useState(
    addresses.find((address) => address.isDefault)?.id ?? addresses[0]?.id ?? ''
  );

  const selectedAddress =
    addresses.find((address) => address.id === selectedAddressId) ?? addresses[0];

  const handleUseAddress = () => {
    router.back();
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Shipping Address',
          headerShadowVisible: false,
        }}
      />

      <View className="flex-1 bg-[#F8FAFC]">
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          <View className="px-5 pb-8 pt-3">
            <Text className="text-[13px] uppercase tracking-[3px] text-[#F97316]">
              Delivery details
            </Text>
            <Text className="mt-2 text-[30px] font-bold text-[#111827]">Address book</Text>
            <Text className="mt-2 text-[14px] leading-[22px] text-[#6B7280]">
              Choose the address where you want to receive your order.
            </Text>

            <View className="mt-5 gap-3">
              {addresses.map((address) => {
                const isSelected = address.id === selectedAddressId;

                return (
                  <Pressable
                    key={address.id}
                    onPress={() => setSelectedAddressId(address.id)}
                    className={`rounded-[24px] border p-4 ${
                      isSelected ? 'border-[#F97316] bg-[#FFF7F2]' : 'border-[#E5E7EB] bg-white'
                    }`}>
                    <View className="flex-row items-start gap-3">
                      <View
                        className={`mt-0.5 h-11 w-11 items-center justify-center rounded-full ${
                          isSelected ? 'bg-[#F97316]' : 'bg-[#F3F4F6]'
                        }`}>
                        <Ionicons
                          name="location-outline"
                          size={18}
                          color={isSelected ? '#FFFFFF' : '#6B7280'}
                        />
                      </View>

                      <View className="flex-1">
                        <View className="flex-row items-center gap-2">
                          <Text className="text-[15px] font-semibold text-[#111827]">
                            {address.name}
                          </Text>
                          {address.isDefault ? (
                            <View className="rounded-full bg-[#DCFCE7] px-2 py-1">
                              <Text className="text-[10px] font-semibold text-[#166534]">
                                Default
                              </Text>
                            </View>
                          ) : null}
                        </View>
                        <Text className="mt-1 text-[13px] leading-[20px] text-[#6B7280]">
                          {address.address}
                        </Text>
                        <Text className="mt-1 text-[13px] text-[#6B7280]">
                          {address.city} • {address.phone}
                        </Text>
                      </View>

                      <View
                        className={`mt-1 h-5 w-5 rounded-full border-2 ${
                          isSelected ? 'border-[#F97316] bg-[#F97316]' : 'border-[#D1D5DB] bg-white'
                        }`}>
                        {isSelected ? (
                          <View className="m-[3px] h-1.5 w-1.5 rounded-full bg-white" />
                        ) : null}
                      </View>
                    </View>
                  </Pressable>
                );
              })}
            </View>

            <View className="mt-5 rounded-[28px] bg-white p-4 shadow-sm">
              <Text className="text-[16px] font-semibold text-[#111827]">Selected address</Text>
              <Text className="mt-3 text-[14px] font-semibold text-[#111827]">
                {selectedAddress?.name}
              </Text>
              <Text className="mt-1 text-[13px] leading-[20px] text-[#6B7280]">
                {selectedAddress?.address}
              </Text>
              <Text className="mt-1 text-[13px] text-[#6B7280]">
                {selectedAddress?.city} • {selectedAddress?.phone}
              </Text>
            </View>

            <View className="mt-5 gap-3">
              <Button title="Use this address" onPress={handleUseAddress} />
              <Pressable className="items-center rounded-[28px] border border-dashed border-[#F97316] py-4">
                <Text className="text-[15px] font-semibold text-[#F97316]">Add New Address</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
