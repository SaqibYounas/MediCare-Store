import React from "react";
import { Link } from "react-router-dom";

export default function Cancel() {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={{ color: "red" }}>Payment Cancelled ❌</h1>
        <p>Your payment was not completed. You can try again.</p>

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
