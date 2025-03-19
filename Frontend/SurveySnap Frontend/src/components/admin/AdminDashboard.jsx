import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { 
  FaHome, FaUsers, FaChartBar, FaFileAlt, FaCog, FaSignOutAlt, FaBars, FaTimes 
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
      <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h2 className="logo">Admin Panel</h2>
          <button className="toggle-btn" onClick={toggleSidebar}>
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <ul className="sidebar-menu">
          <li onClick={() => navigate("/admin-dashboard")} className="menu-item">
            <FaHome className="icon" /> <span className="menu-text">Dashboard</span>
          </li>
          <li onClick={() => navigate("/admin-dashboard/users")} className="menu-item">
            <FaUsers className="icon" /> <span className="menu-text">Manage Users</span>
          </li>
          <li onClick={() => navigate("/admin-dashboard/surveys")} className="menu-item">
            <FaChartBar className="icon" /> <span className="menu-text">Manage Surveys</span>
          </li>
          <li onClick={() => navigate("/admin-dashboard/reports")} className="menu-item">
            <FaFileAlt className="icon" /> <span className="menu-text">Reports</span>
          </li>
          <li onClick={() => navigate("/admin-dashboard/settings")} className="menu-item">
            <FaCog className="icon" /> <span className="menu-text">Settings</span>
          </li>
          <li onClick={() => navigate("/logout")} className="logout menu-item">
            <FaSignOutAlt className="icon" /> <span className="menu-text">Logout</span>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className={`content ${isSidebarOpen ? "with-sidebar" : "full-width"}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
