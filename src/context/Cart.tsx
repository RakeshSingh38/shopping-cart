import { createContext, useState, useEffect, ReactNode } from 'react';
import { CartContextType, CartItem } from '../types';

export const cartContext = createContext<CartContextType | undefined>(undefined);

interface CartProps {
  children: ReactNode;
}

function Cart({ children }: CartProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <cartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </cartContext.Provider>
  );
}

export default Cart;
