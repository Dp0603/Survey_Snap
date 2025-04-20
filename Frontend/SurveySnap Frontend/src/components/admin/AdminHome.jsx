import React, { useEffect, useState } from "react";
import { FaUsers, FaChartBar, FaFileAlt } from "react-icons/fa";
import axios from "axios";
import "./AdminHome.css";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const [userCount, setUserCount] = useState(0);
  const [surveyCount, setSurveyCount] = useState(0);
  const [reportCount, setReportCount] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);
  const [greeting, setGreeting] = useState("Hello");
  const [adminName, setAdminName] = useState("Admin");
  const navigate = useNavigate();

  useEffect(() => {
    // Dynamic greeting
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    // Get name from localStorage
    const first = localStorage.getItem("firstName") || "";
    const last = localStorage.getItem("lastName") || "";
    const fullName = `${first} ${last}`.trim();
    setAdminName(fullName || "Admin");

    fetchStats();
    fetchActivity();
  }, []);

  const fetchStats = async () => {
    try {
      const usersRes = await axios.get("/users");
      const surveysRes = await axios.get("/survey/all");
      const reportsRes = await axios.get("/analytics/survey-analytics");

      if (usersRes.data.data) setUserCount(usersRes.data.data.length);
      if (surveysRes.data.data) setSurveyCount(surveysRes.data.data.length);
      if (reportsRes.data.data) setReportCount(reportsRes.data.data.length);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    }
  };

  const fetchActivity = async () => {
    try {
      const res = await axios.get("/analytics/recent-activity");
      if (res.data?.data) setRecentActivities(res.data.data);
    } catch (err) {
      console.error("Error fetching recent activity:", err);
    }
  };

  return (
    <div className="admin-home-container">
      {/* Welcome Message */}
      <div className="admin-home-welcome">
        <h1 className="admin-home-title">
          {greeting}, <span className="admin-home-name">{adminName} 👋</span>
        </h1>
        <p className="admin-home-subtitle">
          Here's a quick glance at your platform overview.
        </p>
      </div>

      {/* Stats Section */}
      <div className="admin-home-stats">
        <div className="admin-home-stat-card admin-users">
          <FaUsers className="admin-home-stat-icon" />
          <div className="admin-home-stat-info">
            <h3>{userCount}</h3>
            <p>Total Users</p>
          </div>
        </div>

        <div className="admin-home-stat-card admin-surveys">
          <FaChartBar className="admin-home-stat-icon" />
          <div className="admin-home-stat-info">
            <h3>{surveyCount}</h3>
            <p>Total Surveys</p>
          </div>
        </div>

        <div className="admin-home-stat-card admin-reports">
          <FaFileAlt className="admin-home-stat-icon" />
          <div className="admin-home-stat-info">
            <h3>{reportCount}</h3>
            <p>Total Reports</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="admin-home-quick-actions">
        <h2 className="admin-home-section-title">⚡ Quick Actions</h2>
        <div className="admin-home-action-buttons">
          <button onClick={() => navigate("/admin-dashboard/surveys")}>
            ➕ View Surveys
          </button>
          <button onClick={() => navigate("/admin-dashboard/users")}>
            👥 View Users
          </button>
          <button onClick={() => navigate("/admin-dashboard/responses")}>
            📊 Analyze Responses
          </button>
        </div>
      </div>

      {/* Dynamic Recent Activity */}
      {/* Organized Recent Activity in 3 columns */}
      <div className="admin-home-activity">
        <h2 className="admin-home-section-title">🕓 Recent Activity</h2>
        <div className="admin-home-activity-grid">
          {/* User Activities */}
          <div className="admin-home-activity-box">
            <h4>👤 User Registrations</h4>
            <ul className="admin-home-activity-list">
              {recentActivities.filter((a) => a.type === "user").length ===
              0 ? (
                <li>No users yet.</li>
              ) : (
                recentActivities
                  .filter((a) => a.type === "user")
                  .map((item, idx) => (
                    <li key={`user-${idx}`}>
                      {item.message}
                      <br />
                      <small>{new Date(item.time).toLocaleString()}</small>
                    </li>
                  ))
              )}
            </ul>
          </div>

          {/* Survey Activities */}
          <div className="admin-home-activity-box">
            <h4>📋 Surveys Created</h4>
            <ul className="admin-home-activity-list">
              {recentActivities.filter((a) => a.type === "survey").length ===
              0 ? (
                <li>No surveys yet.</li>
              ) : (
                recentActivities
                  .filter((a) => a.type === "survey")
                  .map((item, idx) => (
                    <li key={`survey-${idx}`}>
                      {item.message}
                      <br />
                      <small>{new Date(item.time).toLocaleString()}</small>
                    </li>
                  ))
              )}
            </ul>
          </div>

          {/* Response Activities */}
          <div className="admin-home-activity-box">
            <h4>✅ Responses</h4>
            <ul className="admin-home-activity-list">
              {recentActivities.filter((a) => a.type === "response").length ===
              0 ? (
                <li>No responses yet.</li>
              ) : (
                recentActivities
                  .filter((a) => a.type === "response")
                  .map((item, idx) => (
                    <li key={`res-${idx}`}>
                      {item.message}
                      <br />
                      <small>{new Date(item.time).toLocaleString()}</small>
                    </li>
                  ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
