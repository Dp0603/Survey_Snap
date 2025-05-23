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
import { useToast } from "../../contexts/ToastContext";

const SurveyCreatorScheduleSurveys = () => {
  const [surveys, setSurveys] = useState([]);
  const [selectedSurveyId, setSelectedSurveyId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
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
    if (!selectedSurveyId || !startDate || !endDate || !startTime || !endTime) {
      return showToast("Select a survey and dates/times", "error");
    }

    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate}T${endTime}`);

    if (startDateTime > endDateTime) {
      return showToast("Start time cannot be after end time", "error");
    }

    try {
      await axios.put(`/survey/${selectedSurveyId}`, {
        startDate: startDateTime.toISOString(),
        endDate: endDateTime.toISOString(),
      });
      showToast("Survey scheduled!", "success");
      fetchSurveys();
      setStartDate("");
      setStartTime("");
      setEndDate("");
      setEndTime("");
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
    const startDateTime = new Date(
      `${editingSurvey.startDate}T${editingSurvey.startTime}`
    );
    const endDateTime = new Date(
      `${editingSurvey.endDate}T${editingSurvey.endTime}`
    );

    if (startDateTime > endDateTime) {
      return showToast("Start time cannot be after end time", "error");
    }

    try {
      await axios.put(`/survey/${editingSurvey._id}`, {
        startDate: startDateTime.toISOString(),
        endDate: endDateTime.toISOString(),
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

      <div className="schedule-row">
        <div className="schedule-field">
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="schedule-field">
          <label>Start Time:</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
      </div>

      <div className="schedule-row">
        <div className="schedule-field">
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="schedule-field">
          <label>End Time:</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
      </div>

      <button className="schedule-btn" onClick={handleSchedule}>
        Schedule Survey
      </button>

      <h3>Scheduled Surveys</h3>
      <TableContainer component={Paper} className="styled-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Start Date & Time</TableCell>
              <TableCell>End Date & Time</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scheduledSurveys.map((survey) => {
              const startDateTime = new Date(survey.startDate);
              const endDateTime = new Date(survey.endDate);

              const formattedStartDate = startDateTime.toLocaleString(); 
              const formattedEndDate = endDateTime.toLocaleString(); 

              return (
                <TableRow key={survey._id}>
                  <TableCell>{survey.title}</TableCell>
                  <TableCell>{formattedStartDate}</TableCell>
                  <TableCell>{formattedEndDate}</TableCell>
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
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Schedule</DialogTitle>
        <DialogContent>
          <div className="dialog-date-row">
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
              label="Start Time"
              type="time"
              fullWidth
              value={editingSurvey?.startTime}
              onChange={(e) =>
                setEditingSurvey((prev) => ({
                  ...prev,
                  startTime: e.target.value,
                }))
              }
              margin="normal"
            />
            <TextField
              label="End Date"
              type="date"
              fullWidth
              value={editingSurvey?.endDate?.slice(0, 10)}
              onChange={(e) =>
                setEditingSurvey((prev) => ({
                  ...prev,
                  endDate: e.target.value,
                }))
              }
              InputLabelProps={{ shrink: true }}
              margin="normal"
            />
            <TextField
              label="End Time"
              type="time"
              fullWidth
              value={editingSurvey?.endTime}
              onChange={(e) =>
                setEditingSurvey((prev) => ({
                  ...prev,
                  endTime: e.target.value,
                }))
              }
              margin="normal"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

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
