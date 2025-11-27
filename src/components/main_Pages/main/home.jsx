import React, { useRef } from 'react';
import { Shield, Package, Droplet } from 'lucide-react';
import "../css/Home.css";
import { Link } from 'react-router-dom';
import StorePage from './Store';
const FeatureBox = ({ Icon, title }) => (
  <div className="feature-box">
    <Icon className="feature-icon" />
    <span className="feature-title">{title}</span>
  </div>
);

export default function HeroSection() {
  const featuredSectionRef = useRef(null);

  const handleScrollToShop = () => {
    if (featuredSectionRef.current) {
      featuredSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.log("Scroll to shop requested.");
    }
  };

  return (
    <div className="hero-container">
      <section className="hero-section">
        <div className="hero-content">
          {/* Left side */}
          <div className="hero-text">
            <span className="hero-subtitle">Trusted Care, Delivered Fast</span>
            <h1 className="hero-title">
              Your <span className="highlight">Health</span> is Our Priority.
            </h1>
            <p className="hero-description">
              Get essential medicines, vitamins, and healthcare products delivered safely to your door. Quality assured and certified by pharmacists.
            </p>
            <div className="hero-buttons">
              <Link  className="btn-primary" to="/store">Shop Now</Link> 
            </div>
          </div>

          {/* Right side */}
          <div className="hero-image-section">
            <img 
              src="/HeroSection.jpg" 
              alt="Pharmacy service" 
              className="hero-image" 
            />
            <div className="feature-boxes">
              <FeatureBox Icon={Shield} title="Certified" />
              <FeatureBox Icon={Package} title="Fast Delivery" />
              <FeatureBox Icon={Droplet} title="Quality Tested" />
            </div>
          </div>
        </div>
      </section>
      <StorePage/>
    </div>
  );
}
