import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./components/admin/pages//Dashboard.jsx";
import AdminLogin from "./components/Login.jsx";
import AdminProfile from "./components/AdminProfile.js";

import UpdateMedicine from "./components/admin/pages/UpdateMedicine.jsx";
import DeleteMedicine from "./components/admin/pages/DeleteMedicine.jsx";
import AddNewMedicine from "./components/admin/pages/AddNewMedicine.jsx";

import Home from "./components/main_Pages/main/home.jsx";
import ContactForm from "./components/main_Pages/main/Contact.jsx";
import AboutUs from "./components/main_Pages/main/About.jsx";
import CheckoutPage from "./components/main_Pages/main/Checkout.jsx";
import MedicineStore from "./components/main_Pages/main/Store.jsx";
import ProductDetail from "./components/main_Pages/main/ProductDetail.jsx";
import MainLayout from "./components/main_Pages/Layouts/MainLayout.jsx";
import NotFound from "./components/main_Pages/Layouts/NotFound.jsx";
import AdminOrders from "./components/admin/pages/All_Orders.jsx";
import PaymentCard from "./components/main_Pages/main/Payment.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Admin Routes - NO Header/Footer */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<AdminProfile />} />

        {/* Medicine CRUD Routes - NO Header/Footer */}
        <Route path="/update/medicine" element={<UpdateMedicine />} />
        <Route path="/delete/medicine" element={<DeleteMedicine />} />
        <Route path="/create/medicine" element={<AddNewMedicine />} />
        <Route path="/admin/orders" element={<AdminOrders />} />

        {/* Main Pages - WITH Header/Footer */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <MainLayout>
              <ContactForm />
            </MainLayout>
          }
        />
        <Route
          path="/about"
          element={
            <MainLayout>
              <AboutUs />
            </MainLayout>
          }
        />
        <Route
          path="/checkout"
          element={
            <MainLayout>
              <CheckoutPage />
            </MainLayout>
          }
        />
        <Route
          path="/store"
          element={
            <MainLayout>
              <MedicineStore />
            </MainLayout>
          }
        />
        <Route
          path="/product/:id"
          element={
            <MainLayout>
              <ProductDetail />
            </MainLayout>
          }
        />
          <Route
          path="/payment/card"
          element={
            <MainLayout>
              <PaymentCard />
            </MainLayout>
          }
        />
         <Route
          path="*"
          element={
            <MainLayout>
              <NotFound />
            </MainLayout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
