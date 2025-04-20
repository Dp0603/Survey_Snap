import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SurveyRespondentViewResponse.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SurveyRespondentViewResponse = () => {
  const { responseId } = useParams();
  const navigate = useNavigate();

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const res = await axios.get(`/responses/view/${responseId}`);
        setResponse(res.data);
        console.log("Fetched Response:", res.data);
      } catch (err) {
        toast.error("Failed to load response ❌");
        console.error("Error fetching response:", err);
      } finally {
        setLoading(false);
      }
    };

    if (responseId) {
      fetchResponse();
    }
  }, [responseId]);

  const handleBack = () => {
    navigate("/respondent-dashboard/response-history");
  };

  const getQuestionText = (questionIdObj) => {
    if (!questionIdObj || typeof questionIdObj !== "object")
      return "Question not found";
    return (
      questionIdObj.question_text || questionIdObj.text || "Question not found"
    );
  };

  if (loading) {
    return (
      <div className="response-view-container">
        <p>Loading response...</p>
        <ToastContainer position="top-center" />
      </div>
    );
  }

  if (!response || !response.answers || response.answers.length === 0) {
    return (
      <div className="response-view-container">
        <p>No answers found for this response.</p>
        <ToastContainer position="top-center" />
      </div>
    );
  }

  return (
    <div className="response-view-container">
      <h2>📄 Survey: {response.surveyId?.title || "Unknown Survey"}</h2>
      <p className="submitted-on">
        Submitted on: {new Date(response.createdAt).toLocaleString()}
      </p>

      <div className="question-answer-list">
        {response.answers.map((ans, index) => (
          <div key={index} className="qa-item">
            <h4>
              Q{index + 1}: {getQuestionText(ans.questionId)}
            </h4>
            <p className="answer">
              <strong>Answer:</strong> {String(ans.answer)}
            </p>
          </div>
        ))}
      </div>

      <button className="back-btn" onClick={handleBack}>
        ← Back to History
      </button>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default SurveyRespondentViewResponse;
