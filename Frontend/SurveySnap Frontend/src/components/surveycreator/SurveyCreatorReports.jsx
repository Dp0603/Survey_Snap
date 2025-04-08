import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Bar,
  Pie,
  Line,
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./SurveyCreatorReports.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const SurveyCreatorReports = () => {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get("/analytics/getSurveyAnalytics");
      setAnalyticsData(res.data.data || []);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    const csvRows = [];
    const headers = ["Survey Title", "Total Responses", "Generated At"];
    csvRows.push(headers.join(","));

    analyticsData.forEach((item) => {
      const row = [
        item.survey_id?.title || "Untitled",
        item.totalResponses || 0,
        new Date(item.createdAt).toLocaleDateString(),
      ];
      csvRows.push(row.join(","));
    });

    const blob = new Blob([csvRows.join("\n")], {
      type: "text/csv",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "survey_analytics.csv";
    a.click();
  };

  return (
    <div className="survey-reports-wrapper">
      <h2>📊 Survey Reports & Analytics</h2>
      <p className="survey-reports-sub">Visualize survey performance & response insights.</p>

      <div className="survey-reports-content">
        {loading ? (
          <p>Loading analytics...</p>
        ) : analyticsData.length === 0 ? (
          <p>No reports available.</p>
        ) : (
          analyticsData.map((report, index) => (
            <div key={index} className="report-card">
              <h3>{report.survey_id?.title || "Untitled Survey"}</h3>
              <p>Total Responses: {report.totalResponses || 0}</p>

              <div className="chart-box">
                <Bar
                  data={{
                    labels: ["Responses"],
                    datasets: [
                      {
                        label: "Total",
                        data: [report.totalResponses || 0],
                        backgroundColor: "#007bff",
                      },
                    ],
                  }}
                  options={{ responsive: true, plugins: { legend: { display: false } } }}
                />
              </div>

              {report.questionStats && report.questionStats.length > 0 && (
                <div className="question-analytics">
                  {report.questionStats.map((q, i) => (
                    <div key={i} className="question-chart">
                      <h4>{q.label}</h4>
                      <Pie
                        data={{
                          labels: Object.keys(q.options || {}),
                          datasets: [
                            {
                              data: Object.values(q.options || {}),
                              backgroundColor: ["#36a2eb", "#ffcd56", "#ff6384", "#4bc0c0"],
                            },
                          ],
                        }}
                        options={{
                          responsive: true,
                          plugins: { legend: { position: "bottom" } },
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <button className="export-btn" onClick={exportToCSV}>
        📥 Export to CSV
      </button>
    </div>
  );
};

export default SurveyCreatorReports;
