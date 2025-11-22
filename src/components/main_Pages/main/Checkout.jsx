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
    zip: "",
    country: "",
    state: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      ...form,
      items: cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      })),
    };

    console.log("Submitting order", orderData); // ✅ Check console

    try {
      const res = await fetch("http://127.0.0.1:8000/medicine/place-order/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Your order has been placed successfully!");
        // Optionally clear cart here
      } else {
        alert(data.error || "Something went wrong!");
      }
    } catch (err) {
      alert("Server error: " + err.message);
    }
  };

  return (
    <div className="checkout-wrapper">
      {/* ===== LEFT: Form ===== */}
      <div className="checkout-left">
        <h2 className="title">Checkout</h2>
        <h4 className="subtitle">Shipping Information</h4>
        <form onSubmit={handleSubmit} className="checkout-form">
          <label>Full Name *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label>Email Address *</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Phone Number *</label>
          <input type="text" name="phone" placeholder="03xx-xxxxxxx" required />

          <label>Address *</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          />

          <label>Country *</label>
          <select
            name="country"
            value={form.country}
            onChange={handleChange}
            required
          >
            <option value="">Choose country</option>
            <option value="Pakistan">Pakistan</option>
            <option value="USA">USA</option>
          </select>

          <div className="row">
            <div>
              <label>City *</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>State *</label>
              <input
                type="text"
                name="state"
                value={form.state}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>ZIP *</label>
              <input
                type="text"
                name="zip"
                value={form.zip}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="terms">
            <input type="checkbox" required /> I agree to Terms & Conditions
          </div>

          {/* Optional Pay Now button triggers same submit */}
          <button className="pay-btn" onClick={handleSubmit}>
            Pay Now
          </button>
        </form>
      </div>

      {/* ===== RIGHT: Cart Summary ===== */}
      <div className="checkout-right">
        <h3 className="subtitle">Order Summary</h3>

        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image_url} alt={item.name} />
            <div>
              <p>{item.name}</p>
              <span>
                Rs {item.price} × {item.quantity}
              </span>
            </div>
          </div>
        ))}

        <div className="summary">
          <p>
            <span>Subtotal</span>
            <span>Rs {getTotal()}</span>
          </p>
          <p>
            <span>Shipping</span>
            <span>Rs 0</span>
          </p>
          <hr />
          <p className="total">
            <span>Total</span>
            <span>Rs {getTotal()}</span>
          </p>
        </div>

        <p className="secure">🔒 Secure Checkout – SSL Encrypted</p>
      </div>
    </div>
  );
}
