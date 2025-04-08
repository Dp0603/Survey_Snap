import React from "react";
import { FaClipboardList, FaCheckCircle, FaHistory } from "react-icons/fa";
import "./SurveyRespondentHome.css";

const SurveyRespondentHome = () => {
  return (
    <div className="survey-respondent-home-container">
      <h1 className="survey-respondent-home-title">Welcome to Survey Portal 👋</h1>
      <p className="survey-respondent-home-subtitle">Complete surveys and track your responses.</p>

      <div className="survey-respondent-home-stats">
        {/* Available Surveys Card */}
        <div className="survey-respondent-home-stat-card survey-respondent-home-available">
          <FaClipboardList className="survey-respondent-home-stat-icon" />
          <div className="survey-respondent-home-stat-info">
            <h3>15</h3>
            <p>Available Surveys</p>
          </div>
        </div>

        {/* Completed Surveys Card */}
        <div className="survey-respondent-home-stat-card survey-respondent-home-completed">
          <FaCheckCircle className="survey-respondent-home-stat-icon" />
          <div className="survey-respondent-home-stat-info">
            <h3>8</h3>
            <p>Completed Surveys</p>
          </div>
        </div>

        {/* Pending Surveys Card */}
        <div className="survey-respondent-home-stat-card survey-respondent-home-pending">
          <FaHistory className="survey-respondent-home-stat-icon" />
          <div className="survey-respondent-home-stat-info">
            <h3>7</h3>
            <p>Pending Surveys</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyRespondentHome;