import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSideBar from "./layouts/AdminSideBar";

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
    image_url: "", // 🔹 Old image URL
  });

  const [image, setImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const toTitleCase = (str) =>
    str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());

  // 🔍 Search medicine
  const handleSearch = async () => {
    if (!searchTerm) return setErrorMsg("Enter a medicine name to search");
    setErrorMsg("");

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/medicine/${searchTerm}/`
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
      setMedicine({
        ...data,
        image_url: data.image_url || "", // 🔹 Existing image URL from backend
      });
    } catch (error) {
      console.error(error);
      setErrorMsg("Error fetching medicine data");
    }
  };

  // ✏ Update medicine with image
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
        const formData = new FormData();
        formData.append("name", medicine.name);
        formData.append("power", medicine.power);
        formData.append("category", medicine.category);
        formData.append("type", medicine.type);
        formData.append("price", medicine.price);
        formData.append("stock", medicine.stock);
        if (image) formData.append("image", image); // 🔹 New image

        const response = await fetch(
          `http://127.0.0.1:8000/api/medicine/update/${medicine.id}/`,
          {
            method: "POST", // POST with FormData
            body: formData,
          }
        );

        const data = await response.json();
        if (response.ok) {
          setErrorMsg("");
          setSuccessMsg("Medicine updated successfully!");
          setTimeout(() => {
            setSuccessMsg("");
            navigate("/inventory");
          }, 3000);
        } else {
          setErrorMsg(data.error || "Failed to update medicine");
        }
      } catch (error) {
        console.error(error);
        setErrorMsg("Cannot connect to server!");
      }
    } else {
      setErrorMsg("Please fill out all the required fields!");
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
          <div className="container-fluid">
            <h4 className="page-title">Search & Update Medicine</h4>

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

            {/* Medicine Form */}
            {medicine.id && (
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <div className="card-title">Edit Medicine Details</div>
                    </div>

                    <div className="card-body px-4">
                      <div className="form-group">
                        <label>Medicine Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={medicine.name}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Medicine Power</label>
                        <input
                          type="text"
                          className="form-control"
                          name="power"
                          value={medicine.power}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Medicine Category</label>
                        <input
                          type="text"
                          className="form-control"
                          name="category"
                          value={medicine.category}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Medicine Type</label>
                        <input
                          type="text"
                          className="form-control"
                          name="type"
                          value={medicine.type}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Medicine Price (₹)</label>
                        <input
                          type="text"
                          className="form-control"
                          name="price"
                          value={medicine.price}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Medicine Stock</label>
                        <input
                          type="text"
                          className="form-control"
                          name="stock"
                          value={medicine.stock}
                          onChange={handleChange}
                        />
                      </div>

                      {/* Existing Image Preview */}
                      {medicine.image_url && !image && (
                        <div className="form-group mt-2">
                          <label>Current Image:</label>
                          <div>
                            <img
                              src={medicine.image_url}
                              alt="Current Medicine"
                              style={{ maxWidth: "150px", marginTop: "5px" }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Image Upload */}
                      <div className="form-group mt-3">
                        <label>Upload New Image</label>
                        <input
                          type="file"
                          className="form-control"
                          accept="image/*"
                          onChange={(e) => setImage(e.target.files[0])}
                        />
                      </div>

                      <div className="form-group text-center mt-3">
                        {errorMsg && <div className="text-danger">{errorMsg}</div>}
                        {successMsg && <div className="text-success">{successMsg}</div>}
                        <button
                          className="btn btn-success mt-2"
                          onClick={handleUpdateMedicine}
                        >
                          Update Medicine
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
