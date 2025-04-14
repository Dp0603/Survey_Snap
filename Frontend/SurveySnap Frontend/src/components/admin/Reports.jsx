import React from "react";
import { FaDownload } from "react-icons/fa";
import "./Reports.css";

const Reports = () => {
  return (
    <div className="reports">
      <h2>📜 Reports</h2>
      <div className="report-card">
        <h3>Survey Analysis Report</h3>
        <p>Contains detailed analysis of all surveys.</p>
        <button className="download-btn"><FaDownload /> Download</button>
      </div>

      <div className="report-card">
        <h3>User Engagement Report</h3>
        <p>Insights into user participation and responses.</p>
        <button className="download-btn"><FaDownload /> Download</button>
      </div>
    </div>
  );
};

export default Reports;
