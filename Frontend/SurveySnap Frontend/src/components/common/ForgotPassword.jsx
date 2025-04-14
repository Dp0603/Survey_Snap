import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./ForgotPassword.css";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../ToastContext"; // ✅ Custom toast system

export const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { showToast } = useToast(); // ✅ Hook into the global toast

  const submitHandler = async (data) => {
    setLoading(true); // Show loader

    try {
      const res = await axios.post("/user/forgotpassword", data);

      setLoading(false); // Hide loader before showing toast
      if (res.data.message) {
        showToast("Reset Link Sent! Check your email.", "success");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        showToast(res.data.message || "Something went wrong.", "error");
      }
    } catch (error) {
      setLoading(false); // Hide loader before showing toast
      console.error("Forgot Password Error:", error);
      showToast("Email not found. Please check your Email!", "error");
    }
  };

  return (
    <div className="forgot-container">
      {/* 🔹 Loader Overlay */}
      {loading && (
        <div className="loader-overlay">
          <div className="survey-loader"></div>
          <p>Sending Reset Link...</p>
        </div>
      )}

      <div className="forgot-box">
        <h1>🔑 Forgot Password</h1>
        <p className="forgot-subtitle">
          Enter your email to receive a reset link.
        </p>

        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="forgot-input-group">
            <label>Email</label>
            <input
              type="email"
              className="forgot-input"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="forgot-error">{errors.email.message}</p>
            )}
          </div>

          <button type="submit" className="forgot-btn" disabled={loading}>
            {loading ? "Processing..." : "Send Reset Link"}
          </button>
        </form>

        <p className="forgot-footer">
          Remember your password?{" "}
          <Link to="/login" className="forgot-login-link">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};
