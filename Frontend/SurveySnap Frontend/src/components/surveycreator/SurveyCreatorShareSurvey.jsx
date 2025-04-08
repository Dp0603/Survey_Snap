import React from "react";
import "./SurveyCreatorShareSurvey.css";

const SurveyCreatorShareSurvey = () => {
  return (
    <div className="survey-creator-share">
      <h2>Share Your Survey</h2>
      <button className="copy-link-btn">Copy Survey Link</button>
      <button className="generate-qr-btn">Generate QR Code</button>
    </div>
  );
};

export default SurveyCreatorShareSurvey;
