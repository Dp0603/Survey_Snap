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
  const [showEditModal, setShowEditModal] = useState(false);

  const [showQuestionsModal, setShowQuestionsModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    creator_id: "", // Corrected ID Handling
    status: "Draft",
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteSurveyId, setDeleteSurveyId] = useState(null);

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

  // Fetch Surveys & Set Creator ID (Assuming user is logged in)
  useEffect(() => {
    fetchSurveys();
    // setFormData((prev) => ({
    //   ...prev,
    //   creator_id: "67e052121ddec96dad5326ff",
    // })); // Use real user ID dynamically
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
    setShowEditModal(true); 
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
                  onClick={() => confirmDeleteSurvey(survey._id)}
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
      {showEditModal && selectedSurvey && (
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
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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



































// import React, { useState, useEffect, useMemo } from "react";
// import { FaTrash, FaEdit, FaPlus, FaEye, FaSync } from "react-icons/fa";
// import { useTable, useSortBy } from "react-table";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./ManageSurveys.css";
// import ManageQuestions from "./ManageQuestions";

// const ManageSurveys = () => {
//   const [surveys, setSurveys] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [selectedSurvey, setSelectedSurvey] = useState(null);
//   // const [showAddForm, setShowAddForm] = useState(false);
//   // const [showQuestionsModal, setShowQuestionsModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [deleteSurveyId, setDeleteSurveyId] = useState(null);

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     creator_id: "",
//     status: "Draft",
//   });

//   // Fetch Surveys & Users
//   useEffect(() => {
//     fetchSurveys();
//     fetchUsers();
//   }, []);

//   const fetchSurveys = async () => {
//     try {
//       const response = await axios.get("/survey/all");
//       setSurveys(response.data.data);
//     } catch (error) {
//       toast.error("Failed to fetch surveys! 🚨");
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get("/users");
//       setUsers(response.data.data);
//     } catch (error) {
//       toast.error("Failed to fetch users! 🚨");
//     }
//   };

//   // Group surveys by user
//   const surveysByUser = useMemo(() => {
//     const grouped = {};
//     surveys.forEach((survey) => {
//       const userId = survey.creator_id?._id || "unknown";
//       if (!grouped[userId]) {
//         grouped[userId] = {
//           user: survey.creator_id,
//           surveys: [],
//         };
//       }
//       grouped[userId].surveys.push(survey);
//     });
//     return grouped;
//   }, [surveys]);

//   // React Table columns configuration
//   const columns = useMemo(
//     () => [
//       {
//         Header: "#",
//         accessor: (row, i) => i + 1,
//         id: "index",
//       },
//       {
//         Header: "Title",
//         accessor: "title",
//       },
//       {
//         Header: "Description",
//         accessor: "description",
//       },
//       {
//         Header: "Status",
//         accessor: "status",
//         Cell: ({ value }) => (
//           <span
//             className={`status-badge ${
//               value === "Active"
//                 ? "active"
//                 : value === "Closed"
//                 ? "closed"
//                 : "draft"
//             }`}
//           >
//             {value}
//           </span>
//         ),
//       },
//       {
//         Header: "Actions",
//         accessor: "_id",
//         Cell: ({ row }) => (
//           <div className="action-buttons">
//             {/* <button
//               className="edit-btn"
//               onClick={() => handleEditClick(row.original)}
//             >
//               <FaEdit />
//             </button> */}
//             <button
//               className="view-btn"
//               onClick={() => handleViewQuestions(row.original)}
//             >
//               <FaEye />
//             </button>
//             <button
//               className="delete-btn"
//               onClick={() => confirmDeleteSurvey(row.original._id)}
//             >
//               <FaTrash />
//             </button>
//           </div>
//         ),
//         disableSortBy: true,
//       },
//     ],
//     []
//   );

//   // Handle Input Changes
//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle Add Survey
//   // const handleAddSurvey = async (e) => {
//   //   e.preventDefault();
//   //   if (!formData.creator_id) {
//   //     toast.error("Error: Creator ID is missing! 🚨");
//   //     return;
//   //   }
//   //   try {
//   //     await axios.post("/survey/add", formData);
//   //     toast.success("Survey added successfully! 🎉");
//   //     setShowAddForm(false);
//   //     setFormData({
//   //       title: "",
//   //       description: "",
//   //       creator_id: "",
//   //       status: "Draft",
//   //     });
//   //     fetchSurveys();
//   //   } catch (error) {
//   //     toast.error("Error adding survey! 🚨");
//   //   }
//   // };

//   // // Handle Edit Click
//   // const handleEditClick = (survey) => {
//   //   setSelectedSurvey(survey);
//   //   setFormData({
//   //     title: survey.title,
//   //     description: survey.description,
//   //     creator_id: survey.creator_id?._id || "",
//   //     status: survey.status,
//   //   });
//   // };

//   // Handle Update Survey
//   const handleUpdateSurvey = async (e) => {
//     e.preventDefault();
//     if (!selectedSurvey) return;

//     try {
//       await axios.put(`/survey/${selectedSurvey._id}`, formData);
//       toast.success("Survey updated successfully! ✅");
//       setSelectedSurvey(null);
//       fetchSurveys();
//     } catch (error) {
//       toast.error("Error updating survey! 🚨");
//     }
//   };

//   // Delete confirmation
//   const confirmDeleteSurvey = (id) => {
//     setDeleteSurveyId(id);
//     setShowDeleteModal(true);
//   };

//   const handleDeleteConfirm = async () => {
//     try {
//       await axios.delete(`/survey/${deleteSurveyId}`);
//       toast.success("Survey deleted successfully! 🗑️");
//       fetchSurveys();
//     } catch (error) {
//       toast.error("Error deleting survey! 🚨");
//     }
//     setShowDeleteModal(false);
//   };

//   const handleDeleteCancel = () => {
//     setShowDeleteModal(false);
//   };

//   // const handleViewQuestions = (survey) => {
//   //   setSelectedSurvey(survey);
//   //   setShowQuestionsModal(true);
//   // };

//   // React Table component
//   const SurveyTable = ({ data }) => {
//     const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//       useTable(
//         {
//           columns,
//           data,
//         },
//         useSortBy
//       );

//     return (
//       <table {...getTableProps()} className="survey-table">
//         <thead>
//           {headerGroups.map((headerGroup) => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map((column) => (
//                 <th
//                   {...column.getHeaderProps(column.getSortByToggleProps())}
//                   className={
//                     column.isSorted
//                       ? column.isSortedDesc
//                         ? "sort-desc"
//                         : "sort-asc"
//                       : ""
//                   }
//                 >
//                   {column.render("Header")}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {rows.map((row) => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()}>
//                 {row.cells.map((cell) => (
//                   <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
//                 ))}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     );
//   };

//   return (
//     <div className="manage-surveys">
//       <h2>📊 Manage Surveys by User</h2>

//       {/* Add Survey Button */}
//       {/* <button className="add-survey-btn" onClick={() => setShowAddForm(true)}>
//         <FaPlus /> Create Survey
//       </button> */}
//       <button className="add-survey-btn" onClick={() => setShowAddForm(true)}>
//         <FaSync /> Refresh Surveys
//       </button>

//       {/* User Tables */}
//       {Object.entries(surveysByUser).map(([userId, userData]) => (
//         <div key={userId} className="user-survey-section">
//           <h3>
//             Surveys by:{" "}
//             {userData.user
//               ? `${userData.user.firstName} ${userData.user.lastName}`
//               : "Unknown User"}
//           </h3>
//           <SurveyTable data={userData.surveys} />
//         </div>
//       ))}

//       {/* Questions Modal */}
//       {/* {showQuestionsModal && (
//         <ManageQuestions
//           survey={selectedSurvey}
//           onClose={() => setShowQuestionsModal(false)}
//         />
//       )} */}

//       {/* Add Survey Modal */}
//       {/* {showAddForm && (
//         <div className="modal-overlay">
//           <div className="modal-container">
//             <h3>Create Survey</h3>
//             <form onSubmit={handleAddSurvey} className="update-form">
//               <div className="form-group">
//                 <label>Title:</label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Description:</label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Creator:</label>
//                 <select
//                   name="creator_id"
//                   value={formData.creator_id}
//                   onChange={handleInputChange}
//                   required
//                 >
//                   <option value="">Select User</option>
//                   {users.map((user) => (
//                     <option key={user._id} value={user._id}>
//                       {user.firstName} {user.lastName}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Status:</label>
//                 <select
//                   name="status"
//                   value={formData.status}
//                   onChange={handleInputChange}
//                   required
//                 >
//                   <option value="Draft">Draft</option>
//                   <option value="Active">Active</option>
//                   <option value="Closed">Closed</option>
//                 </select>
//               </div>
//               <div className="form-actions">
//                 <button type="submit" className="add-btn">
//                   Add Survey
//                 </button>
//                 <button
//                   type="button"
//                   className="cancel-btn"
//                   onClick={() => setShowAddForm(false)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )} */}

//       {/* Edit Survey Modal */}
//       {selectedSurvey && (
//         <div className="modal-overlay">
//           <div className="modal-container">
//             <h3>Edit Survey</h3>
//             <form onSubmit={handleUpdateSurvey} className="update-form">
//               <div className="form-group">
//                 <label>Title:</label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Description:</label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Creator:</label>
//                 <select
//                   name="creator_id"
//                   value={formData.creator_id}
//                   onChange={handleInputChange}
//                   required
//                 >
//                   {users.map((user) => (
//                     <option key={user._id} value={user._id}>
//                       {user.firstName} {user.lastName}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Status:</label>
//                 <select
//                   name="status"
//                   value={formData.status}
//                   onChange={handleInputChange}
//                   required
//                 >
//                   <option value="Draft">Draft</option>
//                   <option value="Active">Active</option>
//                   <option value="Closed">Closed</option>
//                 </select>
//               </div>
//               <div className="form-actions">
//                 <button type="submit" className="update-btn">
//                   Update
//                 </button>
//                 <button
//                   type="button"
//                   className="cancel-btn"
//                   onClick={() => setSelectedSurvey(null)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && (
//         <div className="modal-overlay">
//           <div className="modal-container">
//             <h3>Confirm Deletion</h3>
//             <p>Are you sure you want to delete this survey?</p>
//             <div className="form-actions">
//               <button className="delete-btn" onClick={handleDeleteConfirm}>
//                 Yes, Delete
//               </button>
//               <button className="cancel-btn" onClick={handleDeleteCancel}>
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <ToastContainer position="top-right" autoClose={2000} />
//     </div>
//   );
// };

// export default ManageSurveys;