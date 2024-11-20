"use client";

import React, { useEffect, useState } from "react";
import styles from "./cartPage.module.css";
import CartItem from "../components/CartItem/CartItem";
import NavBar from "../components/Nav/Nav";
import Link from "next/link";
import { CartProvider, useCart } from "@/context/CartContext";

const CartPage: React.FC = () => {
  const { cartItems, updateCartItem, removeFromCart } = useCart();
  const [isSelectMode, setIsSelectMode] = useState(false);

  const updateItemQuantity = (id: number, newQuantity: number) => {
    if (cartItems) {
      const item = cartItems.find((item) => item.id === id);
      if (item) {
        updateCartItem({ ...item, quantity: newQuantity });
      }
    }
  };

  const handleIncreaseQuantity = (id: number, currentQuantity: number) => {
    updateItemQuantity(id, currentQuantity + 1);
  };

  const handleDecreaseQuantity = (id: number, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateItemQuantity(id, currentQuantity - 1);
    }
  };

  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
  };

  const handleSelectToggle = () => {
    setIsSelectMode((prev) => !prev);
  };

  return (
    <main className={styles.main}>
      <NavBar />
      <div className={styles.miscContainer}>
        <p className={styles.myCart}>My Cart</p>
        <button
          className={
            isSelectMode ? styles.cancelButtonActive : styles.cancelButton
          }
          onClick={handleSelectToggle}
        >
          {isSelectMode ? "Cancel" : "Select"}
        </button>
      </div>

      <div className={styles.itemContainer}>
        {cartItems &&
          cartItems.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              itemName={item.itemName}
              type={item.type || ""}
              addOns={item.addOns || []}
              sweetness={item.sweetness || ""}
              quantity={item.quantity}
              price={item.price}
              image={item.image}
              onIncrease={() => handleIncreaseQuantity(item.id, item.quantity)}
              onDecrease={() => handleDecreaseQuantity(item.id, item.quantity)}
              onRemove={() => handleRemoveItem(item.id)}
              isSelectMode={isSelectMode}
            />
          ))}
      </div>

      <footer className={styles.footer}>
        <div className={styles.totalContainer}>
          <p>Total</p>
          <p>
            {cartItems &&
              cartItems.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )}{" "}
            Baht
          </p>
        </div>
        <div className={styles.nextButtonContainer}>
          <button className={styles.nextButton}>
            <Link href="/paymentpage">Next</Link>
          </button>
        </div>
      </footer>
    </main>
  );
};

export default CartPage;
