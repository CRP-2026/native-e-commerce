# Native E-Commerce App (Expo)

Frontend React Native (Expo Router + NativeWind) đã nối backend thật theo từng slice chính.

## Stack

- Expo SDK 54
- Expo Router v6
- React Native 0.81
- TypeScript
- Zustand (cart)
- AsyncStorage (token + fallback address backend)

## Setup

```bash
npm install
npm start
```

## Environment

FE đọc env qua `lib/config/env.ts`:

- `EXPO_PUBLIC_API_URL` (default `http://127.0.0.1:8000/api/v1`)
- `EXPO_PUBLIC_STORE_ID` (default `1`)

Ví dụ:

```env
EXPO_PUBLIC_API_URL=http://127.0.0.1:8000/api/v1
EXPO_PUBLIC_STORE_ID=1
```

> Android emulator thường dùng `http://10.0.2.2:8000/api/v1`.

## API Integration Status

### Done

- Catalog:
  - Home gọi `fetchCategories()` + `fetchProducts()`
  - Product detail gọi `fetchProductById()`
- Auth:
  - Login/Signup gọi API thật
  - Token lưu AsyncStorage
  - `hydrateSession()` khởi động backend địa chỉ HTTP nếu có token
- Addresses:
  - `AddressLoad` hỗ trợ swap backend
  - Sau login dùng HTTP backend (`createHttpAddressBackend`)
- Orders:
  - Checkout gọi `placeOrder()`
  - Orders tab gọi `fetchOrderSummaries()`
  - Order detail gọi `fetchOrderDetail()`
- Cart:
  - line item có `variantId`
  - gửi `variantId` đúng khi đặt hàng

### Removed Mock Files

- `features/product/services/productData.ts`
- `components/home/mockData.ts`
- `features/order/services/orderData.ts`

## Important Paths

- API core:
  - `lib/api/client.ts`
  - `lib/api/catalog.ts`
  - `lib/api/auth.ts`
  - `lib/api/addresses.ts`
  - `lib/api/orders.ts`
  - `lib/api/token.ts`
  - `lib/api/errors.ts`
- Session:
  - `lib/auth/session.ts`
- Address backend swap:
  - `features/account/services/addressStorage.ts`
  - `lib/api/httpAddressBackend.ts`

## Main Screens (connected)

- Home: `app/(tabs)/index.tsx`
- Product detail: `app/product/[id].tsx`
- Login: `app/(auth)/login.tsx`
- Signup: `app/(auth)/signup.tsx`
- Checkout: `app/checkout.tsx`
- Orders list: `app/(tabs)/order.tsx`
- Order detail: `app/order/[id].tsx`
- Addresses: `app/addresses/index.tsx`, `app/addresses/new.tsx`, `app/addresses/[id]/edit.tsx`

## Remaining TODO (short)

- Thêm logout thực tế trong màn Account (gọi `logoutSession()`).
- Đồng bộ profile UI với `GET /users/me`.
- Bổ sung test e2e/smoke cho flow login -> address -> checkout.

## Quick Checks

```bash
npx tsc --noEmit
npm run lint
```

