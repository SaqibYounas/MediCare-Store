import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSideBar from "../../layouts/AdminSideBar";
import "../css/DeleteMedicine.css";

export default function DeleteMedicine() {
  const navigate = useNavigate();

  const [medicine, setMedicine] = useState({
    id: "",
    name: "",
    power: "",
    category: "",
    type: "",
    price: "",
    stock: "",
    image_url: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Capitalize first letter
  const capitalizeFirstLetter = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  // Search medicine
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
          type: "",
          price: "",
          stock: "",
          image_url: "",
        });
        return;
      }

      const data = await response.json();
      const med = data.medicines[0];

      setMedicine({
        id: med.id,
        name: capitalizeFirstLetter(med.name),
        power: med.power,
        category: med.category,
        type: med.type || "",
        price: med.price,
        stock: med.stock,
        image_url: med.image ? `http://127.0.0.1:8000${med.image}` : null,
      });
    } catch (error) {
      console.error(error);
      setErrorMsg("Error fetching medicine data");
    }
  };

  // Delete medicine
  const handleDeleteMedicine = async () => {
    if (!medicine.id) return setErrorMsg("No medicine selected to delete");

    if (!window.confirm(`Are you sure you want to delete ${medicine.name}?`))
      return;

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/medicine/delete/${medicine.id}/`,
        { method: "DELETE" }
      );

      const data = await response.json();

      if (response.ok) {
        setErrorMsg("");
        setSuccessMsg("Medicine deleted successfully!");
        setMedicine({
          id: "",
          name: "",
          power: "",
          category: "",
          type: "",
          price: "",
          stock: "",
          image_url: "",
        });
        setTimeout(() => setSuccessMsg(""), 2000);
      } else {
        setErrorMsg(data.error || "Failed to delete medicine");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Cannot connect to server!");
    }
  };

  return (
    <>
      <AdminSideBar />
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <h4 className="page-title">Search & Delete Medicine</h4>

            {/* Search Box */}
            <div className="search-box">
              <input
                type="text"
                placeholder="Enter medicine name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="search-btn" onClick={handleSearch}>
                Search
              </button>
            </div>

            {errorMsg && <p className="error-text">{errorMsg}</p>}
            {successMsg && <p className="success-text">{successMsg}</p>}

            {/* Medicine Details Card */}
            {medicine.id && (
              <div className="medicine-card">
                {medicine.image_url && (
                  <img
                    src={medicine.image_url}
                    alt={medicine.name}
                    className="medicine-image"
                  />
                )}
                <div className="medicine-info">
                  <h5>{medicine.name}</h5>
                  <p>
                    <strong>Power:</strong> {medicine.power}
                  </p>
                  <p>
                    <strong>Category:</strong> {medicine.category}
                  </p>
                  <p>
                    <strong>Type:</strong> {medicine.type}
                  </p>
                  <p>
                    <strong>Price:</strong> RS {medicine.price}
                  </p>
                  <p>
                    <strong>Stock:</strong> {medicine.stock}
                  </p>
                  <button
                    className="delete-btn"
                    onClick={handleDeleteMedicine}
                  >
                    Delete Medicine
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
