import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa"; // Using FaFacebookF and FaLinkedinIn for cleaner look
import "../css/Footer.css";

// Define footer sections for cleaner rendering
const FOOTER_LINKS = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Shop Now", path: "/shop" }, // Changed 'Checkout' to 'Shop Now' for better general link
];

const SOCIAL_MEDIA = [
  {
    icon: FaFacebookF,
    url: "https://www.facebook.com/share/1FYyzMDqL5/",
    name: "Facebook",
    className: "facebook",
  },
  {
    icon: FaInstagram,
    url: "https://www.instagram.com/saqib15_03?igsh=aTZ1eXFtNzFvZGVk",
    name: "Instagram",
    className: "instagram",
  },
  {
    icon: FaLinkedinIn,
    url: "https://www.linkedin.com/in/muhammad-saqib-younas-0123aa329",
    name: "LinkedIn",
    className: "linkedin",
  },
];

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content-wrapper">
        {/* 1. Brand & Location Info */}
        <div className="footer-section footer-info-contact">
          <h3 className="footer-heading">SuperCodersStore</h3>
          <p>Main Road, City Center, Pakistan</p>
          <p>📞 +92 342-0339016</p>
          <p>📧 muhammadsaqibyounas11@gmail.com</p>
        </div>

        {/* 2. Quick Links */}
        <div className="footer-section footer-links">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-link-list">
            {FOOTER_LINKS.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="footer-link-item">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Social Media */}
        <div className="footer-section footer-social">
          <h3 className="footer-heading">Connect With Us</h3>
          <div className="social-icon-group">
            {SOCIAL_MEDIA.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                aria-label={social.name}
                className={`social-icon-link ${social.className}`}
              >
                <social.icon />
              </a>
            ))}
          </div>
        </div>

        {/* 4. Payment Icons */}
        <div className="footer-section footer-payment">
          <h3 className="footer-heading">Payment Methods</h3>
          <div className="payment-icon-group">
            <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" />
            <img
              src="https://img.icons8.com/color/48/mastercard.png"
              alt="Mastercard"
            />
            <img
              src="https://img.icons8.com/color/48/paypal.png"
              alt="Paypal"
            />
            <img
              src="https://img.icons8.com/color/48/bank-card-back-side.png"
              alt="Card"
            />
          </div>
        </div>
      </div>

      <div className="footer-copyright">
        <p>
          &copy; {new Date().getFullYear()} SuperCodersStore. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
