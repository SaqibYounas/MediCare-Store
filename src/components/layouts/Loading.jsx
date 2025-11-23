import React, { useEffect, useState } from "react";
import "./Loading.css";

export default function LoadingPage({ onFinish }) {
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      if (onFinish) onFinish(); 
    }, 2000); 

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!loading) return null; 

  return (
    <div className="loading-wrapper">
      <div className="spinner"></div>
      <h2>Loading Admin Dashboard...</h2>
    </div>
  );
}
