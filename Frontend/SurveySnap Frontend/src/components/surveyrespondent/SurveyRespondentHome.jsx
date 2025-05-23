import React, { useEffect, useState } from "react";
import {
  FaClipboardList,
  FaCheckCircle,
  FaHistory,
  FaSyncAlt,
} from "react-icons/fa";
import axios from "axios";
import { useToast } from "../../contexts/ToastContext";
import "./SurveyRespondentHome.css";

const SurveyRespondentHome = () => {
  const [available, setAvailable] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [pending, setPending] = useState(0);
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem("id");
  const { showToast } = useToast();

  const fetchSurveyStats = async () => {
    setLoading(true);
    try {
      const surveyResponse = await axios.get(`/survey/all`);
      const activeSurveys = surveyResponse.data.data.filter(
        (survey) => survey.status === "Active"
      );

      const statsResponse = await axios.get(`/responses/stats/${userId}`);
      const filledSurveys = statsResponse.data;

      const completedSurveys = filledSurveys.filter(
        (survey) => survey.status === "completed"
      );

      setAvailable(activeSurveys.length);
      setCompleted(completedSurveys.length);

      const pendingCount = Math.max(
        0,
        activeSurveys.length - completedSurveys.length
      );
      setPending(pendingCount);
    } catch (error) {
      console.error("Error fetching survey stats:", error);
      showToast(
        "Failed to fetch survey data. Please try again later.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchSurveyStats();

    const interval = setInterval(fetchSurveyStats, 30000);

    return () => clearInterval(interval);
  }, [userId]);

  return (
    <div className="survey-respondent-home-container">
      <h1 className="survey-respondent-home-title">
        Welcome to Survey Portal 👋
      </h1>
      <p className="survey-respondent-home-subtitle">
        Complete surveys and track your responses.
      </p>

      <div className="survey-respondent-home-stats">
        <div className="survey-respondent-home-stat-card survey-respondent-home-available">
          <FaClipboardList className="survey-respondent-home-stat-icon" />
          <div className="survey-respondent-home-stat-info">
            <h3>{available}</h3>
            <p>Available Surveys</p>
          </div>
        </div>

        <div className="survey-respondent-home-stat-card survey-respondent-home-completed">
          <FaCheckCircle className="survey-respondent-home-stat-icon" />
          <div className="survey-respondent-home-stat-info">
            <h3>{completed}</h3>
            <p>Completed Surveys</p>
          </div>
        </div>

        <div className="survey-respondent-home-stat-card survey-respondent-home-pending">
          <FaHistory className="survey-respondent-home-stat-icon" />
          <div className="survey-respondent-home-stat-info">
            <h3>{pending}</h3>
            <p>Pending Surveys</p>
          </div>
        </div>
      </div>

      <div className="refresh-button-container">
        <button
          className="refresh-button"
          onClick={fetchSurveyStats}
          disabled={loading}
        >
          <FaSyncAlt /> {loading ? "Refreshing..." : "Refresh Data"}
        </button>
      </div>
    </div>
  );
};

export default SurveyRespondentHome;
