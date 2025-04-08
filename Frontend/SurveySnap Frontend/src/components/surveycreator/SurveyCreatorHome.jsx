import React from "react";
import { FaPoll, FaClock, FaShareSquare } from "react-icons/fa";
import "./SurveyCreatorHome.css"; // Ensure the CSS file is properly linked

const SurveyCreatorHome = () => {
  return (
    <div className="survey-creator-home-container">
      <h1 className="survey-creator-home-title">Welcome, Survey Creator 📝</h1>
      <p className="survey-creator-home-subtitle">
        Create, manage, and distribute surveys with ease.
      </p>

      <div className="survey-creator-home-stats">
        {/* My Surveys Card */}
        <div className="survey-creator-stat-card survey-creator-my-surveys">
          <FaPoll className="survey-creator-stat-icon" />
          <div className="survey-creator-stat-info">
            <h3>1,500</h3>
            <p>My Surveys</p>
          </div>
        </div>

        {/* Scheduled Surveys Card */}
        <div className="survey-creator-stat-card survey-creator-scheduled">
          <FaClock className="survey-creator-stat-icon" />
          <div className="survey-creator-stat-info">
            <h3>320</h3>
            <p>Scheduled Surveys</p>
          </div>
        </div>

        {/* Shared Surveys Card */}
        <div className="survey-creator-stat-card survey-creator-shared">
          <FaShareSquare className="survey-creator-stat-icon" />
          <div className="survey-creator-stat-info">
            <h3>980</h3>
            <p>Shared Surveys</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyCreatorHome;
