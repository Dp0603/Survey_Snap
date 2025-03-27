import React from "react";
import { FaLock, FaUserShield } from "react-icons/fa";
import "./Settings.css";

const Settings = () => {
  return (
    <div className="settings">
      <h2>⚙️ Settings</h2>
      <div className="settings-option">
        <FaLock />
        <span>Change Password</span>
      </div>

      <div className="settings-option">
        <FaUserShield />
        <span>Manage Permissions</span>
      </div>
    </div>
  );
};

export default Settings;
