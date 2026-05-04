# BE-INSTRUCTION (Updated)

Tài liệu này mô tả contract backend hiện tại mà FE đang dùng thật (không còn mock product/order).

## 1) Tổng quan trạng thái

## ✅ Đã xong

- FE đã nối backend theo thứ tự slice:
  1. Catalog (categories + products)
  2. Auth + session token
  3. Addresses CRUD (qua backend swap)
  4. Checkout + Orders list/detail
- Mock dữ liệu sản phẩm/đơn đã bỏ.
- Error handling BE đã thống nhất format.
- Validation request/response dùng Pydantic + FastAPI.
- SQL scripts đã versioned theo baseline + seed.

## ⚠️ Còn thiếu / nên làm tiếp

- Logout flow trên UI Account chưa gắn thực tế.
- Profile (`users/me`) chưa được bind mạnh vào UI account (đa phần tĩnh).
- Chưa có automated tests cho flow chính.

---

## 2) Base URL + headers

- Base URL BE: `/api/v1`
- FE env:
  - `EXPO_PUBLIC_API_URL` (vd `http://127.0.0.1:8000/api/v1`)
  - `EXPO_PUBLIC_STORE_ID` (default `1`)
- Header chuẩn FE đang gửi:
  - `X-Store-Id: <store-id>`
  - `Authorization: Bearer <token>` (nếu có)

---

## 3) Error format (đang dùng)

```json
{
  "error": {
    "code": "validation_error",
    "message": "Request validation failed",
    "details": {
      "issues": []
    }
  }
}
```

JWT lỗi trả `401` với code `invalid_token`.

---

## 4) API contracts đang dùng

## Catalog

- `GET /categories`
- `GET /products` (query FE đang map sang backend snake_case)
  - `category_id`, `min_price`, `max_price`, `search`, `limit`, `offset`
- `GET /products/{product_id}`

Shape dữ liệu FE mong đợi:
- `ProductSummary[]` cho list
- `ProductDetail` cho detail
- `variants` có `id`, `price`, `stock`, optional `color`, `sku`, `image`

## Auth

- `POST /auth/login`
  - request: `{ email, password }`
  - response: `{ access_token, token_type }`
- `POST /auth/register`
  - request: `{ name, email, password }`
  - response: `{ access_token, token_type }`

## Users

- `GET /users/me` (Bearer)

## Addresses

- `GET /addresses/`
- `GET /addresses/{address_id}`
- `POST /addresses/`
- `PUT /addresses/{address_id}`
- `DELETE /addresses/{address_id}`

Address request body FE gửi:
```json
{
  "name": "string",
  "phone": "string",
  "address": "string",
  "city": "string",
  "isDefault": false
}
```

## Orders

- `GET /orders/` (optional `?status=...`)
- `GET /orders/{order_id}`
- `POST /orders/`

Checkout tạo order:
```json
{
  "items": [
    {
      "productId": "jewelry-set-01",
      "variantId": "jewelry-set-01-gold",
      "quantity": 1
    }
  ],
  "shippingAddressId": "addr-xxx",
  "paymentMethod": "card",
  "shippingFee": "30000",
  "discountTotal": "0"
}
```

`paymentMethod` FE đang dùng: `card | cod | wallet`.

---

## 5) FE integration details quan trọng

## API layer

- `lib/api/client.ts`: fetch wrapper + error parsing + headers
- `lib/api/catalog.ts`
- `lib/api/auth.ts`
- `lib/api/addresses.ts`
- `lib/api/orders.ts`

## Session + token

- `lib/api/token.ts`: AsyncStorage token key `ecc_access_token`
- `lib/auth/session.ts`:
  - `hydrateSession()`
  - `afterAuthLogin(token)`
  - `logoutSession()`

## Address backend swap

- `features/account/services/addressStorage.ts`
  - interface `AddressLoad`
  - `setAddressBackend(...)`
  - `resetAddressBackend()`
- `lib/api/httpAddressBackend.ts` triển khai HTTP cho `AddressLoad`

## Cart + variant

- `lib/store/cartStore.ts` line item:
  - `{ product, quantity, variantId }`
- `lib/utils/variant.ts`:
  - map variant default giả (`{productId}-default`) -> `null` trước khi gửi API order

