import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ManageResponses.css";

const ManageResponses = () => {
  const [surveys, setSurveys] = useState([]);
  const [responses, setResponses] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState("");
  const [respondentFilter, setRespondentFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      const res = await axios.get("http://localhost:3000/survey/all");
      setSurveys(res.data.data);
    } catch (err) {
      console.error("Error fetching surveys:", err);
      setError("Failed to load surveys.");
    }
  };

  const fetchResponses = async () => {
    if (!selectedSurvey) return;
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `http://localhost:3000/response/survey/${selectedSurvey}`
      );
      setResponses(res.data.data);
    } catch (err) {
      console.error("Error fetching responses:", err);
      setError("Failed to fetch responses.");
    }
    setLoading(false);
  };

  const exportToCSV = () => {
    const header = ["Survey Title", "Question", "Response", "Respondent ID"];
    const filtered = getFilteredResponses();

    const rows = filtered.map((r) => [
      surveys.find((s) => s._id === r.survey_id)?.title || "N/A",
      r.question_id?.question_text || "N/A",
      r.response,
      r.respondent_id,
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [header, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "survey_responses.csv");
    document.body.appendChild(link);
    link.click();
  };

  const getFilteredResponses = () => {
    return respondentFilter.trim()
      ? responses.filter((r) =>
          r.respondent_id
            ?.toString()
            .toLowerCase()
            .includes(respondentFilter.trim().toLowerCase())
        )
      : responses;
  };

  return (
    <div className="responses-container">
      <h2 className="responses-title">📊 Manage Survey Responses</h2>

      <div className="responses-survey-selector">
        <label htmlFor="surveyDropdown">Select a Survey:</label>
        <div className="responses-dropdown-row">
          <select
            id="surveyDropdown"
            className="responses-dropdown"
            value={selectedSurvey}
            onChange={(e) => setSelectedSurvey(e.target.value)}
          >
            <option value="">-- Choose a Survey --</option>
            {surveys.map((survey) => (
              <option key={survey._id} value={survey._id}>
                {survey.title}
              </option>
            ))}
          </select>
          <button
            className="responses-fetch-btn"
            onClick={fetchResponses}
            disabled={!selectedSurvey}
          >
            Fetch Responses
          </button>
        </div>
      </div>

      {selectedSurvey && responses.length > 0 && (
        <div className="responses-tools-bar">
          <input
            type="text"
            placeholder="Filter by Respondent ID"
            value={respondentFilter}
            onChange={(e) => setRespondentFilter(e.target.value)}
            className="responses-filter-input"
          />
          <button className="responses-csv-btn" onClick={exportToCSV}>
            Export to CSV
          </button>
        </div>
      )}

      {error && <p className="responses-error-message">{error}</p>}

      {loading ? (
        <p className="responses-loading">Loading responses...</p>
      ) : (
        <div className="responses-table-wrapper">
          <table className="responses-table">
            <thead>
              <tr>
                <th>Survey Title</th>
                <th>Question</th>
                <th>Response</th>
                <th>Respondent ID</th>
              </tr>
            </thead>
            <tbody>
              {getFilteredResponses().length > 0 ? (
                getFilteredResponses().map((resp) => (
                  <tr key={resp._id}>
                    <td>
                      {surveys.find((s) => s._id === resp.survey_id)?.title ||
                        "N/A"}
                    </td>
                    <td>{resp.question_id?.question_text || "N/A"}</td>
                    <td>{resp.response}</td>
                    <td>{resp.respondent_id}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="responses-no-data">
                    No responses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageResponses;
