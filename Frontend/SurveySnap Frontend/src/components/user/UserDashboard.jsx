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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="user-dashboard">
      {/* Sidebar */}
      <div className={`user-sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="user-sidebar-header">
          <h2 className="user-logo">{isSidebarOpen ? "User Panel" : "UP"}</h2>
          <button className="user-toggle-btn" onClick={toggleSidebar}>
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <ul className="user-sidebar-menu">
          <li onClick={() => navigate("/user-dashboard")}>
            <FaHome className="user-icon" />{" "}
            <span className="user-show-text"> My Dashboard</span>
          </li>
          <li onClick={() => navigate("/user-dashboard/mysurveys")}>
            <FaPoll className="user-icon" />{" "}
            <span className="user-show-text">My Surveys</span>
          </li>
          <li onClick={() => navigate("/user-dashboard/myanalytics")}>
            <FaChartLine className="user-icon" />{" "}
            <span className="user-show-text">My Analytics</span>
          </li>
          <li onClick={() => navigate("/user-dashboard/myresponses")}>
            <FaReply className="user-icon" />{" "}
            <span className="user-show-text">My Responses</span>
          </li>
          <li onClick={() => navigate("/user-dashboard/settings")}>
            <FaCog className="user-icon" />{" "}
            <span className="user-show-text">Settings</span>
          </li>
          <li onClick={() => navigate("/logout")} className="user-logout">
            <FaSignOutAlt className="user-icon" />{" "}
            <span className="user-show-text">Logout</span>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div
        className={`user-content ${
          isSidebarOpen ? "with-sidebar" : "full-width"
        }`}
      >
        <h1>Welcome, User 👤</h1>
        <p>Manage your surveys, analytics, and responses here.</p>
        <Outlet /> {/* Child components will load here */}
      </div>
    </div>
  );
};

export default UserDashboard;
