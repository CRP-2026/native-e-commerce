import type { OrderDetail, OrderSummary } from '~/lib/types/orders';

import { apiGet, apiPost } from '~/lib/api/client';

export type PlaceOrderPayload = {
  items: Array<{ productId: string; variantId: string | null; quantity: number }>;
  shippingAddressId: string;
  paymentMethod: string;
  shippingFee: number;
  discountTotal: number;
};

export async function fetchOrderSummaries(status?: string): Promise<OrderSummary[]> {
  let path = 'orders/';
  if (status && status !== 'all') path += `?status=${encodeURIComponent(status)}`;
  return apiGet<OrderSummary[]>(path);
}

export async function fetchOrderDetail(orderId: string): Promise<OrderDetail> {
  return apiGet<OrderDetail>(`orders/${encodeURIComponent(orderId)}`);
}

export async function placeOrder(payload: PlaceOrderPayload): Promise<OrderDetail> {
  return apiPost<OrderDetail>('orders/', {
    items: payload.items.map((i) => ({
      productId: i.productId,
      variantId: i.variantId,
      quantity: i.quantity,
    })),
    shippingAddressId: payload.shippingAddressId,
    paymentMethod: payload.paymentMethod,
    shippingFee: String(payload.shippingFee),
    discountTotal: String(payload.discountTotal),
  });
}
