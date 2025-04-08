import React, { useState, useEffect } from "react";

const SurveyRespondentResponseHistory = () => {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    // Fetch response history from backend API (replace with actual API endpoint)
    fetch("/api/response-history")
      .then((response) => response.json())
      .then((data) => setResponses(data))
      .catch((error) => console.error("Error fetching responses:", error));
  }, []);

  return (
    <div className="survey-container">
      <h2>Response History</h2>
      <ul className="response-list">
        {responses.map((response) => (
          <li key={response.id} className="response-item">
            <h3>{response.surveyTitle}</h3>
            <p>Submitted on: {new Date(response.submissionDate).toLocaleDateString()}</p>
            <button className="view-btn">View Responses</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SurveyRespondentResponseHistory;
