import React, { useEffect, useState } from "react";
import "../css/OrdersPage.css";
import Loading from "../Layouts/Loading";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://127.0.0.1:8000/medicine/order/get/");
        const data = await res.json();

        if (res.ok) {
          setOrders(data.orders);
          setPayments(data.payments);
        }
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // ✅ Use Loading Component here
  if (loading) return <Loading />;

  return (
    <div className="main-wrapper">
      <h2 className="title">Your Orders</h2>

      {/* Orders Table */}
      <h3 className="section-title">Orders List</h3>
      <div className="table-wrapper">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>{o.name}</td>
                <td>Rs {o.total_amount}</td>

                <td
                  className={
                    o.status === "Pending"
                      ? "status pending"
                      : o.status === "On The Way"
                      ? "status onway"
                      : o.status === "Completed"
                      ? "status completed"
                      : o.status === "Delivered"
                      ? "status delivered"
                      : ""
                  }
                >
                  {o.status}
                </td>

                <td>{o.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payments Table */}
      <h3 className="section-title">Payments List</h3>
      <div className="table-wrapper">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Name on Card</th>
              <th>Card Number</th>
              <th>Expiry</th>
              <th>Created At</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p) => (
              <tr key={p.id}>
                <td>{p.name_on_card}</td>

                <td>**** **** **** {p.card_number.slice(-4)}</td>

                <td>{p.expiry_date}</td>
                <td>{p.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
