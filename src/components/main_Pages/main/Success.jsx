import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Success() {
  const location = useLocation();
  const paymentMethod = location.state?.paymentMethod || "unknown";

  let title = "";
  let message = "";
  let color = "green";

  if (paymentMethod === "canceled") {
    title = "Payment Canceled ❌";
    message = "Your payment was canceled. You can try again.";
    color = "red";
  } else if (paymentMethod === "cod") {
    title = "Order Placed 🎉";
    message = "Your order has been placed successfully! Payment will be collected on delivery.";
  } else if (paymentMethod === "card") {
    title = "Payment Successful 🎉";
    message = "Your payment has been processed successfully!";
  } else {
    title = "Status Unknown";
    message = "Unable to determine payment status.";
    color = "orange";
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={{ color }}>{title}</h1>
        <p>{message}</p>
        <Link to="/store" style={styles.button}>Continue Shopping</Link>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f0f0f0"
  },
  card: {
    padding: "40px",
    background: "#fff",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)"
  },
  button: {
    marginTop: "20px",
    display: "inline-block",
    padding: "10px 20px",
    background: "black",
    color: "white",
    borderRadius: "5px",
    textDecoration: "none"
  }
};