---

## 6) File đã thay đổi lớn (tham chiếu nhanh)

- Home API: `app/(tabs)/index.tsx`
- Product detail API: `features/product/screens/ProductDetailScreen.tsx`
- Login/Signup API: `features/auth/screens/LoginScreen.tsx`, `features/auth/screens/SignupScreen.tsx`
- Checkout API: `features/checkout/screens/CheckoutScreen.tsx`
- Orders API: `features/order/screens/OrdersScreen.tsx`, `features/order/screens/OrderDetailScreen.tsx`
- Address flow: `features/checkout/screens/AddressScreen.tsx`, `features/account/screens/AddressFormScreen.tsx`, `features/account/screens/AddressesScreen.tsx`

---

## 7) Next actions đề xuất

- Thêm logout button ở Account screen -> gọi `logoutSession()`.
- Đồng bộ `users/me` vào profile UI.
- Thêm smoke test script:
  - login -> list addresses -> place order -> list orders -> order detail.
- Nếu chuyển Alembic full, giữ `database/migrations/0001_baseline.sql` làm mốc lịch sử.

# 📱 Native E-Commerce App - Tổng Quan & Hướng Dẫn BE Python

---

## 🎯 TỔNG QUAN DỰ ÁN

### **1. Tên & Mục Đích**
- **Tên**: Jewelry Store (Native E-Commerce App)
- **Nền tảng**: React Native + Expo SDK 54
- **Mục đích**: Ứng dụng bán trang sức trực tuyến (jewelry e-commerce)
- **Trạng thái hiện tại**: MVP (Minimum Viable Product) - giai đoạn phát triển UI, chưa kết nối BE thực

---

## 📊 CHỨC NĂNG CHÍNH

### **A. Lõi Nghiệp Vụ**

#### 1️⃣ **Quản Lý Sản Phẩm (Product Management)**
   - Danh sách sản phẩm với filter (category, price range, search)
   - Chi tiết sản phẩm: tên, hình ảnh, mô tả, giá, rating, số lượt đánh giá
   - Biến thể (variants): màu sắc, SKU, giá riêng, tồn kho
   - Giảm giá (discount)
   - Danh mục (categories): tên, biểu tượng

#### 2️⃣ **Người Dùng & Tài Khoản (User & Auth)**
   - Đăng ký (signup): email, password
   - Đăng nhập (login): email, password
   - Quên mật khẩu (forgot password)
   - Thông tin hồ sơ: tên, avatar, số điện thoại
   - Chỉnh sửa hồ sơ (edit profile)

#### 3️⃣ **Địa Chỉ Giao Hàng (Address Management - CRUD)**
   - Thêm địa chỉ (create)
   - Xem danh sách địa chỉ (read)
   - Sửa địa chỉ (update)
   - Xóa địa chỉ (delete)
   - Đặt địa chỉ mặc định (set default)
   - Trường dữ liệu: name, phone, address, city, isDefault

#### 4️⃣ **Giỏ Hàng (Shopping Cart)**
   - Thêm/xóa/cập nhật số lượng; tổng tiền trong `CheckoutScreen` (công thức `product.price * quantity`)
   - **Hiện tại**: **Zustand** (`cartStore` + `useCart`), **không** persist AsyncStorage; chưa gửi `variantId` dù màn chi tiết có chọn biến thể

#### 5️⃣ **Thanh Toán (Checkout)**
   - Chọn địa chỉ giao hàng
   - Chọn phương thức thanh toán (credit card, e-wallet, COD)
   - Xem tóm tắt đơn hàng
   - Đặt hàng (place order) → clear cart → chuyển tiếp (success screen)
   - Xử lý lỗi thanh toán (failure screen)

#### 6️⃣ **Đơn Hàng (Order Management)**
   - Danh sách đơn hàng (order list) với filter theo trạng thái
   - Chi tiết đơn hàng: ID, ngày, trạng thái, tổng tiền, items, địa chỉ, phương thức TT, tracking
   - Trạng thái đơn: pending → processing → shipped → delivered (hoặc cancelled)
   - Timeline / Lịch sử (order timeline): các mốc và thời gian
   - Hỗ trợ hủy/hoàn hàng (cancel/return) - chưa implement

