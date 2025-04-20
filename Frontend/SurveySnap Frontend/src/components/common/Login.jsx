import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import "./Login.css";
import Header from "../layout/Header";
import { useToast } from "../../contexts/ToastContext"; // ✅ Custom toast system

export const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const { showToast } = useToast(); // ✅ Use custom toast hook

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/login", data);
      console.log("Server Response:", res.data);

      if (res.status === 200 && res.data?.data) {
        const userData = res.data.data;
        const role = userData.roleId?.name || null;

        if (!role) {
          showToast(
            "User role information is missing. Please contact support.",
            "error"
          );
          return;
        }

        // ✅ Store data in localStorage
        localStorage.setItem("id", userData._id);
        localStorage.setItem("roles", role);
        localStorage.setItem("email", userData.email); // <-- This line added
        localStorage.setItem("firstName", userData.firstName || "");
        localStorage.setItem("lastName", userData.lastName || "");

        showToast("Login Successful! Redirecting...", "success");

        setTimeout(() => {
          setShowLoader(true);
          setTimeout(() => {
            if (role === "Admin") {
              navigate("/admin-dashboard");
            } else if (role === "Survey Creator") {
              navigate("/survey-creator-dashboard");
            } else if (role === "Respondent") {
              navigate("/respondent-dashboard");
            }
          }, 1000);
        }, 1500);
      } else {
        showToast("Login Failed", "error");
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      showToast(error.response?.data?.message || "Login failed!", "error");
    }
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <div className="login-box">
          <h1>🔑 Login to SurveySnap</h1>
          <p className="login-subtitle">
            Access your surveys and manage insights.
          </p>

          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="login-input-group">
              <label>
                <FaEnvelope /> Email
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="login-error">{errors.email.message}</p>
              )}
            </div>

            <div className="login-input-group login-password-group">
              <label>
                <FaLock /> Password
              </label>
              <div className="login-password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  placeholder="Enter your password"
                />
                <span
                  className="login-toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && (
                <p className="login-error">{errors.password.message}</p>
              )}
            </div>

            <div className="login-forgot-password">
              <Link to="/forgotpassword">Forgot Password?</Link>
            </div>

            <button type="submit" className="login-btn">
              🚀 Login
            </button>

            <p className="login-footer">
              Don't have an account?{" "}
              <Link to="/signup" className="login-signup-link">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* ✅ Loader Popup */}
      {showLoader && (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
};
