import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./RespondToSurveyPage.css";

const RespondToSurveyPage = () => {
  const { surveyId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const uid = localStorage.getItem("id");
    if (uid) setUserId(uid);

    const fetchQuestions = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/question/survey/${surveyId}`
        );
        setQuestions(res.data.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
        toast.error("Failed to load survey questions");
      }
    };

    fetchQuestions();
  }, [surveyId]);

  const handleChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedAnswers = Object.entries(answers).map(
      ([questionId, answer]) => ({
        questionId,
        answer,
      })
    );

    const payload = {
      userId,
      surveyId,
      answers: formattedAnswers,
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/responses/submit",
        payload
      );
      toast.success("Survey submitted successfully!");
      setAnswers({});

      setTimeout(() => {
        navigate("/respondent-dashboard/available-surveys");
      }, 1000);
    } catch (err) {
      console.error("Error submitting survey:", err);
      toast.error("Failed to submit survey");
    }
  };

  return (
    <div className="respond-page">
      <h2>📝 Respond to Survey</h2>
      <form onSubmit={handleSubmit} className="respond-form">
        {questions.map((q) => (
          <div className="question-block" key={q._id}>
            <label className="question-label">{q.question_text}</label>

            {q.questionimageURL && (
              <img
                src={q.questionimageURL}
                alt="Question"
                className="question-image"
              />
            )}

            {q.question_type === "Short Text" && (
              <input
                type="text"
                value={answers[q._id] || ""}
                onChange={(e) => handleChange(q._id, e.target.value)}
                required={q.is_required}
              />
            )}

            {q.question_type === "Long Text" && (
              <textarea
                value={answers[q._id] || ""}
                onChange={(e) => handleChange(q._id, e.target.value)}
                required={q.is_required}
              />
            )}

            {q.question_type === "Multiple Choice" && (
              <div className="option-group">
                {q.options.map((opt, idx) => (
                  <label key={idx}>
                    <input
                      type="radio"
                      name={`mcq-${q._id}`}
                      value={opt}
                      checked={answers[q._id] === opt}
                      onChange={(e) => handleChange(q._id, e.target.value)}
                      required={q.is_required}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            )}

            {q.question_type === "Dropdown" && (
              <select
                value={answers[q._id] || ""}
                onChange={(e) => handleChange(q._id, e.target.value)}
                required={q.is_required}
              >
                <option value="">Select an option</option>
                {q.options.map((opt, idx) => (
                  <option key={idx} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}

            {q.question_type === "Rating Scale" && (
              <input
                type="number"
                min="1"
                max="5"
                value={answers[q._id] || ""}
                onChange={(e) => handleChange(q._id, e.target.value)}
                required={q.is_required}
              />
            )}
          </div>
        ))}

        <button type="submit" className="submit-btn">
          Submit Survey
        </button>
      </form>
    </div>
  );
};

export default RespondToSurveyPage;
