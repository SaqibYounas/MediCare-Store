import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSideBar from "../../layouts/AdminSideBar";
import "../css/UpdateMedicine.css";

export default function UpdateMedicine() {
  const navigate = useNavigate();

  const [medicine, setMedicine] = useState({
    id: "",
    name: "",
    power: "",
    category: "",
    price: "",
    stock: "",
    image_url: "",
  });

  const [categories, setCategories] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [newImage, setNewImage] = useState(null);

  // Capitalize first letter function
  const capitalizeFirstLetter = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/medicine/categories/");
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

  const handleSearch = async () => {
    if (!searchTerm) return setErrorMsg("Enter a medicine name to search");
    setErrorMsg("");

    try {
      const formattedSearch = capitalizeFirstLetter(searchTerm);
      const response = await fetch(
        `http://127.0.0.1:8000/medicine/name/${formattedSearch}/`
      );

      if (!response.ok) {
        setErrorMsg("Medicine not found");
        setMedicine({
          id: "",
          name: "",
          power: "",
          category: "",
          price: "",
          stock: "",
          image_url: "",
        });
        return;
      }

      const data = await response.json();
      console.log(data);
      // 🟩 FIX: array me se first medicine lo
      const med = data.medicines[0];

      setMedicine({
        id: med.id,
        name: med.name,
        power: med.power,
        category: med.category,
        price: med.price,
        stock: med.stock,
        image_url: med.image,
      });
    } catch (error) {
      console.error(error);
      setErrorMsg("Error fetching medicine data");
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setMedicine({ ...medicine, [name]: capitalizeFirstLetter(value) });
    } else {
      setMedicine({ ...medicine, [name]: value });
    }
  };

  // Handle image selection
  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleUpdateMedicine = async () => {
  if (
    !medicine.name ||
    !medicine.power ||
    !medicine.category ||
    !medicine.price ||
    !medicine.stock
  ) {
    setErrorMsg("Please fill out all fields!");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("name", medicine.name);
    formData.append("power", medicine.power);
    formData.append("category", medicine.category);
    formData.append("price", medicine.price);
    formData.append("stock", medicine.stock);
    if (newImage) formData.append("image", newImage);

    const response = await fetch(
      `http://127.0.0.1:8000/medicine/update/${medicine.id}/`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      setSuccessMsg("Medicine updated successfully!");
      setErrorMsg(""); 

      setTimeout(() => {
        setSuccessMsg("");
      }, 2000);
    } else {
      setErrorMsg(data.error || "Failed to update medicine");
      setSuccessMsg(""); 
    }
  } catch (error) {
    setErrorMsg("Cannot connect to server!");
    setSuccessMsg(""); 
  }
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
                onChange={(e) =>
                  setSearchTerm(capitalizeFirstLetter(e.target.value))
                }
              />
              <button onClick={handleSearch}>Search</button>
            </div>

            {errorMsg && <p className="error-text">{errorMsg}</p>}
            {successMsg && <p className="success-text">{successMsg}</p>}

            {/* Form */}
            {medicine.id && (
              <div className="form-card">
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
                      <option key={idx} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>

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

                  {medicine.image_url && (
                    <div className="current-image">
                      <p>Current Image:</p>
                      <img
                        src={`http://127.0.0.1:8000${medicine.image_url}`}
                        alt={medicine.name}
                        className="medicine-image"
                      />
                    </div>
                  )}

                  {/* Upload New Image */}
                  <label>Upload New Image</label>
                  <input type="file" onChange={handleImageChange} />
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
