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
      state: {
        searchQuery: searchText,
        category: category,
      },
    });
  };

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

      {/* SEARCH SECTION */}
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
          <option>Vitamins</option>
          <option>Blood Pressure</option>
          <option>Diabetes</option>
          <option>Heart</option>
        </select>

        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>

      <CartSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </header>
  );
}
