import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaPoll,
  FaTasks,
  FaCalendarAlt,
  FaShareAlt,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "./SurveyCreatorDashboard.css";

const SurveyCreatorDashboard = () => {
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
    <div className="survey-creator-dashboard">
      {/* Sidebar */}
      <div className={`survey-sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="survey-sidebar-header">
          <h2 className="survey-logo">
            {isSidebarOpen ? "Survey Creator" : "SC"}
          </h2>
          <button className="survey-toggle-btn" onClick={toggleSidebar}>
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <ul className="survey-sidebar-menu">
          <li onClick={() => navigate("/survey-creator-dashboard")}>
            <FaHome className="survey-icon" />
            <span className="survey-show-text">Dashboard</span>
          </li>
          <li onClick={() => navigate("/survey-creator-dashboard/my-surveys")}>
            <FaPoll className="survey-icon" />
            <span className="survey-show-text">My Surveys</span>
          </li>
          <li onClick={() => navigate("/survey-creator-dashboard/manage-questions")}>
            <FaTasks className="survey-icon" />
            <span className="survey-show-text">Manage Questions</span>
          </li>
          <li onClick={() => navigate("/survey-creator-dashboard/schedule-surveys")}>
            <FaCalendarAlt className="survey-icon" />
            <span className="survey-show-text">Schedule Surveys</span>
          </li>
          <li onClick={() => navigate("/survey-creator-dashboard/share-survey")}>
            <FaShareAlt className="survey-icon" />
            <span className="survey-show-text">Share Survey</span>
          </li>
          <li onClick={() => navigate("/survey-creator-dashboard/reports")}>
            <FaChartLine className="survey-icon" />
            <span className="survey-show-text">Reports</span>
          </li>
          <li onClick={() => navigate("/survey-creator-dashboard/settings")}>
            <FaCog className="survey-icon" />
            <span className="survey-show-text">Settings</span>
          </li>
          <li onClick={confirmLogout} className="survey-logout">
            <FaSignOutAlt className="survey-icon" />
            <span className="survey-show-text">Logout</span>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className={`survey-content ${isSidebarOpen ? "with-sidebar" : "full-width"}`}>
        <h1>Welcome, Survey Creator 📊</h1>
        <p>Create, manage, and distribute surveys with ease.</p>
        <Outlet />
      </div>

      {/* Logout Confirmation Popup */}
      {showLogoutPopup && (
        <div className="survey-logout-popup">
          <div className="survey-logout-popup-content">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to log out?</p>
            <div className="survey-logout-popup-buttons">
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

export default SurveyCreatorDashboard;
