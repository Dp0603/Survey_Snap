import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEye, FaSync } from "react-icons/fa";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useToast } from "../../contexts/ToastContext";
import "./ManageSurveys.css";

const ManageSurveys = () => {
  const [surveys, setSurveys] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteSurveyId, setDeleteSurveyId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      const res = await axios.get("/survey/all");
      setSurveys(res.data.data);
      showToast("Surveys fetched successfully!", "success");
    } catch {
      showToast("Failed to fetch surveys!", "error");
    }
  };

  const handleViewSurvey = (id) => {
    navigate(`/admin-dashboard/surveys/${id}`);
  };

  const confirmDeleteSurvey = (id) => {
    setDeleteSurveyId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`/survey/${deleteSurveyId}`);
      showToast("Survey deleted successfully!", "success");
      fetchSurveys();
    } catch {
      showToast("Error deleting survey!", "error");
    }
    setShowDeleteModal(false);
  };

  const handleDeleteCancel = () => setShowDeleteModal(false);

  const filteredSurveys = useMemo(() => {
    if (!searchQuery.trim()) return surveys;
    return surveys.filter((s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [surveys, searchQuery]);

  const surveysByUser = useMemo(() => {
    const grouped = {};
    filteredSurveys.forEach((survey, index) => {
      const userId = survey.creator_id?._id || "unknown";
      if (!grouped[userId]) {
        grouped[userId] = {
          user: survey.creator_id,
          surveys: [],
        };
      }
      grouped[userId].surveys.push({ ...survey, index: index + 1 });
    });
    return grouped;
  }, [filteredSurveys]);

  const getColumns = () => [
    { field: "index", headerName: "#", width: 70 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "description", headerName: "Description", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <span className={`status-badges ${params.value.toLowerCase()}`}>
          {params.value}
        </span>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div className="survey-action-buttons">
          <button
            className="survey-view-btn"
            onClick={() => handleViewSurvey(params.row._id)}
            title="View"
          >
            <FaEye />
          </button>
          <button
            className="survey-delete-btn"
            onClick={() => confirmDeleteSurvey(params.row._id)}
            title="Delete"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="managesurvey-container">
      <h2>📊 Manage Surveys by User</h2>

      <div className="managesurvey-top-controls">
        <TextField
          label="Search by title"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="managesurvey-search-input"
        />
        <button className="managesurvey-refresh-btn" onClick={fetchSurveys}>
          <FaSync /> Refresh
        </button>
      </div>

      {Object.entries(surveysByUser).map(([userId, { user, surveys }]) => (
        <div key={userId} className="managesurvey-user-section">
          <h3>
            Surveys by:{" "}
            {user ? `${user.firstName} ${user.lastName}` : "Unknown User"}
          </h3>
          <div className="managesurvey-table-wrapper">
            <DataGrid
              rows={surveys}
              columns={getColumns()}
              getRowId={(row) => row._id}
              pageSize={5}
              rowsPerPageOptions={[5, 10]}
              disableRowSelectionOnClick
              autoHeight
            />
          </div>
        </div>
      ))}

      <Dialog
        open={showDeleteModal}
        onClose={handleDeleteCancel}
        aria-labelledby="confirm-delete-title"
      >
        <DialogTitle id="confirm-delete-title">Delete Survey?</DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Are you sure you want to delete this survey? <br />
            This action is <strong>irreversible</strong>.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageSurveys;
