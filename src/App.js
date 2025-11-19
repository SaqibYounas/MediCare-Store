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
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/admin/login" element={<AdminLogin />} />
         <Route exact path="/Login" element={<AdminLogin />} />
        <Route exact path="/Dashboard" element={<Dashboard />} />
        <Route exact path="/profile" element={<AdminProfile />} />
        <Route exact path="/update/medicine" element={<UpdateMedicine />} />
\        <Route exact path="/delete/medicine" element={<DeleteMedicine />} />
        <Route exact path="/create/medicine" element={<AddNewMedicine />} />
\        <Route exact path="/updatemedicine" element={<UpdateMedicine />} />
        <Route exact path="/" element={<Home />} />
          <Route exact path="/contact" element={<ContactForm />} />
          <Route exact path="/about" element={<AboutUs />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;

