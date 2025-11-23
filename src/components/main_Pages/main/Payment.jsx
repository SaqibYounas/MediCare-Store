import React, { useState } from "react";
import "../css/Payment.css";

export default function PaymentCard() {
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Payment Info Submitted!\n${JSON.stringify(formData, null, 2)}`);
  };

  return (
    <div className="card-container">
      <h2>Payment Information</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name on Card:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
        </label>

        <label>
          Card Number:
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            maxLength="16"
            required
          />
        </label>

        <label>
          Expiry Date:
          <input
            type="text"
            name="expiry"
            value={formData.expiry}
            onChange={handleChange}
            placeholder="MM/YY"
            maxLength="5"
            required
          />
        </label>

        <label>
          CVV:
          <input
            type="password"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            placeholder="123"
            maxLength="3"
            required
          />
        </label>

        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
}
