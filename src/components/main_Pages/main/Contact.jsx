import React, { useState } from "react";

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
      const response = await fetch("http://127.0.0.1:8000/medicine/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMsg("Message Sent Successfully! ✔");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setErrorMsg(data.error || "Error sending message ❌");
      }
    } catch (error) {
      setErrorMsg("Cannot connect to server ❌");
    }
  };

  return (
    <>
      <div className="contact-container">
        {/* Left Side: Contact Info */}
        <div className="contact-info">
          <h3>Contact Information</h3>
          <p>
            <span>Address:</span> Main Road, City Center, Pakistan
          </p>
          <p>
            <span>Email:</span> muhammadsaqibyounas11@gmail.com
          </p>
          <p>
            <span>Phone:</span> 0342-0339016
          </p>
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
    </>
  );
}
