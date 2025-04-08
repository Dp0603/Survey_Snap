import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEye, FaSync, FaEdit, FaPlus } from "react-icons/fa";
import { useTable, useSortBy } from "react-table";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SurveyCreatorMySurveys.css";

const SurveyCreatorMySurveys = () => {
  const [surveys, setSurveys] = useState([]);
  const navigate = useNavigate();

  // ✅ Get userId from local storage
  const userId = localStorage.getItem("id");

  useEffect(() => {
    if (userId) {
      fetchUserSurveys();
    } else {
      toast.error("User ID not found. Please log in again! 🚨");
    }
  }, [userId]);

  const fetchUserSurveys = async () => {
    try {
      const response = await axios.get(`/survey/user/${userId}`);
      if (!response.data.data) {
        toast.error("Error fetching surveys! 🚨");
        return;
      }
      setSurveys(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch your surveys! 🚨");
    }
  };

  if (!userId) {
    return <h2>❌ User not logged in. Please log in again.</h2>;
  }

  // ✅ Delete Survey Function
  const handleDeleteSurvey = async (surveyId) => {
    try {
      await axios.delete(`/survey/${surveyId}`);
      toast.success("Survey deleted successfully! 🗑️");
      fetchUserSurveys();
    } catch (error) {
      toast.error("Error deleting survey! 🚨");
    }
  };

  // ✅ React Table Configuration
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
          <span className={`status-badge ${value.toLowerCase()}`}>{value}</span>
        ),
      },
      {
        Header: "Actions",
        accessor: "_id",
        Cell: ({ row }) => (
          <div className="survey-creator-action-buttons">
            <button
              className="survey-creator-view-btn"
              onClick={() => navigate(`/survey/view/${row.original._id}`)}
            >
              <FaEye />
            </button>
            <button
              className="survey-creator-edit-btn"
              onClick={() => navigate(`/survey/edit/${row.original._id}`)}
            >
              <FaEdit />
            </button>
            <button
              className="survey-creator-delete-btn"
              onClick={() => handleDeleteSurvey(row.original._id)}
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
        data: surveys,
      },
      useSortBy
    );

  return (
    <div className="survey-creator-my-surveys">
      <h2>📋 My Surveys</h2>

      <div className="survey-creator-header">
        <button
          className="survey-creator-create-btn"
          onClick={() => navigate("create-new-survey")}
        >
          <FaPlus /> Create New Survey
        </button>
        <button
          className="survey-creator-refresh-btn"
          onClick={fetchUserSurveys}
        >
          <FaSync /> Refresh Surveys
        </button>
      </div>

      {surveys.length === 0 ? (
        <h3 className="survey-creator-no-surveys">
          😞 No surveys found. Create your first one!
        </h3>
      ) : (
        <table {...getTableProps()} className="survey-creator-table">
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
      )}

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default SurveyCreatorMySurveys;
