import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ResetPassword.css"; // ✅ Unique CSS file for styling

export const ResetPassword = () => {
  const [loading, setLoading] = useState(false); // ✅ Loader state
  const token = useParams().token;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    setLoading(true); // ✅ Show loader

    try {
      const obj = { token, password: data.password };
      const res = await axios.post("/user/resetpassword", obj);

      setLoading(false); // ✅ Hide loader before toast

      if (res.data.message) {
        toast.success(" Password Reset Successfull! Redirecting to Login...", {
          position: "top-center",
          autoClose: 3000, // ✅ Closes automatically in 3s
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          className: "reset-toast-success",
        });
         setTimeout(() => {
          navigate("/login")
         }, 3000); 
      } else {
        toast.error(res.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          className: "reset-toast-error",
        });
      }
    } catch (error) {
      setLoading(false); // ✅ Hide loader before showing error toast
      console.error("Reset Password Error:", error);

      toast.error(" Something went wrong. Please try again!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        className: "reset-toast-error",
      });
    }
  };

  return (
    <div className="reset-container">
      <ToastContainer position="top-center" autoClose={2000} />

      {/* 🔹 Loader Overlay */}
      {loading && (
        <div className="loader-overlay">
          <div className="survey-loader"></div>
          <p>Updating Password...</p>
        </div>
      )}

      <div className="reset-box">
        <h1>🔑 Reset Password</h1>
        <p className="reset-subtitle">Enter your new password below.</p>

        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="reset-input-group">
            <label>New Password</label>
            <input
              type="password"
              className="reset-input"
              placeholder="Enter new password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="reset-error">{errors.password.message}</p>
            )}
          </div>

          <button type="submit" className="reset-btn" disabled={loading}>
            {loading ? "Processing..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};
