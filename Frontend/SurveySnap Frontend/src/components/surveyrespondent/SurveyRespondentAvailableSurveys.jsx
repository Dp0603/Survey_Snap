import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SurveyRespondentAvailableSurveys.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataGrid } from "@mui/x-data-grid";

const SurveyRespondentAvailableSurveys = () => {
  const [surveys, setSurveys] = useState([]);
  const [filledSurveys, setFilledSurveys] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem("id"); // ✅ Correct key
    if (!id) {
      toast.error("You must be logged in to view surveys!");
      navigate("/login");
    } else {
      setUserId(id);
    }
  }, [navigate]);

  useEffect(() => {
    if (userId) {
      fetchAvailableSurveys();
      fetchFilledSurveys(userId);
    }
  }, [userId]);

  const fetchAvailableSurveys = async () => {
    try {
      const response = await axios.get("/survey/all");
      const filteredSurveys = response.data.data.filter(
        (s) => s.status === "Active"
      );
      setSurveys(filteredSurveys);
    } catch (error) {
      toast.error("Failed to fetch surveys! 🚨");
    }
  };

  const fetchFilledSurveys = async (id) => {
    try {
      const response = await axios.get(`/responses/stats/${id}`);
      setFilledSurveys([
        {
          id: 1,
          userId: id,
          status: "Completed",
          completed: response.data.completed,
        },
      ]);
    } catch (error) {
      toast.error("Failed to fetch filled survey stats! ❌");
    }
  };

  const handleStartSurvey = (surveyId) => {
    navigate(`/respondent-dashboard/respond/${surveyId}`);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "userId", headerName: "User ID", width: 300 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "completed", headerName: "Surveys Completed", width: 200 },
  ];

  return (
    <div className="respondent-surveys-container">
      <h2>📋 Available Surveys to Respond</h2>
      <div className="survey-grid">
        {surveys.length === 0 ? (
          <p>No active surveys available at the moment.</p>
        ) : (
          surveys.map((survey) => (
            <div key={survey._id} className="survey-card">
              <h3>{survey.title}</h3>
              <p>{survey.description}</p>
              <button
                className="start-survey-btn"
                onClick={() => handleStartSurvey(survey._id)}
              >
                Start Survey
              </button>
            </div>
          ))
        )}
      </div>

      {/* 📊 Filled Surveys Table Below */}
      <div style={{ marginTop: "50px" }}>
        <h2>Your Filled Surveys</h2>
        <div style={{ height: 300, width: "100%" }}>
          <DataGrid
            rows={filledSurveys}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default SurveyRespondentAvailableSurveys;
