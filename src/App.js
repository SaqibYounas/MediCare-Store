import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import AdminLogin from "./components/Login";
import AdminProfile from "./components/AdminProfile";
import UpdateMedicine from "./components/UpdateMedicin";
import DeleteMedicine from "./components/DeleteMedicine";
import AddNewMedicine from "./components/AddNewMedicine";

import Home from "./components/main_Pages/main/home";
import ContactForm from "./components/main_Pages/main/Contact";
import AboutUs from "./components/main_Pages/main/About";
import CheckoutPage from "./components/main_Pages/main/Checkout.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<AdminProfile />} />

        {/* Medicine CRUD Routes */}
        <Route path="/update/medicine" element={<UpdateMedicine />} />
        <Route path="/delete/medicine" element={<DeleteMedicine />} />
        <Route path="/create/medicine" element={<AddNewMedicine />} />
        <Route path="/updatemedicine" element={<UpdateMedicine />} />

        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/about" element={<AboutUs />} />

        {/* Checkout */}
        <Route path="/checkout" element={<CheckoutPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
