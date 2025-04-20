import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { useToast } from "../../contexts/ToastContext"; // ✅ Custom toast system
import "./ManageResponses.css";

const ManageResponses = () => {
  const [surveys, setSurveys] = useState([]);
  const [responses, setResponses] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState("");
  const [respondentFilter, setRespondentFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const { showToast } = useToast();

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      const res = await axios.get("http://localhost:3000/survey/all");
      setSurveys(res.data.data);
    } catch (err) {
      console.error("Error fetching surveys:", err);
      showToast("Failed to load surveys", "error");
    }
  };

  const fetchResponses = async () => {
    if (!selectedSurvey) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:3000/responses/survey/${selectedSurvey}`
      );
      setResponses(res.data.data);
      showToast("Responses loaded successfully!", "success");
    } catch (err) {
      console.error("Error fetching responses:", err);
      showToast("Failed to fetch responses", "error");
    }
    setLoading(false);
  };

  const handleDelete = async (row) => {
    try {
      await axios.delete(`http://localhost:3000/responses/${row._id}`);
      showToast("Response deleted successfully!", "success");
      fetchResponses(); // Refresh the list
    } catch (err) {
      console.error("Delete error:", err);
      showToast("Failed to delete response", "error");
    }
  };

  const exportToCSV = () => {
    const header = ["Survey Title", "Question", "Response", "Respondent ID"];
    const rows = getFilteredResponses().map((r) => [
      surveys.find((s) => s._id === r.survey_id)?.title || "Survey not found",
      r.question_id?.question_text || "No question available",
      r.response || "",
      r.respondent_id || "",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [header, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "survey_responses.csv");
    document.body.appendChild(link);
    link.click();
  };

  const getFilteredResponses = () => {
    return respondentFilter.trim()
      ? responses.filter((r) =>
          r.respondent_id
            ?.toString()
            .toLowerCase()
            .includes(respondentFilter.trim().toLowerCase())
        )
      : responses;
  };

  const columns = [
    { field: "surveyTitle", headerName: "Survey Title", flex: 1 },
    { field: "questionText", headerName: "Question", flex: 1 },
    { field: "response", headerName: "Response", flex: 1 },
    { field: "respondent_id", headerName: "Respondent ID", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          color="error"
          size="small"
          onClick={() => handleDelete(params.row)}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  const rows = getFilteredResponses().map((r, index) => ({
    id: index,
    _id: r._id, // needed for delete logic
    surveyTitle:
      surveys.find((s) => s._id === r.survey_id)?.title || "Survey not found",
    questionText: r.question_id?.question_text || "No question available",
    response: r.response || "No response",
    respondent_id: r.respondent_id || "Unknown",
  }));

  return (
    <Box className="manage-responses-container">
       <Box
        className="survey-controls"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Select
          value={selectedSurvey}
          onChange={(e) => setSelectedSurvey(e.target.value)}
          displayEmpty
          size="small"
          className="survey-select"
        >
          <MenuItem value="">-- Choose a Survey --</MenuItem>
          {surveys.map((s) => (
            <MenuItem key={s._id} value={s._id}>
              {s.title}
            </MenuItem>
          ))}
        </Select>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button
            variant="contained"
            onClick={fetchResponses}
            disabled={!selectedSurvey}
          >
            Fetch Responses
          </Button>
          <Button
            variant="outlined"
            color="success"
            onClick={exportToCSV}
            disabled={!selectedSurvey}
          >
            Export to CSV
          </Button>
        </Box>
      </Box>
      {loading ? (
        <Box className="loading-spinner">
          <CircularProgress />
        </Box>
      ) : (
        <Box className="table-container">
          {rows.length > 0 ? (
            <Paper>
              <DataGrid
                rows={rows}
                columns={columns}
                autoHeight
                pageSizeOptions={[5, 10, 25]}
                initialState={{
                  pagination: {
                    paginationModel: { pageSize: 5, page: 0 },
                  },
                }}
                disableRowSelectionOnClick
              />
            </Paper>
          ) : (
            <Typography className="no-responses-text">
              No responses found for this survey.
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ManageResponses;
