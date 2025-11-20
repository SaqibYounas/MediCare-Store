import React, { useEffect, useState } from "react";
import "../css/Store.css";
import Header from "../Layouts/Header";
import Footer from "../Layouts/Footer";
export default function StorePage() {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/medicine/get/all")
      .then((res) => res.json())
      .then((data) => setMedicines(data));
  }, []);

  return (
    <>
    <Header/>
  
    <div className="store-container">
      {medicines.map((m) => (
        <div
          className="card"
          key={m.id}
          onClick={() => (window.location.href = `/product/${m.id}`)}
        >
          <img src={m.image_url} alt={m.name} />
          <h3>{m.name}</h3>
          <p className="price">Rs {m.price}</p>
          <button className="checkout-btn">Checkout</button>
        </div>
      ))}
    </div> 
    <Footer/>
     </>


  );
}
