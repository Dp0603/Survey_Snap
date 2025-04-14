import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SurveyPreviewPage.css"; // We'll add styles below

const SurveyPreviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const survey = location.state?.survey;

  if (!survey) return null;

  const handleClose = () => navigate(-1); // or navigate to dashboard

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={handleClose}>✖</button>
        <h2 className="preview-title">🔍 Preview: {survey.title}</h2>
        <p className="preview-description">{survey.description}</p>

        <div className="questions-container">
          {survey.questions.map((q, idx) => (
            <div key={idx} className="question-block">
              <label className="question-label">{idx + 1}. {q.label}</label>

              {q.type === "text" && (
                <input type="text" className="form-input" disabled placeholder="Your answer" />
              )}
              {q.type === "long-text" && (
                <textarea className="form-textarea" disabled placeholder="Your answer" />
              )}
              {q.type === "multiple-choice" && (
                <div className="options-group">
                  {q.options.map((opt, i) => (
                    <label key={i} className="option-item">
                      <input type="radio" name={`q-${idx}`} disabled /> {opt}
                    </label>
                  ))}
                </div>
              )}
              {q.type === "dropdown" && (
                <select className="form-select" disabled>
                  {q.options.map((opt, i) => (
                    <option key={i}>{opt}</option>
                  ))}
                </select>
              )}
              {q.type === "rating" && (
                <div className="rating-group">
                  {[1, 2, 3, 4, 5].map(n => (
                    <span key={n} className="rating-star">⭐</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SurveyPreviewPage;
