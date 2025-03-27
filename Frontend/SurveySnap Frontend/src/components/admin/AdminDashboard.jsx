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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
          <li onClick={() => navigate("/logout")} className="admin-logout">
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
        <Outlet /> {/* Child routes will load here */}
      </div>
    </div>
  );
};

export default AdminDashboard;
