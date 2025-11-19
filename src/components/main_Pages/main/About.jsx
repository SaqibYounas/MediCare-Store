import React from "react";
import "../css/About.css";
import Header from "../Layouts/Header";
import Footer from "../Layouts/Footer";

export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="about-container">
        {/* Left / Top: Text */}
        <div className="about-text">
          <h2>About Medico Store</h2>
          <p>
            Medico Store is your trusted pharmacy for authentic medicines, health products, 
            and wellness essentials. We are committed to providing high-quality healthcare 
            solutions with fast service, reliable stock, and professional assistance.
          </p>

          <h3>Our Mission</h3>
          <p>
            To provide every customer with safe, affordable, and effective healthcare products, 
            ensuring a healthier and happier life.
          </p>

          <h3>Our Vision</h3>
          <p>
            To become the leading online and offline pharmacy in Pakistan, known for trust, 
            transparency, and excellent customer service.
          </p>
        </div>

        {/* Right / Bottom: Image */}
        {/* <div className="about-image">
          <img src={aboutImg} alt="Medico Store" />
        </div> */}
      </div>

      <Footer />
    </div>
  );
}
