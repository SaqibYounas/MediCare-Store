import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "./layouts/Header";
import "./AuthForm.css"; // 👈 CSS file import
export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const url = isLogin
      ? "http://127.0.0.1:8000/api/login/"
      : "http://127.0.0.1:8000/api/register/";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(isLogin ? "Login Successful 🎉" : "Signup Successful 🎉");
        setTimeout(() => navigate("/Dashboard"), 1500);
      } else {
        setMessage(data.error || "Something went wrong!");
      }
    } catch (error) {
      setMessage("Server error, please try again!");
    }
  };

  return (
    <>
      {" "}
      <Header />
      <div className="auth-container">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="auth-box"
        >
          <h2 className="auth-title">
            {isLogin ? "Welcome Back 👋" : "Create Account ✨"}
          </h2>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                onChange={handleChange}
                required
              />
            </div>

            {!isLogin && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="form-group"
              >
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  required
                />
              </motion.div>
            )}

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="auth-btn"
            >
              {isLogin ? "Login" : "Signup"}
            </motion.button>
          </form>

          <p className="toggle-text">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setMessage("");
              }}
              className="toggle-btn"
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </p>

          {message && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`message ${
                message.includes("Successful") ? "success" : "error"
              }`}
            >
              {message}
            </motion.p>
          )}
        </motion.div>
      </div>
    </>
  );
}
