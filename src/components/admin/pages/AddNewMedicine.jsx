import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSideBar from "../../layouts/AdminSideBar";
import "../css/AddMedicine.css"

export default function AddMedicine() {
  const importantCategories = [
    "Antibiotics",
    "Painkillers",
    "Blood Pressure Medicines",
    "Vitamins & Supplements",
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

  // Function to capitalize first letter
  const capitalizeFirstLetter = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleAddMedicine = async () => {
    if (medicine.name && medicine.power && medicine.category && medicine.price && medicine.stock) {
      setErrorMsg("");

      try {
        const formData = new FormData();
        formData.append("name", capitalizeFirstLetter(medicine.name)); // Capitalized
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
          setMedicine(initialState); // Reset form
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

  return (
    <>
      <AdminSideBar />
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <h4 className="page-title">Create Medicine</h4>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <div className="card-title">New Medicine Details</div>
                  </div>
                  <div className="card-body px-4">
                    {/* Medicine Name */}
                    <div className="form-group">
                      <label htmlFor="name">Medicine Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={medicine.name}
                        id="name"
                        onChange={(e) =>
                          setMedicine({ ...medicine, name: capitalizeFirstLetter(e.target.value) })
                        }
                        placeholder="Enter Medicine Name"
                      />
                    </div>

                    {/* Medicine Power */}
                    <div className="form-group">
                      <label htmlFor="power">Medicine Power</label>
                      <input
                        type="text"
                        className="form-control"
                        value={medicine.power}
                        id="power"
                        onChange={(e) => setMedicine({ ...medicine, power: e.target.value })}
                        placeholder="Enter Medicine Power"
                      />
                    </div>

                    {/* Medicine Category */}
                    <div className="form-group">
                      <label htmlFor="categorySelect">Medicine Category</label>
                      <select
                        className="form-control"
                        value={medicine.category}
                        onChange={(e) => setMedicine({ ...medicine, category: e.target.value })}
                        id="categorySelect"
                      >
                        <option value="">Select Category</option>
                        {importantCategories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    {/* Medicine Price */}
                    <div className="form-group">
                      <label htmlFor="price">Medicine Price (RS)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={medicine.price}
                        id="price"
                        onChange={(e) => setMedicine({ ...medicine, price: e.target.value })}
                        placeholder="Enter Medicine Price"
                      />
                    </div>

                    {/* Medicine Stock */}
                    <div className="form-group">
                      <label htmlFor="stock">Medicine Stock</label>
                      <input
                        type="text"
                        className="form-control"
                        value={medicine.stock}
                        id="stock"
                        onChange={(e) => setMedicine({ ...medicine, stock: e.target.value })}
                        placeholder="Enter Medicine Stock"
                      />
                    </div>

                    {/* Medicine Image */}
                    <div className="form-group">
                      <label htmlFor="image">Medicine Image</label>
                      <input
                        type="file"
                        className="form-control"
                        id="image"
                        accept="image/*"
                        onChange={(e) => setMedicine({ ...medicine, image: e.target.files[0] })}
                      />
                    </div>
                  </div>

                  {/* Messages and Button */}
                  <div className="form-group px-4 mb-3 text-center">
                    {errorMsg && <div className="text-danger mb-2">{errorMsg}</div>}
                    {successMsg && <div className="text-success mb-2">{successMsg}</div>}
                    <button className=" btn-primary" onClick={handleAddMedicine}>
                      Add Medicine
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
