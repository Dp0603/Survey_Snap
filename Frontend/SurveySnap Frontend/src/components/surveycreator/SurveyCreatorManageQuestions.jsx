import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useToast } from "../../ToastContext"; // Adjust path as needed
import "./SurveyCreatorManageQuestions.css";

const SurveyCreatorManageQuestions = () => {
  const { surveyId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    question_text: "",
    question_type: "Short Text",
    is_required: false,
    image: null,
  });
  const [deleteId, setDeleteId] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    fetchQuestions();
  }, [surveyId]);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get(`/question/survey/${surveyId}`);
      setQuestions(res.data.data);
    } catch (err) {
      console.error("Error fetching questions:", err);
      showToast("Failed to fetch questions", "error");
    }
  };

  const handleAddQuestion = async () => {
    try {
      const formData = new FormData();
      formData.append("survey_id", surveyId);
      formData.append("question_text", newQuestion.question_text);
      formData.append("question_type", newQuestion.question_type);
      formData.append("is_required", newQuestion.is_required);
      if (newQuestion.image) {
        formData.append("image", newQuestion.image);
      }

      const res = await axios.post("/question/add", formData);
      setQuestions([...questions, res.data.data]);
      setNewQuestion({
        question_text: "",
        question_type: "Short Text",
        is_required: false,
        image: null,
      });
      showToast("Question added successfully", "success");
    } catch (err) {
      console.error("Error adding question:", err);
      showToast("Failed to add question", "error");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/question/${deleteId}`);
      setQuestions(questions.filter((q) => q._id !== deleteId));
      showToast("Question deleted", "success");
    } catch (err) {
      console.error("Error deleting question:", err);
      showToast("Failed to delete question", "error");
    } finally {
      setDeleteId(null);
    }
  };

  const columns = [
    { field: "question_text", headerName: "Question", flex: 2 },
    { field: "question_type", headerName: "Type", flex: 1 },
    {
      field: "is_required",
      headerName: "Required",
      flex: 1,
      renderCell: (params) => (params.value ? "Yes" : "No"),
    },
    {
      field: "questionimageURL",
      headerName: "Image",
      flex: 1,
      renderCell: (params) =>
        params.value ? (
          <img src={params.value} alt="q-img" style={{ height: 40 }} />
        ) : (
          "—"
        ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="error"
          onClick={() => setDeleteId(params.row._id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        Manage Questions
      </Typography>

      {/* New Question Form */}
      <Box component="form" noValidate autoComplete="off" mb={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Question"
              fullWidth
              value={newQuestion.question_text}
              onChange={(e) =>
                setNewQuestion({
                  ...newQuestion,
                  question_text: e.target.value,
                })
              }
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={newQuestion.question_type}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    question_type: e.target.value,
                  })
                }
              >
                <MenuItem value="Multiple Choice">Multiple Choice</MenuItem>
                <MenuItem value="Short Text">Short Text</MenuItem>
                <MenuItem value="Long Text">Long Text</MenuItem>
                <MenuItem value="Rating Scale">Rating Scale</MenuItem>
                <MenuItem value="Dropdown">Dropdown</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={newQuestion.is_required}
                  onChange={(e) =>
                    setNewQuestion({
                      ...newQuestion,
                      is_required: e.target.checked,
                    })
                  }
                />
              }
              label="Required"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button variant="outlined" component="label" fullWidth>
              Upload Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, image: e.target.files[0] })
                }
              />
            </Button>
            {newQuestion.image && (
              <Typography variant="caption">
                {newQuestion.image.name}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleAddQuestion}
              disabled={!newQuestion.question_text.trim()}
            >
              Add Question
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Questions DataGrid */}
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={questions}
          getRowId={(row) => row._id}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
        />
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={Boolean(deleteId)} onClose={() => setDeleteId(null)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this question? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SurveyCreatorManageQuestions;
