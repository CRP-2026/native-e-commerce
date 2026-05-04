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
   - Thêm/xóa sản phẩm vào giỏ
   - Cập nhật số lượng (quantity)
   - Tính tổng giỏ (subtotal)
   - Xóa giỏ (clear cart)
   - **Hiện tại**: lưu local (AsyncStorage), sẽ nối BE sau

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
   - Màn hình OnBoarding: 3 slide, hướng dẫn app
   - Skip/Next điều hướng tới tabs
   - Tab chính: Home, Cart, Orders, Account, Settings
   - Settings: test navigator đến tất cả route (để QA/dev test)

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

### **Folder Structure**
```
app/                          # Expo Router routes (thin wrappers)
  (auth)/                     # Auth routes (login, signup, forgot)
  (tabs)/                     # Tab routes (home, cart, orders, account, settings)
  account/                    # Account routes (edit profile)
  addresses/                  # Address routes (CRUD)
  product/, order/            # Dynamic routes (detail screens)
  checkout*, checkout-success*, checkout-failure*  # Checkout flow

features/                     # Business logic & UI screens
  auth/                       # Auth screens + types
  cart/                       # Cart logic (hook + screen)
  product/                    # Product screens & mock data
  order/                      # Order screens & mock data
  checkout/                   # Checkout screens
  account/                    # Account screens (profile, addresses)

lib/
  types/                      # TypeScript models (models.ts, products.ts, orders.ts)
  store/                      # Zustand stores (cartStore)
  api/                        # API client (placeholder, chưa implement)
  utils/                      # Formatters, validators, helpers
  onboardingStorage.ts        # Onboarding state (AsyncStorage)

components/                   # Reusable UI components
  home/                       # Home-specific components
  ui/                         # Generic UI components
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
- 📌 Address storage: **Pluggable backend** (có hàm `setAddressBackend()` để đổi từ AsyncStorage → HTTP API)
- 📌 Cart: LocalStorage, cần connect BE khi cần persist across devices
- 📌 Auth: UI có, cần call BE API
- 📌 Products: Mock data, sẵn sàng call GET /api/products
- 📌 Orders: Mock data, sẵn sàng call GET /api/orders

---

## 🔌 BACKEND API - YÊUV CẦU & ĐẶC TẢ

### **1. Authentication (Auth)**

#### POST /api/auth/signup
```json
// Request
{
  "name": "Võ Tấn Đức",
  "email": "user@example.com",
  "password": "securePass123"
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
- Query params: `?category=accessories&minPrice=100&maxPrice=1000&search=ring`
- Response (200):
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
        "stock": 12
      }
    ],
    "rating": 4.8,
    "reviews": 248,
    "categoryId": "accessories",
    "discount": "10% off"
  }
]
```

#### GET /api/products/{id}
- Response (200): `ProductDetail` (như trên + images[], description)

#### GET /api/categories
- Response (200): `Category[]` - list danh mục

---

### **5. Cart (Shopping)**

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
      "price": 1299000
    }
  ],
  "total": 2598000
}
```

#### POST /api/carts/me/items
```json
// Request
{ "productId": "jewelry-set-01", "variantId": "jewelry-set-01-gold", "quantity": 2 }
// Response (201): Cart object
```

#### PUT /api/carts/me/items/{productId}
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
- Response (200): `OrderSummary[]`

#### GET /api/orders/{id}
- Header: `Authorization: Bearer {token}`
- Response (200): `OrderDetail`

#### POST /api/orders
```json
// Request
{
  "items": [
    { "productId": "...", "variantId": "...", "quantity": 2 }
  ],
  "shippingAddressId": "addr-123",
  "paymentMethod": "credit_card",
  "paymentDetails": { ...payment info }
}
// Response (201)
{
  "id": "ORD-1001",
  "status": "pending",
  "date": "2026-05-04T10:30:00Z",
  "total": 2598000,
  "items": [...],
  "tracking": "SHIP123456789",
  "timeline": [...]
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
- products (id, name, description, image, price, category_id, rating, reviews, discount)
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
4. **CORS**: Chỉ allow domains trusted (không dùng wildcard "*" production)
5. **Rate Limiting**: Chống brute-force login (`python-ratelimit`)
6. **Input Validation**: Pydantic auto-validate
7. **SQL Injection**: SQLAlchemy ORM prevents (không dùng raw SQL)

---

## 🤝 FRONTEND → BACKEND INTEGRATION

### **Frontend Setup**
```typescript
// lib/api/client.ts
import axios from 'axios';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000/api';

const client = axios.create({ baseURL: API_BASE_URL });

// Add JWT token to all requests
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // hoặc AsyncStorage.getItem
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default client;
```

### **Update Address Storage to Use Backend**
```typescript
// features/account/services/addressBackendHttp.ts
import client from '~/lib/api/client';
import { Address, AddressBackend } from './addressStorage';

export const httpBackend: AddressBackend = {
  async getAddresses() {
    const { data } = await client.get('/addresses');
    return data;
  },
  async getAddressById(id: string) {
    const { data } = await client.get(`/addresses/${id}`);
    return data;
  },
  async saveAddress(addr: Address) {
    await client.put(`/addresses/${addr.id}`, addr);
  },
  async deleteAddress(id: string) {
    await client.delete(`/addresses/${id}`);
  },
  async createAddressPartial(data) {
    const { data: result } = await client.post('/addresses', data);
    return result;
  },
};

// In app/_layout.tsx or startup:
import { setAddressBackend } from '~/features/account/services/addressStorage';
import { httpBackend } from '~/features/account/services/addressBackendHttp';

setAddressBackend(httpBackend);
```

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
- [ ] Connect FE to BE API

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

---

**Nguồn**: Project review & structure, live conversation 2026-05-04
