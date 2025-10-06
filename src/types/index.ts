// Product Types
export interface Product {
  id: number;
  name: string;
  productImage: string;
  quantity: number;
  discountPercentage: number;
  afterDiscountamt: number;
  category: string;
  description: string;
  trending: boolean;
  desire?: boolean;
  images?: ProductImage[];
  reviews?: Review[];
}

export interface ProductImage {
  imageP: string;
  url: string;
}

export interface Review {
  user: string;
  comment: string;
  rating: number;
}

// Cart Types
export interface CartItem extends Product {
  quantity: number;
}

// API Types
export interface CheckoutItem {
  id: number;
  quantity: number;
}

export interface CheckoutResponse {
  message: string;
  totalAmount: number;
  itemCount: number;
}

// Context Types
export interface DataContextType {
  productData: Product[];
  setProductData: React.Dispatch<React.SetStateAction<Product[]>>;
  searchToggle: boolean;
  setSearchToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CartContextType {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}