#### 7️⃣ **OnBoarding & Navigation**
   - Màn hình OnBoarding: lần đầu mở app; sau khi xem xong lưu flag (AsyncStorage) và vào tab
   - Tab chính (thứ tự trong `app/(tabs)/_layout.tsx`): **Shop** (`index`), **Order** (`order`), **Cart** (`cart`), **Account** (`account`), **Settings** (`settings`)
   - Màn Shop (`index`): header, category, carousel sản phẩm từ mock; title stack vẫn có thể hiển thị "Home"
   - Settings: shortcut/dev để mở các route (QA)
   - `modal`: màn modal mẫu (Expo Router)

---

## 🏗️ KIẾN TRÚC & CẤU TRÚC CODE

### **Tech Stack**
- **Frontend**: React Native 0.81.5, Expo Router v6
- **Styling**: NativeWind (Tailwind CSS cho RN)
- **State Management**: 
  - Local: `useState`, custom hooks
  - Global: Zustand (dùng cho Cart store hiện tại)
- **Async Storage**: @react-native-async-storage (thay thế AsyncStorage, cho mock data)
- **Navigation**: Expo Router (file-based routing)

### **Folder Structure** (khớp repo `my-app`)
```
app/                          # Expo Router
  (auth)/                     # login, signup, forgot (+ _layout)
  (tabs)/                     # index (Shop), order, cart, account, settings
  account/edit.tsx            # Sửa hồ sơ
  addresses/                  # index, new, [id]/edit — CRUD địa chỉ
  product/[id].tsx            # Chi tiết sản phẩm
  order/[id].tsx              # Chi tiết đơn
  checkout.tsx                # Checkout
  checkout-success.tsx, checkout-failure.tsx
  address.tsx                 # Chọn đổi địa chỉ (flow checkout)
  onboarding.tsx
  modal.tsx

features/
  auth/screens/               # Login, Signup, Forgot (+ AccountScreen legacy path nếu có)
  account/screens/            # Account, Addresses, AddressForm, EditProfile
  account/services/addressStorage.ts   # AsyncStorage + hook setAddressBackend
  cart/screens/, cart/hooks/useCart.ts
  checkout/screens/           # Checkout, Address (checkout)
  order/screens/, order/services/orderData.ts
  product/screens/, product/services/productData.ts

lib/
  types/models.ts             # User, Product, Address, Category
  types/products.ts           # ProductDetail, ProductVariant, ProductFilter (+ import Product từ models)
  types/orders.ts             # OrderDetail, OrderSummary, OrderStatus, …
  store/cartStore.ts          # Zustand giỏ hàng
  api/client.ts               # Chỉ `EXPO_PUBLIC_API_URL` (mặc định http://localhost:3000/api) — chưa có axios/fetch wrapper
  utils/                      # formatters, validators, productHelpers
  onboardingStorage.ts

components/home/              # HomeHeader, CategoryList, ProductCard, mockData, …
components/                   # Button, Container, TabBarIcon, …
```

---

## 📋 TÌNH TRẠNG HIỆN TẠI (Current Status - Đã Merge vào Main)

### ✅ **Đã Implement**
1. ✅ UI cho tất cả màn hình chính (Home, Cart, Orders, Account, Settings)
2. ✅ Mock data (products, orders, users, addresses)
3. ✅ Local state management (useState, Zustand cho cart)
4. ✅ Routing hoàn chỉnh (tab + dynamic routes)
5. ✅ Onboarding flow
6. ✅ Cart (add/remove/update quantity, local storage)
7. ✅ Address Management (CRUD with AsyncStorage)
8. ✅ Edit Profile (form chứa UI)
9. ✅ Checkout flow (order summary + success/failure screens)
10. ✅ Order detail screen (timeline, items, tracking)

### ⚠️ **Chưa Implement / Mock**
- ❌ Xác thực (Authentication): login/signup UI có nhưng chưa call BE
- ❌ Thanh toán thực (Real Payment): bây giờ chỉ mock
- ❌ Tìm kiếm (Search) sản phẩm
- ❌ Review/Rating sản phẩm
- ❌ Wishlist
- ❌ Thông báo (Notifications)
- ❌ Chat/Support
- ❌ Shipping tracking real-time

