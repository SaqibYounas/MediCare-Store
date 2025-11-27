import React, { useEffect, useState } from "react";
import AdminSideBar from "../../layouts/AdminSideBar";
import { AlertTriangle } from "lucide-react";
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

  if (loading) return <p style={{ textAlign: "center", marginTop: "2rem" }}>Loading messages...</p>;

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
                    <th>Subject</th>
                    <th>Message</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((m) => (
                    <tr key={m.id}>
                      <td>{m.id}</td>
                      <td>{m.name}</td>
                      <td>{m.email}</td>
                      <td>{m.subject}</td>
                      <td>{m.message}</td>
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
