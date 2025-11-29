import React, { useEffect, useState } from "react";
import "../css/Store.css";
import { Link, useLocation } from "react-router-dom";
import Loading from "../Layouts/Loading";
import NoMedicineFound from "../Layouts/NoFoundMedicine";

// ------------------ Fuzzy Search: Levenshtein Distance ------------------
function levenshtein(a, b) {
  const dp = Array(a.length + 1)
    .fill(null)
    .map(() => Array(b.length + 1).fill(null));

  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }
  return dp[a.length][b.length];
}

// ------------------ Medicine Card Component ------------------
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

// ------------------- STORE PAGE -------------------
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

  const searchWords = searchQuery.toLowerCase().split(" ").filter(Boolean);

  // ---------------- Strong Fuzzy Scoring System ----------------
  const scored = medicines
    .map((m) => {
      let score = 0;

      const medName = m.name.toLowerCase();
      const medCategory = m.category.toLowerCase();

      searchWords.forEach((query) => {
        // Exact includes
        if (medName.includes(query)) score += 5;

        // startsWith & word includes
        medName.split(" ").forEach((w) => {
          if (w.startsWith(query)) score += 4;
          if (w.includes(query)) score += 3;
        });

        // category
        if (medCategory.includes(query)) score += 2;

        // Fuzzy match: handles spelling mistakes
        const distance = levenshtein(query, medName.slice(0, query.length));

        if (distance <= 2) score += 3;
        else if (distance <= 3) score += 1;
      });

      // Empty search → show all
      if (searchWords.length === 0) score = 1;

      // Strict category filter (optional)
      if (selectedCategory && m.category !== selectedCategory) score = 0;

      return { ...m, score };
    })
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score);

  // No results
  if (scored.length === 0) return <NoMedicineFound />;

  // Group by category
  const groupedByCategory = scored.reduce((acc, med) => {
    const cat = med.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(med);
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
