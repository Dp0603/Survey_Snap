import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash, FaUser, FaLock, FaEnvelope, FaUserShield } from "react-icons/fa";
import "./Signup.css"; 
import Header from "../layout/Header";

export const Signup = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 🔹 Loader state

  // Role-based roleId assignment
  const getRoleId = (selectedRole) => {
    switch (selectedRole) {
      case "Admin": return "67da500a0142ee78ed3d909c";
      case "Survey Creator": return "67da50510142ee78ed3d909e";
      case "Respondent": return "67da505c0142ee78ed3d90a0";
      default: return "";
    }
  };

  const submitHandler = async (data) => {
    console.log("Form Data Submitted:", data);
    data.roleId = getRoleId(role);
    setIsLoading(true); // 🔹 Show loader popup

    try {
      const res = await axios.post("/signup", data);
      console.log("Server Response:", res.data);

      if (res.status === 201) {
        setTimeout(() => {
          setIsLoading(false); // 🔹 Hide loader
          toast.success("🎉 User created successfully!");
          setTimeout(() => {
            navigate("/login");
          }, 2000); // Redirect after toast
        }, 1500); // Loader visible for 1.5s
      }
    } catch (error) {
      console.error("Signup Error:", error);
      setIsLoading(false); // 🔹 Hide loader on error
      toast.error(error.response?.data?.message || "❌ Signup failed!");
    }
  };

  return (
    <>
      <Header />
      <div className="signup-container">
        {/* 🔹 Loader Popup (Only shows when isLoading is true) */}
        {isLoading && (
          <div className="loader-overlay">
            <div className="survey-loader"></div>
            <p>Creating your profile...</p>
          </div>
        )}

        {/* 🔹 Signup Form */}
        <div className="signup-box">
          <h1>🚀 Join SurveySnap</h1>
          <p className="signup-subtitle">Create surveys, collect insights, and grow smarter.</p>

          <form onSubmit={handleSubmit(submitHandler)}>
            {/* 🔹 Name Fields */}
            <div className="signup-form-row">
              <div className="signup-input-group">
                <label><FaUser /> First Name</label>
                <input type="text" {...register("firstName", { required: "First name is required" })} placeholder="John" />
                {errors.firstName && <p className="signup-error">{errors.firstName.message}</p>}
              </div>

              <div className="signup-input-group">
                <label><FaUser /> Last Name</label>
                <input type="text" {...register("lastName", { required: "Last name is required" })} placeholder="Doe" />
                {errors.lastName && <p className="signup-error">{errors.lastName.message}</p>}
              </div>
            </div>

            {/* 🔹 Email & Password Fields */}
            <div className="signup-form-row">
              <div className="signup-input-group">
                <label><FaEnvelope /> Email</label>
                <input type="email" {...register("email", { required: "Email is required" })} placeholder="you@example.com" />
                {errors.email && <p className="signup-error">{errors.email.message}</p>}
              </div>

              <div className="signup-input-group signup-password-group">
                <label><FaLock /> Password</label>
                <div className="signup-password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", { required: "Password is required" })}
                    placeholder="Create a strong password"
                  />
                  <span className="signup-toggle-password" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {errors.password && <p className="signup-error">{errors.password.message}</p>}
              </div>
            </div>

            {/* 🔹 Role Selection */}
            <div className="signup-input-group">
              <label><FaUserShield /> Select Role</label>
              <select {...register("role", { required: "Role is required" })} onChange={(e) => setRole(e.target.value)}>
                <option value="">Choose a role</option>
                <option value="Admin">👑 Admin</option>
                <option value="Survey Creator">📋 Survey Creator</option>
                <option value="Respondent">📢 Respondent</option>
              </select>
              {errors.role && <p className="signup-error">{errors.role.message}</p>}
            </div>

            {/* 🔹 Submit Button */}
            <button type="submit" className="signup-btn">🚀 Sign Up</button>

            {/* 🔹 Already have an account? */}
            <p className="signup-footer">
              Already have an account? <Link to="/login" className="signup-login-link">Login</Link>
            </p>
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};
