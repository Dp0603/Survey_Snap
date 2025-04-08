import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ViewSurvey.css"; // Import the separate CSS file

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  Button,
  Box,
  CircularProgress,
  Alert,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ViewSurvey = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [survey, setSurvey] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null);
  const [editedText, setEditedText] = useState("");

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);

  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        const surveyResponse = await axios.get(
          `http://localhost:3000/survey/${id}`
        );
        setSurvey(surveyResponse.data.data);

        const questionsResponse = await axios.get(
          `http://localhost:3000/question/survey/${id}`
        );
        setQuestions(questionsResponse.data.data);
      } catch (err) {
        setError("Failed to load survey data. Please try again.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSurveyData();
  }, [id]);

  const handleEdit = (question) => {
    setEditing(question._id);
    setEditedText(question.question_text);
  };

  const handleSave = async (questionId) => {
    try {
      await axios.put(`http://localhost:3000/question/${questionId}`, {
        question_text: editedText,
      });

      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q._id === questionId ? { ...q, question_text: editedText } : q
        )
      );
      setEditing(null);
    } catch (error) {
      console.error("Error updating question", error);
    }
  };

  const handleDeleteClick = (questionId) => {
    setQuestionToDelete(questionId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!questionToDelete) return;

    try {
      await axios.delete(`http://localhost:3000/question/${questionToDelete}`);
      setQuestions((prevQuestions) =>
        prevQuestions.filter((q) => q._id !== questionToDelete)
      );
    } catch (error) {
      console.error("Error deleting question", error);
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

  return (
    <Box className="viewSurvey-container">
      <Button
        variant="contained"
        onClick={() => navigate("/admin-dashboard/surveys")}
        className="viewSurvey-backButton"
      >
        ⬅ Back to Manage Surveys
      </Button>

      <TableContainer component={Paper} className="viewSurvey-tableContainer">
        <Typography variant="h6" className="viewSurvey-tableTitle">
          Survey Questions
        </Typography>
        <Table>
          <TableHead>
            <TableRow className="viewSurvey-headerRow">
              <TableCell className="viewSurvey-headerCell">#</TableCell>
              <TableCell className="viewSurvey-headerCell">Question</TableCell>
              <TableCell className="viewSurvey-headerCell">Type</TableCell>
              <TableCell className="viewSurvey-headerCell">Required</TableCell>
              <TableCell className="viewSurvey-headerCell">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((question, index) => (
              <TableRow key={question._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="viewSurvey-questionCell">
                  {editing === question._id ? (
                    <TextField
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      variant="outlined"
                      size="small"
                      fullWidth
                      className="viewSurvey-textField"
                    />
                  ) : (
                    <Box className="viewSurvey-questionText">
                      {question.question_text}
                    </Box>
                  )}
                </TableCell>

                <TableCell>
                  <Chip
                    label={question.question_type}
                    color="primary"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={question.is_required ? "Yes" : "No"}
                    sx={{
                      backgroundColor: question.is_required
                        ? "#2E7D32"
                        : "#B71C1C", // Green for Yes, Dark Red for No
                      color: "white",
                      fontWeight: "bold",
                    }}
                  />
                </TableCell>
                <TableCell>
                  {editing === question._id ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleSave(question._id)}
                      className="viewSurvey-saveButton"
                    >
                      <SaveIcon />
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="info"
                      onClick={() => handleEdit(question)}
                      className="viewSurvey-editButton"
                    >
                      <EditIcon />
                    </Button>
                  )}
                  {survey?.status?.toLowerCase() === "draft" && (
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteClick(question._id)}
                      className="viewSurvey-deleteButton"
                    >
                      <DeleteIcon />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
