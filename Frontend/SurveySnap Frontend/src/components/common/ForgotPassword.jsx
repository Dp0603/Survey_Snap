import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ForgotPassword.css';

export const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/user/forgotpassword", data);
      if (res.data.message === "reset password link sent to mail.") {
        toast.success('Reset password link sent to your email.', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        toast.error(res.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error("Error during forgot password request:", error);
      toast.error('Internal Server Error', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="forgot-password-container">
      <ToastContainer />
      <div className="forgot-password-wrapper">
        <div className="forgot-password-card">
          <div className="forgot-password-card-header">
            <h3 className="forgot-password-title">Forgot Password</h3>
          </div>
          <div className="forgot-password-card-body">
            <form onSubmit={handleSubmit(submitHandler)}>
              <div className="forgot-password-input-group">
                <input
                  type="email"
                  className="forgot-password-input"
                  placeholder="Email"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <span className="forgot-password-error">{errors.email.message}</span>
                )}
              </div>
              <div className="forgot-password-button-container">
                <button type="submit" className="forgot-password-button">
                  Send Reset Link
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};