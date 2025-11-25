import React, { useEffect, useState } from "react";
import "../css/Payement.css";
import AdminSideBar from "../../layouts/AdminSideBar";
export default function PaymentsList() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/medicine/payments/get/");
      const data = await response.json();
      setPayments(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching payments:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  if (loading) return <div className="loading">Loading payments...</div>;

  return (
    <div className="payment-container">
        <AdminSideBar/>
      <h2>Payments</h2>
      <table className="payment-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name on Card</th>
            <th>Card Number</th>
            <th>Expiry</th>
            <th>CVV</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name_on_card}</td>
              <td>{p.card_number}</td>
              <td>{p.expiry_date}</td>
              <td>{p.cvv}</td>
              <td>{p.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
