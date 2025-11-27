import React, { useEffect, useState } from "react";
import AdminSideBar from "../../layouts/AdminSideBar";
import LoadingPage from "../../layouts/Loading";
import { AlertTriangle, CheckCircle } from "lucide-react";
import "../css/Orders.css";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:8000/medicine/admin/orders/");
      const data = await res.json();
      setOrders(data.orders);
      const pending = data.orders.filter((o) => o.status === "Pending").length;
      setPendingOrdersCount(pending);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setErrorMsg("Failed to fetch orders!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (id, status) => {
    try {
      setActionLoading(true);
      await fetch(`http://127.0.0.1:8000/medicine/admin/orders/update/${id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setSuccessMsg("Order status updated!");
      setTimeout(() => setSuccessMsg(""), 3000);
      fetchOrders();
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to update order!");
    } finally {
      setActionLoading(false);
    }
  };

  const deleteOrder = async (id) => {
    try {
      setActionLoading(true);
      await fetch(`http://127.0.0.1:8000/medicine/admin/orders/delete/${id}/`, {
        method: "DELETE",
      });
      setSuccessMsg("Order deleted successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
      fetchOrders();
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to delete order!");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <LoadingPage />;

  return (
    <div className="admin-panel">
      <AdminSideBar pendingOrdersCount={pendingOrdersCount} />

      <div className="main-panel">
        <div className="content">
          <div className="max-width-container">
            <h1 className="page-title">All Orders</h1>

            {/* Messages */}
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

            {actionLoading && <p className="updating-msg">Updating... Please Wait</p>}

            <div className="table-card">
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id}>
                      <td>{o.id}</td>
                      <td>{o.name}</td>
                      <td>{o.email}</td>
                      <td>{o.total_amount}</td>
                      <td>
                        <select
                          value={o.status}
                          onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                          disabled={actionLoading}
                          className="form-select"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                      <td>
                        <button
                          onClick={() => deleteOrder(o.id)}
                          disabled={actionLoading}
                          className="delete-btn"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
