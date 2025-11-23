import React, { useEffect, useState } from "react";
import "../css/Store.css";
import { Link, useLocation } from "react-router-dom";
import Loading from "../Layouts/Loading";
import NoMedicineFound from "../Layouts/NoFoundMedicine";

const MedicineCard = ({ medicine }) => (
  <div className="product-card" key={medicine.id}>
    <div className="product-image-box">
      <img src={medicine.image_url} alt={medicine.name} />
    </div>
    <div className="product-info">
      <p className="product-name">{medicine.name}</p>
      <p className="product-price">Rs {medicine.price}</p>
      <Link to={`/product/${medicine.id}`} className="buy-btn">
        BUY NOW
      </Link>
    </div>
  </div>
);

export default function StorePage() {
  const location = useLocation();
  const searchQuery = location.state?.searchQuery || "";
  const selectedCategory = location.state?.category || "";

  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/medicine/get/all")
      .then((res) => res.json())
      .then((data) => setMedicines(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;
  if (medicines.length === 0) return <NoMedicineFound />;

  // ---- FILTER LOGIC ----
  const filtered = medicines.filter((m) => {
    const matchesSearch =
      searchQuery === "" ||
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "" || m.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="store-layout">
      {filtered.length === 0 && <NoMedicineFound />}

      <div className="horizontal-product-list">
        {filtered.map((m) => (
          <MedicineCard key={m.id} medicine={m} />
        ))}
      </div>
    </div>
  );
}
