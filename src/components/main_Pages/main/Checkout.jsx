import React, { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";

import "../css/Checkout.css";

export default function CheckoutPage() {
  const { cartItems, getTotal } = useContext(CartContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: ""
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order Placed Successfully!");
  };

  return (
    <>
      <div className="checkout-wrapper">

        {/* LEFT — FORM */}
        <div className="checkout-left">
          <h2 className="title">Checkout</h2>
          <h4 className="subtitle">Shipping Information</h4>
          <form onSubmit={handleSubmit} className="checkout-form">
            <label>Full Name *</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required />

            <label>Email Address *</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required />

            <label>Phone Number *</label>
            <input type="text" placeholder="03xx-xxxxxxx" required />

            <label>Address *</label>
            <input type="text" name="address" value={form.address} onChange={handleChange} required />

            <label>Country *</label>
            <select name="country" required>
              <option value="">Choose country</option>
              <option value="Pakistan">Pakistan</option>
              <option value="USA">USA</option>
            </select>

            <div className="row">
              <div>
                <label>City *</label>
                <input type="text" name="city" value={form.city} onChange={handleChange} required />
              </div>
              <div>
                <label>State *</label>
                <input type="text" placeholder="Enter state" required />
              </div>
              <div>
                <label>ZIP *</label>
                <input type="text" name="zip" value={form.zip} onChange={handleChange} required />
              </div>
            </div>

            <div className="terms">
              <input type="checkbox" required /> I agree to Terms & Conditions
            </div>

            <button type="submit" className="checkout-btn">Place Order</button>
          </form>
        </div>

        {/* RIGHT — CART SUMMARY */}
        <div className="checkout-right">
          <h3 className="subtitle">Order Summary</h3>

          {cartItems.map(item => (
            <div className="cart-item" key={item.id}>
              <img src={item.image_url} alt={item.name} />
              <div>
                <p>{item.name}</p>
                <span>Rs {item.price} × {item.quantity}</span>
              </div>
            </div>
          ))}

          <div className="summary">
            <p><span>Subtotal</span><span>Rs {getTotal()}</span></p>
            <p><span>Shipping</span><span>Rs 0</span></p>
            <hr />
            <p className="total"><span>Total</span><span>Rs {getTotal()}</span></p>
          </div>

          <button className="pay-btn">Pay Now</button>
          <p className="secure">🔒 Secure Checkout – SSL Encrypted</p>
        </div>
      </div>

    </>
  );
}
