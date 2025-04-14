import React, { useEffect, useState } from "react";
import { FaUsers, FaChartBar, FaFileAlt } from "react-icons/fa";
import axios from "axios";
import "./AdminHome.css";

const AdminHome = () => {
  const [userCount, setUserCount] = useState(0);
  const [surveyCount, setSurveyCount] = useState(0);
  const [reportCount, setReportCount] = useState(0); // Bonus: for future

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await axios.get("/users");
        const surveysRes = await axios.get("/survey/all");
        const reportsRes = await axios.get("/analytics/survey-analytics");

        if (usersRes.data.data) setUserCount(usersRes.data.data.length);
        if (surveysRes.data.data) setSurveyCount(surveysRes.data.data.length);
        if (reportsRes.data.data) setReportCount(reportsRes.data.data.length);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="admin-home-container">
      <h1 className="admin-home-title">Welcome, Admin 👨‍💼</h1>
      <p className="admin-home-subtitle">
        Here's a quick glance at your platform overview.
      </p>

      <div className="admin-home-stats">
        <div className="admin-home-stat-card users">
          <FaUsers className="admin-home-stat-icon" />
          <div className="admin-home-stat-info">
            <h3>{userCount}</h3>
            <p>Total Users</p>
          </div>
        </div>

        <div className="admin-home-stat-card surveys">
          <FaChartBar className="admin-home-stat-icon" />
          <div className="admin-home-stat-info">
            <h3>{surveyCount}</h3>
            <p>Total Surveys</p>
          </div>
        </div>

        <div className="admin-home-stat-card reports">
          <FaFileAlt className="admin-home-stat-icon" />
          <div className="admin-home-stat-info">
            <h3>{reportCount}</h3>
            <p>Total Reports</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
