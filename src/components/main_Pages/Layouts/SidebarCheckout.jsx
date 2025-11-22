import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../css/SidebarCheckout.css";

export default function CartSidebar({ isOpen, onClose }) {
  const { cartItems, getTotal, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={onClose}>✖</button>
      <h2>Shopping Cart</h2>
      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cartItems.map(item => (
            <div className="cart-item" key={item.id}>
              <img src={item.image_url} alt={item.name} />
              <div className="item-info">
                <p>{item.name}</p>
                <p>Rs {item.price} × {item.quantity}</p>
              </div>
              {/* Delete Button */}
              <button 
                className="delete-btn" 
                onClick={() => removeFromCart(item.id)}
              >
                🗑
              </button>
            </div>
          ))
        )}
      </div>
      <h3>Total: Rs {getTotal()}</h3>
      <button className="order-now-btn" onClick={() => navigate("/checkout")}>
        Proceed to Checkout
      </button>
    </div>
  );
}
