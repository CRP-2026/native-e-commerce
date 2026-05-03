export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export type OrderTimelineEvent = {
  status: string;
  date: string;
  completed: boolean;
};

export type OrderLineItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export type OrderDetail = {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: OrderLineItem[];
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
  };
  paymentMethod: string;
  tracking: string;
  estimatedDelivery: string;
  timeline: OrderTimelineEvent[];
};

export type OrderSummary = {
  id: string;
  code: string;
  date: string;
  status: OrderStatus;
  total: number;
  itemCount: number;
};
