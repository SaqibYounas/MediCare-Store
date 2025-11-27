import React, { useState } from "react";
import AdminSideBar from "../../layouts/AdminSideBar";
import { PlusCircle, Upload, AlertTriangle, CheckCircle } from "lucide-react";
import "../css/AddMedicine.css"; // Keep your CSS file

export default function AddMedicine() {
  const importantCategories = [
    "Antibiotics",
    "Painkillers",
    "Blood Pressure Medicines",
    "Vitamins & Supplements",
    "Diabetes Medicines",
    "Heart Medicines",
    "Allergy Medicines",
    "Cold & Flu Medicines",
    "Digestive Medicines",
    "Skin Medicines",
    "Eye Medicines",
    "Ear Medicines",
    "Anti-inflammatory Medicines",
    "Hormonal Medicines",
    "Immunity Boosters",
  ];

  const initialState = {
    name: "",
    power: "",
    category: "",
    price: "",
    stock: "",
    image: null,
  };

  const [medicine, setMedicine] = useState(initialState);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const capitalizeFirstLetter = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  const handleAddMedicine = async () => {
    if (
      medicine.name &&
      medicine.power &&
      medicine.category &&
      medicine.price &&
      medicine.stock
    ) {
      setErrorMsg("");

      try {
        const formData = new FormData();
        formData.append("name", capitalizeFirstLetter(medicine.name));
        formData.append("power", medicine.power);
        formData.append("category", medicine.category);
        formData.append("price", medicine.price);
        formData.append("stock", medicine.stock);
        if (medicine.image) formData.append("image", medicine.image);

        const response = await fetch("http://127.0.0.1:8000/medicine/add/", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (response.ok) {
          setSuccessMsg(data.message);
          setMedicine(initialState);
          setTimeout(() => setSuccessMsg(""), 3000);
        } else {
          setErrorMsg(data.error || "Something went wrong!");
        }
      } catch (error) {
        setErrorMsg("Cannot connect to server!");
      }
    } else {
      setErrorMsg("Please fill out all required fields!");
    }
  };

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === "image" && files) setMedicine({ ...medicine, image: files[0] });
    else if (id === "name") setMedicine({ ...medicine, name: capitalizeFirstLetter(value) });
    else setMedicine({ ...medicine, [id]: value });
  };

  return (
    <>
      <AdminSideBar />
      <div className="main-panel">
        <div className="content">
          <div className="max-width-container">
            <h1 className="page-title">
              <PlusCircle className="title-icon" /> Create New Medicine Product
            </h1>

            <div className="form-card">
              <div className="card-heading-section">
                <h2 className="card-title">Medicine Details</h2>
                <p className="card-subtitle">
                  Enter product specifications and inventory info.
                </p>
              </div>

              <div className="form-grid">
                {/* Medicine Name */}
                <div className="form-group">
                  <label htmlFor="name">Medicine Name</label>
                  <input
                    type="text"
                    id="name"
                    value={medicine.name}
                    onChange={handleChange}
                    placeholder="Paracetamol"
                    className="form-input"
                  />
                </div>

                {/* Medicine Power */}
                <div className="form-group">
                  <label htmlFor="power">Medicine Power</label>
                  <input
                    type="text"
                    id="power"
                    value={medicine.power}
                    onChange={handleChange}
                    placeholder="500mg"
                    className="form-input"
                  />
                </div>

                {/* Medicine Category */}
                <div className="form-group">
                  <label htmlFor="category">Medicine Category</label>
                  <select
                    id="category"
                    value={medicine.category}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">-- Select Category --</option>
                    {importantCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Medicine Price */}
                <div className="form-group">
                  <label htmlFor="price">Medicine Price (PKR)</label>
                  <input
                    type="number"
                    id="price"
                    value={medicine.price}
                    onChange={handleChange}
                    placeholder="45.75"
                    className="form-input"
                  />
                </div>

                {/* Medicine Stock */}
                <div className="form-group">
                  <label htmlFor="stock">Medicine Stock</label>
                  <input
                    type="number"
                    id="stock"
                    value={medicine.stock}
                    onChange={handleChange}
                    placeholder="500"
                    className="form-input"
                  />
                </div>

                {/* Medicine Image */}
                <div className="form-group file-upload-container-wrapper">
                  <label htmlFor="image">Medicine Image (.jpg, .png)</label>
                  <div className="file-upload-container">
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={handleChange}
                      className="hidden"
                    />
                    <label htmlFor="image" className="file-upload-label">
                      <Upload /> {medicine.image ? medicine.image.name : "Choose Image File"}
                    </label>
                  </div>
                </div>
              </div>

              {/* Messages and Submit Button */}
              <div className="button-section">
                {errorMsg && (
                  <div className="message-box message-box-error">
                    <AlertTriangle className="message-icon" /> {errorMsg}
                  </div>
                )}
                {successMsg && (
                  <div className="message-box message-box-success">
                    <CheckCircle className="message-icon" /> {successMsg}
                  </div>
                )}

                <button className="submit-btn submit-btn-primary" onClick={handleAddMedicine}>
                  <PlusCircle className="w-5 h-5 mr-2" /> Add Medicine
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
