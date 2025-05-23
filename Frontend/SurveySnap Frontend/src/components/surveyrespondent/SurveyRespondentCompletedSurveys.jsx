import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SurveyRespondentCompletedSurveys.css";

const SurveyRespondentCompletedSurveys = () => {
  const [filledSurveys, setFilledSurveys] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (!id) {
      toast.error("You must be logged in to view your filled surveys!");
    } else {
      setUserId(id);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchFilledSurveys(userId);
    }
  }, [userId]);

  const fetchFilledSurveys = async (id) => {
    try {
      const response = await axios.get(`/responses/stats/${id}`);
      setFilledSurveys(response.data); 
    } catch (error) {
      toast.error("Failed to fetch filled survey stats! ❌");
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "userId", headerName: "User ID", width: 250 },
    { field: "surveyTitle", headerName: "Survey Title", width: 250 },
    { field: "status", headerName: "Status", width: 130 },
    { field: "submittedOn", headerName: "Submitted On", width: 200 },
  ];

  return (
    <div className="respondent-completed-surveys-container">
      <h2>Your Filled Surveys</h2>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filledSurveys}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default SurveyRespondentCompletedSurveys;
