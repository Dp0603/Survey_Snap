import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Alert,
  Typography,
  TextField,
  Select,
  MenuItem,
  Switch,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "../../contexts/ToastContext";

const SurveyCreatorViewSurvey = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [survey, setSurvey] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState({
    question_text: "",
    question_type: "",
    is_required: false,
  });

  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        const surveyRes = await axios.get(`/survey/${id}`);
        const questionRes = await axios.get(`/question/survey/${id}`);

        setSurvey(surveyRes.data.data);
        setQuestions(questionRes.data.data);
      } catch (err) {
        showToast("Failed to load survey data. 😓", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchSurveyData();
  }, [id]);

  const handleEditClick = (q) => {
    setEditingId(q._id);
    setEditedQuestion({
      question_text: q.question_text,
      question_type: q.question_type,
      is_required: q.is_required,
    });
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`/question/${id}`, editedQuestion);
      const updated = questions.map((q) =>
        q._id === id ? { ...q, ...editedQuestion } : q
      );
      setQuestions(updated);
      showToast("Question updated successfully! ✅", "success");
      setEditingId(null);
    } catch (err) {
      showToast("Failed to update question. ❌", "error");
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Button
        variant="outlined"
        onClick={() => navigate("/survey-creator-dashboard/my-surveys")}
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 2 }}
      >
        Back to My Surveys
      </Button>

      <Typography variant="h5">{survey?.title}</Typography>
      <Typography variant="subtitle1" mb={2}>
        {survey?.description}
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Question</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Required</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((q, index) => (
              <TableRow key={q._id}>
                <TableCell>{index + 1}</TableCell>

                <TableCell>
                  {editingId === q._id ? (
                    <TextField
                      value={editedQuestion.question_text}
                      onChange={(e) =>
                        setEditedQuestion((prev) => ({
                          ...prev,
                          question_text: e.target.value,
                        }))
                      }
                      fullWidth
                      size="small"
                    />
                  ) : (
                    q.question_text
                  )}
                </TableCell>

                <TableCell>
                  {editingId === q._id ? (
                    <Select
                      value={editedQuestion.question_type}
                      onChange={(e) =>
                        setEditedQuestion((prev) => ({
                          ...prev,
                          question_type: e.target.value,
                        }))
                      }
                      fullWidth
                      size="small"
                    >
                      <MenuItem value="text">Text</MenuItem>
                      <MenuItem value="mcq">Multiple Choice</MenuItem>
                      <MenuItem value="checkbox">Checkbox</MenuItem>
                    </Select>
                  ) : (
                    q.question_type
                  )}
                </TableCell>

                <TableCell>
                  {editingId === q._id ? (
                    <Switch
                      checked={editedQuestion.is_required}
                      onChange={(e) =>
                        setEditedQuestion((prev) => ({
                          ...prev,
                          is_required: e.target.checked,
                        }))
                      }
                    />
                  ) : q.is_required ? (
                    "Yes"
                  ) : (
                    "No"
                  )}
                </TableCell>

                <TableCell>
                  {editingId === q._id ? (
                    <>
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        onClick={() => handleSave(q._id)}
                      >
                        Save
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => setEditingId(null)}
                        sx={{ ml: 1 }}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => handleEditClick(q)}
                    >
                      Edit
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SurveyCreatorViewSurvey;
