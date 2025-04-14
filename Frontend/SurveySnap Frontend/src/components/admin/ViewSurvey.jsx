import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Alert,
  Typography,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { useToast } from "../../ToastContext";
import "./ViewSurvey.css";

const ViewSurvey = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [survey, setSurvey] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [surveyRes, questionsRes] = await Promise.all([
          axios.get(`/survey/${id}`),
          axios.get(`/question/survey/${id}`),
        ]);
        setSurvey(surveyRes.data.data);
        setQuestions(questionsRes.data.data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load survey. Try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleEdit = (question) => {
    setEditingId(question._id);
    setEditedText(question.question_text);
  };

  const handleSave = async (questionId) => {
    try {
      await axios.put(`/question/${questionId}`, {
        question_text: editedText,
      });
      setQuestions((prev) =>
        prev.map((q) =>
          q._id === questionId ? { ...q, question_text: editedText } : q
        )
      );
      showToast("Question updated!", "success");
      setEditingId(null);
    } catch (err) {
      showToast("Failed to update question.", "error");
    }
  };

  const handleDeleteClick = (id) => {
    setQuestionToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`/question/${questionToDelete}`);
      setQuestions((prev) => prev.filter((q) => q._id !== questionToDelete));
      showToast("Question deleted!", "success");
    } catch (err) {
      showToast("Failed to delete question.", "error");
    } finally {
      setDeleteDialogOpen(false);
      setQuestionToDelete(null);
    }
  };

  if (loading)
    return (
      <Box className="viewSurvey-loading-container">
        <CircularProgress />
      </Box>
    );

  if (error) return <Alert severity="error">{error}</Alert>;

  const columns = [
    { field: "id", headerName: "#", width: 60 },
    {
      field: "question_text",
      headerName: "Question",
      flex: 1.5,
      renderCell: (params) =>
        editingId === params.row._id ? (
          <TextField
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            size="small"
            fullWidth
          />
        ) : (
          <span>{params.row.question_text}</span>
        ),
    },
    {
      field: "question_type",
      headerName: "Type",
      flex: 1,
      renderCell: (params) => (
        <Chip label={params.value} color="primary" variant="outlined" />
      ),
    },
    {
      field: "is_required",
      headerName: "Image Required",
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value ? "Yes" : "No"}
          sx={{
            backgroundColor: params.value ? "#2E7D32" : "#B71C1C",
            color: "#fff",
            fontWeight: "bold",
          }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 160,
      renderCell: (params) => (
        <>
          {editingId === params.row._id ? (
            <IconButton
              color="primary"
              onClick={() => handleSave(params.row._id)}
            >
              <SaveIcon />
            </IconButton>
          ) : (
            <IconButton color="info" onClick={() => handleEdit(params.row)}>
              <EditIcon />
            </IconButton>
          )}
          {/* DELETE ICON — Always show karenge, no matter what */}
          <IconButton
            color="error"
            onClick={() => handleDeleteClick(params.row._id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const rows = questions.map((q, index) => ({
    id: index + 1,
    ...q,
  }));

  return (
    <Box className="viewSurvey-container">
      <Button
        variant="contained"
        onClick={() => navigate("/admin-dashboard/surveys")}
        sx={{ mb: 2 }}
      >
        ⬅ Back to Manage Surveys
      </Button>

      <Typography variant="h6" align="center" mb={1}>
        📋 {survey?.title || "Survey"} - Questions
      </Typography>

      <Box sx={{ height: 500 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#1976d2",
              color: "#000",
            },
          }}
        />
      </Box>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this question?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ViewSurvey;
