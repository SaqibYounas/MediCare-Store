import React from "react";
import StorePage from "./Store";
import "../css/Home.css";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Our Store</h1>
          <p className="hero-subtitle">Find the best products at unbeatable prices!</p>
          <button
            className="shop-now-btn"
            onClick={() => window.scrollTo({ top: 800, behavior: "smooth" })}
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <h2 className="section-title">Featured Products</h2>
        <StorePage /> {/* Store grid */}
      </section>
    </>
  );
}
