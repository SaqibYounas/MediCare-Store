import React, { useEffect, useState } from "react";
import "../css/Store.css";
import { Link, useLocation } from "react-router-dom";
import Loading from "../Layouts/Loading";
import NoMedicineFound from "../Layouts/NoFoundMedicine";

// Medicine card component
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

  // Search query words me split karna
  const searchWords = searchQuery.toLowerCase().split(" ").filter(Boolean);
 const scored = medicines
  .map((m) => {
    let score = 0;

    const medicineWords = m.name.toLowerCase().split(" ").filter(Boolean);

    // multi-word search
    searchWords.forEach((searchWord) => {
      medicineWords.forEach((medWord) => {
        if (medWord.includes(searchWord)) score += 2; // startsWith → includes for partial match
      });
      if (m.category.toLowerCase().includes(searchWord)) score += 1;
    });

    // agar search query empty hai → show all medicines
    if (searchWords.length === 0) score = 1;

    // category filter
    if (selectedCategory && m.category !== selectedCategory) {
      // optional: comment out if you want all categories
      // score = 0;
    }

    return { ...m, score };
  })
  .filter((m) => m.score > 0)
  .sort((a, b) => b.score - a.score);


  if (scored.length === 0) return <NoMedicineFound />;

  const groupedByCategory = scored.reduce((acc, medicine) => {
    const category = medicine.category;
    if (!acc[category]) acc[category] = [];
    acc[category].push(medicine);
    return acc;
  }, {});

  const categories = Object.keys(groupedByCategory);

  return (
    <div className="store-layout">
      {categories.map((category) => (
        <div key={category} className="category-section">
          <h2>{category}</h2>
          <div className="horizontal-product-list">
            {groupedByCategory[category].map((m) => (
              <MedicineCard key={m.id} medicine={m} />
            ))}
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}
