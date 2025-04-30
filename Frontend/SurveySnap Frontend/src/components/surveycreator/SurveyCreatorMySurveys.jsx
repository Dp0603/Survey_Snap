import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEye, FaSync, FaEdit, FaPlus } from "react-icons/fa";
import {
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useToast } from "../../contexts/ToastContext";
import "./SurveyCreatorMySurveys.css";

const SurveyCreatorMySurveys = () => {
  const [surveys, setSurveys] = useState([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { showToast } = useToast();

  const userId = localStorage.getItem("id");

  useEffect(() => {
    if (userId) fetchUserSurveys();
    else showToast("User ID not found. Please log in again! 🚨", "error");
  }, [userId]);

  const fetchUserSurveys = async () => {
    try {
      const response = await axios.get(`/survey/user/${userId}`);
      setSurveys(response.data.data || []);
      showToast("Surveys fetched successfully! 📦", "success");
    } catch (error) {
      showToast("Failed to fetch your surveys! 🚨", "error");
    }
  };

  const filteredSurveys = useMemo(() => {
    if (!searchQuery.trim()) return surveys;
    return surveys.filter((s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [surveys, searchQuery]);

  const handleDeleteSurvey = (id) => setConfirmDeleteId(id);

  const confirmDelete = async () => {
    try {
      await axios.delete(`/survey/${confirmDeleteId}`);
      showToast("Survey deleted successfully! 🗑️", "success");
      setTimeout(() => fetchUserSurveys(), 1500);
    } catch (error) {
      showToast("Error deleting survey! 🚨", "error");
    } finally {
      setConfirmDeleteId(null);
    }
  };

  const columns = [
    { field: "index", headerName: "#", width: 70 },
    { field: "title", headerName: "Title", flex: 1 },
    { field: "description", headerName: "Description", flex: 2 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <span className={`surveycreator-status ${params.value.toLowerCase()}`}>
          {params.value}
        </span>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 160,
      renderCell: (params) => (
        <div className="surveycreator-action-btns">
          <button
            className="surveycreator-view-btn"
            title="View"
            onClick={() =>
              navigate(`/survey-creator-dashboard/my-surveys/${params.row._id}`)
            }
          >
            <FaEye />
          </button>
          <button
            className="surveycreator-edit-btn"
            title="Edit"
            onClick={() =>
              navigate(`/survey-creator-dashboard/my-surveys/${params.row._id}`)
            }
          >
            <FaEdit />
          </button>
          <button
            className="surveycreator-delete-btn"
            title="Delete"
            onClick={() => handleDeleteSurvey(params.row._id)}
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  const rows = filteredSurveys.map((s, i) => ({
    ...s,
    index: i + 1,
  }));

  return (
    <div className="surveycreator-wrapper">
      <h2>📋 My Surveys</h2>

      <Grid
        container
        spacing={2}
        alignItems="center"
        className="surveycreator-controls"
      >
        <Grid item xs={12} sm={6}>
          <TextField
            label="Search by title"
            variant="outlined"
            size="small"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          container
          justifyContent="flex-end"
          spacing={1}
        >
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              startIcon={<FaPlus />}
              onClick={() => navigate("create-new-survey")}
            >
              Create Survey
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<FaSync />}
              onClick={fetchUserSurveys}
            >
              Refresh
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {rows.length === 0 ? (
        <Typography variant="h6" style={{ marginTop: "2rem" }}>
          😞 No surveys found. Create your first one!
        </Typography>
      ) : (
        <div style={{ height: 460, width: "100%", marginTop: "2rem" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
            getRowId={(row) => row._id}
            disableRowSelectionOnClick
          />
        </div>
      )}

      <Dialog
        open={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        aria-labelledby="confirm-delete-title"
      >
        <DialogTitle id="confirm-delete-title">Delete Survey?</DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Are you sure you want to delete this survey? <br/>
            This action is<strong> irreversible</strong>.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteId(null)} variant="outlined">
            Cancel
          </Button>
          <Button onClick={confirmDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SurveyCreatorMySurveys;
