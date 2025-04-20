import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SurveyCreationPage.css";

const SurveyCreationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedTemplate = location.state?.template || null;

  const [surveyData, setSurveyData] = useState({
    title: "",
    description: "",
    questions: [],
  });

  const [responses, setResponses] = useState({});
  const [saving, setSaving] = useState(false);
  const [hoverStars, setHoverStars] = useState({}); // for hover effect
  const mapToBackendType = (type) => {
    switch (type) {
      case "text":
        return "Short Text";
      case "rating":
        return "Rating Scale";
      case "multiple-choice":
        return "Multiple Choice";
      case "dropdown":
        return "Dropdown";
      default:
        return "Short Text";
    }
  };

  useEffect(() => {
    if (selectedTemplate) {
      setSurveyData({
        title: selectedTemplate.title,
        description: selectedTemplate.description,
        questions: selectedTemplate.questions,
      });
    }
  }, [selectedTemplate]);

  const handleResponseChange = (questionIndex, value) => {
    setResponses((prev) => ({
      ...prev,
      [questionIndex]: value,
    }));
  };

  const handleSaveSurvey = async () => {
    setSaving(true);

    try {
      const creatorId = localStorage.getItem("id");
      if (!creatorId) {
        alert("User ID not found in localStorage!");
        return;
      }

      // Step 1: Create survey
      const payload = {
        title: surveyData.title,
        description: surveyData.description,
        creator_id: creatorId,
        status: "Active",
      };

      const response = await axios.post("/survey/add", payload);

      if (response.status === 201) {
        const newSurveyId = response.data.data._id;

        // Step 2: Save questions to backend
        await Promise.all(
          surveyData.questions.map((q) =>
            axios.post("/question/add", {
              survey_id: newSurveyId,
              question_text: q.label,
              question_type: mapToBackendType(q.type),
              is_required: q.required || false,
              options: q.options || [], // handle MCQ or dropdown
            })
          )
        );

        alert("Survey and questions saved successfully!");
        navigate("/survey-creator-dashboard/my-surveys");
      }
    } catch (error) {
      console.error("Error saving survey and questions:", error);
      alert("Failed to save survey.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="survey-creation-container">
      <div className="survey-header">
        <h2 className="survey-title">{surveyData.title || "Create Survey"}</h2>
        <p className="survey-description">{surveyData.description}</p>
      </div>

      <div className="survey-body">
        {surveyData.questions.length > 0 ? (
          surveyData.questions.map((question, index) => (
            <div key={index} className="question-container">
              <label className="question-label">{question.label}</label>

              {question.type === "text" && (
                <input
                  type="text"
                  maxLength={100}
                  className="text-input"
                  value={responses[index] || ""}
                  onChange={(e) => handleResponseChange(index, e.target.value)}
                />
              )}

              {question.type === "rating" && (
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star ${
                        (hoverStars[index] || responses[index]) >= star
                          ? "filled"
                          : ""
                      }`}
                      onClick={() => handleResponseChange(index, star)}
                      onMouseEnter={() =>
                        setHoverStars((prev) => ({ ...prev, [index]: star }))
                      }
                      onMouseLeave={() =>
                        setHoverStars((prev) => ({ ...prev, [index]: 0 }))
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
              )}

              {question.type === "multiple-choice" && (
                <div className="options-group">
                  {question.options.slice(0, 4).map((option, idx) => (
                    <label key={idx} className="option-label">
                      <input
                        type="radio"
                        name={`q${index}`}
                        value={option}
                        checked={responses[index] === option}
                        onChange={() => handleResponseChange(index, option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              )}

              {question.type === "dropdown" && (
                <select
                  className="dropdown-select"
                  onChange={(e) => handleResponseChange(index, e.target.value)}
                  value={responses[index] || ""}
                >
                  <option value="">Select an option</option>
                  {question.options.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))
        ) : (
          <p className="no-questions">No questions found in this template.</p>
        )}
      </div>

      <button
        className="save-survey-btn"
        onClick={handleSaveSurvey}
        disabled={saving}
      >
        {saving ? "Saving..." : "Save Survey"}
      </button>
    </div>
  );
};

export default SurveyCreationPage;
