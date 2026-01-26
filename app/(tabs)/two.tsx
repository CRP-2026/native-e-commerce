import { Stack } from 'expo-router';
import OrdersScreen from '~/features/order/screens/OrdersScreen';

export default function Orders() {
  return (
    <>
      <Stack.Screen options={{ title: 'Orders' }} />
      <OrdersScreen />
    </>
  );
}
