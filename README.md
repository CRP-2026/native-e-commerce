# Native E-Commerce App - React Native với Expo Router

Dự án React Native thương mại điện tử sử dụng Expo SDK 54, Expo Router v6, NativeWind (Tailwind CSS), và Zustand để quản lý state.

## 📋 Mục Lục

- [Yêu Cầu Hệ Thống](#yêu-cầu-hệ-thống)
- [Cài Đặt](#cài-đặt)
- [Chạy Dự Án](#chạy-dự-án)
- [Cấu Trúc Dự Án](#cấu-trúc-dự-án)
- [Công Nghệ Sử Dụng](#công-nghệ-sử-dụng)
- [Các Màn Hình Chính](#các-màn-hình-chính)
- [State Management](#state-management)
- [Hướng Dẫn Phát Triển](#hướng-dẫn-phát-triển)

---

## 🖥️ Yêu Cầu Hệ Thống

- **Node.js**: >= 18.x (khuyến nghị 20.x)
- **npm**: >= 9.x hoặc **yarn**: >= 1.22.x
- **Git**: Để quản lý version control
- **Expo CLI**: Cài đặt global (optional) hoặc sử dụng `npx expo`

### Development Tools (Tùy chọn)

- **Android Studio**: Cho Android development
- **Xcode**: Cho iOS development (chỉ trên macOS)
- **VS Code**: Editor được khuyến nghị

---

## 🚀 Cài Đặt

### Bước 1: Clone hoặc tải dự án

```bash
git clone <repository-url>
cd my-app
```

### Bước 2: Cài đặt dependencies

```bash
npm install
```

### Bước 3: Fix dependencies

```bash
npx expo install --fix
```

Kiểm tra lại với:

```bash
npx expo-doctor
```

### Bước 4: Cấu hình sẵn sàng

Các file cấu hình đã được setup:

- ✅ `babel.config.js` - Babel + NativeWind
- ✅ `metro.config.js` - Metro bundler
- ✅ `tailwind.config.js` - Tailwind CSS
- ✅ `tsconfig.json` - TypeScript
- ✅ `global.css` - Global styles
- ✅ `app.json` - Expo config

---

## ▶️ Chạy Dự Án

### Khởi động Dev Server

```bash
npm start
```

Hoặc với yarn:

```bash
yarn start
```

Bạn có thể:

- Nhấn `a` để mở Android emulator
- Nhấn `i` để mở iOS simulator (macOS only)
- Nhấn `w` để mở web browser
- Quét QR code bằng Expo Go app

### Chạy trên Platform Cụ Thể

```bash
# Android
npm run android

# iOS (macOS only)
npm run ios

# Web
npm run web
```

### Các Lệnh Khác

```bash
# Lint code
npm run lint

# Format code
npm run format

# Restart với cache reset
npm start -- --reset-cache
```

---

## 📁 Cấu Trúc Dự Án

```
my-app/
├── app/                              # Routing layer (Expo Router)
│   ├── _layout.tsx                  # Root stack layout
│   ├── modal.tsx                    # Modal screen
│   ├── +not-found.tsx               # 404 page
│   │
│   ├── (tabs)/                      # Tab navigation group
│   │   ├── _layout.tsx              # Tab layout (4 tabs)
│   │   ├── index.tsx                # Home (tab Shop): featured, search, promo, products
│   │   ├── two.tsx                  # Orders history
│   │   ├── cart.tsx                 # Shopping cart
│   │   └── account.tsx              # User account
│   │
│   ├── (auth)/                      # Auth modal group
│   │   ├── _layout.tsx
│   │   ├── login.tsx                # Login screen
│   │   └── signup.tsx               # Sign up screen
│   │
│   ├── product/
│   │   └── [id].tsx                 # Product detail (dynamic)
│   │
│   └── order/
│       └── [id].tsx                 # Order detail (dynamic)
│
├── features/                         # Feature modules (business logic)
│   ├── auth/
│   │   ├── screens/
│   │   │   └── LoginScreen.tsx
│   │   ├── hooks/
│   │   │   └── useAuth.ts
│   │   ├── services/
│   │   └── store/
│   │
│   ├── product/
│   │   ├── screens/
│   │   │   ├── HomeScreen.tsx
│   │   │   ├── ProductDetailScreen.tsx
│   │   │   └── SearchScreen.tsx
│   │   ├── hooks/
│   │   ├── services/
│   │   └── store/
│   │
│   ├── cart/
│   │   ├── screens/
│   │   │   └── CartScreen.tsx
│   │   ├── hooks/
│   │   │   └── useCart.ts
│   │   ├── services/
│   │   └── store/
│   │
│   └── order/
│       ├── screens/
│       │   ├── OrdersScreen.tsx
│       │   └── OrderDetailScreen.tsx
│       ├── services/
│       └── store/
│
├── components/                       # Reusable UI components
│   ├── ui/                          # Basic UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Card.tsx
│   │
│   ├── common/                      # Common components
│   │   ├── Header.tsx
│   │   ├── Loading.tsx
│   │   └── EmptyState.tsx
│   │
│   ├── product/                     # Product-specific components
│   │   ├── ProductCard.tsx
│   │   └── ProductGrid.tsx
│   │
│   ├── Button.tsx
│   ├── Container.tsx
│   ├── HeaderButton.tsx
│   ├── TabBarIcon.tsx
│   ├── ScreenContent.tsx
│   └── EditScreenInfo.tsx
│
├── lib/                              # Shared utilities
│   ├── api/
│   │   └── client.ts                # API client (fetch wrapper)
│   │
│   ├── store/
│   │   └── store.ts                 # Zustand store (global state)
│   │
│   ├── types/
│   │   └── models.ts                # TypeScript types & interfaces
│   │
│   ├── utils/
│   │   ├── formatters.ts            # Currency, date formatting
│   │   └── validators.ts            # Email, password validation
│   │
│   ├── constants/
│   └── hooks/
│
├── config/
│   └── env.ts                       # Environment variables
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── global.css                        # Tailwind CSS global
├── tailwind.config.js
├── babel.config.js
├── metro.config.js
├── tsconfig.json
├── app.json
├── package.json
└── README.md
```

---

## 🛠️ Công Nghệ Sử Dụng

### Core Stack

- **Expo SDK 54** - Framework chính
- **React 19.1.0** - UI library
- **React Native 0.81.5** - Mobile framework
- **TypeScript 5.9.2** - Type safety

### Navigation & Routing

- **Expo Router v6** - File-based routing

### State Management

- **Zustand** - Lightweight state management (cart, auth, products, filters)

### Styling

- **NativeWind** - Tailwind CSS cho React Native
- **Tailwind CSS 3.4.0** - Utility-first CSS

### UI & Icons

- **@expo/vector-icons** - Icon library
- **React Native Reanimated** - Smooth animations

### Development

- **TypeScript** - Type checking
- **ESLint** - Code linting
- **Prettier** - Code formatting

---

## 📱 Các Màn Hình Chính

### Tab Navigation (4 Tabs)

1. **🏪 Shop / Home** (`(tabs)/index.tsx`)
   - Màn **Home**: All Featured (Sort / Filter), thanh tìm kiếm, danh mục ngang, banner khuyến mãi, Deal of the Day, sản phẩm ngang, Special Offers, Sponsored
   - Dữ liệu hiện là mock để demo UI; có thể nối store/API sau
   - Điều hướng chi tiết sản phẩm: `app/product/[id].tsx` (khi đã gắn navigation từ card)

2. **📦 Orders** (`two.tsx`)
   - Lịch sử đơn hàng
   - Trạng thái đơn hàng
   - Chi tiết đơn hàng

3. **🛒 Cart** (`cart.tsx`)
   - Hiển thị giỏ hàng
   - Sửa số lượng sản phẩm
   - Tính tổng tiền
   - Thanh toán

4. **👤 Account** (`account.tsx`)
   - Thông tin tài khoản
   - Địa chỉ giao hàng
   - Phương thức thanh toán
   - Đăng xuất

### Auth Screens

- **Login** (`(auth)/login.tsx`) - Đăng nhập
- **Sign Up** (`(auth)/signup.tsx`) - Đăng ký

---

## 📝 Cập nhật gần đây

### Màn Home (tab đầu tiên — Shop)

| Mục | Chi tiết |
|-----|----------|
| **File** | `app/(tabs)/index.tsx` — component `HomeScreen`, `Stack.Screen` title **Home** |
| **Thiết kế tham chiếu** | Figma — *eCommerce App UI Kit* (Community), frame **Home page** (`node-id=1-17021`). Một số block (ví dụ search bar, header All Featured + Sort/Filter) lấy qua **Figma MCP** (`get_design_context`). Các phần còn lại bám theo cấu trúc layout của frame khi MCP đạt giới hạn gọi (Starter plan). |
| **UI** | All Featured + Sort / Filter; search placeholder *Search any Product..*; categories cuộn ngang; banner promo; Deal of the Day; product cards cuộn ngang; Special Offers; Sponsored (ảnh mẫu qua URL). |
| **Stack** | NativeWind (`className`), `@expo/vector-icons` (Feather, Ionicons), `ScrollView` (dọc + ngang). |

---

## 🎯 State Management (Zustand)

Quản lý state global thông qua `lib/store/store.ts`:

```typescript
import { useStore } from '~/lib/store/store';

// Auth state
const { user, isLoggedIn, login, logout } = useStore();

// Cart state
const { cart, addToCart, removeFromCart, getCartTotal } = useStore();

// Products
const { products, setProducts } = useStore();

// Favorites
const { favorites, toggleFavorite, isFavorite } = useStore();
```

### Store Actions

**Auth:**

- `setUser(user)` - Set user
- `setLogin(user, token)` - Login
- `logout()` - Logout

**Cart:**

- `addToCart(item)` - Thêm sản phẩm
- `removeFromCart(productId)` - Xóa sản phẩm
- `updateCartQuantity(productId, qty)` - Sửa số lượng
- `clearCart()` - Xóa toàn bộ giỏ
- `getCartTotal()` - Tính tổng tiền
- `getCartCount()` - Đếm số sản phẩm

**Products:**

- `setProducts(products)` - Set danh sách
- `toggleFavorite(productId)` - Thêm/xóa yêu thích
- `isFavorite(productId)` - Kiểm tra yêu thích

---

## 🔧 Hướng Dẫn Phát Triển

### Tạo Màn Hình Mới

1. Tạo file trong `features/{feature}/screens/`
2. Tạo routing file trong `app/`
3. Import screen vào routing file

```typescript
// features/product/screens/SearchScreen.tsx
export default function SearchScreen() {
  return (
    <View>
      {/* Component */}
    </View>
  );
}

// app/(tabs)/search.tsx (nếu muốn thêm tab)
import SearchScreen from '~/features/product/screens/SearchScreen';

export default function SearchTab() {
  return (
    <>
      <Stack.Screen options={{ title: 'Search' }} />
      <SearchScreen />
    </>
  );
}
```

### Sử Dụng Custom Hooks

```typescript
// Dùng useCart hook
import { useCart } from '~/features/cart/hooks/useCart';

export default function ProductCard() {
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart({
      productId: product.id,
      product,
      quantity: 1,
      price: product.price,
    });
  };

  return <Button onPress={handleAddToCart} />;
}
```

### Styling với NativeWind

Ưu tiên NativeWind (Tailwind CSS):

```tsx
// ✅ Tốt - NativeWind
<View className="flex-1 p-4 bg-white rounded-lg">
  <Text className="text-xl font-bold text-blue-600">Hello</Text>
</View>

// ❌ Tránh - StyleSheet
const styles = StyleSheet.create({...});
<View style={styles.container} />
```

### Path Aliases

Sử dụng `~/` thay vì relative imports:

```tsx
// ✅ Tốt
import { useCart } from '~/features/cart/hooks/useCart';
import { formatCurrency } from '~/lib/utils/formatters';
import { Product } from '~/lib/types/models';

// ❌ Tránh
import { useCart } from '../../../features/cart/hooks/useCart';
```

### API Integration

```typescript
import { apiClient } from '~/lib/api/client';
import { useStore } from '~/lib/store/store';

export const productService = {
  async getProducts() {
    return apiClient.get('/products');
  },

  async getProductById(id: string) {
    return apiClient.get(`/products/${id}`);
  },
};

// Sử dụng
const { setProducts } = useStore();

useEffect(() => {
  productService.getProducts().then(setProducts);
}, []);
```

### TypeScript Types

```typescript
// lib/types/models.ts
import { Product, CartItem, Order, User } from '~/lib/types/models';
```

---

## 📋 Danh Sách Features

- ✅ Navigation (Tab + Stack)
- ✅ Product listing & search
- ✅ Shopping cart
- ✅ Order management
- ✅ User authentication
- ✅ State management (Zustand)
- ✅ API client ready
- ✅ Utility functions (formatters, validators)
- ⏳ Payment integration (coming)
- ⏳ Product details screen
- ⏳ Search & filters
- ⏳ User profile edit

---

## 🐛 Troubleshooting

### Lỗi: "Cannot find module"

```bash
# Clear cache & reinstall
rm -rf node_modules package-lock.json
npm install
```

### Lỗi: "Metro cache"

```bash
npm start -- --reset-cache
```

### Lỗi: "NativeWind không hoạt động"

- Kiểm tra `global.css` được import trong `app/_layout.tsx`
- Restart Metro: `npm start -- --reset-cache`

---

## 📚 Tài Liệu Tham Khảo

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [React Native Docs](https://reactnative.dev/)
- [NativeWind](https://www.nativewind.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zustand](https://github.com/pmndrs/zustand)
- [TypeScript](https://www.typescriptlang.org/docs/)

---

## ✅ Checklist Bắt Đầu

- [ ] Đã cài Node.js >= 18.x
- [ ] Đã chạy `npm install`
- [ ] Đã chạy `npx expo-doctor` (pass 17/17)
- [ ] Đã chạy `npm start` thành công
- [ ] App hoạt động trên ≥1 platform
- [ ] Có thể navigate giữa 4 tabs

---

## 📄 License

MIT License
