import React from "react";
import { Heart, ShieldCheck, Target, Eye } from "lucide-react";
import "../css/About.css"; // Link external CSS

export default function AboutUs() {
  return (
    <div className="about-page-wrapper">
      <div className="about-container">
        {/* Left: Text */}
        <div className="about-text">
          <h2 className="fade-in-text">About Medico Store</h2>
          <p className="fade-in-text delay-1">
            Medico Store is your trusted pharmacy for authentic medicines,
            health products, and wellness essentials. We are committed to
            providing high-quality healthcare solutions with fast service,
            reliable stock, and professional assistance.
          </p>

          <h3 className="fade-in-text delay-2">
            <Target size={24} /> Our Mission
          </h3>
          <p className="fade-in-text delay-3">
            To provide every customer with safe, affordable, and effective
            healthcare products, ensuring a healthier and happier life.
          </p>

          <h3 className="fade-in-text delay-4">
            <Eye size={24} /> Our Vision
          </h3>
          <p className="fade-in-text delay-5">
            To become the leading online and offline pharmacy in Pakistan, known
            for trust, transparency, and excellent customer service.
          </p>

          <h3 className="fade-in-text delay-5">
            <ShieldCheck size={24} /> Core Values
          </h3>
          <ul className="core-values-list">
            <li className="fade-in-text delay-6">
              <Heart size={18} /> Patient-First Approach: Always prioritizing
              health and safety.
            </li>
            <li className="fade-in-text delay-7">
              <ShieldCheck size={18} /> Authenticity: Guaranteed genuine
              products from certified suppliers.
            </li>
            <li className="fade-in-text delay-8">
              <Target size={18} /> Accessibility: Making healthcare affordable
              and available to all.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
