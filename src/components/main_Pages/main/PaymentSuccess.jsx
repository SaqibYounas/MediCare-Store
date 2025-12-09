import React, { useEffect } from "react";
import "../css/PaymentSuccess.css";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/store");
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="payment-success-container">
      <div className="success-card">
        <CheckCircle className="success-icon" size={80} />
        <h1>Payment Successful</h1>
        <p>Your payment has been processed successfully.</p>
      </div>
    </div>
  );
}
