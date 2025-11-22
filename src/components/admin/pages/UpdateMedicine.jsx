import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AdminSideBar from "../../layouts/AdminSideBar";
import "../css/UpdateMedicine.css"
export default function UpdateMedicine() {
  const navigate = useNavigate();

  const [medicine, setMedicine] = useState({
    id: "",
    name: "",
    power: "",
    category: "",
    type: "",
    price: "",
    stock: "",
  });

  const [categories, setCategories] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // --- Fetch categories from API ---
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/categories/");
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        } else {
          setCategories([
            "Antibiotics",
            "Painkillers",
            "Vitamins",
            "Blood Pressure",
            "Diabetes",
            "Heart",
          ]);
        }
      } catch (error) {
        console.log(error);
        setCategories([
          "Antibiotics",
          "Painkillers",
          "Vitamins",
          "Blood Pressure",
          "Diabetes",
          "Heart",
        ]);
      }
    };

    fetchCategories();
  }, []);

  // --- Search medicine by name ---
  const handleSearch = async () => {
    if (!searchTerm) return setErrorMsg("Enter a medicine name to search");

    setErrorMsg("");

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/medicine/${searchTerm}/`
      );

      if (!response.ok) {
        setErrorMsg("Medicine not found");
        setMedicine({
          id: "",
          name: "",
          power: "",
          category: "",
          type: "",
          price: "",
          stock: "",
        });
        return;
      }

      const data = await response.json();
      setMedicine(data);
    } catch (error) {
      console.error(error);
      setErrorMsg("Error fetching medicine data");
    }
  };

  // --- Update medicine ---
  const handleUpdateMedicine = async () => {
    if (
      medicine.name &&
      medicine.power &&
      medicine.category &&
      medicine.type &&
      medicine.price &&
      medicine.stock
    ) {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/medicine/update/${medicine.id}/`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(medicine),
          }
        );

        const data = await response.json();

        if (response.ok) {
          setSuccessMsg("Medicine updated successfully!");
          setTimeout(() => {
            navigate("/inventory");
          }, 2000);
        } else {
          setErrorMsg(data.error || "Failed to update medicine");
        }
      } catch (error) {
        setErrorMsg("Cannot connect to server!");
      }
    } else {
      setErrorMsg("Please fill out all fields!");
    }
  };

  const handleChange = (e) => {
    setMedicine({ ...medicine, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AdminSideBar />

      <div className="main-panel">
        <div className="content">
          <div className="container-fluid update-medicine-container">

            <h4 className="page-title">Search & Update Medicine</h4>

            {/* Search Box */}
            <div className="search-box">
              <input
                type="text"
                placeholder="Search medicine name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button onClick={handleSearch}>Search</button>
            </div>

            {errorMsg && <p className="error-text">{errorMsg}</p>}
            {successMsg && <p className="success-text">{successMsg}</p>}

            {/* Form */}
            {medicine.id && (
              <div className="form-card">
                <div className="header">
                  <h5>Edit Medicine Details</h5>
                  <Link to="/inventory" className="back-btn">Go Back</Link>
                </div>

                <div className="form-grid">

                  <label>Medicine Name</label>
                  <input
                    type="text"
                    name="name"
                    value={medicine.name}
                    onChange={handleChange}
                  />

                  <label>Power</label>
                  <input
                    type="text"
                    name="power"
                    value={medicine.power}
                    onChange={handleChange}
                  />

                  <label>Category</label>
                  <select
                    name="category"
                    value={medicine.category}
                    onChange={handleChange}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat, idx) => (
                      <option key={idx} value={cat}>{cat}</option>
                    ))}
                  </select>

                  <label>Type</label>
                  <input
                    type="text"
                    name="type"
                    value={medicine.type}
                    onChange={handleChange}
                  />

                  <label>Price</label>
                  <input
                    type="number"
                    name="price"
                    value={medicine.price}
                    onChange={handleChange}
                  />

                  <label>Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={medicine.stock}
                    onChange={handleChange}
                  />
                </div>

                <button className="update-btn" onClick={handleUpdateMedicine}>
                  Update Medicine
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </>
  );
}
