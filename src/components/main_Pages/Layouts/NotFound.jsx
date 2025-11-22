// NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="notfound-container" style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '50vh',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '4rem', color: '#dc3545' }}>404</h1>
      <h2>Page Not Found</h2>
      <p>The page or medicine you are looking for does not exist.</p>
      <Link to="/" style={{
        marginTop: '20px',
        padding: '10px 20px',
        background: '#007bff',
        color: 'white',
        borderRadius: '6px',
        textDecoration: 'none'
      }}>Go Home</Link>
    </div>
  );
}
