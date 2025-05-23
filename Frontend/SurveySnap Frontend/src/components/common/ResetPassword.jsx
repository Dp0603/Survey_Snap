import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import "./ResetPassword.css"; 
import { useToast } from "../../contexts/ToastContext"; 

export const ResetPassword = () => {
  const [loading, setLoading] = useState(false); 
  const token = useParams().token;
  const navigate = useNavigate();
  const { showToast } = useToast(); 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    setLoading(true); 

    try {
      const obj = { token, password: data.password };
      const res = await axios.post("/user/resetpassword", obj);

      setLoading(false); 

      if (res.data.message) {
        showToast("Password Reset Successful! Redirecting to Login...", "success");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        showToast(res.data.message || "Something went wrong", "error");
      }
    } catch (error) {
      setLoading(false);
      console.error("Reset Password Error:", error);
      showToast("Something went wrong. Please try again!", "error");
    }
  };

  return (
    <div className="reset-container">
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