### 🔧 **Backend Integration Status**
- 📌 Địa chỉ: **`AddressLoad`** trong `features/account/services/addressStorage.ts` — `setAddressBackend()` để thay implementation AsyncStorage bằng HTTP (type đúng tên là `AddressLoad`, không phải `AddressBackend`).
- 📌 Giỏ hàng: **Zustand** (`lib/store/cartStore.ts`) + `useCart`, **chưa** persist AsyncStorage; mỗi line là `{ product, quantity }` theo `product.id` (xem mục Cart bên dưới — **chưa có `variantId` trong giỏ**).
- 📌 Auth: màn Login/Signup/Forgot có UI; Signup hiện chỉ thu thập **email + password** (placeholder "Username or Email"), **chưa** field `name` riêng — BE có thể nhận thêm `name` sau khi FE bổ sung.
- 📌 Sản phẩm / đơn: mock trong `productData.ts`, `orderData.ts`; danh mục trên Home (`components/home/mockData.ts` — `homeCategories`) **khác tập** `categoryId` gắn sản phẩm mock (vd. `accessories`, `rings`). Khi có BE nên thống nhất một nguồn category hoặc map rõ.
- 📌 Checkout: `CheckoutScreen` đang dùng **mảng địa chỉ hardcode** cho UI; nút Change mở `/address`. Khi tích hợp BE cần nối địa chỉ thật + giỏ hàng.

---

## 🔌 BACKEND API - YÊU CẦU & ĐẶC TẢ

> **Khớp type FE**: `User`, `Product`, `Address`, `Category` → `lib/types/models.ts`; `ProductDetail`, `ProductVariant`, `ProductFilter` → `lib/types/products.ts`; `OrderDetail`, `OrderSummary`, `OrderStatus`, … → `lib/types/orders.ts`.

### **0. Khác biệt quan trọng so với code FE hiện tại**

| Chủ đề | FE hiện tại | Gợi ý BE / bước nối FE |
|--------|-------------|-------------------------|
| Giỏ hàng | `CartItem`: `product` + `quantity`, key `product.id` | Order create nên nhận `productId` + `quantity`; **nên thêm `variantId` optional** để khớp màn chi tiết (đã chọn variant nhưng giỏ chưa lưu variant). |
| `discount` (Product) | `models.ts` khai báo `number`; mock/UI dùng **chuỗi** badge (`"10% off"`, `"Best seller"`) | BE trả `string` (nhãn) hoặc tách `discountPercent` + `discountLabel`; FE sẽ chuẩn hóa type sau. |
| `lib/api/client.ts` | Chỉ constant `API_BASE_URL`, mặc định **`http://localhost:3000/api`** | BE dev nên chạy đúng port hoặc set `EXPO_PUBLIC_API_URL` (Expo). **Không** có axios trong `package.json` — dùng `fetch` hoặc thêm client sau. |
| Thanh toán checkout | `id`: `card`, `cod`, `wallet` | API đặt hàng nên nhận enum/string tương ứng; mock đơn hàng dùng nhãn dài ("Credit Card", …) — có thể map ở FE. |

### **1. Authentication (Auth)**

#### POST /api/auth/signup
```json
// Request — khớp form Signup hiện tại (email + password); name là tùy chọn nếu FE bổ sung sau
{
  "email": "user@example.com",
  "password": "securePass123",
  "name": "Võ Tấn Đức"
}
// Response (201)
{
  "id": "user-123",
  "name": "Võ Tấn Đức",
  "email": "user@example.com",
  "token": "jwt-token-here"
}
```

#### POST /api/auth/login
```json
// Request
{
  "email": "user@example.com",
  "password": "securePass123"
}
// Response (200)
{
  "id": "user-123",
  "name": "Võ Tấn Đức",
  "email": "user@example.com",
  "token": "jwt-token-here"
}
```

#### POST /api/auth/forgot-password
```json
// Request
{ "email": "user@example.com" }
// Response (200)
{ "message": "Reset link sent to email" }
```

---

### **2. Users (Profile)**

#### GET /api/users/me
- Header: `Authorization: Bearer {token}`
- Response (200):
```json
{
  "id": "user-123",
  "name": "Võ Tấn Đức",
  "email": "user@example.com",
  "phone": "0901123456",
  "avatar": "https://...",
  "addresses": [...]
}
```

