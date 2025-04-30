import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "../../contexts/ToastContext";
import "./SurveyCreationPage.css";

const SurveyCreationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const selectedTemplate = location.state?.template || null;

  const [surveyData, setSurveyData] = useState({
    title: "",
    description: "",
    questions: [],
  });

  const [responses, setResponses] = useState({});
  const [saving, setSaving] = useState(false);
  const [hoverStars, setHoverStars] = useState({});
  const [dragging, setDragging] = useState(null);

  const dragRef = useRef(null); // Define the dragRef

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
        showToast("User ID not found. Please login again.", "error");
        return;
      }

      const cleanedQuestions = surveyData.questions.map((q) => {
        const cleanedOptions =
          q.options?.filter(
            (opt) =>
              opt.trim() !== "" &&
              !/^option\s*\d*$/i.test(opt.trim()) &&
              !opt.toLowerCase().includes("dropdown")
          ) || [];

        return {
          ...q,
          options: ["Dropdown", "Multiple Choice"].includes(
            mapToBackendType(q.type)
          )
            ? cleanedOptions
            : [],
        };
      });

      const hasValidOptions = cleanedQuestions.every((q) =>
        ["Dropdown", "Multiple Choice"].includes(mapToBackendType(q.type))
          ? q.options.length > 0
          : true
      );

      if (!hasValidOptions) {
        showToast(
          "Some dropdown/multiple choice questions have empty or invalid options.",
          "error"
        );
        setSaving(false);
        return;
      }

      const hasRequiredQuestionsAnswered = cleanedQuestions.every(
        (q, index) => {
          return (
            !q.required || responses[index] // Ensure there's a response for required questions
          );
        }
      );

      if (!hasRequiredQuestionsAnswered) {
        showToast("Please answer all required questions.", "error");
        setSaving(false);
        return;
      }

      const payload = {
        title: surveyData.title,
        description: surveyData.description,
        creator_id: creatorId,
        status: "Active",
      };

      const response = await axios.post("/survey/add", payload);

      if (response.status === 201) {
        const newSurveyId = response.data.data._id;

        await Promise.all(
          cleanedQuestions.map((q) =>
            axios.post("/question/add", {
              survey_id: newSurveyId,
              question_text: q.label,
              question_type: mapToBackendType(q.type),
              is_required: q.required || false,
              options: q.options,
            })
          )
        );

        showToast("Survey and questions saved successfully!", "success");
        navigate("/survey-creator-dashboard/my-surveys");
      }
    } catch (error) {
      console.error("Error saving survey:", error);
      showToast("Failed to save survey. Try again.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDragStart = (event, questionIndex) => {
    setDragging(questionIndex);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, targetIndex) => {
    event.preventDefault();
    if (dragging !== targetIndex) {
      const updatedQuestions = [...surveyData.questions];
      const draggedQuestion = updatedQuestions[dragging];
      updatedQuestions.splice(dragging, 1);
      updatedQuestions.splice(targetIndex, 0, draggedQuestion);
      setSurveyData({ ...surveyData, questions: updatedQuestions });
    }
    setDragging(null);
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
            <div
              key={index}
              className="question-container"
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
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
                  {question.options.map((option, idx) => (
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
