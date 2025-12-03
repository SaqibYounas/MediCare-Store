import React, { useEffect, useState } from "react";
import AdminSideBar from "../../layouts/AdminSideBar";
import { AlertTriangle } from "lucide-react";
import { AiOutlineWhatsApp, AiOutlineMail } from "react-icons/ai";
import "../css/Messages.css";

export default function MessagesList() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8000/medicine/messages/");
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.log("Error loading messages", error);
      setErrorMsg("Failed to load messages!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "2rem" }}>
        Loading messages...
      </p>
    );

  const openWhatsApp = (number, message) => {
    let phone = number.replace(/\s+/g, "");
    if (!phone.startsWith("+")) phone = "+92" + phone.slice(-10);
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const openGmail = (email, subject, body) => {
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      email
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="admin-panel">
      <AdminSideBar />
      <div className="main-panel">
        <div className="content">
          <div className="max-width-container">
            <h1 className="page-title">Contact Messages</h1>

            {errorMsg && (
              <div className="message-box message-box-error">
                <AlertTriangle className="message-icon" /> {errorMsg}
              </div>
            )}

            <div className="table-card">
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>WhatsApp</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((m) => (
                    <tr key={m.id}>
                      <td>{m.id}</td>
                      <td>{m.name}</td>
                      <td>{m.email}</td>
                      <td>{m.whatsapp || "-"}</td>
                      <td>{m.subject}</td>
                      <td>{m.message}</td>
                      <td className="action-buttons">
                        {m.whatsapp && (
                          <button
                            className="action-btn whatsapp-btn"
                            onClick={() =>
                              openWhatsApp(
                                m.whatsapp,
                                `Hello ${m.name}, regarding your message: "${m.message}"`
                              )
                            }
                          >
                            <AiOutlineWhatsApp size={18} /> WhatsApp
                          </button>
                        )}
                        {m.email && (
                          <button
                            className="action-btn gmail-btn"
                            onClick={() =>
                              openGmail(
                                m.email,
                                `Re: ${m.subject}`,
                                `Hello ${m.name},\n\nRegarding your message:\n"${m.message}"\n\n`
                              )
                            }
                          >
                            <AiOutlineMail size={18} /> Gmail
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
