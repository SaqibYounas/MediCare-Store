import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Success() {
  const location = useLocation();
  const paymentMethod = location.state?.paymentMethod || "unknown";

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {paymentMethod === "cod" ? (
          <>
            <h1 style={{ color: "green" }}>Order Placed 🎉</h1>
            <p>Your order has been placed successfully! Payment will be collected on delivery.</p>
          </>
        ) : (
          <>
            <h1 style={{ color: "green" }}>Payment Successful 🎉</h1>
            <p>Your payment has been processed successfully!</p>
          </>
        )}

        <Link to="/" style={styles.button}>Go Back to Home</Link>
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
