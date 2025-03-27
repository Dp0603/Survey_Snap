import React from "react";
import { FaUsers, FaChartBar, FaFileAlt } from "react-icons/fa";
import "./AdminHome.css"; // Ensure this CSS is properly linked

const AdminHome = () => {
  return (
    <div className="admin-home-container">
      <h1 className="admin-home-title">Welcome, Admin 👨‍💼</h1>
      <p className="admin-home-subtitle">Manage users, surveys, and reports efficiently.</p>

      <div className="admin-home-stats">
        {/* Users Card */}
        <div className="admin-home-stat-card admin-home-users">
          <FaUsers className="admin-home-stat-icon" />
          <div className="admin-home-stat-info">
            <h3>1,023,000</h3>
            <p>Total Users</p>
          </div>
        </div>

        {/* Surveys Card */}
        <div className="admin-home-stat-card admin-home-surveys">
          <FaChartBar className="admin-home-stat-icon" />
          <div className="admin-home-stat-info">
            <h3>25,000</h3>
            <p>Total Surveys</p>
          </div>
        </div>

        {/* Reports Card */}
        <div className="admin-home-stat-card admin-home-reports">
          <FaFileAlt className="admin-home-stat-icon" />
          <div className="admin-home-stat-info">
            <h3>12,000</h3>
            <p>Total Reports</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
