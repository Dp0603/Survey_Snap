import React, { useState, useEffect } from "react";
import { FaTrash, FaPlus, FaEdit } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import "./ManageQuestions.css";

const ManageQuestions = ({ survey, closeModal }) => {
  const [questions, setQuestions] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const [formData, setFormData] = useState({
    question_text: "",
    question_type: "Short Text",
    is_required: false,
    survey_id: survey._id,
  });

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`/question/survey/${survey._id}`);
      setQuestions(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch questions! 🚨");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/question/add", formData);
      toast.success("Question added successfully! 🎉");
      setShowAddModal(false);
      setFormData({
        question_text: "",
        question_type: "Short Text",
        is_required: false,
        survey_id: survey._id,
      });
      fetchQuestions();
    } catch (error) {
      toast.error("Error adding question! 🚨");
    }
  };

  const handleEditClick = (question) => {
    setSelectedQuestion(question);
    setFormData({
      question_text: question.question_text,
      question_type: question.question_type,
      is_required: question.is_required,
      survey_id: question.survey_id,
    });
    setShowEditModal(true);
  };

  const handleUpdateQuestion = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/question/${selectedQuestion._id}`, formData);
      toast.success("Question updated successfully! ✅");
      setShowEditModal(false);
      setSelectedQuestion(null);
      fetchQuestions();
    } catch (error) {
      toast.error("Error updating question! 🚨");
    }
  };

  const handleDeleteQuestion = async (id) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        await axios.delete(`/question/${id}`);
        toast.success("Question deleted successfully! 🗑️");
        fetchQuestions();
      } catch (error) {
        toast.error("Error deleting question! 🚨");
      }
    }
  };

  return (
    <div className="questions-container">
      <h3>📌 {survey.title} - Questions</h3>
      <button className="questions-close-btn" onClick={closeModal}>
        ✖
      </button>

      <button
        className="questions-add-btn"
        onClick={() => setShowAddModal(true)}
      >
        <FaPlus /> Add Question
      </button>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Question</th>
            <th>Type</th>
            <th>Required</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q, index) => (
            <tr key={q._id}>
              <td>{index + 1}</td>
              <td>{q.question_text}</td>
              <td>{q.question_type}</td>
              <td>{q.is_required ? "✅" : "❌"}</td>
              <td>
                <button
                  className="questions-edit-btn"
                  onClick={() => handleEditClick(q)}
                >
                  <FaEdit />
                </button>
                <button
                  className="questions-delete-btn"
                  onClick={() => handleDeleteQuestion(q._id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddModal && (
        <div className="questions-modal-overlay">
          <div className="questions-modal-container">
            <h3>Add Question</h3>
            <form onSubmit={handleAddQuestion}>
              <div className="questions-form-group">
                <label>Question Text:</label>
                <input
                  type="text"
                  name="question_text"
                  value={formData.question_text}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="questions-form-group">
                <label>Type:</label>
                <select
                  name="question_type"
                  value={formData.question_type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Multiple Choice">Multiple Choice</option>
                  <option value="Short Text">Short Text</option>
                  <option value="Long Text">Long Text</option>
                  <option value="Rating Scale">Rating Scale</option>
                  <option value="Dropdown">Dropdown</option>
                </select>
              </div>
              <div className="questions-form-group">
                <label>
                  <input
                    type="checkbox"
                    name="is_required"
                    checked={formData.is_required}
                    onChange={handleInputChange}
                  />
                  Required
                </label>
              </div>
              <div className="questions-form-actions">
                <button type="submit" className="questions-add-btn">
                  Add
                </button>
                <button
                  type="button"
                  className="questions-cancel-btn"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditModal && selectedQuestion && (
        <div className="questions-modal-overlay">
          <div className="questions-modal-container">
            <h3>Edit Question</h3>
            <form onSubmit={handleUpdateQuestion}>
              <div className="questions-form-group">
                <label>Question Text:</label>
                <input
                  type="text"
                  name="question_text"
                  value={formData.question_text}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="questions-form-group">
                <label>Type:</label>
                <select
                  name="question_type"
                  value={formData.question_type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Multiple Choice">Multiple Choice</option>
                  <option value="Short Text">Short Text</option>
                  <option value="Long Text">Long Text</option>
                  <option value="Rating Scale">Rating Scale</option>
                  <option value="Dropdown">Dropdown</option>
                </select>
              </div>
              <div className="questions-form-group">
                <label>
                  <input
                    type="checkbox"
                    name="is_required"
                    checked={formData.is_required}
                    onChange={handleInputChange}
                  />
                  Required
                </label>
              </div>
              <div className="questions-form-actions">
                <button type="submit" className="questions-update-btn">
                  Update
                </button>
                <button
                  type="button"
                  className="questions-cancel-btn"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageQuestions;
