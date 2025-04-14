import React from "react";
import { useNavigate } from "react-router-dom";
import "./SurveyCreatorTemplateSelection.css";

const SurveyCreatorTemplateSelection = () => {
  const navigate = useNavigate();

  const handleSelectTemplate = (type) => {
    if (type === "prebuilt") {
      navigate("prebuilt-templates");
    } else if (type === "custom") {
      navigate("custom-templates");
    }
  };

  return (
    <div className="template-selection-container">
      <h2>🛠️ Choose Survey Creation Method</h2>
      <div className="template-options">
        <div className="template-card" onClick={() => handleSelectTemplate("prebuilt")}>
          <h3>📋 Pre-built Templates</h3>
          <p>Choose from ready-made survey templates to save time.</p>
        </div>

        <div className="template-card" onClick={() => handleSelectTemplate("custom")}>
          <h3>🧩 Custom Template</h3>
          <p>Create a survey from scratch with full customization.</p>
        </div>
      </div>
    </div>
  );
};

export default SurveyCreatorTemplateSelection;
