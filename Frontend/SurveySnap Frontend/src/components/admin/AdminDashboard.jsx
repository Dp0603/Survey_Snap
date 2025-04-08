import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaChartBar,
  FaFileAlt,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false); // Logout confirmation state

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to show logout confirmation popup
  const confirmLogout = () => {
    setShowLogoutPopup(true);
  };

  // Logout Function
  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className={`admin-sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="admin-sidebar-header">
          <h2 className="admin-logo">{isSidebarOpen ? "Admin Panel" : "AP"}</h2>
          <button className="admin-toggle-btn" onClick={toggleSidebar}>
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <ul className="admin-sidebar-menu">
          <li onClick={() => navigate("/admin-dashboard")}>
            <FaHome className="admin-icon" />{" "}
            <span className="admin-show-text">Dashboard</span>
          </li>
          <li onClick={() => navigate("/admin-dashboard/users")}>
            <FaUsers className="admin-icon" />{" "}
            <span className="admin-show-text">Manage Users</span>
          </li>
          <li onClick={() => navigate("/admin-dashboard/surveys")}>
            <FaChartBar className="admin-icon" />{" "}
            <span className="admin-show-text">Manage Surveys</span>
          </li>
          <li onClick={() => navigate("/admin-dashboard/responses")}>
            <FaFileAlt className="admin-icon" />{" "}
            <span className="admin-show-text">Manage Responses</span>
          </li>
          <li onClick={() => navigate("/admin-dashboard/reports")}>
            <FaFileAlt className="admin-icon" />{" "}
            <span className="admin-show-text">Reports</span>
          </li>
          <li onClick={() => navigate("/admin-dashboard/settings")}>
            <FaCog className="admin-icon" />{" "}
            <span className="admin-show-text">Settings</span>
          </li>
          <li onClick={confirmLogout} className="admin-logout">
            <FaSignOutAlt className="admin-icon" />{" "}
            <span className="admin-show-text">Logout</span>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div
        className={`admin-content ${
          isSidebarOpen ? "with-sidebar" : "full-width"
        }`}
      >
        <h1>Welcome, Admin 👨‍💼</h1>
        <p>Manage users, surveys, and view reports from here.</p>
        <Outlet />
      </div>

      {/* Logout Confirmation Popup */}
      {showLogoutPopup && (
        <div className="logout-popup">
          <div className="logout-popup-content">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to log out?</p>
            <div className="logout-popup-buttons">
              <button className="confirm-btn" onClick={handleLogout}>
                Yes, Logout
              </button>
              <button className="cancel-btn" onClick={() => setShowLogoutPopup(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
