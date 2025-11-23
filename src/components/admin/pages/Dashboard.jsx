import React, { useEffect, useState, useCallback } from "react";
import AdminSideBar from "../../layouts/AdminSideBar";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { FaShoppingCart, FaCheckCircle, FaClock } from "react-icons/fa";
import "../css/Dashboard.css";
import LoadingPage from "../../layouts/Loading";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/medicine/admin/dashboard-counts/"
      );
      if (!res.ok) throw new Error("Failed to fetch dashboard stats");
      const data = await res.json();
      setStats({
        totalUsers: data.totalUsers,
        totalOrders: data.totalOrders,
        completedOrders: data.completedOrders,
        pendingOrders: data.pendingOrders,
      });
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        <LoadingPage/>
      </p>
    );
  if (error)
    return (
      <p style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
        Error: {error}
      </p>
    );

  const chartData = {
    labels: ["Total Orders", "Completed", "Pending"],
    datasets: [
      {
        label: "Orders Overview",
        data: [stats.totalOrders, stats.completedOrders, stats.pendingOrders],
        backgroundColor: ["#4e73df", "#1cc88a", "#f6c23e"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: true } },
  };

  return (
    <>
      <AdminSideBar />

      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <h3 className="page-title">Admin Dashboard</h3>

            {/* Stats Cards */}
            <div className="stats-row">
              <div className="card-stats card-success">
                <div className="card-body">
                  <div className="card-icon">
                    <FaShoppingCart />
                  </div>
                  <p className="card-category">Total Orders</p>
                  <h4 className="card-title">{stats.totalOrders}</h4>
                </div>
              </div>

              <div className="card-stats card-info">
                <div className="card-body">
                  <div className="card-icon">
                    <FaCheckCircle />
                  </div>
                  <p className="card-category">Completed</p>
                  <h4 className="card-title">{stats.completedOrders}</h4>
                </div>
              </div>

              <div className="card-stats card-warning">
                <div className="card-body">
                  <div className="card-icon">
                    <FaClock />
                  </div>
                  <p className="card-category">Pending</p>
                  <h4 className="card-title">{stats.pendingOrders}</h4>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="row mt-4">
              <div className="col-12">
                <div className="card chart-card">
                  <div className="card-header">
                    <h4 className="card-title">Orders Summary</h4>
                  </div>
                  <div className="card-body">
                    <Bar data={chartData} options={chartOptions} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
