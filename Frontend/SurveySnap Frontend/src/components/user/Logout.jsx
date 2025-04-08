import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import "./Logout.css"; // Ensure proper styling

const Logout = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication tokens or user session data
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    
    // Redirect to login or home page
    navigate("/login");
  };

  return (
    <div className="logout-container">
      <button className="logout-btn" onClick={() => setShowModal(true)}>
        <FaSignOutAlt /> Logout
      </button>

      {/* Logout Confirmation Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to log out?</p>
            <div className="modal-actions">
              <button className="confirm-btn" onClick={handleLogout}>
                Yes, Logout
              </button>
              <button className="cancel-btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logout;
