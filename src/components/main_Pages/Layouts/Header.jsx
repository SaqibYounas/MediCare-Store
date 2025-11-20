import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Header.css";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems } = useContext(CartContext);

  return (
    <header className="header">
      
      {/* Top Navbar */}
      <div className="nav-container">
        {/* Mobile Menu Icon */}
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✖" : "☰"}
        </button>

        {/* Logo */}
        <div className="logo">🩺 MediCare Store</div>

        {/* Desktop Menu */}
        <nav className="menu desktop-menu">
          <Link to="/">Home</Link>
          <Link to="/store">Store</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        {/* Cart Icon */}
 <Link to="/checkout" className="cart-icon">
        🛒 {cartItems.length}
      </Link>      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <nav className="menu mobile-menu">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        </nav>
      )}

      {/* Search Section */}
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
    </header>
  );
}
