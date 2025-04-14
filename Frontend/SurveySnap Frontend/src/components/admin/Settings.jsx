import React from "react";
import "./Settings.css";

const Settings = () => {
  return (
    <div className="admin-settings-container">
      <h2 className="admin-settings-title">⚙️ Admin Settings</h2>
      <p className="admin-settings-subtitle">
        Manage platform configurations and admin preferences.
      </p>

      {/** Settings Sections */}
      <div className="admin-settings-grid">
        {/* Profile Settings */}
        <SettingsSection title="👤 Profile Settings">
          <label>Full Name</label>
          <input type="text" placeholder="Admin Name" />
          <label>Email Address</label>
          <input type="email" placeholder="admin@example.com" />
          <button className="admin-settings-btn">Update Profile</button>
        </SettingsSection>

        {/* Survey Settings */}
        <SettingsSection title="📋 Survey Configuration">
          <label>Max Questions Per Survey</label>
          <input type="number" defaultValue={10} />
          <label>Allow Anonymous Responses</label>
          <select>
            <option>Yes</option>
            <option>No</option>
          </select>
          <button className="admin-settings-btn">Save Survey Settings</button>
        </SettingsSection>

        {/* Access Control */}
        <SettingsSection title="🔐 User Access Control">
          <label>Enable Account Lock</label>
          <select>
            <option>Enabled</option>
            <option>Disabled</option>
          </select>
          <label>Allow Self-Registration</label>
          <select>
            <option>Enabled</option>
            <option>Disabled</option>
          </select>
          <button className="admin-settings-btn">Apply Policies</button>
        </SettingsSection>

        {/* Notifications */}
        <SettingsSection title="🔔 Notifications">
          <label>Email Alerts</label>
          <select>
            <option>On</option>
            <option>Off</option>
          </select>
          <label>Survey Submission Alerts</label>
          <select>
            <option>Notify Me</option>
            <option>Do Not Notify</option>
          </select>
          <button className="admin-settings-btn">Update Notifications</button>
        </SettingsSection>

        {/* Platform Settings */}
        <SettingsSection title="🧩 Platform Settings">
          <label>Maintenance Mode</label>
          <select>
            <option>Off</option>
            <option>On</option>
          </select>
          <label>Platform Theme</label>
          <select>
            <option>Light</option>
            <option>Dark</option>
          </select>
          <button className="admin-settings-btn">Save Settings</button>
        </SettingsSection>
      </div>
    </div>
  );
};

const SettingsSection = ({ title, children }) => (
  <div className="admin-settings-section">
    <h3 className="admin-settings-section-title">{title}</h3>
    <div className="admin-settings-group">{children}</div>
  </div>
);

export default Settings;
