import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css"
export default function AdminSideBar({ pendingOrdersCount }) {
  const [userName, setUserName] = useState("");

  return (
    <>
      <div className="sidebar">
        <div className="scrollbar-inner sidebar-wrapper">
          {/* User Info */}
          <div className="user">
            <div className="photo">
              <img src={`assets/img/profile4.jpg`} alt="Profile" />
            </div>
            <div className="info">
              <a>
                <span>
                  {userName !== "" ? userName : "Username"}
                  <span className="user-level">Administrator</span>
                </span>
              </a>
            </div>
          </div>

          {/* Sidebar Navigation */}
          <ul className="nav">
            <li className="nav-item">
              <Link to="/Dashboard">
                <i className="la la-dashboard"></i>
                <p>Dashboard</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/create/medicine">
                <i className="la la-medkit"></i>
                <p>Add Medicine</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/update/medicine">
                <i className="la la-edit"></i>
                <p>Update Medicine</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/delete/medicine">
                <i className="la la-sticky-note"></i>
                <p>Delete Medicine</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/admin/orders"
                className="d-flex justify-content-between align-items-center"
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


            {/* Profile & Logout at the bottom */}
            <li className="nav-item">
              <Link to="/profile">
                <i className="la la-user"></i>
                <p>Profile</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link>
                <i className="la la-power-off"></i>
                <p>Logout</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
