import React, { useState, useEffect } from "react";

const SurveyRespondentAvailableSurveys = () => {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    // Fetch available surveys from backend API (replace with actual API endpoint)
    fetch("/api/available-surveys")
      .then((response) => response.json())
      .then((data) => setSurveys(data))
      .catch((error) => console.error("Error fetching surveys:", error));
  }, []);

  return (
    <div className="survey-container">
      <h2>Available Surveys</h2>
      <ul className="survey-list">
        {surveys.map((survey) => (
          <li key={survey.id} className="survey-item">
            <h3>{survey.title}</h3>
            <p>{survey.description}</p>
            <p>Status: {survey.status}</p>
            <button className="start-btn">
              {survey.status === "Not Started" ? "Start Survey" : "Continue Survey"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SurveyRespondentAvailableSurveys;