#### PUT /api/users/me
- Header: `Authorization: Bearer {token}`
- Request/Response: User object

---

### **3. Addresses (CRUD)**

#### GET /api/addresses
- Header: `Authorization: Bearer {token}`
- Response (200): `Address[]`

#### GET /api/addresses/{id}
- Header: `Authorization: Bearer {token}`
- Response (200): `Address`

#### POST /api/addresses
```json
// Request
{
  "name": "Home",
  "phone": "0901123456",
  "address": "65 Nguyen Trai, Ward 7",
  "city": "Ho Chi Minh",
  "isDefault": false
}
// Response (201)
{ "id": "addr-123", ...address fields }
```

#### PUT /api/addresses/{id}
- Header: `Authorization: Bearer {token}`
- Request/Response: Address object (with id)

#### DELETE /api/addresses/{id}
- Header: `Authorization: Bearer {token}`
- Response (204): No content

---

### **4. Products (Catalog)**

#### GET /api/products
- Query params (khớp `ProductFilter` trong FE): `categoryId`, `minPrice`, `maxPrice`, `search` — ví dụ: `?categoryId=rings&minPrice=100000&maxPrice=5000000&search=pearl`
- Response (200): mảng object khớp **`Product`** / **`ProductDetail`** (list có thể là bản rút gọn miễn có các field UI cần: `id`, `name`, `image`, `description`, `price`, `rating`, `reviews`, `variants`, `categoryId`, `discount` tùy chọn).
```json
[
  {
    "id": "jewelry-set-01",
    "name": "Pearl & Gold Jewelry Set",
    "image": "https://...",
    "description": "...",
    "price": 1299000,
    "variants": [
      {
        "id": "jewelry-set-01-gold",
        "color": "Gold",
        "price": 1299000,
        "stock": 12,
        "sku": "SKU-optional",
        "image": "https://..."
      }
    ],
    "rating": 4.8,
    "reviews": 248,
    "categoryId": "accessories",
    "discount": "10% off"
  }
]
```
- **`ProductVariant`**: `id`, `price`, `stock` bắt buộc; `color`, `sku`, `image` tùy chọn (đúng `lib/types/products.ts`).

#### GET /api/products/{id}
- Response (200): **`ProductDetail`** = `Product` + `images?: string[]` + `description: string` (xem `lib/types/products.ts`).

#### GET /api/categories
- Response (200): **`Category[]`** — `id`, `label`, `image` (theo `lib/types/models.ts`). Nên là nguồn duy nhất cho filter + carousel category trên Shop.

---

### **5. Cart (Shopping)**

> **Lưu ý**: FE hiện **không** gọi API giỏ; logic nằm ở Zustand. Contract dưới đây là mục tiêu khi persist server-side. Line item tối thiểu phải suy ra được giá hiển thị giống `CheckoutScreen` (`item.product.price * quantity`) cho tới khi FE lưu `variantId` + giá snapshot.

#### GET /api/carts/me
- Header: `Authorization: Bearer {token}`
- Response (200):
```json
{
  "items": [
    {
      "productId": "jewelry-set-01",
      "variantId": "jewelry-set-01-gold",
      "quantity": 2,
      "unitPrice": 1299000
    }
  ],
  "total": 2598000
}
```
- `variantId` **optional** để tương thích FE hiện tại (chỉ có `productId`).

#### POST /api/carts/me/items
```json
// Request — variantId khuyến nghị có khi FE đã cập nhật giỏ hàng
{ "productId": "jewelry-set-01", "variantId": "jewelry-set-01-gold", "quantity": 2 }
// Response (201): Cart object (như GET)
```

#### PUT /api/carts/me/items/{productId}
- Nếu có nhiều variant cho cùng `productId`, nên dùng query `?variantId=` hoặc body composite key; tạm thời có thể chỉ hỗ trợ một line / product như Zustand hiện tại.
```json
// Request
{ "quantity": 3 }
// Response (200): Cart object
```

#### DELETE /api/carts/me/items/{productId}
- Response (204)

#### DELETE /api/carts/me
- Clear cart
- Response (204)

---

### **6. Orders (Checkout & History)**

