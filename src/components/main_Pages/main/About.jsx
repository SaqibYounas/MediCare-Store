import React from "react";
import "../css/About.css";

export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 p-6">
      <div className="about-container">
        {/* Left: Text */}
        <div className="about-text">
          <h2 className="fade-in-text">About Medico Store</h2>
          <p className="fade-in-text delay-1">
            Medico Store is your trusted pharmacy for authentic medicines, health products, 
            and wellness essentials. We are committed to providing high-quality healthcare 
            solutions with fast service, reliable stock, and professional assistance.
          </p>

          <h3 className="fade-in-text delay-2">Our Mission</h3>
          <p className="fade-in-text delay-3">
            To provide every customer with safe, affordable, and effective healthcare products, 
            ensuring a healthier and happier life.
          </p>

          <h3 className="fade-in-text delay-4">Our Vision</h3>
          <p className="fade-in-text delay-5">
            To become the leading online and offline pharmacy in Pakistan, known for trust, 
            transparency, and excellent customer service.
          </p>
        </div>

        {/* Right: Image */}
       
      </div>
    </div>
  );
}
