import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  FaPoll,
  FaChartLine,
  FaReply,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaHome,
} from "react-icons/fa";
import "./UserDashboard.css";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false); 

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const confirmLogout = () => {
    setShowLogoutPopup(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");

    navigate("/login");
  };

  return (
    <div className="user-dashboard">
      <div className={`user-sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="user-sidebar-header">
          <h2 className="user-logo">{isSidebarOpen ? "User Panel" : "UP"}</h2>
          <button className="user-toggle-btn" onClick={toggleSidebar}>
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <ul className="user-sidebar-menu">
          <li onClick={() => navigate("/user-dashboard")}>
            <FaHome className="user-icon" />
            <span className="user-show-text"> My Dashboard</span>
          </li>
          <li onClick={() => navigate("/user-dashboard/mysurveys")}>
            <FaPoll className="user-icon" />
            <span className="user-show-text">My Surveys</span>
          </li>
          <li onClick={() => navigate("/user-dashboard/myanalytics")}>
            <FaChartLine className="user-icon" />
            <span className="user-show-text">My Analytics</span>
          </li>
          <li onClick={() => navigate("/user-dashboard/myresponses")}>
            <FaReply className="user-icon" />
            <span className="user-show-text">My Responses</span>
          </li>
          <li onClick={() => navigate("/user-dashboard/settings")}>
            <FaCog className="user-icon" />
            <span className="user-show-text">Settings</span>
          </li>
          <li onClick={confirmLogout} className="user-logout">
            <FaSignOutAlt className="user-icon" />
            <span className="user-show-text">Logout</span>
          </li>
        </ul>
      </div>

      <div
        className={`user-content ${
          isSidebarOpen ? "with-sidebar" : "full-width"
        }`}
      >
        <h1>Welcome, User 👤</h1>
        <p>Manage your surveys, analytics, and responses here.</p>
        <Outlet />
      </div>

      {showLogoutPopup && (
        <div className="logout-popup">
          <div className="logout-popup-content">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to log out?</p>
            <div className="logout-popup-buttons">
              <button className="confirm-btn" onClick={handleLogout}>
                Yes, Logout
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowLogoutPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
