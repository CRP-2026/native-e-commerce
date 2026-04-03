export interface Product {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  oldPrice?: string;
  originalPrice?: string;
  discount?: string;
  rating: number;
  reviews: number;
  image: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  addresses?: Address[];
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  isDefault: boolean;
}

export interface Category {
  id: string;
  label: string;
  image: string;
}
