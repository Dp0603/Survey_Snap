import React, { useState } from "react";
import "./SurveyCreatorSettings.css";

const SurveyCreatorSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [responseLimit, setResponseLimit] = useState("");
  const [isSurveyPublic, setIsSurveyPublic] = useState(true);

  const handleSaveSettings = () => {
    const settingsPayload = {
      emailNotifications,
      responseLimit,
      isSurveyPublic,
    };

    console.log("Settings Saved:", settingsPayload);

    alert("Survey settings saved successfully!");
  };

  return (
    <div className="survey-creator-settings">
      <h2>Survey Settings</h2>

      <div className="setting-item">
        <label>
          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={(e) => setEmailNotifications(e.target.checked)}
          />
          Enable Email Notifications
        </label>
      </div>

      <div className="setting-item">
        <label>
          Limit Responses:{" "}
          <input
            type="number"
            placeholder="e.g. 100"
            value={responseLimit}
            onChange={(e) => setResponseLimit(e.target.value)}
          />
        </label>
      </div>

      <div className="setting-item">
        <label>
          Survey Visibility:{" "}
          <select
            value={isSurveyPublic ? "public" : "private"}
            onChange={(e) => setIsSurveyPublic(e.target.value === "public")}
          >
            <option value="public">Public</option>
            <option value="private">Private (invite only)</option>
          </select>
        </label>
      </div>

      <button className="save-settings-btn" onClick={handleSaveSettings}>
        Save Settings
      </button>
    </div>
  );
};

export default SurveyCreatorSettings;
