"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type CartItemType = {
  id: number;
  productId: number;
  itemName: string;
  itemDetails?: string;
  category: string;
  type?: string;
  addOns?: string[];
  sweetness?: string;
  quantity: number;
  price: number;
  image: string;
};

type CartContextType = {
  cartItems: CartItemType[] | null;
  // addToCart: (item: CartItemType) => void;
  addToCart: (item: CartItemType) => number;
  updateCartItem: (updatedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
  setCartItems: React.Dispatch<React.SetStateAction<CartItemType[] | null>>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItemType[] | null>(null);

  // Load cart items from localStorage on initial mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedItems = localStorage.getItem("cartItems");
      if (storedItems) {
        setCartItems(JSON.parse(storedItems));
      } else {
        setCartItems([]);
      }
    }
  }, []);

  // Save cart items to localStorage whenever they change, after initial load
  useEffect(() => {
    if (cartItems !== null && typeof window !== "undefined") {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // const addToCart = (item: CartItemType) => {
  //   setCartItems((prevItems) => (prevItems ? [...prevItems, item] : [item]));
  // };

  // Add return to test
  const addToCart = (item: CartItemType) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems ? [...prevItems, item] : [item];
      return updatedCart;
    });

    // Return the new cart length
    return cartItems ? cartItems.length + 1 : 1;
  };

  const updateCartItem = (updatedItem: CartItemType) => {
    if (cartItems) {
      setCartItems(
        cartItems.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        )
      );
    }
  };

  const removeFromCart = (id: number) => {
    if (cartItems) {
      setCartItems(cartItems.filter((item) => item.id !== id));
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateCartItem,
        removeFromCart,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
