import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaPoll,
  FaTasks,
  FaCalendarAlt,
  FaShareAlt,
  FaChartLine,
  FaCog,
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa";
import Logout from "../common/Logout";
import "./SurveyCreatorDashboard.css";

const SurveyCreatorDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getCurrentPageTitle = () => {
    const path = location.pathname;
    if (path.includes("/my-surveys")) return "My Surveys";
    if (path.includes("/manage-surveys")) return "Manage Questions";
    if (path.includes("/schedule-surveys")) return "Schedule Surveys";
    if (path.includes("/share-survey")) return "Share Survey";
    if (path.includes("/reports")) return "Reports";
    if (path.includes("/settings")) return "Settings";
    return "Dashboard";
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="creator-dashboard">
      {/* Sidebar */}
      <div className={`creator-sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="creator-sidebar-header">
          <button className="creator-toggle-btn" onClick={toggleSidebar}>
            <FaBars />
          </button>
          {isSidebarOpen && <h2 className="creator-logo">Survey Creator</h2>}
        </div>

        <ul className="creator-sidebar-menu">
          <li
            className={isActive("/survey-creator-dashboard") ? "active" : ""}
            onClick={() => navigate("/survey-creator-dashboard")}
          >
            <FaHome className="creator-icon" />
            <span className="creator-show-text">Dashboard</span>
          </li>
          <li
            className={isActive("/survey-creator-dashboard/my-surveys") ? "active" : ""}
            onClick={() => navigate("/survey-creator-dashboard/my-surveys")}
          >
            <FaPoll className="creator-icon" />
            <span className="creator-show-text">My Surveys</span>
          </li>
          <li
            className={isActive("/survey-creator-dashboard/manage-surveys") ? "active" : ""}
            onClick={() => navigate("/survey-creator-dashboard/manage-questions")}
          >
            <FaTasks className="creator-icon" />
            <span className="creator-show-text">Manage Questions</span>
          </li>
          <li
            className={isActive("/survey-creator-dashboard/schedule-surveys") ? "active" : ""}
            onClick={() => navigate("/survey-creator-dashboard/schedule-surveys")}
          >
            <FaCalendarAlt className="creator-icon" />
            <span className="creator-show-text">Schedule Surveys</span>
          </li>
          <li
            className={isActive("/survey-creator-dashboard/share-survey") ? "active" : ""}
            onClick={() => navigate("/survey-creator-dashboard/share-survey")}
          >
            <FaShareAlt className="creator-icon" />
            <span className="creator-show-text">Share Survey</span>
          </li>
          {/* <li
            className={isActive("/survey-creator-dashboard/reports") ? "active" : ""}
            onClick={() => navigate("/survey-creator-dashboard/reports")}
          >
            <FaChartLine className="creator-icon" />
            <span className="creator-show-text">Reports</span>
          </li> */}
          {/* <li
            className={isActive("/survey-creator-dashboard/settings") ? "active" : ""}
            onClick={() => navigate("/survey-creator-dashboard/settings")}
          >
            <FaCog className="creator-icon" />
            <span className="creator-show-text">Settings</span>
          </li> */}
        </ul>
      </div>

      {/* Main Content */}
      <div className={`creator-content ${isSidebarOpen ? "with-sidebar" : "full-width"}`}>
        <div className="creator-header">
          <h2 className="creator-page-title">{getCurrentPageTitle()}</h2>
          <div className="creator-logout-top">
            <Logout
              trigger={
                <button className="creator-logout-btn">
                  <FaSignOutAlt />
                  Logout
                </button>
              }
            />
          </div>
        </div>

        <div className="creator-page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SurveyCreatorDashboard;
