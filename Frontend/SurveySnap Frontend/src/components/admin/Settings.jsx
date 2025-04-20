import React from "react";
import "./Settings.css";

const Settings = () => {
  const admin = {
    name: localStorage.getItem("name") || "Admin",
    email: localStorage.getItem("email") || "admin@example.com",
    role: localStorage.getItem("roles") || "Admin",
  };

  return (
    <div className="admin-settings-container">
      <h2 className="admin-settings-title">⚙️ My Account</h2>

      <div className="admin-profile-card">
        <div className="admin-profile-details">
          <div className="admin-detail-row">
            <span className="admin-detail-label">Full Name:</span>
            <span className="admin-detail-value">{admin.name}</span>
          </div>
          <div className="admin-detail-row">
            <span className="admin-detail-label">Email:</span>
            <span className="admin-detail-value">{admin.email}</span>
          </div>
          <div className="admin-detail-row">
            <span className="admin-detail-label">Role:</span>
            <span className="admin-detail-value">{admin.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
