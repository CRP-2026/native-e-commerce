import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { getOrderSummaries } from '~/features/order/services/orderData';
import type { OrderStatus } from '~/lib/types/orders';
import { formatCurrency, formatDate } from '~/lib/utils/formatters';

type OrderFilter = 'all' | OrderStatus;
type OrderItem = ReturnType<typeof getOrderSummaries>[number];

const statusFilters: { label: string; value: OrderFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Processing', value: 'processing' },
  { label: 'Shipped', value: 'shipped' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Cancelled', value: 'cancelled' },
];

function statusBadge(status: OrderStatus) {
  switch (status) {
    case 'pending':
      return { label: 'Pending', tone: 'bg-[#FEF3C7] text-[#92400E]' };
    case 'processing':
      return { label: 'Processing', tone: 'bg-[#DBEAFE] text-[#1E40AF]' };
    case 'shipped':
      return { label: 'Shipped', tone: 'bg-[#E0F2FE] text-[#0369A1]' };
    case 'delivered':
      return { label: 'Delivered', tone: 'bg-[#DCFCE7] text-[#166534]' };
    case 'cancelled':
      return { label: 'Cancelled', tone: 'bg-[#FEE2E2] text-[#991B1B]' };
    default:
      return { label: status, tone: 'bg-[#E5E7EB] text-[#374151]' };
  }
}

export default function OrdersScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<OrderFilter>('all');
  const [orders, setOrders] = useState<OrderItem[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOrders(getOrderSummaries());
      setIsLoading(false);
    }, 450);

    return () => clearTimeout(timer);
  }, []);

  const filteredOrders = useMemo(() => {
    if (activeFilter === 'all') return orders;
    return orders.filter((order) => order.status === activeFilter);
  }, [orders, activeFilter]);

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Orders',
          headerShadowVisible: false,
        }}
      />

      <View className="flex-1 bg-[#F8FAFC]">
        <View className="absolute left-[-90px] top-[-80px] h-[220px] w-[220px] rounded-full bg-[#EAF1FF]" />
        <View className="absolute right-[-120px] top-[150px] h-[260px] w-[260px] rounded-full bg-[#F1F5F9]" />

        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          <View className="px-5 pb-7 pt-2">
            <Text className="text-[13px] uppercase tracking-[2.5px] text-[#2563EB]">History</Text>
            <Text className="mt-2 text-[30px] font-bold text-[#0F172A]">My Orders</Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mt-5"
              contentContainerStyle={{ paddingRight: 8 }}>
              <View className="flex-row gap-2">
                {statusFilters.map((filter) => {
                  const active = filter.value === activeFilter;
                  return (
                    <Pressable
                      key={filter.value}
                      onPress={() => setActiveFilter(filter.value)}
                      className={`rounded-full border px-4 py-2 ${
                        active ? 'border-[#2563EB] bg-[#2563EB]' : 'border-[#D6E0F5] bg-white'
                      }`}>
                      <Text
                        className={`text-[13px] font-semibold ${
                          active ? 'text-white' : 'text-[#334155]'
                        }`}>
                        {filter.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </ScrollView>

            {isLoading ? (
              <View className="mt-5 gap-3">
                <SkeletonCard />
                <SkeletonCard />
              </View>
            ) : filteredOrders.length === 0 ? (
              <View className="mt-5 items-center rounded-[24px] bg-white px-6 py-10 shadow-sm">
                <View className="h-14 w-14 items-center justify-center rounded-full bg-[#EEF2FF]">
                  <Ionicons name="file-tray-outline" size={24} color="#2563EB" />
                </View>
                <Text className="mt-4 text-[17px] font-semibold text-[#0F172A]">
                  No orders found
                </Text>
                <Text className="mt-2 text-center text-[14px] leading-[20px] text-[#64748B]">
                  You have no orders in this status yet.
                </Text>
                <Pressable
                  className="mt-5 rounded-full bg-[#2563EB] px-5 py-3"
                  onPress={() => router.push('/(tabs)')}>
                  <Text className="text-[14px] font-semibold text-white">Back to Shop</Text>
                </Pressable>
              </View>
            ) : (
              <View className="mt-5 gap-3">
                {filteredOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onPress={() => router.push(`/order/${order.id}`)}
                  />
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
}

function OrderCard({ order, onPress }: { order: OrderItem; onPress: () => void }) {
  const badge = statusBadge(order.status);

  return (
    <Pressable onPress={onPress} className="rounded-[24px] bg-white p-4 shadow-sm">
      <View className="flex-row items-start justify-between">
        <View>
          <Text className="text-[12px] uppercase tracking-[1.5px] text-[#64748B]">Order code</Text>
          <Text className="mt-1 text-[16px] font-bold text-[#0F172A]">#{order.code}</Text>
        </View>
        <View className={`rounded-full px-3 py-1 ${badge.tone.split(' ')[0]}`}>
          <Text className={`text-[12px] font-semibold ${badge.tone.split(' ')[1]}`}>
            {badge.label}
          </Text>
        </View>
      </View>

      <View className="my-3 h-[1px] bg-[#EEF2F7]" />

      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-[12px] text-[#64748B]">Placed on</Text>
          <Text className="mt-1 text-[14px] font-semibold text-[#0F172A]">
            {formatDate(order.date)}
          </Text>
        </View>
        <View>
          <Text className="text-right text-[12px] text-[#64748B]">Total</Text>
          <Text className="mt-1 text-right text-[16px] font-bold text-[#0F172A]">
            {formatCurrency(order.total)}
          </Text>
        </View>
      </View>

      <View className="mt-4 flex-row items-center justify-between rounded-[16px] bg-[#F8FAFC] px-3 py-2">
        <Text className="text-[13px] text-[#334155]">{order.itemCount} item(s)</Text>
        <View className="flex-row items-center">
          <Text className="mr-1 text-[13px] font-semibold text-[#2563EB]">View detail</Text>
          <Ionicons name="chevron-forward" size={14} color="#2563EB" />
        </View>
      </View>
    </Pressable>
  );
}

function SkeletonCard() {
  return (
    <View className="rounded-[24px] bg-white p-4 shadow-sm">
      <View className="h-4 w-[120px] rounded bg-[#E9EEF7]" />
      <View className="mt-3 h-3 w-[90px] rounded bg-[#EEF2F7]" />
      <View className="mt-4 h-[1px] bg-[#EEF2F7]" />
      <View className="mt-4 h-3 w-[140px] rounded bg-[#EEF2F7]" />
    </View>
  );
}
