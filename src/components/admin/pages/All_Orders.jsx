import React, { useEffect, useState } from "react";
import AdminSideBar from "../../layouts/AdminSideBar";
import "../css/Orders.css";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/medicine/admin/orders/");
      const data = await res.json();
      setOrders(data.orders);

      const pending = data.orders.filter((o) => o.status === "Pending").length;
      setPendingOrdersCount(pending);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (id, status) => {
    try {
      await fetch(`http://127.0.0.1:8000/medicine/admin/orders/update/${id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      fetchOrders(); // refresh list
    } catch (err) {
      console.error("Failed to update order:", err);
    }
  };

  // Delete order
  const deleteOrder = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/medicine/admin/orders/delete/${id}/`, {
        method: "DELETE",
      });
      fetchOrders(); // refresh list
    } catch (err) {
      console.error("Failed to delete order:", err);
    }
  };

  return (
    <div className="admin-panel">
      {/* Sidebar */}
      <AdminSideBar pendingOrdersCount={pendingOrdersCount} />

      {/* Main content */}
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <h2>All Orders</h2>
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
                        >
                          <option value="Pending">Pending</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                      <td>
                        <button onClick={() => deleteOrder(o.id)}>Delete</button>
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
