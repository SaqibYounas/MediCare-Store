import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminSideBar(props) {
  const [userName, setUserName] = useState("");
 
  return (
    <>
      <div className="sidebar">
        <div className="scrollbar-inner sidebar-wrapper">
          <div className="user">
            <div className="photo">
              <img src={`assets/img/profile4.jpg`} />
            </div>
            <div className="info">
              <a>
                <span>
                  {userName != "" ? userName : "Username"}
                  <span className="user-level">Administrator</span>
                </span>
              </a>
            </div>
          </div>
          <ul className="nav">
            <li className="nav-item">
              <Link to="/Dashboard">
                <i className="la la-dashboard"></i>
                <p>Dashboard</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/create/medicine">
                <i class="la la-medkit"></i>
                <p>Add Medicine</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/update/medicine">
                <i class="la la-edit"></i>
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
              <Link to="/profile">
                <i className="la la-user"></i>
                <p>Profile</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link >
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
