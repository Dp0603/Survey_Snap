import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SurveyRespondentAvailableSurveys.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SurveyRespondentAvailableSurveys = () => {
  const [surveys, setSurveys] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (!id) {
      toast.error("You must be logged in to view surveys!");
      navigate("/login");
    } else {
      setUserId(id);
    }
  }, [navigate]);

  useEffect(() => {
    if (userId) {
      fetchAvailableSurveys();
    }
  }, [userId]);

  const fetchAvailableSurveys = async () => {
    try {
      const response = await axios.get("/survey/all");
      const filteredSurveys = response.data.data.filter(
        (s) => s.status === "Active"
      );
      setSurveys(filteredSurveys);
    } catch (error) {
      toast.error("Failed to fetch surveys! 🚨");
    }
  };

  const handleStartSurvey = (surveyId) => {
    navigate(`/respondent-dashboard/available-surveys/respond/${surveyId}`);
  };

  return (
    <div className="respondent-surveys-container">
      <h2>📋 Available Surveys to Respond</h2>
      <div className="survey-grid">
        {surveys.length === 0 ? (
          <p>No active surveys available at the moment.</p>
        ) : (
          surveys.map((survey) => (
            <div key={survey._id} className="survey-card">
              <h3>{survey.title}</h3>
              <p>{survey.description}</p>
              <button
                className="start-survey-btn"
                onClick={() => handleStartSurvey(survey._id)}
              >
                Start Survey
              </button>
            </div>
          ))
        )}
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default SurveyRespondentAvailableSurveys;
