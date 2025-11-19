import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Layout.css"
export default function Header() {
  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="header-container"
    >
      <div className="header-left">
        <h2 className="header-title">🩺 MediCare Store</h2>
      </div>

      <div className="header-right">
        <Link to="/login" className="header-btn login-btn">
          Login
        </Link>
       
      </div>
    </motion.header>
  );
}
