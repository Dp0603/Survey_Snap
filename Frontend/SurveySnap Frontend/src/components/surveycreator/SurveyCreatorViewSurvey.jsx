import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./SurveyCreatorViewSurvey.css";

const SurveyCreatorViewSurvey = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [survey, setSurvey] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        const surveyRes = await axios.get(`/survey/${id}`);
        const questionRes = await axios.get(`/question/survey/${id}`);

        setSurvey(surveyRes.data.data);
        setQuestions(questionRes.data.data);
      } catch (err) {
        setError("Failed to load survey data. Please try again.");
        console.error("Error fetching survey data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSurveyData();
  }, [id]);

  if (loading) {
    return (
      <Box className="sc-viewsurvey-loading">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box className="sc-viewsurvey-container">
      <button
        className="sc-back-button"
        onClick={() => navigate("/survey-creator-dashboard/my-surveys")}
      >
        <ArrowBackIcon /> Back to My Surveys
      </button>

      <Typography variant="h5" className="sc-survey-title">
        {survey?.title || "Survey Title"}
      </Typography>
      <Typography variant="subtitle1" className="sc-survey-description">
        {survey?.description}
      </Typography>

      <TableContainer component={Paper} className="sc-table-container">
        <Table>
          <TableHead>
            <TableRow className="sc-table-header">
              <TableCell>#</TableCell>
              <TableCell>Question</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Required</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((q, index) => (
              <TableRow key={q._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{q.question_text}</TableCell>
                <TableCell>
                  <Chip label={q.question_type} color="primary" />
                </TableCell>
                <TableCell>
                  <Chip
                    label={q.is_required ? "Yes" : "No"}
                    sx={{
                      backgroundColor: q.is_required ? "#2E7D32" : "#B71C1C",
                      color: "#fff",
                    }}
                  />
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
