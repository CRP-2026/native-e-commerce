import type { OrderDetail, OrderSummary } from '~/lib/types/orders';

const MOCK_ORDERS: OrderDetail[] = [
  {
    id: 'ORD-1001',
    date: '2026-05-02T10:30:00.000Z',
    status: 'shipped',
    total: 1299000,
    items: [
      {
        id: '1',
        name: 'Premium Wireless Headphones',
        price: 799000,
        quantity: 1,
        image: 'https://via.placeholder.com/100',
      },
      {
        id: '2',
        name: 'USB-C Fast Cable',
        price: 199000,
        quantity: 1,
        image: 'https://via.placeholder.com/100',
      },
      {
        id: '3',
        name: 'Protective Case',
        price: 301000,
        quantity: 1,
        image: 'https://via.placeholder.com/100',
      },
    ],
    shippingAddress: {
      name: 'Vo Tan Duc',
      phone: '0901123456',
      address: '65 Nguyen Trai, Ward 7, District 5',
      city: 'Ho Chi Minh City',
    },
    paymentMethod: 'Credit Card',
    tracking: 'SHIP123456789',
    estimatedDelivery: '2026-05-06T10:30:00.000Z',
    timeline: [
      { status: 'Order Placed', date: '2026-05-02T10:30:00.000Z', completed: true },
      { status: 'Processing', date: '2026-05-02T12:15:00.000Z', completed: true },
      { status: 'Shipped', date: '2026-05-03T08:00:00.000Z', completed: true },
      { status: 'Out for Delivery', date: '2026-05-05T08:00:00.000Z', completed: false },
      { status: 'Delivered', date: '2026-05-06T10:30:00.000Z', completed: false },
    ],
  },
  {
    id: 'ORD-1000',
    date: '2026-04-29T07:15:00.000Z',
    status: 'delivered',
    total: 499000,
    items: [
      {
        id: '4',
        name: 'Smartwatch Strap',
        price: 499000,
        quantity: 1,
        image: 'https://via.placeholder.com/100',
      },
    ],
    shippingAddress: {
      name: 'Vo Tan Duc',
      phone: '0901123456',
      address: '65 Nguyen Trai, Ward 7, District 5',
      city: 'Ho Chi Minh City',
    },
    paymentMethod: 'E-wallet',
    tracking: 'SHIP555000222',
    estimatedDelivery: '2026-05-01T12:00:00.000Z',
    timeline: [
      { status: 'Order Placed', date: '2026-04-29T07:15:00.000Z', completed: true },
      { status: 'Processing', date: '2026-04-29T10:00:00.000Z', completed: true },
      { status: 'Shipped', date: '2026-04-30T09:30:00.000Z', completed: true },
      { status: 'Delivered', date: '2026-05-01T12:00:00.000Z', completed: true },
    ],
  },
  {
    id: 'ORD-0999',
    date: '2026-04-25T14:45:00.000Z',
    status: 'processing',
    total: 849000,
    items: [
      {
        id: '5',
        name: 'Gaming Mouse',
        price: 449000,
        quantity: 1,
        image: 'https://via.placeholder.com/100',
      },
      {
        id: '6',
        name: 'Desk Mat',
        price: 200000,
        quantity: 2,
        image: 'https://via.placeholder.com/100',
      },
    ],
    shippingAddress: {
      name: 'Vo Tan Duc',
      phone: '0901123456',
      address: '65 Nguyen Trai, Ward 7, District 5',
      city: 'Ho Chi Minh City',
    },
    paymentMethod: 'COD',
    tracking: 'SHIP999100333',
    estimatedDelivery: '2026-04-30T16:30:00.000Z',
    timeline: [
      { status: 'Order Placed', date: '2026-04-25T14:45:00.000Z', completed: true },
      { status: 'Processing', date: '2026-04-26T09:00:00.000Z', completed: true },
      { status: 'Shipped', date: '2026-04-28T08:00:00.000Z', completed: false },
    ],
  },
  {
    id: 'ORD-0998',
    date: '2026-04-22T05:20:00.000Z',
    status: 'cancelled',
    total: 259000,
    items: [
      {
        id: '7',
        name: 'Laptop Sleeve',
        price: 259000,
        quantity: 1,
        image: 'https://via.placeholder.com/100',
      },
    ],
    shippingAddress: {
      name: 'Vo Tan Duc',
      phone: '0901123456',
      address: '65 Nguyen Trai, Ward 7, District 5',
      city: 'Ho Chi Minh City',
    },
    paymentMethod: 'Credit Card',
    tracking: 'SHIP888220111',
    estimatedDelivery: '2026-04-24T09:00:00.000Z',
    timeline: [
      { status: 'Order Placed', date: '2026-04-22T05:20:00.000Z', completed: true },
      { status: 'Cancelled', date: '2026-04-22T11:10:00.000Z', completed: true },
    ],
  },
];

export function getOrderSummaries(): OrderSummary[] {
  return MOCK_ORDERS.map((order) => ({
    id: order.id,
    code: order.id,
    date: order.date,
    status: order.status,
    total: order.total,
    itemCount: order.items.reduce((sum, item) => sum + item.quantity, 0),
  }));
}

export function getOrderById(id: string): OrderDetail | undefined {
  return MOCK_ORDERS.find((order) => order.id === id);
}
