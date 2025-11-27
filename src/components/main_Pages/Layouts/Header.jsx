import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Header.css";
import { CartContext } from "../../context/CartContext";
import CartSidebar from "./SidebarCheckout";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { cartItems } = useContext(CartContext);

  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/store", {
      state: { searchQuery: searchText, category: category },
    });
  };

  return (
    <header className="header">
      <div className="nav-container">
        {/* Hamburger Button */}
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✖" : "☰"}
        </button>

        <div className="logo">🩺 MediCare Store</div>

        {/* Desktop Menu */}
        <nav className="menu desktop-menu">
          <Link to="/">Home</Link>
          <Link to="/store">Store</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/orders" className="order-icon">
            📦 Orders
          </Link>
        </nav>

        {/* Cart Icon */}
        <button onClick={() => setSidebarOpen(true)} className="cart-icon">
          🛒 {cartItems.length}
        </button>
      </div>

      {/* ✅ MOBILE MENU (TOGGLE BASED) */}
      {menuOpen && (
        <nav className="mobile-menu">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/store" onClick={() => setMenuOpen(false)}>
            Store
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            About Us
          </Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
          <Link to="/orders" onClick={() => setMenuOpen(false)}>
            📦 Orders
          </Link>
        </nav>
      )}

      {/* SEARCH BAR */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Search medicine..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option>Antibiotics</option>
            <option>Painkillers</option>
            <option>Blood Pressure Medicines</option>
            <option>Vitamins & Supplements</option>
            <option>Diabetes Medicines</option>
            <option>Heart Medicines</option>
            <option>Allergy Medicines</option>
            <option>Cold & Flu Medicines</option>
            <option>Digestive Medicines</option>
            <option>Skin Medicines</option>
            <option>Eye Medicines</option>
            <option>Ear Medicines</option>
            <option>Anti-inflammatory Medicines</option>
            <option>Hormonal Medicines</option>
            <option>Immunity Boosters</option>
        </select>

        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>

      <CartSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </header>
  );
}
