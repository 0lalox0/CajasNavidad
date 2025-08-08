import { createContext, useContext, useState, ReactNode } from 'react';

export type CartItem = {
  title: string;
  price: number;
  url: string;
  quantity: number;
};

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (title: string) => void;
  clearCart: () => void;
  updateQuantity: (title: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const found = prev.find(i => i.title === item.title);
      if (found) {
        return prev.map(i => i.title === item.title ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
  };

  const updateQuantity = (title: string, quantity: number) => {
    setCart(prev => prev.map(i => i.title === title ? { ...i, quantity: Math.max(1, quantity) } : i));
  };

  const removeFromCart = (title: string) => {
    setCart(prev => prev.filter(i => i.title !== title));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
