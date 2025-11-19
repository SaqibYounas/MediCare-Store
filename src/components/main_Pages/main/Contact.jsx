import React, { useState } from "react";
import Header from "../Layouts/Header";
import Footer from "../Layouts/Footer";
import "../css/Contact.css";
export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMsg(data.message);
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setErrorMsg(data.error || "Error sending message");
      }
    } catch (error) {
      setErrorMsg("Cannot connect to server");
    }
  };

  return (
    <>
    <Header/>
    <div className="contact-container">
      
      {/* Left Side: Contact Info */}
      <div className="contact-info">
        <h3>Contact Information</h3>
        <p><span>Address:</span> Main Road, City Center, Pakistan</p>
        <p><span>Email:</span> medicostore@gmail.com</p>
        <p><span>Phone:</span> 0300-1234567</p>
      </div>

      {/* Right Side: Contact Form */}
      <div className="contact-form">
        <h2>Send Us a Message</h2>
        {successMsg && <div className="contact-success">{successMsg}</div>}
        {errorMsg && <div className="contact-error">{errorMsg}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Message"
            value={form.message}
            onChange={handleChange}
            required
            rows="6"
          />
          <button type="submit">Send Message</button>
        </form>
      </div>

    </div>
    <Footer/>
    </>
  );
}
