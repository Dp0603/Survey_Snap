import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaClipboardList,
  FaHistory,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import Logout from "../common/Logout";
import "./SurveyRespondentDashboard.css";

const SurveyRespondentDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isActive = (path) => location.pathname === path;

  const getCurrentPageTitle = () => {
    const path = location.pathname;
    if (path.includes("/available-surveys")) return "Available Surveys";
    if (path.includes("/response-history")) return "Response History";
    return "Dashboard";
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
          <button
            className="survey-respondent-toggle-btn"
            onClick={toggleSidebar}
          >
            <FaBars />
          </button>
          {isSidebarOpen && (
            <h2 className="survey-respondent-logo">Survey Portal</h2>
          )}
        </div>

        <ul className="survey-respondent-sidebar-menu">
          <li
            className={isActive("/respondent-dashboard") ? "active" : ""}
            onClick={() => navigate("/respondent-dashboard")}
          >
            <FaHome className="survey-respondent-icon" />
            <span className="survey-respondent-show-text">Dashboard</span>
          </li>
          <li
            className={
              isActive("/respondent-dashboard/available-surveys")
                ? "active"
                : ""
            }
            onClick={() => navigate("/respondent-dashboard/available-surveys")}
          >
            <FaClipboardList className="survey-respondent-icon" />
            <span className="survey-respondent-show-text">
              Available Surveys
            </span>
          </li>
          <li
            className={
              isActive("/respondent-dashboard/response-history") ? "active" : ""
            }
            onClick={() => navigate("/respondent-dashboard/response-history")}
          >
            <FaHistory className="survey-respondent-icon" />
            <span className="survey-respondent-show-text">
              Response History
            </span>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div
        className={`survey-respondent-content ${
          isSidebarOpen ? "with-sidebar" : "full-width"
        }`}
      >
        <div className="survey-respondent-header">
          <h2 className="survey-respondent-page-title">
            {getCurrentPageTitle()}
          </h2>
          <div className="survey-respondent-logout-top">
            <Logout
              trigger={
                <button className="top-logout-btn">
                  <FaSignOutAlt />
                  Logout
                </button>
              }
            />
          </div>
        </div>

        <div className="survey-respondent-page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SurveyRespondentDashboard;
