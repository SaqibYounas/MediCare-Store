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

  // Capitalize first letter function
  const capitalizeFirstLetter = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  // Search medicine by name
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
      // Capitalize name in frontend as well
      setMedicine({ ...data, name: capitalizeFirstLetter(data.name) });
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
        setTimeout(() => {
          setSuccessMsg("");
        }, 2000);
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
                onChange={(e) =>
                  setSearchTerm(capitalizeFirstLetter(e.target.value))
                }
              />
              <button onClick={handleSearch}>Search</button>
            </div>

            {errorMsg && <p className="error-text">{errorMsg}</p>}
            {successMsg && <p className="success-text">{successMsg}</p>}

            {/* Medicine Details */}
            {medicine.id && (
              <div className="form-card">
                <h5>Medicine Details</h5>
                <p>
                  <strong>Name:</strong> {medicine.name}
                </p>
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
                  <strong>Price:</strong> ₹{medicine.price}
                </p>
                <p>
                  <strong>Stock:</strong> {medicine.stock}
                </p>

                {medicine.image_url && (
                  <div className="mt-2">
                    <strong>Image:</strong>
                    <div>
                      <img
                        src={medicine.image_url}
                        alt={medicine.name}
                        style={{
                          maxWidth: "150px",
                          marginTop: "5px",
                          borderRadius: "6px",
                        }}
                      />
                    </div>
                  </div>
                )}

                <button
                  className="update-btn mt-3"
                  style={{ backgroundColor: "#dc3545" }}
                  onClick={handleDeleteMedicine}
                >
                  Delete Medicine
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
