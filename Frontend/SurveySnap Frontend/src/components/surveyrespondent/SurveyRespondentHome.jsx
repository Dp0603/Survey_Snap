import React, { useEffect, useState } from "react";
import {
  FaClipboardList,
  FaCheckCircle,
  FaHistory,
  FaSyncAlt,
} from "react-icons/fa";
import axios from "axios";
import "./SurveyRespondentHome.css";

const SurveyRespondentHome = () => {
  const [available, setAvailable] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [pending, setPending] = useState(0);

  const userId = localStorage.getItem("id"); // Assuming you're storing user ID here

  const fetchSurveyStats = async () => {
    try {
      // Fetch all active surveys
      const surveyResponse = await axios.get(`/survey/all`);
      const activeSurveys = surveyResponse.data.data.filter(
        (survey) => survey.status === "Active"
      );

      // Fetch filled surveys stats
      const statsResponse = await axios.get(`/responses/stats/${userId}`);
      const filledSurveys = statsResponse.data;

      // Filter completed surveys
      const completedSurveys = filledSurveys.filter(
        (survey) => survey.status === "completed"
      );

      // Set available, completed, and pending stats
      setAvailable(activeSurveys.length);
      setCompleted(completedSurveys.length);
      setPending(activeSurveys.length - completedSurveys.length); // Pending = Available - Completed
    } catch (error) {
      console.error("Error fetching survey stats:", error);
    }
  };

  useEffect(() => {
    if (userId) fetchSurveyStats();

    // Polling every 30 seconds to refresh the data
    const interval = setInterval(fetchSurveyStats, 30000);

    // Cleanup on component unmount
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
        {/* Available Surveys */}
        <div className="survey-respondent-home-stat-card survey-respondent-home-available">
          <FaClipboardList className="survey-respondent-home-stat-icon" />
          <div className="survey-respondent-home-stat-info">
            <h3>{available}</h3>
            <p>Available Surveys</p>
          </div>
        </div>

        {/* Completed Surveys */}
        <div className="survey-respondent-home-stat-card survey-respondent-home-completed">
          <FaCheckCircle className="survey-respondent-home-stat-icon" />
          <div className="survey-respondent-home-stat-info">
            <h3>{completed}</h3>
            <p>Completed Surveys</p>
          </div>
        </div>

        {/* Pending Surveys */}
        <div className="survey-respondent-home-stat-card survey-respondent-home-pending">
          <FaHistory className="survey-respondent-home-stat-icon" />
          <div className="survey-respondent-home-stat-info">
            <h3>{pending}</h3>
            <p>Pending Surveys</p>
          </div>
        </div>
      </div>

      {/* Refresh Button */}
      <div className="refresh-button-container">
        <button className="refresh-button" onClick={fetchSurveyStats}>
          <FaSyncAlt /> Refresh Data
        </button>
      </div>
    </div>
  );
};

export default SurveyRespondentHome;
