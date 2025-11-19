import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AdminSideBar from "./layouts/AdminSideBar";
import AdminFooter from "./layouts/AdminFooter";

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

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Search medicine by name using API
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

  // Update medicine via API
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
        const response = await fetch(`http://127.0.0.1:8000/api/medicine/update/${medicine.id}/`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(medicine),
        });

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

  // Handle input changes
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
                    onChange={(e) => setSearchTerm(e.target.value)}
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
                      <div className="card-title">
                        Edit Medicine Details
                        <Link
                          to="/inventory"
                          className="btn btn-danger btn-sm float-right"
                        >
                          Go BACK
                        </Link>
                      </div>
                    </div>
                    <div className="card-body px-4">
                      <div className="form-group">
                        <label htmlFor="name">Medicine Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={medicine.name}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="power">Medicine Power</label>
                        <input
                          type="text"
                          className="form-control"
                          name="power"
                          value={medicine.power}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="category">Medicine Category</label>
                        <input
                          type="text"
                          className="form-control"
                          name="category"
                          value={medicine.category}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="type">Medicine Type</label>
                        <input
                          type="text"
                          className="form-control"
                          name="type"
                          value={medicine.type}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="price">Medicine Price (₹)</label>
                        <input
                          type="text"
                          className="form-control"
                          name="price"
                          value={medicine.price}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="stock">Medicine Stock</label>
                        <input
                          type="text"
                          className="form-control"
                          name="stock"
                          value={medicine.stock}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group text-center">
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
        <AdminFooter />
      </div>
    </>
  );
}
