import React, { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import "../css/Checkout.css";
import { useNavigate } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { AlertTriangle, CheckCircle } from "lucide-react";

export default function CheckoutPage() {
  const { cartItems, getTotal } = useContext(CartContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    country: "",
    state: "",
    phone: "",
    payment_method: "cod",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const isFormValid = () => {
    return (
      form.name.trim() !== "" &&
      form.email.trim() !== "" &&
      form.address.trim() !== "" &&
      form.city.trim() !== "" &&
      form.zip.trim() !== "" &&
      form.country.trim() !== "" &&
      form.state.trim() !== "" &&
      form.phone.trim() !== "" &&
      cartItems.length > 0
    );
  };

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    const USD_RATE = 280;
    const totalPKR = getTotal();
    const totalUSD = (totalPKR / USD_RATE).toFixed(2);

    const orderData = {
      ...form,
      total_price: totalUSD,
      items: cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        price: (item.price / USD_RATE).toFixed(2),
      })),
    };

    try {
      if (form.payment_method === "cod") {
        const res = await fetch("http://127.0.0.1:8000/medicine/place-order/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        });

        const data = await res.json();
        if (!res.ok) {
          setErrorMsg(data.error || "Failed to place order.");
          setLoading(false);
          return;
        }

        setSuccessMsg(
          "✅ Order placed successfully! Cash on Delivery selected."
        );
        setTimeout(
          () => navigate("/success", { state: { paymentMethod: "cod" } }),
          1500
        );
      } else {
        const paymentRes = await fetch(
          "http://127.0.0.1:8000/payments/create-payment-session/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: totalUSD * 100 }),
          }
        );

        const paymentData = await paymentRes.json();

        if (!paymentRes.ok || !paymentData.client_secret) {
          setErrorMsg(paymentData.error || "Failed to create payment session.");
          setLoading(false);
          return;
        }

        const card = elements.getElement(CardElement);
        if (!card) {
          setErrorMsg("Card element not found.");
          setLoading(false);
          return;
        }

        const { paymentIntent, error: stripeError } =
          await stripe.confirmCardPayment(paymentData.client_secret, {
            payment_method: { card },
          });

        if (stripeError) {
          setErrorMsg(stripeError.message);
          setLoading(false);
          return;
        }

        if (paymentIntent.status === "succeeded") {
          const res = await fetch(
            "http://127.0.0.1:8000/medicine/place-order/",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(orderData),
            }
          );

          const data = await res.json();
          if (!res.ok) {
            setErrorMsg(data.error || "Failed to save order after payment.");
            setLoading(false);
            return;
          }

          setSuccessMsg("✅ Payment successful! Order placed.");
          setTimeout(
            () => navigate("/success", { state: { paymentMethod: "card" } }),
            1500
          );
        }
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page-wrapper">
      <div className="checkout-wrapper">
        {/* LEFT FORM */}
        <div className="checkout-left">
          <h2 className="title">Checkout</h2>
          <h4 className="subtitle">Shipping Information</h4>

          {/* MESSAGE BOXES */}
          {errorMsg && (
            <div className="message-box message-box-error">
              <AlertTriangle className="message-icon" /> {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="message-box message-box-success">
              <CheckCircle className="message-icon" /> {successMsg}
            </div>
          )}

          {/* FORM */}
          <form className="checkout-form">
            <div className="form-group">
              <span>Full Name *</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <span>Email Address *</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <span>Phone Number *</span>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="03xx-xxxxxxx"
                required
              />
            </div>

            <div className="form-group address-field">
              <span>Address *</span>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group country-field">
              <span>Country *</span>
              <select
                name="country"
                value={form.country}
                onChange={handleChange}
                required
              >
                <option value="">Choose country</option>
                <option value="Pakistan">Pakistan</option>
              </select>
            </div>

            <div className="row">
              <div className="form-group">
                <span>City *</span>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <span>State *</span>
                <input
                  type="text"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <span>ZIP *</span>
                <input
                  type="text"
                  name="zip"
                  value={form.zip}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </form>
        </div>

        {/* RIGHT SUMMARY + PAYMENT SECTION */}
        <div className="checkout-right">
          <h3 className="subtitle">Order Summary</h3>

          {cartItems.length === 0 ? (
            <p className="empty-cart-message">Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image_url} alt={item.name} />
                <div>
                  <p className="item-name">{item.name}</p>
                  <span className="item-price-qty">
                    Rs {item.price} × {item.quantity}
                  </span>
                </div>
              </div>
            ))
          )}

          <div className="summary">
            <p>
              <span>Subtotal:</span>
              <span>Rs {getTotal()}</span>
            </p>
            <p>
              <span>Shipping:</span>
              <span>Rs 0</span>
            </p>
            <hr />
            <p className="total">
              <span>Total</span>
              <span>Rs {getTotal()}</span>
            </p>
          </div>

          <p className="secure">🔒 Secure Checkout – SSL Encrypted</p>

          {/* PAYMENT METHOD */}
          <div className="payment-options-wrapper">
            <h4>Payment Method </h4>

            <div className="payment-options">
              <label
                className={`payment-option ${
                  form.payment_method === "cod" ? "active" : ""
                }`}
              >
                <input
                  type="radio"
                  name="payment_method"
                  value="cod"
                  checked={form.payment_method === "cod"}
                  onChange={handleChange}
                />
                Cash on Delivery
              </label>

              <label
                className={`payment-option ${
                  form.payment_method === "card" ? "active" : ""
                }`}
              >
                <input
                  type="radio"
                  name="payment_method"
                  value="card"
                  checked={form.payment_method === "card"}
                  onChange={handleChange}
                />
                Pay Now
              </label>
            </div>

            {form.payment_method === "card" && (
              <div className="form-group card-input">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#32325d",
                        "::placeholder": { color: "#a0aec0" },
                      },
                      invalid: { color: "#fa755a" },
                    },
                  }}
                />
              </div>
            )}

            {/* PLACE ORDER */}
            <button
              className="pay-btn"
              onClick={handleSubmit}
              disabled={loading || !isFormValid()}
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
