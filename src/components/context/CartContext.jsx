// CartContext.jsx
import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orderCount, setOrderCount] = useState(0);

  const addToCart = (product, qty = 1) => {
    const existing = cartItems.find(item => item.id === product.id);
    if (existing) {
      setCartItems(cartItems.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: qty }]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const refreshOrderCount = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/medicine/orders/count/");
      const data = await res.json();
      if (res.ok) {
        setOrderCount(data.count);
      }
    } catch (err) {
      console.log("Error fetching orders count:", err);
    }
  };

  return (
    <CartContext.Provider 
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        getTotal,
        orderCount,           
        refreshOrderCount     
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
