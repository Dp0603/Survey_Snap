import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  IconButton,
  Modal,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import axios from "axios";
import { useToast } from "../../contexts/ToastContext"; // ✅ Custom toast system
import "./ManageQuestions.css";

const ManageQuestions = ({ survey, closeModal }) => {
  const { showToast } = useToast();
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({
    question_text: "",
    question_type: "Short Text",
    is_required: false,
    survey_id: survey._id,
  });

  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const isEdit = Boolean(selectedQuestion);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get(`/question/survey/${survey._id}`);
      setQuestions(res.data.data);
    } catch (err) {
      showToast("Failed to fetch questions!", "error");
    }
  };

  const handleOpenModal = (question = null) => {
    if (question) {
      setSelectedQuestion(question);
      setFormData({
        question_text: question.question_text,
        question_type: question.question_type,
        is_required: question.is_required,
        survey_id: survey._id,
      });
    } else {
      setFormData({
        question_text: "",
        question_type: "Short Text",
        is_required: false,
        survey_id: survey._id,
      });
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedQuestion(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`/question/${selectedQuestion._id}`, formData);
        showToast("Question updated successfully!", "success");
      } else {
        await axios.post("/question/add", formData);
        showToast("Question added successfully!", "success");
      }
      handleCloseModal();
      fetchQuestions();
    } catch (err) {
      showToast("Error saving question!", "error");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        await axios.delete(`/question/${id}`);
        showToast("Question deleted!", "success");
        fetchQuestions();
      } catch (err) {
        showToast("Failed to delete question!", "error");
      }
    }
  };

  const columns = [
    { field: "id", headerName: "#", width: 70 },
    { field: "question_text", headerName: "Question", flex: 1 },
    { field: "question_type", headerName: "Type", flex: 1 },
    {
      field: "is_required",
      headerName: "Required",
      width: 120,
      renderCell: (params) => (params.value ? "✅" : "❌"),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <>
          <IconButton
            color="warning"
            onClick={() => handleOpenModal(params.row.original)}
          >
            <Edit />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDelete(params.row.original._id)}
          >
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];

  const rows = questions.map((q, index) => ({
    id: index + 1,
    ...q,
    original: q,
  }));

  return (
    <div className="questions-container">
      <div className="questions-header">
        <Typography variant="h6">📌 {survey.title} - Questions</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => handleOpenModal()}
        >
          Add Question
        </Button>
        <button className="questions-close-btn" onClick={closeModal}>
          ✖
        </button>
      </div>

      <div style={{ height: 400, width: "100%", marginTop: "1rem" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#1976d2",
              color: "#fff",
            },
          }}
        />
      </div>

      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box className="modal-box">
          <Typography variant="h6" gutterBottom>
            {isEdit ? "Edit Question" : "Add Question"}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Question Text"
              name="question_text"
              fullWidth
              margin="normal"
              value={formData.question_text}
              onChange={handleChange}
              required
            />
            <Select
              fullWidth
              name="question_type"
              value={formData.question_type}
              onChange={handleChange}
              margin="normal"
            >
              <MenuItem value="Short Text">Short Text</MenuItem>
              <MenuItem value="Long Text">Long Text</MenuItem>
              <MenuItem value="Multiple Choice">Multiple Choice</MenuItem>
              <MenuItem value="Dropdown">Dropdown</MenuItem>
              <MenuItem value="Rating Scale">Rating Scale</MenuItem>
            </Select>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.is_required}
                  onChange={handleChange}
                  name="is_required"
                />
              }
              label="Required"
            />
            <Box mt={2} display="flex" justifyContent="space-between">
              <Button type="submit" variant="contained" color="success">
                {isEdit ? "Update" : "Add"}
              </Button>
              <Button
                onClick={handleCloseModal}
                variant="contained"
                color="error"
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ManageQuestions;
