import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Make sure it's installed
import "react-toastify/dist/ReactToastify.css";
import "./SurveyCreatorCustomTemplate.css";

const SurveyCreatorCustomTemplate = () => {
  const [surveyTitle, setSurveyTitle] = useState("");
  const [surveyDescription, setSurveyDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [previewMode, setPreviewMode] = useState(false);
  const [ratingValues, setRatingValues] = useState({});
  const navigate = useNavigate();

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: "",
        type: "text",
        options: [""],
      },
    ]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const handleAddOption = (index) => {
    const updated = [...questions];
    updated[index].options.push("");
    setQuestions(updated);
  };

  const handleRemoveQuestion = (index) => {
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
  };

  const handleSaveSurvey = () => {
    const surveyData = {
      title: surveyTitle,
      description: surveyDescription,
      questions,
    };

    console.log("Saved Survey:", surveyData);

    // Show toast
    toast.success("Survey saved successfully!");

    // Navigate after short delay (to let user see toast)
    setTimeout(() => {
      navigate("/survey-creator-dashboard/my-surveys");
    }, 1500);
  };

  const handleStarHover = (qIndex, starIndex) => {
    setRatingValues({ ...ratingValues, [qIndex]: starIndex });
  };

  const handleStarClick = (qIndex, starIndex) => {
    setRatingValues({ ...ratingValues, [qIndex]: starIndex });
  };

  return (
    <div className="custom-survey-wrapper">
      <h2 className="custom-survey-title">🛠️ Create Custom Survey</h2>

      <input
        className="custom-survey-input"
        type="text"
        placeholder="Survey Title"
        value={surveyTitle}
        onChange={(e) => setSurveyTitle(e.target.value)}
      />

      <textarea
        className="custom-survey-textarea"
        placeholder="Survey Description"
        value={surveyDescription}
        onChange={(e) => setSurveyDescription(e.target.value)}
      />

      <button className="custom-add-question-btn" onClick={handleAddQuestion}>
        ➕ Add Question
      </button>

      {questions.map((q, index) => (
        <div className="custom-question-card" key={index}>
          <input
            className="custom-question-input"
            type="text"
            placeholder={`Question ${index + 1}`}
            value={q.questionText}
            onChange={(e) =>
              handleQuestionChange(index, "questionText", e.target.value)
            }
          />

          <select
            className="custom-question-select"
            value={q.type}
            onChange={(e) =>
              handleQuestionChange(index, "type", e.target.value)
            }
          >
            <option value="text">Text</option>
            <option value="textarea">Long Text</option>
            <option value="multipleChoice">Multiple Choice</option>
            <option value="dropdown">Dropdown</option>
            <option value="rating">Rating (1–5 ⭐)</option>
          </select>

          {(q.type === "multipleChoice" || q.type === "dropdown") &&
            q.options.map((option, oIndex) => (
              <input
                className="custom-option-input"
                key={oIndex}
                type="text"
                placeholder={`Option ${oIndex + 1}`}
                value={option}
                onChange={(e) =>
                  handleOptionChange(index, oIndex, e.target.value)
                }
              />
            ))}

          {(q.type === "multipleChoice" || q.type === "dropdown") && (
            <button
              className="custom-add-option-btn"
              onClick={() => handleAddOption(index)}
            >
              ➕ Add Option
            </button>
          )}

          <button
            className="custom-remove-btn"
            onClick={() => handleRemoveQuestion(index)}
          >
            ❌ Remove Question
          </button>
        </div>
      ))}

      <div className="custom-actions">
        <button
          className="custom-preview-btn"
          onClick={() => setPreviewMode(!previewMode)}
        >
          {previewMode ? "❌ Hide Preview" : "🔍 Preview"}
        </button>
        <button className="custom-save-btn" onClick={handleSaveSurvey}>
          💾 Save Survey
        </button>
      </div>

      {previewMode && (
        <div className="custom-preview-section">
          <h3>🔍 Preview:</h3>
          <h4>{surveyTitle}</h4>
          <p>{surveyDescription}</p>

          {questions.map((q, index) => (
            <div className="custom-preview-question" key={index}>
              <strong>
                {index + 1}. {q.questionText}
              </strong>
              <div style={{ marginTop: 8 }}>
                {q.type === "text" && (
                  <input type="text" className="custom-answer-text" />
                )}
                {q.type === "textarea" && (
                  <textarea className="custom-answer-textarea" />
                )}
                {q.type === "multipleChoice" &&
                  q.options.map((opt, idx) => (
                    <div key={idx}>
                      <label>
                        <input type="radio" name={`q${index}`} /> {opt}
                      </label>
                    </div>
                  ))}
                {q.type === "dropdown" && (
                  <select>
                    {q.options.map((opt, idx) => (
                      <option key={idx}>{opt}</option>
                    ))}
                  </select>
                )}
                {q.type === "rating" && (
                  <div className="custom-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`star-icon ${
                          ratingValues[index] >= star ? "active" : ""
                        }`}
                        onMouseEnter={() => handleStarHover(index, star)}
                        onClick={() => handleStarClick(index, star)}
                      >
                        ★
                      </span>
                    ))}
                    <span className="rating-value">
                      {ratingValues[index] ? ` (${ratingValues[index]})` : ""}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default SurveyCreatorCustomTemplate;
