import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useToast } from "../../contexts/ToastContext"; // ✅ your global toast
import "./SurveyCreatorReports.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const SurveyCreatorReports = () => {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();
  const creatorId = localStorage.getItem("id"); // ✅ get current user

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get("/analytics/survey-analytics");
      const allData = res.data.data || [];

      // ✅ Filter only current user's survey analytics
      const filtered = allData.filter(
        (a) => a.survey_id?.creator_id === creatorId
      );

      setAnalyticsData(filtered);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      showToast("Failed to fetch analytics data", "error");
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
        item.total_responses || 0,
        new Date(item.createdAt).toLocaleDateString(),
      ];
      csvRows.push(row.join(","));
    });

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "survey_analytics.csv";
    a.click();
  };

  return (
    <div className="survey-reports-wrapper">
      <h2>📊 My Survey Reports & Analytics</h2>
      <p className="survey-reports-sub">
        Visualize your survey performance & insights.
      </p>

      <div className="survey-reports-content">
        {loading ? (
          <p>Loading analytics...</p>
        ) : analyticsData.length === 0 ? (
          <p>No reports available for your surveys.</p>
        ) : (
          analyticsData.map((report, index) => (
            <div key={index} className="report-card">
              <h3>{report.survey_id?.title || "Untitled Survey"}</h3>
              <p>Total Responses: {report.total_responses || 0}</p>

              <div className="chart-box">
                <Bar
                  data={{
                    labels: ["Responses"],
                    datasets: [
                      {
                        label: "Total",
                        data: [report.total_responses || 0],
                        backgroundColor: "#007bff",
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: { legend: { display: false } },
                  }}
                />
              </div>

              {/* Render Pie charts if response_data exists */}
              {report.response_data &&
                (() => {
                  try {
                    const parsedData = JSON.parse(report.response_data);
                    return (
                      <div className="question-analytics">
                        {parsedData.map((q, i) => (
                          <div key={i} className="question-chart">
                            <h4>{q.label}</h4>
                            <Pie
                              data={{
                                labels: Object.keys(q.options || {}),
                                datasets: [
                                  {
                                    data: Object.values(q.options || {}),
                                    backgroundColor: [
                                      "#36a2eb",
                                      "#ffcd56",
                                      "#ff6384",
                                      "#4bc0c0",
                                    ],
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
                    );
                  } catch (e) {
                    return <p>Invalid response data</p>;
                  }
                })()}
            </div>
          ))
        )}
      </div>

      {analyticsData.length > 0 && (
        <button className="export-btn" onClick={exportToCSV}>
          📥 Export to CSV
        </button>
      )}
    </div>
  );
};

export default SurveyCreatorReports;
