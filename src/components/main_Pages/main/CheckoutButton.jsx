import React from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51SZxFD5oMHTpDHuWBvKgJKBjBEdyKAVooVxPHfwAc9oxRUUFH8QqVQysGutbXb0G8dTCaK5QeFC5rxpiz3AvyA2d00exaHP0Rk");

export default function CheckoutButton() {
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    // Django backend ko call
    const response = await fetch("http://127.0.0.1:8000/create-checkout-session/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();

    // Stripe checkout redirect
    const result = await stripe.redirectToCheckout({
      sessionId: data.id,
    });

    if (result.error) {
      console.log(result.error.message);
    }
  };

  return (
    <button onClick={handleCheckout} style={{ padding: "10px 20px", background: "black", color: "white" }}>
      Pay $20
    </button>
  );
}
