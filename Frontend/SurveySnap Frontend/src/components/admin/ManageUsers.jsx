import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tabs,
  Tab,
  Select,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FaTrash, FaEdit, FaUserPlus, FaDownload } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { CSVLink } from "react-csv";
import "react-toastify/dist/ReactToastify.css";
import "./ManageUsers.css";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [tab, setTab] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    roleId: "",
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/users");
      setUsers(res.data.data);
    } catch {
      toast.error("Failed to fetch users");
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await axios.get("/roles");
      setRoles(res.data.data);
    } catch {
      toast.error("Failed to fetch roles");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/user/${deleteUserId}`);
      toast.success("User deleted!");
      fetchUsers();
    } catch {
      toast.error("Failed to delete user");
    }
    setShowDeleteModal(false);
  };

  const handleEditOpen = (user) => {
    setEditUser({
      ...user,
      roleId: user.roleId?._id || user.roleId,
    });
    setShowEditModal(true);
  };

  const handleEditClose = () => {
    setShowEditModal(false);
    setEditUser(null);
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`/user/${editUser._id}`, editUser);
      toast.success("User updated successfully!");
      fetchUsers();
      handleEditClose();
    } catch {
      toast.error("Failed to update user");
    }
  };

  const filteredUsers = useMemo(() => {
    return users
      .filter((user) =>
        `${user.firstName} ${user.lastName} ${user.email}`
          .toLowerCase()
          .includes(search.toLowerCase())
      )
      .filter((user) => {
        if (tab === 0) return true;
        if (tab === 1) return user.roleId?.name === "Admin";
        if (tab === 2) return user.roleId?.name === "Survey Creator";
        if (tab === 3) return user.roleId?.name === "Respondent";
        return true;
      });
  }, [users, search, tab]);

  const getBadgeColor = (role) => {
    switch (role) {
      case "Admin":
        return "badge-admin";
      case "Survey Creator":
        return "badge-creator";
      case "Respondent":
        return "badge-respondent";
      default:
        return "badge-default";
    }
  };

  return (
    <div className="manage-users-container">
      <h2>👥 Manage Users</h2>

      <Tabs
        value={tab}
        onChange={(e, newTab) => setTab(newTab)}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="All" />
        <Tab label="Admin" />
        <Tab label="Survey Creator" />
        <Tab label="Respondent" />
      </Tabs>

      <div className="manage-users-actions">
        <TextField
          size="small"
          label="Search users..."
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="manage-users-buttons">
          <CSVLink
            data={filteredUsers}
            filename="users.csv"
            className="export-btn"
            bom={true}
          >
            <Button variant="outlined" startIcon={<FaDownload />}>
              Export CSV
            </Button>
          </CSVLink>

          <Button
            variant="contained"
            startIcon={<FaUserPlus />}
            onClick={() => setShowAddModal(true)}
          >
            Add User
          </Button>
        </div>
      </div>

      <TableContainer component={Paper} className="user-table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user, index) => (
              <TableRow key={user._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span
                    className={`role-badge ${getBadgeColor(user.roleId?.name)}`}
                  >
                    {user.roleId?.name}
                  </span>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => handleEditOpen(user)}
                  >
                    <FaEdit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => {
                      setDeleteUserId(user._id);
                      setShowDeleteModal(true);
                    }}
                  >
                    <FaTrash />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {filteredUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <DialogTitle>❗Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add User Modal */}
      <Dialog
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent className="add-user-form">
          {["firstName", "lastName", "email", "password"].map((field) => (
            <TextField
              key={field}
              name={field}
              label={field[0].toUpperCase() + field.slice(1)}
              fullWidth
              margin="dense"
              value={formData[field]}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              type={field === "password" ? "password" : "text"}
            />
          ))}
          <Select
            fullWidth
            name="roleId"
            value={formData.roleId}
            onChange={(e) =>
              setFormData({ ...formData, roleId: e.target.value })
            }
          >
            <MenuItem value="">
              <em>Select Role</em>
            </MenuItem>
            {roles.map((role) => (
              <MenuItem key={role._id} value={role._id}>
                {role.name}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddModal(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={async () => {
              try {
                await axios.post("/user", formData);
                toast.success("User added successfully!");
                fetchUsers();
                setShowAddModal(false);
              } catch {
                toast.error("Failed to add user");
              }
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Modal */}
      <Dialog
        open={showEditModal}
        onClose={handleEditClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent className="add-user-form">
          {["firstName", "lastName", "email"].map((field) => (
            <TextField
              key={field}
              name={field}
              label={field[0].toUpperCase() + field.slice(1)}
              fullWidth
              margin="dense"
              value={editUser?.[field] || ""}
              onChange={(e) =>
                setEditUser({ ...editUser, [e.target.name]: e.target.value })
              }
            />
          ))}
          <Select
            fullWidth
            name="roleId"
            value={editUser?.roleId || ""}
            onChange={(e) =>
              setEditUser({ ...editUser, roleId: e.target.value })
            }
          >
            <MenuItem value="">
              <em>Select Role</em>
            </MenuItem>
            {roles.map((role) => (
              <MenuItem key={role._id} value={role._id}>
                {role.name}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default ManageUsers;
