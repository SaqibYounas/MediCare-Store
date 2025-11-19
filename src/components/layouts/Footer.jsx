// src/components/Footer.jsx
import React from "react";
import "./Footers.css"; // 👈 Footer CSS

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p>© {new Date().getFullYear()} MediCare — Medical Store</p>
      </div>
    </footer>
  );
}
