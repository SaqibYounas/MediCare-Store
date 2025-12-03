// StripeWrapper.jsx
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "./Checkout";

const stripePromise = loadStripe(
  "pk_test_51SZxFD5oMHTpDHuWBvKgJKBjBEdyKAVooVxPHfwAc9oxRUUFH8QqVQysGutbXb0G8dTCaK5QeFC5rxpiz3AvyA2d00exaHP0Rk"
);

export default function StripeWrapper() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutPage />
    </Elements>
  );
}
