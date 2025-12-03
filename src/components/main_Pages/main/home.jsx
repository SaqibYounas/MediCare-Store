import React from "react";
import { Link } from "react-router-dom";
import "../css/Home.css";
import StorePage from "./Store";

export default function HeroSection() {
  return (
    <div className="hero-page-wrapper">
      <section className="hero-main-section">
        <div className="hero-content-grid">
          <div className="hero-text-content">
            <p className="hero-subtitle">✅ Trusted Care, Delivered Fast</p>{" "}
            <h1 className="hero-title">
              Your <span className="hero-highlight">Health</span> is Our
              Priority.
            </h1>
            <p className="hero-description">
              Get essential **medicines, vitamins, and healthcare products**
              delivered safely to your door. Quality assured and certified by
              professional pharmacists.
            </p>
            <div className="hero-buttons">
              <Link className="btn-primary hero-cta-btn" to="/store">
                Shop Health Products
              </Link>
            </div>
          </div>

          {/* 2. HERO IMAGE & FEATURES (Right Side) */}
          <div className="hero-image-media">
            <div className="hero-image-card">
              <img
                src="/HeroSection.jpg"
                alt="Pharmacist holding medicine box, symbolizing healthcare service"
                className="hero-main-image"
              />
            </div>
          </div>
        </div>
      </section>{" "}
      <StorePage />
    </div>
  );
}
