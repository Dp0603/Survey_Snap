import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./MySurvey.css";

const MySurvey = () => {
  const [surveys, setSurveys] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditSurveyModal, setShowEditSurveyModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    creator_id: "65b5d4563e4c2a001f2c3a75", // Replace with dynamic creator ID if needed
    status: "Draft",
  });

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      const response = await axios.get("/survey/all");
      setSurveys(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch surveys! 🚨");
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSurvey = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/survey/add", formData);
      toast.success("Survey added successfully! 🎉");
      setShowAddForm(false);
      setFormData({
        title: "",
        description: "",
        creator_id: "65b5d4563e4c2a001f2c3a75", // Reset to default or dynamic creator ID
        status: "Draft",
      });
      fetchSurveys();
    } catch (error) {
      toast.error("Error adding survey! 🚨");
    }
  };

  const handleEditClick = (survey) => {
    setSelectedSurvey(survey);
    setFormData({
      title: survey.title,
      description: survey.description,
      creator_id: survey.creator_id?._id || "",
      status: survey.status,
    });
    setShowEditSurveyModal(true);
  };

  const handleUpdateSurvey = async (e) => {
    e.preventDefault();
    if (!selectedSurvey) return;

    try {
      await axios.put(`/survey/${selectedSurvey._id}`, formData);
      toast.success("Survey updated successfully! ✅");
      setShowEditSurveyModal(false);
      setSelectedSurvey(null);
      fetchSurveys();
    } catch (error) {
      toast.error("Error updating survey! 🚨");
    }
  };

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

  return (
    <div className="my-survey">
      <h1>📋 My Surveys</h1>
      <p>View and manage your surveys.</p>

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
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
      {showEditSurveyModal && (
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
                  onClick={() => setShowEditSurveyModal(false)}
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

export default MySurvey;