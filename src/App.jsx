import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Admin pages
import Dashboard from "./components/admin/pages/Dashboard.jsx";
import AdminLogin from "./components/Login.jsx";
import AdminProfile from "./components/AdminProfile.js";
import UpdateMedicine from "./components/admin/pages/UpdateMedicine.jsx";
import DeleteMedicine from "./components/admin/pages/DeleteMedicine.jsx";
import AddNewMedicine from "./components/admin/pages/AddNewMedicine.jsx";
import AdminOrders from "./components/admin/pages/All_Orders.jsx";
import MessagesList from "./components/admin/pages/Messages.jsx";
import PaymentsList from "./components/admin/pages/Payement.jsx";

// Main pages
import Home from "./components/main_Pages/main/home.jsx";
import ContactForm from "./components/main_Pages/main/Contact.jsx"; 
import AboutUs from "./components/main_Pages/main/About.jsx";
import CheckoutPage from "./components/main_Pages/main/Checkout.jsx";
import MedicineStore from "./components/main_Pages/main/Store.jsx";
import ProductDetail from "./components/main_Pages/main/ProductDetail.jsx";
import PaymentCard from "./components/main_Pages/main/Payment.jsx";
import OrdersPage from "./components/main_Pages/main/Orders.jsx";
import PaymentSuccess from "./components/main_Pages/main/PaymentSuccess.jsx";
import Success from "./components/main_Pages/main/Success.jsx";
import Cancel from "./components/main_Pages/main/Cancle.jsx";
import PaymentPage from "./components/main_Pages/main/PaymentPage.jsx";

// Layouts
import MainLayout from "./components/main_Pages/Layouts/MainLayout.jsx";
import NotFound from "./components/main_Pages/Layouts/NotFound.jsx";

// Stripe
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51SZxFD5oMHTpDHuWBvKgJKBjBEdyKAVooVxPHfwAc9oxRUUFH8QqVQysGutbXb0G8dTCaK5QeFC5rxpiz3AvyA2d00exaHP0Rk"
);

function App() {
  return (
    <BrowserRouter>
      <Routes> 
        {/* Admin Routes - NO Header/Footer */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<AdminProfile />} />
        <Route path="/update/medicine" element={<UpdateMedicine />} />
        <Route path="/delete/medicine" element={<DeleteMedicine />} />
        <Route path="/create/medicine" element={<AddNewMedicine />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/messages" element={<MessagesList />} />
        <Route path="/admin/payments" element={<PaymentsList />} />

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
          path="/pay"
          element={
            <MainLayout>
              <PaymentPage />
            </MainLayout>
          }
        />
        <Route
          path="/success"
          element={
            <MainLayout>
              <Success />
            </MainLayout>
          }
        />
        <Route
          path="/cancel"
          element={
            <MainLayout>
              <Cancel />
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
              <Elements stripe={stripePromise}>
                <CheckoutPage />
              </Elements>
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
          path="/orders"
          element={
            <MainLayout>
              <OrdersPage />
            </MainLayout>
          }
        />
        <Route
          path="/payment/success"
          element={
            <MainLayout>
              <PaymentSuccess />
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
