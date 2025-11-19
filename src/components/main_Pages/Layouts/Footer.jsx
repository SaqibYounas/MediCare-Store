import React from "react";
import { Link } from "react-router-dom";
import "../css/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Location Info */}
        <div className="footer-section location">
          <h3>📍 Our Location</h3>
          <p>Main Road, City Center, Pakistan</p>
          <p>☎ 0300-1234567</p>
          <p>✉ medicostore@gmail.com</p>
        </div>

        {/* Page Links */}
        <div className="footer-section pages">
          <h3>Pages</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/checkout">Checkout</Link></li>
          </ul>
        </div>

        {/* Right Small Text */}
        <div className="footer-section right-text">
          <p>© {new Date().getFullYear()} Medico Store</p>
          <p>All Rights Reserved</p>
          <p>Healthy Life, Trusted Medicine</p>
        </div>

      </div>
    </footer>
  );
}
