// Loading.jsx
import React from "react";

export default function NoMedicineFound() {
  return (
    <div className="loading-container" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '50vh',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#007bff'
    }}>
     No Medicine Found
    </div>
  );
}
