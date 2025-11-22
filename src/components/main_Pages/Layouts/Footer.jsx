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
          <p>☎ 0342-0339016</p>
          <p>✉ muhammadsaqibyounas11@gmail.com</p>
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

        {/* Payment Icons */}
        <div className="footer-section payment">
          <h3>We Accept</h3>
          <div className="payment-icons">
            <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" />
            <img src="https://img.icons8.com/color/48/mastercard.png" alt="Mastercard" />
            <img src="https://img.icons8.com/color/48/paypal.png" alt="Paypal" />
            <img src="https://img.icons8.com/color/48/bank-card-back-side.png" alt="Card" />
          </div>
        </div>

      </div>
    </footer>
  );
}