#### GET /api/orders
- Header: `Authorization: Bearer {token}`
- Query params: `?status=shipped&sort=date:desc`
- Response (200): **`OrderSummary[]`** — theo `lib/types/orders.ts`:
  - `id`, `code` (FE mock đang gán `code === id`), `date`, `status`, `total`, `itemCount`
- `status` ∈ `pending` | `processing` | `shipped` | `delivered` | `cancelled`

#### GET /api/orders/{id}
- Header: `Authorization: Bearer {token}`
- Response (200): **`OrderDetail`**: `id`, `date`, `status`, `total`, `items` (`OrderLineItem`: `id`, `name`, `price`, `quantity`, `image`), `shippingAddress` (object `name`, `phone`, `address`, `city`), `paymentMethod` (string), `tracking`, `estimatedDelivery`, `timeline` (`status`, `date`, `completed`).

#### POST /api/orders
```json
// Request — paymentMethod khớp id checkout FE: "card" | "cod" | "wallet" (hoặc chấp nhận cả nhãn hiển thị và chuẩn hóa phía server)
{
  "items": [
    { "productId": "...", "variantId": "...", "quantity": 2 }
  ],
  "shippingAddressId": "addr-123",
  "paymentMethod": "card",
  "paymentDetails": {}
}
// Response (201) — khớp OrderDetail
{
  "id": "ORD-1001",
  "status": "pending",
  "date": "2026-05-04T10:30:00Z",
  "total": 2598000,
  "items": [
    { "id": "line-1", "name": "...", "price": 1299000, "quantity": 2, "image": "https://..." }
  ],
  "shippingAddress": { "name": "...", "phone": "...", "address": "...", "city": "..." },
  "paymentMethod": "card",
  "tracking": "SHIP123456789",
  "estimatedDelivery": "2026-05-06T10:30:00Z",
  "timeline": [
    { "status": "Order Placed", "date": "2026-05-04T10:30:00Z", "completed": true }
  ]
}
```

#### PATCH /api/orders/{id}
```json
// Request (e.g., cancel order)
{ "status": "cancelled" }
// Response (200): OrderDetail
```

---

## 💻 HƯỚNG DẪN VIẾT PYTHON BACKEND

### **1. Stack Khuyến Nghị**

#### **Framework**: FastAPI (hot trend, hiệu năng cao, async-first)
```bash
# Cài đặt
pip install fastapi uvicorn sqlalchemy pydantic python-jose python-multipart email-validator
pip install psycopg2-binary  # PostgreSQL
pip install alembic  # Database migrations
pip install pytest  # Testing
```

#### **Cơ Sở Dữ Liệu**: PostgreSQL (recommended) hoặc SQLite dev
```sql
-- Các bảng cần:
- users (id, name, email, password_hash, phone, avatar, created_at)
- addresses (id, user_id, name, phone, address, city, is_default)
- categories (id, label, image)
- products (id, name, description, image, price, category_id, rating, reviews, discount_label hoặc discount_percent — align với FE: nhãn hiển thị thường là string)
- product_variants (id, product_id, color, sku, price, stock, image)
- carts (id, user_id, created_at)
- cart_items (id, cart_id, product_id, variant_id, quantity)
- orders (id, user_id, date, status, total, shipping_address_id, payment_method, tracking, estimated_delivery)
- order_items (id, order_id, product_id, variant_id, name, price, quantity, image)
- order_timeline (id, order_id, status, date, completed)
```

---

### **2. Project Structure**

```
backend/
├── main.py                 # Entry point (FastAPI app)
├── requirements.txt        # Dependencies
├── .env.example            # Environment variables template
├── config.py               # Configuration (DB URL, JWT secret, etc.)
├── database.py             # SQLAlchemy setup
│
├── models/                 # SQLAlchemy ORM models
│   ├── user.py
│   ├── product.py
│   ├── order.py
│   ├── address.py
│   └── cart.py
│
├── schemas/                # Pydantic request/response schemas
│   ├── user_schema.py
│   ├── product_schema.py
│   ├── order_schema.py
│   ├── address_schema.py
│   └── cart_schema.py
│
├── routes/                 # API endpoints
│   ├── auth.py             # /api/auth/*
│   ├── users.py            # /api/users/*
│   ├── products.py         # /api/products/*
│   ├── addresses.py        # /api/addresses/*
│   ├── carts.py            # /api/carts/*
│   └── orders.py           # /api/orders/*
│
├── services/               # Business logic
│   ├── auth_service.py
│   ├── product_service.py
│   ├── order_service.py
│   ├── address_service.py
│   └── cart_service.py
│
├── middleware/             # JWT auth, CORS, etc.
│   └── auth.py
│
├── utils/                  # Helpers
│   ├── security.py         # Password hashing, JWT
│   └── validators.py       # Input validation
│
└── tests/                  # Unit & integration tests
    ├── test_auth.py
    ├── test_products.py
    └── test_orders.py
```

