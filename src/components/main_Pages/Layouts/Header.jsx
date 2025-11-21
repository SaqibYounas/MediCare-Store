import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../css/Header.css";
import { CartContext } from "../../context/CartContext";
import CartSidebar from "./SidebarCheckout";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { cartItems } = useContext(CartContext);

  return (
    <header className="header">
      <div className="nav-container">
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✖" : "☰"}
        </button>

        <div className="logo">🩺 MediCare Store</div>

        <nav className="menu desktop-menu">
          <Link to="/">Home</Link>
          <Link to="/store">Store</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <button onClick={() => setSidebarOpen(true)} className="cart-icon">
          🛒 {cartItems.length}
        </button>
      </div>

      {menuOpen && (
        <nav className="menu mobile-menu">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/store" onClick={() => setMenuOpen(false)}>
            Store
          </Link>{" "}
          {/* ← Added */}
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            About Us
          </Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
        </nav>
      )}

      {/* Search */}
      <div className="search-section">
        <input type="text" placeholder="Search medicine..." />
        <select>
          <option>Select Category</option>
          <option>Antibiotics</option>
          <option>Painkillers</option>
          <option>Vitamins</option>
          <option>Blood Pressure</option>
        </select>
      </div>

      {/* Sidebar */}
      <CartSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </header>
  );
}
