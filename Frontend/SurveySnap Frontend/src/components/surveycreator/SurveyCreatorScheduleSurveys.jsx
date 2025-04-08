import React, { useState } from "react";
import "./SurveyCreatorScheduleSurveys.css";

const SurveyCreatorScheduleSurveys = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSchedule = () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      alert("Start date cannot be after end date.");
      return;
    }

    const schedulePayload = {
      startDate,
      endDate,
    };

    console.log("Survey scheduled with:", schedulePayload);

    // Later, replace with actual backend call
    // await axios.post('/api/survey/schedule', schedulePayload);

    alert("Survey successfully scheduled!");
  };

  return (
    <div className="survey-creator-schedule">
      <h2>Schedule Surveys</h2>

      <div className="schedule-field">
        <label>Set Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <div className="schedule-field">
        <label>Set End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <button className="schedule-btn" onClick={handleSchedule}>
        Schedule
      </button>
    </div>
  );
};

export default SurveyCreatorScheduleSurveys;