---

### **3. Starter Code (main.py)**

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine
import routes

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Jewelry Store API", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # hoặc specify domains: ["http://localhost:3000", "https://yourdomain.com"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(routes.auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(routes.users.router, prefix="/api/users", tags=["users"])
app.include_router(routes.products.router, prefix="/api/products", tags=["products"])
app.include_router(routes.addresses.router, prefix="/api/addresses", tags=["addresses"])
app.include_router(routes.carts.router, prefix="/api/carts", tags=["carts"])
app.include_router(routes.orders.router, prefix="/api/orders", tags=["orders"])

@app.get("/")
def read_root():
    return {"message": "Jewelry Store API v1.0"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

---

### **4. Database Setup (database.py)**

```python
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
import os

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./test.db")

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

---

### **5. Cơ Chế Authentication (JWT)**

```python
# utils/security.py
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext

SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-in-prod")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

def create_access_token(data: dict, expires_delta: timedelta = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def decode_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            return None
        return user_id
    except JWTError:
        return None
```

---

### **6. Environment Variables (.env)**

```env
DATABASE_URL=postgresql://user:password@localhost/jewelry_store
SECRET_KEY=your-super-secret-key-change-in-production
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1,yourdomain.com

# Optional: Payment gateway (Stripe, PayPal, etc.)
# STRIPE_KEY=sk_test_...
```

---

### **7. Run Backend**

```bash
# Development
uvicorn main:app --reload

# Production
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
```

---

## 🔐 SECURITY BEST PRACTICES

1. **JWT Tokens**: Mỗi login trả về token, FE lưu + gửi kèm header `Authorization: Bearer {token}`
2. **Password Hashing**: Dùng bcrypt (không lưu plain password)
3. **HTTPS**: Bắt buộc production
4. **CORS**: Chỉ allow domains trusted (không dùng wildcard `*` production). Client React Native gốc **không** như trình duyệt web; CORS chủ yếu áp dụng khi chạy **Expo Web** hoặc gọi API từ origin cố định.
5. **Rate Limiting**: Chống brute-force login (`python-ratelimit`)
6. **Input Validation**: Pydantic auto-validate
7. **SQL Injection**: SQLAlchemy ORM prevents (không dùng raw SQL)

---

## 🤝 FRONTEND → BACKEND INTEGRATION

### **`lib/api/client.ts` (thực tế trong repo)**
File hiện chỉ export base URL — **chưa** có instance HTTP:
```typescript
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';
```
- FastAPI mặc định port **8000** → khi dev cùng máy nên đặt `EXPO_PUBLIC_API_URL=http://<LAN-IP>:8000/api` (thiết bị thật/emulator không dùng được `localhost` của máy host theo cùng cách web).
- Có thể mở rộng: nối chuỗi `API_BASE_URL` (bỏ dấu `/` cuối nếu cần) + `'/users/me'` rồi gọi `fetch` kèm header `Authorization`.

### **Gắn JWT (React Native — AsyncStorage, không dùng localStorage)**
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'auth_token';

export async function getAuthHeaders(): Promise<HeadersInit> {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Ví dụ GET /users/me (khi API_BASE_URL đã gồm /api)
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';
const res = await fetch(`${API_BASE_URL}/users/me`, { headers: await getAuthHeaders() });
```

### **Đổi lưu địa chỉ sang HTTP (khớp `AddressLoad`)**
Interface trong `addressStorage.ts` là **`AddressLoad`**, các hàm: `getAddresses`, `getAddressById`, `saveAddress`, `deleteAddress`, `createAddressPartial(data: Omit<Address, 'id'>)`.

```typescript
// ví dụ: features/account/services/addressBackendHttp.ts (tạo mới khi tích hợp)
import type { Address } from '~/lib/types/models';
import type { AddressLoad } from '~/features/account/services/addressStorage';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

async function authHeaders() {
  const token = await (await import('@react-native-async-storage/async-storage')).default.getItem('auth_token');
  return { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) } as Record<string, string>;
}

export const httpAddressBackend: AddressLoad = {
  async getAddresses() {
    const r = await fetch(`${API_BASE_URL}/addresses`, { headers: await authHeaders() });
    if (!r.ok) throw new Error('getAddresses failed');
    return r.json();
  },
  async getAddressById(id: string) {
    const r = await fetch(`${API_BASE_URL}/addresses/${id}`, { headers: await authHeaders() });
    if (!r.ok) return undefined;
    return r.json();
  },
  async saveAddress(addr: Address) {
    await fetch(`${API_BASE_URL}/addresses/${addr.id}`, {
      method: 'PUT',
      headers: await authHeaders(),
      body: JSON.stringify(addr),
    });
  },
  async deleteAddress(id: string) {
    await fetch(`${API_BASE_URL}/addresses/${id}`, { method: 'DELETE', headers: await authHeaders() });
  },
  async createAddressPartial(data: Omit<Address, 'id'>) {
    const r = await fetch(`${API_BASE_URL}/addresses`, {
      method: 'POST',
      headers: await authHeaders(),
      body: JSON.stringify(data),
    });
    if (!r.ok) throw new Error('create failed');
    return r.json();
  },
};

// Trong _layout.tsx (sau khi user đã login) hoặc startup:
import { setAddressBackend } from '~/features/account/services/addressStorage';
setAddressBackend(httpAddressBackend);
```
*(Điều chỉnh URL nếu BE không dùng prefix `/api` trùng với `API_BASE_URL`.)*

---

## ✅ CHECKLIST VIẾT PYTHON BE

- [ ] Tạo project FastAPI + setup database
- [ ] Create SQLAlchemy models (User, Product, Order, Address, etc.)
- [ ] Create Pydantic schemas (request/response)
- [ ] Implement Auth (signup, login, token)
- [ ] Implement Products CRUD (read-only for now)
- [ ] Implement Addresses CRUD + protected routes
- [ ] Implement Cart logic (get, add, update, delete)
- [ ] Implement Orders (create from cart, get list/detail)
- [ ] Add JWT middleware + auth dependency
- [ ] Test all endpoints (Postman/curl)
- [ ] Add logging + error handling
- [ ] Setup production deployment (Heroku/Railway/AWS)
- [ ] Connect FE to BE API (`EXPO_PUBLIC_API_URL`, token AsyncStorage, thay `AddressLoad` HTTP khi login)
- [ ] (Tuỳ chọn) Chuẩn hóa FE: `discount` type, giỏ hàng có `variantId`, Checkout dùng `getAddresses()` thay hardcode

---

## 📞 NOTES & LƯU Ý

1. **Async/Await**: FastAPI built-in async, sử dụng `async def` cho routes
2. **Database Migrations**: Dùng Alembic (FastAPI best practice)
3. **Testing**: Unit tests + integration tests (pytest)
4. **Pagination**: Implement cho `/api/products` & `/api/orders` (offset/limit)
5. **Filtering**: Support category, price range, search cho products
6. **Validation**: Email, phone format validation dùng Pydantic validators
7. **Error Handling**: Trả về consistent error responses (status code + message)
8. **Versioning**: API v1, v2, etc. dùng `/api/v1/` prefix
9. **Documentation**: FastAPI auto-generate Swagger docs tại `/docs`
10. **ENV**: Không commit `.env` file, dùng `.env.example`
11. **Expo + thiết bị thật**: API chạy trên máy dev cần bind `0.0.0.0` và dùng IP LAN trong `EXPO_PUBLIC_API_URL` (Android emulator thường dùng `10.0.2.2` để trỏ về host).

---

**Nguồn**: Đồng bộ với repo `my-app` (Expo 54, Expo Router 6, types trong `lib/types`), cập nhật 2026-05-04
