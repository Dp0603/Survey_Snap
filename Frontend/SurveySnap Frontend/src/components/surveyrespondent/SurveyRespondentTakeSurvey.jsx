import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SurveyRespondentTakeSurvey.css"; 
import { useParams, useNavigate } from "react-router-dom";

const SurveyRespondentTakeSurvey = ({ userId }) => {
  const { surveyId } = useParams();
  const navigate = useNavigate();

  const [survey, setSurvey] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchSurvey();
  }, []);

  const fetchSurvey = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/surveys/${surveyId}`);
      setSurvey(res.data);
      setAnswers(Array(res.data.questions.length).fill(""));
    } catch (error) {
      console.error("Error loading survey:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    if (answers.includes("")) {
      alert("Please answer all questions.");
      return;
    }

    setSubmitting(true);
    try {
      await axios.post("http://localhost:3000/responses", {
        userId,
        surveyId,
        status: "completed",
        answers,
      });

      alert("Response submitted successfully!");
      navigate("/respondent-dashboard");
    } catch (err) {
      console.error("Submit error:", err);
      alert("Failed to submit survey. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading survey...</p>;
  if (!survey) return <p>Survey not found.</p>;

  return (
    <div className="take-survey-container">
      <h2>{survey.title}</h2>
      <p className="desc">{survey.description}</p>

      {survey.questions.map((q, index) => (
        <div key={index} className="question-block">
          <label>{q.label}</label>
          {q.type === "text" && (
            <input
              type="text"
              value={answers[index]}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          )}

          {q.type === "mcq" && (
            <div className="options-group">
              {q.options.map((opt, i) => (
                <label key={i}>
                  <input
                    type="radio"
                    name={`q-${index}`}
                    value={opt}
                    checked={answers[index] === opt}
                    onChange={() => handleChange(index, opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          )}

          {q.type === "dropdown" && (
            <select
              value={answers[index]}
              onChange={(e) => handleChange(index, e.target.value)}
            >
              <option value="">Select</option>
              {q.options.map((opt, i) => (
                <option key={i} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          )}
        </div>
      ))}

      <button className="submit-btn" onClick={handleSubmit} disabled={submitting}>
        {submitting ? "Submitting..." : "Submit Response"}
      </button>
    </div>
  );
};

export default SurveyRespondentTakeSurvey;
