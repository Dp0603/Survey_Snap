import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaPlus, FaEye } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ManageSurveys.css"; // Ensure styles are correct
import ManageQuestions from "./ManageQuestions";

const ManageSurveys = () => {
  const [surveys, setSurveys] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showQuestionsModal, setShowQuestionsModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    creator_id: "", // Corrected ID Handling
    status: "Draft",
  });

  // Fetch Surveys & Set Creator ID (Assuming user is logged in)
  useEffect(() => {
    fetchSurveys();
    setFormData((prev) => ({
      ...prev,
      creator_id: "67e052121ddec96dad5326ff",
    })); // Use real user ID dynamically
  }, []);

  const fetchSurveys = async () => {
    try {
      const response = await axios.get("/survey/all");
      setSurveys(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch surveys! 🚨");
    }
  };

  // Handle Input Changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Add Survey
  const handleAddSurvey = async (e) => {
    e.preventDefault();
    if (!formData.creator_id) {
      toast.error("Error: Creator ID is missing! 🚨");
      return;
    }
    try {
      await axios.post("/survey/add", formData);
      toast.success("Survey added successfully! 🎉");
      setShowAddForm(false);
      setFormData({
        title: "",
        description: "",
        creator_id: "67e052121ddec96dad5326ff",
        status: "Draft",
      });
      fetchSurveys();
    } catch (error) {
      toast.error("Error adding survey! 🚨");
    }
  };

  // Handle Edit Click
  const handleEditClick = (survey) => {
    setSelectedSurvey(survey);
    setFormData({
      title: survey.title,
      description: survey.description,
      creator_id: survey.creator_id?._id || "",
      status: survey.status,
    });
  };

  // Handle Update Survey
  const handleUpdateSurvey = async (e) => {
    e.preventDefault();
    if (!selectedSurvey) return;

    try {
      await axios.put(`/survey/${selectedSurvey._id}`, formData);
      toast.success("Survey updated successfully! ✅");
      setSelectedSurvey(null);
      fetchSurveys();
    } catch (error) {
      toast.error("Error updating survey! 🚨");
    }
  };

  // Handle Delete Survey
  const handleDeleteSurvey = async (id) => {
    if (window.confirm("Are you sure you want to delete this survey?")) {
      try {
        await axios.delete(`/survey/${id}`);
        toast.success("Survey deleted successfully! 🗑️");
        fetchSurveys();
      } catch (error) {
        toast.error("Error deleting survey! 🚨");
      }
    }
  };

  const handleViewQuestions = (survey) => {
    setSelectedSurvey(survey);
    setShowQuestionsModal(true);
  };

  return (
    <div className="manage-surveys">
      <h2>📊 Manage Surveys</h2>

      {/* Add Survey Button */}
      <button className="add-survey-btn" onClick={() => setShowAddForm(true)}>
        <FaPlus /> Create Survey
      </button>

      {/* Surveys Table */}
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Creator</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {surveys.map((survey, index) => (
            <tr key={survey._id}>
              <td>{index + 1}</td>
              <td>{survey.title}</td>
              <td>{survey.description}</td>
              <td>
                {survey.creator_id?.firstName +
                  " " +
                  survey.creator_id?.lastName}
              </td>
              <td>{survey.status}</td>
              <td className="action-buttons">
                <button
                  className="edit-btn"
                  onClick={() => handleEditClick(survey)}
                >
                  <FaEdit /> Update
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteSurvey(survey._id)}
                >
                  <FaTrash /> Delete
                </button>
                <button
                  className="view-btn"
                  onClick={() => handleViewQuestions(survey)}
                >
                  <FaEye /> Manage Questions
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showQuestionsModal && (
        <ManageQuestions
          survey={selectedSurvey}
          onClose={() => setShowQuestionsModal(false)}
        />
      )}

      {/* Add Survey Modal */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h3>Create Survey</h3>
            <form onSubmit={handleAddSurvey} className="update-form">
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Status:</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Draft">Draft</option>
                  <option value="Active">Active</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="submit" className="add-btn">
                  Add Survey
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Survey Modal */}
      {selectedSurvey && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h3>Edit Survey</h3>
            <form onSubmit={handleUpdateSurvey} className="update-form">
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Status:</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Draft">Draft</option>
                  <option value="Active">Active</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="submit" className="update-btn">
                  Update
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setSelectedSurvey(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default ManageSurveys;
