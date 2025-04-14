import React, { useEffect, useState } from "react";
import { FaPoll, FaClock, FaShareSquare } from "react-icons/fa";
import axios from "axios";
import "./SurveyCreatorHome.css";

const SurveyCreatorHome = () => {
  const [mySurveys, setMySurveys] = useState(0);
  const [scheduledSurveys, setScheduledSurveys] = useState(0);
  const [sharedSurveys, setSharedSurveys] = useState(0);

  const creatorId = localStorage.getItem("id");

  useEffect(() => {
    if (creatorId) {
      fetchSurveyData();
    }
  }, [creatorId]);

  const fetchSurveyData = async () => {
    try {
      const response = await axios.get(`/survey/user/${creatorId}`);
      const surveys = response.data.data || [];

      setMySurveys(surveys.length);
      setScheduledSurveys(
        surveys.filter((s) => s.status === "Scheduled").length
      );
      setSharedSurveys(surveys.filter((s) => s.status === "Shared").length);
    } catch (error) {
      console.error("Error fetching survey data for creator:", error);
    }
  };

  return (
    <div className="survey-creator-home-container">
      <h1 className="survey-creator-home-title">Welcome, Survey Creator 📝</h1>
      <p className="survey-creator-home-subtitle">
        Create, manage, and distribute surveys with ease.
      </p>

      <div className="survey-creator-home-stats">
        <StatCard
          icon={<FaPoll />}
          count={mySurveys}
          label="My Surveys"
          className="my-surveys"
        />
        <StatCard
          icon={<FaClock />}
          count={scheduledSurveys}
          label="Scheduled Surveys"
          className="scheduled"
        />
        <StatCard
          icon={<FaShareSquare />}
          count={sharedSurveys}
          label="Shared Surveys"
          className="shared"
        />
      </div>
    </div>
  );
};

const StatCard = ({ icon, count, label, className }) => (
  <div className={`survey-creator-stat-card ${className}`}>
    <div className="survey-creator-stat-icon">{icon}</div>
    <div className="survey-creator-stat-info">
      <h3>{count}</h3>
      <p>{label}</p>
    </div>
  </div>
);

export default SurveyCreatorHome;
