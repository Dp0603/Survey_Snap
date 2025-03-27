import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ManageResponses.css";

const ManageResponses = () => {
  const [responses, setResponses] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState("");
  const [loading, setLoading] = useState(false);
  const [surveys, setSurveys] = useState([]); // Fetch available surveys

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      const res = await axios.get("http://localhost:3000/survey/all");
      setSurveys(res.data.data);
    } catch (error) {
      console.error("Error fetching surveys:", error);
    }
  };

  const fetchResponses = async () => {
    if (!selectedSurvey) {
      console.error("Survey ID is missing!");
      return;
    }
    setLoading(true);
    console.log("Fetching responses for Survey ID:", selectedSurvey); // Debugging Line
    try {
      const res = await axios.get(
        `http://localhost:3000/response/survey/${selectedSurvey}`
      );
      console.log("Response Data:", res.data.data); // Debugging Line
      setResponses(res.data.data);
    } catch (error) {
      console.error("Error fetching responses:", error);
    }
    setLoading(false);
  };

  return (
    <div className="response-management">
      <h2>Manage Responses</h2>

      {/* Survey Selection Dropdown */}
      <div className="survey-dropdown-container">
        <label>Select Survey:</label>
        <select
          value={selectedSurvey}
          onChange={(e) => {
            setSelectedSurvey(e.target.value);
            console.log("Selected Survey ID:", e.target.value); // Debugging Line
          }}
        >
          <option value="">-- Select --</option>
          {surveys.map((survey) => (
            <option key={survey._id} value={survey._id}>
              {survey.title}
            </option>
          ))}
        </select>
        <button onClick={fetchResponses} disabled={!selectedSurvey}>
          Fetch Responses
        </button>
      </div>

      {/* Responses Table */}
      {loading ? (
        <p>Loading responses...</p>
      ) : (
        <table className="responses-table">
          <thead>
            <tr>
              <th>Survey ID</th>
              <th>Question</th>
              <th>Response</th>
              <th>Respondent</th>
            </tr>
          </thead>
          <tbody>
            {responses.length > 0 ? (
              responses.map((response) => (
                <tr key={response._id}>
                  <td>{response.survey_id}</td>
                  <td>{response.question_id?.question_text || "N/A"}</td>
                  <td>{response.response}</td>
                  <td>{response.respondent_id}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No responses found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageResponses;
