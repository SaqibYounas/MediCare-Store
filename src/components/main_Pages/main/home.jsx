import React from "react";
import StorePage from "./Store";
import "../css/Home.css";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <span className="animated-text">Welcome to Our Store!</span>
            <p className="hero-subtitle">
              Find the best products at unbeatable prices!
            </p>
            <button
              className="shop-now-btn"
              onClick={() => window.scrollTo({ top: 800, behavior: "smooth" })}
            >
              Shop Now
            </button>
          </div>
          <div className="hero-image">
            <img src="/HeroSection.jpg" alt="Hero" />
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <h2 className="section-title">Featured Products</h2>
        <StorePage />
      </section>
    </>
  );
}
