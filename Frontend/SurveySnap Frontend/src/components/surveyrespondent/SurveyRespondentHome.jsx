import React, { useEffect, useState } from "react";
import { FaClipboardList, FaCheckCircle, FaHistory } from "react-icons/fa";
import axios from "axios";
import "./SurveyRespondentHome.css";

const SurveyRespondentHome = () => {
  const [available, setAvailable] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [pending, setPending] = useState(0);

  const userId = localStorage.getItem("id"); // Assuming you're storing user ID here

  useEffect(() => {
    const fetchSurveyStats = async () => {
      try {
        const response = await axios.get(`/responses/stats/${userId}`);
        const { available, completed, pending } = response.data;
        setAvailable(available);
        setCompleted(completed);
        setPending(pending);
      } catch (error) {
        console.error("Error fetching survey stats:", error);
      }
    };

    if (userId) fetchSurveyStats();
  }, [userId]);

  return (
    <div className="survey-respondent-home-container">
      <h1 className="survey-respondent-home-title">Welcome to Survey Portal 👋</h1>
      <p className="survey-respondent-home-subtitle">Complete surveys and track your responses.</p>

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
    </div>
  );
};

export default SurveyRespondentHome;
