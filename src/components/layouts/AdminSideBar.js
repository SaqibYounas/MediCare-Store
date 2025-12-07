import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function AdminSideBar({ pendingOrdersCount }) {
  const [userName] = useState("Admin");
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Track window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setSidebarOpen(true);
      else setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) setSidebarOpen(!sidebarOpen);
  };

  const handleLinkClick = () => {
    if (isMobile) setSidebarOpen(false);
  };

  return (
    <>
      {/* Hamburger */}
      {isMobile && (
        <div className="mobile-toggle" onClick={toggleSidebar}>
          <i className="la la-bars"></i>
        </div>
      )}

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "active" : ""}`}>
        <div className="scrollbar-inner sidebar-wrapper">
          <div className="user">
            <div className="photo">
              <i className="la la-user-secret"></i>
            </div>
            <div className="info">
              <span>
                {userName}
                <span className="user-level">Administrator</span>
              </span>
            </div>
          </div>

          <ul className="nav">
            <li className="nav-item">
              <Link to="/Dashboard" onClick={handleLinkClick}>
                <i className="la la-dashboard"></i>
                <p>Dashboard</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/create/medicine" onClick={handleLinkClick}>
                <i className="la la-medkit"></i>
                <p>Add Medicine</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/update/medicine" onClick={handleLinkClick}>
                <i className="la la-edit"></i>
                <p>Update Medicine</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/delete/medicine" onClick={handleLinkClick}>
                <i className="la la-sticky-note"></i>
                <p>Delete Medicine</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/admin/orders"
                className="d-flex"
                onClick={handleLinkClick}
              >
                <div>
                  <i className="la la-list-alt"></i>
                  <p>Orders</p>
                </div>
                {pendingOrdersCount > 0 && (
                  <span className="badge">{pendingOrdersCount}</span>
                )}
              </Link>
            </li>


            <li className="nav-item">
              <Link onClick={handleLinkClick} to="/admin/messages">
                <i className="la la-envelope"></i>
                <p>Messages</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link onClick={handleLinkClick} to="/login">

                <i className="la la-power-off"></i>
                <p>Logout</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Overlay */}
      {isMobile && sidebarOpen && (
        <div className="sidebar-overlay active" onClick={toggleSidebar}></div>
      )}
    </>
  );
}
