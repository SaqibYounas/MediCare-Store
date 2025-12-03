import React, { useState } from "react";
import { Send, MapPin, Mail, Phone, CheckCircle, XCircle } from 'lucide-react';
import "../css/Contact.css"; // Link to external CSS file

export default function ContactForm() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        whatsapp: "", // Added WhatsApp field
        subject: "",
        message: "",
    });

    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMsg("");
        setErrorMsg("");
        setLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:8000/medicine/contact/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form), // WhatsApp field included here
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMsg("Message Sent Successfully! ✔");
                setForm({ name: "", email: "", whatsapp: "", subject: "", message: "" });
            } else {
                setErrorMsg(data.error || "Error sending message ❌");
            }
        } catch (error) {
            setErrorMsg("Cannot connect to server ❌");
        } finally {
            setLoading(false);
            setTimeout(() => {
                setSuccessMsg("");
                setErrorMsg("");
            }, 5000);
        }
    };

    return (
        <div className="contact-page-wrapper">
            <div className="contact-container">
                <div className="contact-info">
                    <h3>Contact Information</h3>
                    <p><MapPin className="info-icon" /> Main Road, City Center, Pakistan</p>
                    <p><Mail className="info-icon" /> muhammadsaqibyounas11@gmail.com</p>
                    <p><Phone className="info-icon" /> 0342-0339016</p>
                </div>

                <div className="contact-form">
                    <h2>Send Us a Message</h2>
                    {successMsg && <div className="contact-message contact-success"><CheckCircle size={20} />{successMsg}</div>}
                    {errorMsg && <div className="contact-message contact-error"><XCircle size={20} />{errorMsg}</div>}

                    <form onSubmit={handleSubmit}>
                        <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
                        <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
                        <input type="text" name="whatsapp" placeholder="Your WhatsApp Number" value={form.whatsapp} onChange={handleChange} /> {/* WhatsApp */}
                        <input type="text" name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} required />
                        <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} rows="6" required />

                        <button type="submit" disabled={loading}>
                            {loading ? <><Send className="spinner" size={20} /> Sending...</> : <><Send size={20} /> Send Message</>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
