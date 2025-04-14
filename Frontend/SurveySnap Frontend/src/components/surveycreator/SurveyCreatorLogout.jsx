import React from "react";
import "./SurveyCreatorLogout.css";

const SurveyCreatorLogout = ({ onLogout, onCancel }) => {
  return (
    <div className="survey-creator-logout-popup">
      <div className="logout-content">
        <h3>Confirm Logout</h3>
        <p>Are you sure you want to log out?</p>
        <button className="confirm-btn" onClick={onLogout}>Yes, Logout</button>
        <button className="cancel-btn" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default SurveyCreatorLogout;
