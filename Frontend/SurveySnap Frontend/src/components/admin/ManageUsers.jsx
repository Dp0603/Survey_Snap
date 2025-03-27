// import React, { useState, useEffect } from "react";
// import { FaUserPlus, FaTrash, FaEdit } from "react-icons/fa";
// import axios from "axios"; // Import axios for API calls
// import "./ManageUsers.css";

// const ManageUsers = () => {
//   const [users, setUsers] = useState([]);

//   // Fetch Users from Backend API
//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async (data) => {
//     try {
//       const response = await axios.get("/users",data);
//       setUsers(response.data.data);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   return (
//     <div className="manage-users">
//       <h2>👤 Manage Users</h2>
//       <button className="add-user"><FaUserPlus /> Add User</button>
//       <table>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>First Name</th>
//             <th>Last Name</th>
//             <th>Email</th>
//             <th>Role</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user, index) => (
//             <tr key={user._id}>
//               <td>{index + 1}</td>
//               <td>{user.firstName}</td>
//               <td>{user.lastName}</td>
//               <td>{user.email}</td>
//               <td>{user.roleId?.name || "Unknown"}</td>
//               <td>
//                 <button className="edit-btn"><FaEdit /></button>
//                 <button className="delete-btn"><FaTrash /></button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ManageUsers;

import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaUserPlus } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ManageUsers.css"; // Updated CSS

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    roleId: "",
  });

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/users");
      setUsers(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch users! 🚨");
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get("/roles");
      setRoles(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch roles! 🚨");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`/user/${id}`);
        toast.success("User deleted successfully! 🗑️");
        fetchUsers();
      } catch (error) {
        toast.error("Error deleting user! 🚨");
      }
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: "",
      roleId: user.roleId?._id || "",
    });
  };

  const handleAddUserClick = () => {
    setShowAddForm(true);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      roleId: "",
    });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/user/${selectedUser._id}`, formData);
      toast.success("User updated successfully! ✅");
      setSelectedUser(null);
      fetchUsers();
    } catch (error) {
      toast.error("Error updating user! 🚨");
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user", formData);
      toast.success("User added successfully! 🎉");
      setShowAddForm(false);
      fetchUsers();
    } catch (error) {
      toast.error("Error adding user! 🚨");
    }
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const confirmDelete = (id) => {
    setDeleteUserId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await axios.delete(`/user/${deleteUserId}`);
      toast.success("User deleted successfully! 🗑️");
      fetchUsers();
    } catch (error) {
      toast.error("Error deleting user! 🚨");
    }
    setShowDeleteModal(false);
  };

  return (
    <div className="manage-users-container">
      <h2>👤 Manage Users</h2>

      {/* Add User Button */}
      <button className="manage-users-add-btn" onClick={handleAddUserClick}>
        <FaUserPlus /> Add User
      </button>

      <table className="manage-users-table">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.roleId?.name || "Unknown"}</td>
              <td className="manage-users-action-buttons">
                <button
                  className="manage-users-edit-btn"
                  onClick={() => handleEditClick(user)}
                >
                  <FaEdit /> Update
                </button>
                <button
                  className="manage-users-delete-btn"
                  onClick={() => confirmDelete(user._id)}
                >
                  <FaTrash /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update User Modal */}
      {selectedUser && (
        <div className="manage-users-modal-overlay">
          <div className="manage-users-modal-container">
            <h3>Edit User</h3>
            <form onSubmit={handleUpdateUser} className="manage-users-form">
              <div className="manage-users-form-group">
                <label>First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="manage-users-form-group">
                <label>Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="manage-users-form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled
                />
              </div>

              <div className="manage-users-form-group">
                <label>Role:</label>
                <select
                  name="roleId"
                  value={formData.roleId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Role</option>
                  {roles.map((role) => (
                    <option key={role._id} value={role._id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="manage-users-form-actions">
                <button type="submit" className="manage-users-update-btn">
                  Update
                </button>
                <button
                  type="button"
                  className="manage-users-cancel-btn"
                  onClick={() => setSelectedUser(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddForm && (
        <div className="manage-users-modal-overlay">
          <div className="manage-users-modal-container">
            <h3>Add User</h3>
            <form onSubmit={handleAddUser} className="manage-users-form">
              <div className="manage-users-form-group">
                <label>First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="manage-users-form-group">
                <label>Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="manage-users-form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="manage-users-form-group">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="manage-users-form-group">
                <label>Role:</label>
                <select
                  name="roleId"
                  value={formData.roleId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Role</option>
                  {roles.map((role) => (
                    <option key={role._id} value={role._id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="manage-users-form-actions">
                <button type="submit" className="manage-users-add-btn">
                  Add User
                </button>
                <button
                  type="button"
                  className="manage-users-cancel-btn"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showDeleteModal && (
        <div className="manage-users-modal-overlay">
          <div className="manage-users-modal-container">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this user?</p>
            <div className="manage-users-form-actions">
              <button
                className="manage-users-delete-btn"
                onClick={handleDeleteConfirmed}
              >
                Yes, Delete
              </button>
              <button
                className="manage-users-cancel-btn"
                onClick={() => setShowDeleteModal(false)}
              >
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

export default ManageUsers;
