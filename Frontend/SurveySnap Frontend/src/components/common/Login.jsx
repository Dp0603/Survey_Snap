// import axios from 'axios';
// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./Login.css";

// export const Login = () => {
//   const navigate = useNavigate();
//   const { register, handleSubmit, formState: { errors } } = useForm();

//   const submitHandler = async (data) => {
//     console.log(data)
//     try {
//       const res = await axios.post("/login", data);
//       console.log("Server Response:", res.data);

//       if (res.status === 200 && res.data?.data) {

//         console.log(res.data)


//         const userData = res.data.data;
//         const role = res.data.data.roleId.name|| null;

//         // if (!role) {
//         //   toast.error("User role information is missing. Please contact support.");
//         //   return;
//         // }

//         localStorage.setItem("id", userData._id);
//         localStorage.setItem("role", role);

//         toast.success("Login Successful!", { autoClose: 2000 });

//         setTimeout(() => {
//           if (role === "Admin") {
//             navigate("/user");
//           }
//           if (role === "Survey Creator") {
//             navigate("/user");
//           }
//           if (role === "Respondent") {
//             navigate("/user");
//           }
//         }, 2500);
//       } else {
//         toast.error("Login Failed");
//       }
//     } catch (error) {
//       console.error("Login Error:", error.response?.data || error.message);
//       toast.error(error.response?.data?.message || "Login failed!");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <h1>Login</h1>
//         <form onSubmit={handleSubmit(submitHandler)}>
//           <div className="input-group">
//             <label>Email</label>
//             <input 
//               type="email" 
//               {...register("email", { required: "Email is required" })} 
//               placeholder="Enter your email"
//             />
//             {errors.email && <p className="error">{errors.email.message}</p>}
//           </div>

//           <div className="input-group">
//             <label>Password</label>
//             <input 
//               type="password" 
//               {...register("password", { required: "Password is required" })} 
//               placeholder="Enter your password"
//             />
//             {errors.password && <p className="error">{errors.password.message}</p>}
//           </div>

//           <button type="submit" className="auth-btn">Login</button>
//         </form>
//         <ToastContainer />
//       </div>
//     </div>
//   );
// };



import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css"; // External CSS for styling

export const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/login", data);
      console.log("Server Response:", res.data);

      if (res.status === 200 && res.data?.data) {
        const userData = res.data.data;
        const role = userData.roleId?.name || null;

        if (!role) {
          toast.error("User role information is missing. Please contact support.");
          return;
        }

        localStorage.setItem("id", userData._id);
        localStorage.setItem("roles", role);

        toast.success("Login Successful!", { autoClose: 2000 });

        setTimeout(() => {
          if (role === "Admin") {
            navigate("/admin-dashboard");
          } else if (role === "Survey Creator") {
            navigate("/creator-dashboard");
          } else if (role === "Respondent") {
            navigate("/respondent-dashboard");
          }
        }, 2500);
      } else {
        toast.error("Login Failed");
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Login</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="input-group">
            <label>Email</label>
            <input 
              type="email" 
              {...register("email", { required: "Email is required" })} 
              placeholder="Enter your email"
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>

          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              {...register("password", { required: "Password is required" })} 
              placeholder="Enter your password"
            />
            {errors.password && <p className="error">{errors.password.message}</p>}
          </div>

          <button type="submit" className="auth-btn">Login</button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};
