import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SurveyCreatorManageQuestionsList.css";

const SurveyCreatorManageQuestionsList = () => {
  const [surveys, setSurveys] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get(`/survey/user/${userId}`);
        setSurveys(response.data.data);
      } catch (error) {
        console.error("Failed to fetch surveys:", error);
      }
    };

    if (userId) fetchSurveys();
  }, [userId]);

  const handleManageQuestions = (surveyId) => {
    navigate(`/survey-creator-dashboard/manage-questions/${surveyId}`);
  };

  return (
    <div className="survey-list-container">
      <h2>📝 Manage Your Surveys</h2>
      {surveys.length === 0 ? (
        <p>No surveys found.</p>
      ) : (
        <ul className="survey-list">
          {surveys.map((survey) => (
            <li key={survey._id} className="survey-list-item">
              <div>
                <strong>{survey.title}</strong>
                <p>{survey.description}</p>
              </div>
              <button onClick={() => handleManageQuestions(survey._id)}>
                Manage Questions
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SurveyCreatorManageQuestionsList;
