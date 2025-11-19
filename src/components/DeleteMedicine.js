import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AdminSideBar from "./layouts/AdminSideBar";

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
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const toTitleCase = (str) => {
    return str
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // Search medicine by name
  const handleSearch = async () => {
    if (!searchTerm) return setErrorMsg("Enter a medicine name to search");
    setErrorMsg("");
    try {
      const response = await fetch(`http://127.0.0.1:8000/medicine/${searchTerm}/`);
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
      setMedicine(data); // Prefill form
    } catch (error) {
      console.error(error);
      setErrorMsg("Error fetching medicine data");
    }
  };

  // Delete medicine
  const handleDeleteMedicine = async () => {
    if (!medicine.id) return setErrorMsg("No medicine selected to delete");

    if (!window.confirm(`Are you sure you want to delete ${medicine.name}?`)) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/medicine/delete/${medicine.id}/`, {
        method: "DELETE",
      });

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
        });
        setTimeout(() => {
          setSuccessMsg("");
          navigate("/inventory");
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

            {/* Search */}
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter medicine name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(toTitleCase(e.target.value))}
                  />
                  <button className="btn btn-primary" onClick={handleSearch}>
                    Search
                  </button>
                </div>
                {errorMsg && <div className="text-danger mt-2">{errorMsg}</div>}
              </div>
            </div>

            {/* Medicine Details for Delete */}
            {medicine.id && (
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <div className="card-title">Medicine Details</div>
                    </div>
                    <div className="card-body px-4">
                      <p><strong>Name:</strong> {medicine.name}</p>
                      <p><strong>Power:</strong> {medicine.power}</p>
                      <p><strong>Category:</strong> {medicine.category}</p>
                      <p><strong>Type:</strong> {medicine.type}</p>
                      <p><strong>Price:</strong> ₹{medicine.price}</p>
                      <p><strong>Stock:</strong> {medicine.stock}</p>

                      {/* 🔹 Display Image if exists */}
                      {medicine.image_url && (
                        <div className="mt-3">
                          <strong>Image:</strong>
                          <div>
                            <img
                              src={medicine.image}
                              alt={medicine.name}
                              style={{ maxWidth: "150px", marginTop: "5px" }}
                            />
                          </div>
                        </div>
                      )}

                      <div className="form-group text-center mt-3">
                        {errorMsg && <div className="text-danger">{errorMsg}</div>}
                        {successMsg && <div className="text-success">{successMsg}</div>}
                        <button
                          className="btn btn-danger mt-2"
                          onClick={handleDeleteMedicine}
                        >
                          Delete Medicine
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
