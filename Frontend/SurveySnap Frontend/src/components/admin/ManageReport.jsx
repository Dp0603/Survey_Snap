import React, { useEffect, useState } from "react";
import "./ManageReport.css"; // ✅ Custom scoped CSS

const ManageReport = () => {
  const [overview, setOverview] = useState({});
  const [topSurveys, setTopSurveys] = useState([]);
  const [userSummary, setUserSummary] = useState([]);

  useEffect(() => {
    fetch("/api/report/platform-overview")
      .then(res => res.json())
      .then(data => setOverview(data.data));

    fetch("/api/report/top-surveys")
      .then(res => res.json())
      .then(data => setTopSurveys(data.data));

    fetch("/api/report/user-summary")
      .then(res => res.json())
      .then(data => setUserSummary(data.data));
  }, []);

  return (
    <div className="report-container">
      <h2>📊 Platform-Wide Insights</h2>

      <div className="report-grid">
        <div className="report-box">
          <h3>Total Users</h3>
          <p>{overview.totalUsers}</p>
        </div>
        <div className="report-box">
          <h3>Total Surveys</h3>
          <p>{overview.totalSurveys}</p>
        </div>
        <div className="report-box">
          <h3>Total Responses</h3>
          <p>{overview.totalResponses}</p>
        </div>
      </div>

      <div className="report-section">
        <h3>🔥 Top 5 Surveys by Responses</h3>
        <ul>
          {topSurveys.map((survey) => (
            <li key={survey._id}>
              {survey.title} - <strong>{survey.responseCount}</strong> responses
            </li>
          ))}
        </ul>
      </div>

      <div className="report-section">
        <h3>👤 User Roles Summary</h3>
        <ul>
          {userSummary.map((role) => (
            <li key={role._id}>
              Role ID: {role._id} - <strong>{role.count}</strong> users
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageReport;
