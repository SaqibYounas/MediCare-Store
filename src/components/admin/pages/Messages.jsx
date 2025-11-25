import React, { useEffect, useState } from "react";
import "../css/Messages.css";
import AdminSideBar from "../../layouts/AdminSideBar";
export default function MessagesList() {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/medicine/messages/");
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.log("Error loading messages");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="msg-container">
        <AdminSideBar/>
      <h2>Contact Messages</h2>

      <table className="msg-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Action</th>
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
              <td>
                      </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
