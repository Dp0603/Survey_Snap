// import axios from "axios";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./Signup.css";

// export const Signup = () => {
//   const { register, handleSubmit, watch, formState: { errors } } = useForm();
//   const navigate = useNavigate();
//   const password = watch("password");
//   const [role, setRole] = useState("");

//   // Function to get Role ID based on selection
//   const getRoleId = (selectedRole) => {
//     const roleIds = {
//       Admin: "67cef4be0b2513383e7d41fc",
//       Survey_Creator: "67cef4f30b2513383e7d41fe",
//       Respondent: "67cef5070b2513383e7d4200",
//     };
//     return roleIds[selectedRole] || "";
//   };


//   if(role === "Admin"){
//     setRole("67cef4be0b2513383e7d41fc")
//   }
//   if(role === "Survey Creator"){
//     setRole("67cef4f30b2513383e7d41fe")
//   }
//   if(role === "Respondent"){
//     setRole("67cef5070b2513383e7d4200")
//   }


//   const submitHandler = async (data) => {
//     data.roleId = role 

//     try {
//       const res = await axios.post("/signup", data);
//       toast.success("User created successfully!", { autoClose: 2000 });

//       setTimeout(() => navigate("/login"), 2500);
//     } catch (error) {
//       console.error("Signup Error:", error.response?.data || error.message);
//       toast.error(error.response?.data?.message || "Signup failed!");
//     }
//   };

//   return (
//     <div className="signup-container">
//       <h1 className="signup-title">Create Your Account</h1>
//       <form className="signup-form" onSubmit={handleSubmit(submitHandler)}>

//         {/* First Name */}
//         <div className="form-group">
//           <label>First Name</label>
//           <input type="text" {...register("firstName", { required: "First name is required" })} />
//           {errors.firstName && <p className="error-text">{errors.firstName.message}</p>}
//         </div>

//         {/* Last Name */}
//         <div className="form-group">
//           <label>Last Name</label>
//           <input type="text" {...register("lastName", { required: "Last name is required" })} />
//           {errors.lastName && <p className="error-text">{errors.lastName.message}</p>}
//         </div>

//         {/* Email */}
//         <div className="form-group">
//           <label>Email</label>
//           <input type="email" {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/, message: "Invalid email format" } })} />
//           {errors.email && <p className="error-text">{errors.email.message}</p>}
//         </div>

//         {/* Password */}
//         <div className="form-group">
//           <label>Password</label>
//           <input type="password" {...register("password", { required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters required" } })} />
//           {errors.password && <p className="error-text">{errors.password.message}</p>}
//         </div>

//         {/* Confirm Password */}
//         <div className="form-group">
//           <label>Confirm Password</label>
//           <input type="password" {...register("confirmPassword", { required: "Confirm your password", validate: (value) => value === password || "Passwords do not match" })} />
//           {errors.confirmPassword && <p className="error-text">{errors.confirmPassword.message}</p>}
//         </div>

//         {/* Age */}
//         <div className="form-group">
//           <label>Age</label>
//           <input type="number" {...register("age", { required: "Age is required", min: { value: 18, message: "Must be at least 18 years old" } })} />
//           {errors.age && <p className="error-text">{errors.age.message}</p>}
//         </div>

//         {/* Role Selection */}
//         <div className="form-group">
//           <label>Role</label>
//           <select {...register("role", { required: "Role is required" })} onChange={(e) => setRole(e.target.value)}>
//             <option value="">Select Role</option>
//             <option value="Admin">Admin</option>
//             <option value="Survey Creator">Survey Creator</option>
//             <option value="Respondent">Respondent</option>
//           </select>
//           {errors.role && <p className="error-text">{errors.role.message}</p>}
//         </div>

//         {/* Submit Button */}
//         <button className="submit-btn" type="submit">Sign Up</button>
//       </form>
//       <ToastContainer />
//     </div>
//   );
// };


import axios from "axios"; 
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css"; // External CSS for styling

export const Signup = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const password = watch("password");
  const [role, setRole] = useState("");

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

    try {
      const res = await axios.post("/signup", data);
      console.log("Server Response:", res.data);

      if (res.status === 201) {
        toast.success("User created successfully!", { autoClose: 2000 });
        setTimeout(() => navigate("/login"), 2500);
      }
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Signup failed!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
          {/* Two-column layout */}
          <div className="form-row">
            <div className="input-group">
              <label>First Name</label>
              <input type="text" {...register("firstName", { required: "First name is required" })} />
              {errors.firstName && <p className="error">{errors.firstName.message}</p>}
            </div>

            <div className="input-group">
              <label>Last Name</label>
              <input type="text" {...register("lastName", { required: "Last name is required" })} />
              {errors.lastName && <p className="error">{errors.lastName.message}</p>}
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Email</label>
              <input type="email" {...register("email", { required: "Email is required" })} />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>

            <div className="input-group">
              <label>Password</label>
              <input type="password" {...register("password", { required: "Password is required" })} />
              {errors.password && <p className="error">{errors.password.message}</p>}
            </div>
          </div>

          <div className="input-group">
            <label>Role</label>
            <select {...register("role", { required: "Role is required" })} onChange={(e) => setRole(e.target.value)}>
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Survey Creator">Survey Creator</option>
              <option value="Respondent">Respondent</option>
            </select>
            {errors.role && <p className="error">{errors.role.message}</p>}
          </div>

          <button type="submit" className="auth-btn">Sign Up</button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};
