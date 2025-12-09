import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(
  "pk_test_51SZxFD5oMHTpDHuWBvKgJKBjBEdyKAVooVxPHfwAc9oxRUUFH8QqVQysGutbXb0G8dTCaK5QeFC5rxpiz3AvyA2d00exaHP0Rk"
);

export default function PaymentPage() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/payments/create-checkout-session/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 100 }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.client_secret) {
          setClientSecret(data.client_secret);
        } else if (data.error) {
          console.log("Backend error:", data.error);
        } else {
          console.log("Unexpected backend response:", data);
        }
      })
      .catch((err) => console.log("Fetch error:", err));
  }, []);

  if (!clientSecret) return <h3>Loading Payment...</h3>;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <PaymentForm />
    </Elements>
  );
}
