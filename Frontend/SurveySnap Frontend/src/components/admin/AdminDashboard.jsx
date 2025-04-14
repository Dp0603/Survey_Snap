import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaChartBar,
  FaFileAlt,
  FaCog,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import Logout from "../common/Logout";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getCurrentPageTitle = () => {
    const path = location.pathname;
    if (path.includes("/users")) return "Manage Users";
    if (path.includes("/surveys")) return "Manage Surveys";
    if (path.includes("/responses")) return "Manage Responses";
    if (path.includes("/reports")) return "Manage Reports";
    if (path.includes("/settings")) return "Settings";
    return "Dashboard";
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className={`admin-sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="admin-sidebar-header">
          <button className="admin-toggle-btn" onClick={toggleSidebar}>
            <FaBars />
          </button>
          {isSidebarOpen && <h2 className="admin-logo">Admin Panel</h2>}
        </div>

        <ul className="admin-sidebar-menu">
          <li
            className={isActive("/admin-dashboard") ? "active" : ""}
            onClick={() => navigate("/admin-dashboard")}
          >
            <FaHome className="admin-icon" />
            <span className="admin-show-text">Dashboard</span>
          </li>
          <li
            className={isActive("/admin-dashboard/users") ? "active" : ""}
            onClick={() => navigate("/admin-dashboard/users")}
          >
            <FaUsers className="admin-icon" />
            <span className="admin-show-text">Manage Users</span>
          </li>
          <li
            className={isActive("/admin-dashboard/surveys") ? "active" : ""}
            onClick={() => navigate("/admin-dashboard/surveys")}
          >
            <FaChartBar className="admin-icon" />
            <span className="admin-show-text">Manage Surveys</span>
          </li>
          <li
            className={isActive("/admin-dashboard/responses") ? "active" : ""}
            onClick={() => navigate("/admin-dashboard/responses")}
          >
            <FaFileAlt className="admin-icon" />
            <span className="admin-show-text">Manage Responses</span>
          </li>
          <li
            className={isActive("/admin-dashboard/reports") ? "active" : ""}
            onClick={() => navigate("/admin-dashboard/reports")}
          >
            <FaFileAlt className="admin-icon" />
            <span className="admin-show-text">Reports</span>
          </li>
          <li
            className={isActive("/admin-dashboard/settings") ? "active" : ""}
            onClick={() => navigate("/admin-dashboard/settings")}
          >
            <FaCog className="admin-icon" />
            <span className="admin-show-text">Settings</span>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div
        className={`admin-content ${
          isSidebarOpen ? "with-sidebar" : "full-width"
        }`}
      >
        <div className="admin-header">
          <h2 className="admin-page-title">{getCurrentPageTitle()}</h2>
          <div className="admin-logout-top">
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

        <div className="admin-page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
