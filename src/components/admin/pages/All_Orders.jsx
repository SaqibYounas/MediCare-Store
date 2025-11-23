import React, { useEffect, useState } from "react";
import AdminSideBar from "../../layouts/AdminSideBar";
import "../css/Orders.css";
import LoadingPage from "../../layouts/Loading";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);
  const [loading, setLoading] = useState(true); 
  const [actionLoading, setActionLoading] = useState(false); 

  // Fetch All Orders
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update Order Status
  const updateOrderStatus = async (id, status) => {
    try {
      setActionLoading(true);
      await fetch(
        `http://127.0.0.1:8000/medicine/admin/orders/update/${id}/`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );
      fetchOrders();
    } catch (err) {
      console.error("Failed to update order:", err);
    } finally {
      setActionLoading(false);
    }
  };

  // Delete Order
  const deleteOrder = async (id) => {
    try {
      setActionLoading(true);
      await fetch(
        `http://127.0.0.1:8000/medicine/admin/orders/delete/${id}/`,
        {
          method: "DELETE",
        }
      );
      fetchOrders();
    } catch (err) {
      console.error("Failed to delete order:", err);
    } finally {
      setActionLoading(false);
    }
  };

  // Show loading page while fetching
  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="admin-panel">
      <AdminSideBar pendingOrdersCount={pendingOrdersCount} />

      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <h4>All Orders</h4>

            {actionLoading && (
              <p style={{ color: "blue", marginBottom: "10px" }}>
                Updating... Please Wait
              </p>
            )}

            <div className="table-wrapper">
              <table>
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
                          onChange={(e) =>
                            updateOrderStatus(o.id, e.target.value)
                          }
                          disabled={actionLoading}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>

                      <td>
                        <button
                          onClick={() => deleteOrder(o.id)}
                          disabled={actionLoading}
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
