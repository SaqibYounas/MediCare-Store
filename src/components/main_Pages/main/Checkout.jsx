import React, { useState } from "react";
import "../css/Checkout.css";
import Header from "../Layouts/Header";
import Footer from "../Layouts/Footer";
export default function CheckoutPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order Placed Successfully!");
  };

  return (
    <>      <Header/>

    <div className="checkout-wrapper">
      {/* LEFT SIDE — FORM */}
      <div className="checkout-left">
        <h2 className="title">Checkout</h2>
        <h4 className="subtitle">Shipping Information</h4>

        <form onSubmit={handleSubmit} className="checkout-form">
          <label>Full Name *</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required />

          <label>Email Address *</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />

          <label>Phone Number *</label>
          <input type="text" name="phone" placeholder="03xx-xxxxxxx" required />

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

      {/* RIGHT SIDE — CART SUMMARY */}
      <div className="checkout-right">
        <h3 className="subtitle">Order Summary</h3>

        <div className="cart-item">
          <img src="/images/sofa.png" alt="item" />
          <div>
            <p>DuoComfort Sofa</p>
            <span>$20.00</span>
          </div>
        </div>

        <div className="cart-item">
          <img src="/images/table.png" alt="item" />
          <div>
            <p>IronOne Desk</p>
            <span>$25.00</span>
          </div>
        </div>

        <div className="summary">
          <p><span>Subtotal</span><span>$45.00</span></p>
          <p><span>Shipping</span><span>$5.00</span></p>
          <p><span>Discount</span><span>-10.00</span></p>
          <hr />
          <p className="total"><span>Total</span><span>$40.00</span></p>
        </div>

        <button className="pay-btn">Pay Now</button>
        <p className="secure">🔒 Secure Checkout – SSL Encrypted</p>
      </div>
    </div>
    <Footer/>
    </>
  );
}
