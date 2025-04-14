import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import "./SurveyCreatorScheduleSurveys.css";
import { useToast } from "../../ToastContext"; // adjust path if needed

const SurveyCreatorScheduleSurveys = () => {
  const [surveys, setSurveys] = useState([]);
  const [selectedSurveyId, setSelectedSurveyId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [scheduledSurveys, setScheduledSurveys] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingSurvey, setEditingSurvey] = useState(null);

  const { showToast } = useToast();
  const userId = localStorage.getItem("id");

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      const res = await axios.get(`/survey/user/${userId}`);
      setSurveys(res.data.data);
      setScheduledSurveys(
        res.data.data.filter((s) => s.startDate && s.endDate)
      );
    } catch (err) {
      console.error("Error fetching surveys:", err);
      showToast("Failed to fetch surveys", "error");
    }
  };

  const handleSchedule = async () => {
    if (!selectedSurveyId || !startDate || !endDate) {
      return showToast("Select a survey and dates", "error");
    }

    if (new Date(startDate) > new Date(endDate)) {
      return showToast("Start date cannot be after end date", "error");
    }

    try {
      await axios.put(`/survey/${selectedSurveyId}`, { startDate, endDate });
      showToast("Survey scheduled!", "success");
      fetchSurveys();
      setStartDate("");
      setEndDate("");
      setSelectedSurveyId("");
    } catch (err) {
      showToast("Failed to schedule survey", "error");
    }
  };

  const handleRemoveSchedule = async () => {
    try {
      await axios.put(`/survey/${editingSurvey._id}`, {
        startDate: "",
        endDate: "",
      });
      showToast("Schedule removed", "success");
      setDeleteDialogOpen(false);
      fetchSurveys();
    } catch (err) {
      console.error("Failed to remove schedule:", err);
      showToast("Failed to remove schedule", "error");
    }
  };

  const handleEditSave = async () => {
    if (new Date(editingSurvey.startDate) > new Date(editingSurvey.endDate)) {
      return showToast("Start date cannot be after end date", "error");
    }

    try {
      await axios.put(`/survey/${editingSurvey._id}`, {
        startDate: editingSurvey.startDate,
        endDate: editingSurvey.endDate,
      });
      showToast("Schedule updated", "success");
      setEditDialogOpen(false);
      fetchSurveys();
    } catch (err) {
      showToast("Failed to update schedule", "error");
    }
  };

  return (
    <div className="survey-creator-schedule">
      <h2>Schedule a Survey</h2>

      <div className="schedule-field">
        <label>Select Survey:</label>
        <select
          value={selectedSurveyId}
          onChange={(e) => setSelectedSurveyId(e.target.value)}
        >
          <option value="">-- Select a Survey --</option>
          {surveys.map((survey) => (
            <option key={survey._id} value={survey._id}>
              {survey.title}
            </option>
          ))}
        </select>
      </div>

      <div className="schedule-field">
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <div className="schedule-field">
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <button className="schedule-btn" onClick={handleSchedule}>
        Schedule Survey
      </button>

      <h3>Scheduled Surveys</h3>
      <TableContainer component={Paper} className="styled-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "30%" }}>Title</TableCell>
              <TableCell style={{ width: "20%" }}>Start Date</TableCell>
              <TableCell style={{ width: "20%" }}>End Date</TableCell>
              <TableCell style={{ width: "30%" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scheduledSurveys.map((survey) => (
              <TableRow key={survey._id}>
                <TableCell>{survey.title}</TableCell>
                <TableCell>{survey.startDate?.slice(0, 10)}</TableCell>
                <TableCell>{survey.endDate?.slice(0, 10)}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    onClick={() => {
                      setEditingSurvey({ ...survey });
                      setEditDialogOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    onClick={() => {
                      setEditingSurvey(survey);
                      setDeleteDialogOpen(true);
                    }}
                  >
                    Remove Schedule
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Schedule</DialogTitle>
        <DialogContent>
          <TextField
            label="Start Date"
            type="date"
            fullWidth
            value={editingSurvey?.startDate?.slice(0, 10)}
            onChange={(e) =>
              setEditingSurvey((prev) => ({
                ...prev,
                startDate: e.target.value,
              }))
            }
            InputLabelProps={{ shrink: true }}
            margin="normal"
          />
          <TextField
            label="End Date"
            type="date"
            fullWidth
            value={editingSurvey?.endDate?.slice(0, 10)}
            onChange={(e) =>
              setEditingSurvey((prev) => ({ ...prev, endDate: e.target.value }))
            }
            InputLabelProps={{ shrink: true }}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Schedule Removal</DialogTitle>
        <DialogContent>
          Are you sure you want to remove the schedule for this survey?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleRemoveSchedule}
            variant="contained"
            color="error"
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SurveyCreatorScheduleSurveys;
