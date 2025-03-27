import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ResetPassword.css"; // ✅ Unique CSS file for styling

export const ResetPassword = () => {
  const token = useParams().token;
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitHandler = async (data) => {
    try {
      const obj = { token, password: data.password };
      const res = await axios.post("/user/resetpassword", obj);

      if (res.data.message === "password updated successfully..") {
        toast.success("✅ Password Reset Successful! Redirecting to Login...", {
          position: "top-center",
          autoClose: 3500, // ✅ Closes automatically in 3.5s
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          className: "reset-toast-success",
        });

        // ✅ Redirect to Login after 3.5s
        setTimeout(() => {
          navigate("/login");
        }, 3500);
      } else {
        toast.error(res.data.message, {
          position: "top-center",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          className: "reset-toast-error",
        });
      }
    } catch (error) {
      console.error("Reset Password Error:", error);

      toast.error("❌ Something went wrong. Please try again!", {
        position: "top-center",
        autoClose: 3500,
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
      <ToastContainer />
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
            {errors.password && <p className="reset-error">{errors.password.message}</p>}
          </div>

          <button type="submit" className="reset-btn">Reset Password</button>
        </form>
      </div>
    </div>
  );
};
