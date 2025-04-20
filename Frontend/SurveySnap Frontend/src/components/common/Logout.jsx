// src/components/common/Logout.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../contexts/ToastContext"; // ✅ Custom toast system
import "./Logout.css";

const Logout = ({ trigger }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleLogout = () => {
    setIsLoading(true);
        localStorage.clear();
    // localStorage.removeItem("authToken");
    // localStorage.removeItem("user");
    // localStorage.removeItem("userRole");

    showToast("You have been logged out", "success");

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <>
      <div onClick={() => setShowPopup(true)}>{trigger}</div>

      {showPopup && (
        <div className="logout-overlay">
          <div className="logout-modal">
            <h3 className="logout-title">Confirm Logout</h3>
            <p className="logout-message">Are you sure you want to log out?</p>
            <div className="logout-buttons">
              <button
                className="logout-btn confirm"
                onClick={handleLogout}
                disabled={isLoading}
              >
                {isLoading ? "Logging out..." : "Yes, Logout"}
              </button>
              <button
                className="logout-btn cancel"
                onClick={() => setShowPopup(false)}
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Logout;
