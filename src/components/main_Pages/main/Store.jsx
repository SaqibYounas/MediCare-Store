import React, { useEffect, useState } from "react";
import "../css/Store.css";
import { Link } from "react-router-dom";
import Loading from "../Layouts/Loading";
export default function StorePage() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    fetch("http://127.0.0.1:8000/medicine/get/all")
      .then((res) => res.json())
      .then((data) => setMedicines(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p><Loading/></p>
      </div>
    );
  }

  if (medicines.length === 0) {
    return (
      <div className="not-found">
        No medicines found.
      </div>
    );
  }

  return (
    <div className="store-container">
      {medicines.map((m) => (
        <div className="card" key={m.id}>
          <img src={m.image_url} alt={m.name} />
          <h3>{m.name}</h3>
          <p className="price">Rs {m.price}</p>

          <Link to={`/product/${m.id}`} className="checkout-btn">
            Checkout
          </Link>
        </div>
      ))}
    </div>
  );
}
