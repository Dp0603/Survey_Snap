import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaClipboardList,
  FaHistory,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "./SurveyRespondentDashboard.css";

const SurveyRespondentDashboard = () => {
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
    <div className="survey-respondent-dashboard">
      {/* Sidebar */}
      <div
        className={`survey-respondent-sidebar ${
          isSidebarOpen ? "open" : "closed"
        }`}
      >
        <div className="survey-respondent-sidebar-header">
          <h2 className="survey-respondent-logo">
            {isSidebarOpen ? "Survey Portal" : "SP"}
          </h2>
          <button
            className="survey-respondent-toggle-btn"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <ul className="survey-respondent-sidebar-menu">
          <li onClick={() => navigate("/respondent-dashboard")}>
            <FaHome className="survey-respondent-icon" />
            <span className="survey-respondent-show-text">Dashboard</span>
          </li>
          <li onClick={() => navigate("/respondent-dashboard/available-surveys")}>
            <FaClipboardList className="survey-respondent-icon" />
            <span className="survey-respondent-show-text">
              Available Surveys
            </span>
          </li>
          <li onClick={() => navigate("/respondent-dashboard/response-history")}>
            <FaHistory className="survey-respondent-icon" />
            <span className="survey-respondent-show-text">
              Response History
            </span>
          </li>
          <li onClick={confirmLogout} className="survey-respondent-logout">
            <FaSignOutAlt className="survey-respondent-icon" />
            <span className="survey-respondent-show-text">Logout</span>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div
        className={`survey-respondent-content ${
          isSidebarOpen ? "with-sidebar" : "full-width"
        }`}
      >
        <Outlet />
      </div>

      {/* Logout Confirmation Popup */}
      {showLogoutPopup && (
        <div className="survey-respondent-logout-popup">
          <div className="survey-respondent-logout-popup-content">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to log out?</p>
            <div className="survey-respondent-logout-popup-buttons">
              <button
                className="survey-respondent-confirm-btn"
                onClick={handleLogout}
              >
                Yes, Logout
              </button>
              <button
                className="survey-respondent-cancel-btn"
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

export default SurveyRespondentDashboard;
