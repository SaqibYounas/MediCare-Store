import React, { useEffect, useState } from "react";
import "../css/Store.css";
import { Link } from "react-router-dom";
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
  const [medicines, setMedicines] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/medicine/get/all")
      .then((res) => res.json())
      .then((data) => {
        setMedicines(data);
        const cats = [...new Set(data.map((m) => m.category))];
        setCategories(cats);
        setSelectedCategory(cats[0] || "");
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <Loading />
      </div>
    );
  }

  if (medicines.length === 0) {
    return (
      <div className="not-found">
        <NoMedicineFound />
      </div>
    );
  }

  return (
    <div className="store-layout">
      {categories.map((cat) => {
        const filteredMedicines = medicines.filter((m) => m.category === cat);
        return (
          <div className="category-slider-section" key={cat}>
            <div className="vertical-category-tab">
              <span className="category-name-vertical">{cat}</span>
            </div>

            <div className="horizontal-product-list">
              {filteredMedicines.length > 0 ? (
                filteredMedicines.map((m) => (
                  <MedicineCard key={m.id} medicine={m} />
                ))
              ) : (
                <p>No medicines in this category.</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
