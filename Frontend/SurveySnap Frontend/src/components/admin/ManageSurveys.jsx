import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEye, FaSync } from "react-icons/fa";
import { useTable, useSortBy } from "react-table";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ManageSurveys.css";

const ManageSurveys = () => {
  const [surveys, setSurveys] = useState([]);
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteSurveyId, setDeleteSurveyId] = useState(null);
  const navigate = useNavigate();

  // Fetch Surveys & Users
  useEffect(() => {
    fetchSurveys();
    fetchUsers();
  }, []);

  const fetchSurveys = async () => {
    try {
      const response = await axios.get("/survey/all");
      setSurveys(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch surveys! 🚨");
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/users");
      setUsers(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch users! 🚨");
    }
  };

  // Group surveys by user
  const surveysByUser = useMemo(() => {
    const grouped = {};
    surveys.forEach((survey) => {
      const userId = survey.creator_id?._id || "unknown";
      if (!grouped[userId]) {
        grouped[userId] = {
          user: survey.creator_id,
          surveys: [],
        };
      }
      grouped[userId].surveys.push(survey);
    });
    return grouped;
  }, [surveys]);

  // Navigate to View Survey Page
  const handleViewSurvey = (surveyId) => {
    navigate(`${surveyId}`);
  };

  // Delete confirmation
  const confirmDeleteSurvey = (id) => {
    setDeleteSurveyId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`/survey/${deleteSurveyId}`);
      toast.success("Survey deleted successfully! 🗑️");
      fetchSurveys();
    } catch (error) {
      toast.error("Error deleting survey! 🚨");
    }
    setShowDeleteModal(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  // React Table Component
  const SurveyTable = ({ data }) => {
    const columns = useMemo(
      () => [
        {
          Header: "#",
          accessor: (row, i) => i + 1,
          id: "index",
        },
        {
          Header: "Title",
          accessor: "title",
        },
        {
          Header: "Description",
          accessor: "description",
        },
        {
          Header: "Status",
          accessor: "status",
          Cell: ({ value }) => (
            <span
              className={`status-badge ${
                value === "Active"
                  ? "active"
                  : value === "Closed"
                  ? "closed"
                  : "draft"
              }`}
            >
              {value}
            </span>
          ),
        },
        {
          Header: "Actions",
          accessor: "_id",
          Cell: ({ row }) => (
            <div className="action-buttons">
              <button
                className="view-btn"
                onClick={() => handleViewSurvey(row.original._id)}
              >
                <FaEye />
              </button>
              <button
                className="delete-btn"
                onClick={() => confirmDeleteSurvey(row.original._id)}
              >
                <FaTrash />
              </button>
            </div>
          ),
          disableSortBy: true,
        },
      ],
      []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useTable(
        {
          columns,
          data,
        },
        useSortBy
      );

    return (
      <table {...getTableProps()} className="survey-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <div className="manage-surveys">
      <h2>📊 Manage Surveys by User</h2>

      {/* Refresh Button */}
      <button className="add-survey-btn" onClick={fetchSurveys}>
        <FaSync /> Refresh Surveys
      </button>

      {/* User-wise Survey Tables */}
      {Object.entries(surveysByUser).map(([userId, userData]) => (
        <div key={userId} className="user-survey-section">
          <h3>
            Surveys by:{" "}
            {userData.user
              ? `${userData.user.firstName} ${userData.user.lastName}`
              : "Unknown User"}
          </h3>
          <SurveyTable data={userData.surveys} />
        </div>
      ))}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this survey?</p>
            <div className="form-actions">
              <button className="delete-btn" onClick={handleDeleteConfirm}>
                Yes, Delete
              </button>
              <button className="cancel-btn" onClick={handleDeleteCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default ManageSurveys;
