import React, { useState, useContext } from "react";
import "../css/Payment.css";
import { CartContext } from "../../context/CartContext"; 
import { useNavigate } from "react-router-dom";

export default function PaymentCard() {
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { refreshOrderCount } = useContext(CartContext); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name_on_card: formData.name,
      card_number: formData.cardNumber,
      expiry_date: formData.expiry,
      cvv: formData.cvv
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/medicine/payment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/payment/success")
        setFormData({ name: "", cardNumber: "", expiry: "", cvv: "" });
        refreshOrderCount();
      } else {
        setMessage("❌ Payment Failed. Try Again!");
      }
    } catch (error) {
      setMessage("❌ Server Error! Try Again Later.");
    }

    setLoading(false);
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

        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>

      {message && <p style={{ marginTop: "10px", fontWeight: "600" }}>{message}</p>}
    </div>
  );
}
