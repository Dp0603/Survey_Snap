import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  useMediaQuery,
  useTheme,
  Box,
  InputAdornment,
} from "@mui/material";
import {
  FaTrash,
  FaEdit,
  FaUserPlus,
  FaDownload,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { CSVLink } from "react-csv";
import { DataGrid } from "@mui/x-data-grid";
import { useToast } from "../../contexts/ToastContext";
import "./ManageUsers.css";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    roleId: "",
  });
  const [editUser, setEditUser] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const { showToast } = useToast();
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
      showToast("Failed to fetch users", "error");
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await axios.get("/roles");
      setRoles(res.data.data);
    } catch {
      showToast("Failed to fetch roles", "error");
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
      })
      .map((user, index) => ({
        id: user._id,
        index: index + 1,
        ...user,
        roleName: user.roleId?.name || "N/A",
      }));
  }, [users, search, tab]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/user/${deleteUserId}`);
      showToast("User deleted!", "success");
      fetchUsers();
    } catch {
      showToast("Failed to delete user", "error");
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

  const handleEditSubmit = async () => {
    try {
      await axios.put(`/user/${editUser._id}`, editUser);
      showToast("User updated!", "success");
      fetchUsers();
      setShowEditModal(false);
    } catch {
      showToast("Failed to update user", "error");
    }
  };

  const handleAddSubmit = async () => {
    try {
      await axios.post("/user", formData);
      showToast("User added!", "success");
      fetchUsers();
      setShowAddModal(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        roleId: "",
      });
    } catch {
      showToast("Failed to add user", "error");
    }
  };

  const columns = [
    { field: "index", headerName: "#", width: 70 },
    { field: "firstName", headerName: "First Name", flex: 1 },
    { field: "lastName", headerName: "Last Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1.5 },
    {
      field: "roleName",
      headerName: "Role",
      flex: 1,
      renderCell: (params) => {
        const role = params.value;
        let className = "badge-default";
        if (role === "Admin") className = "badge-admin";
        else if (role === "Survey Creator") className = "badge-creator";
        else if (role === "Respondent") className = "badge-respondent";
        return (
          <span className={`manageuser-role-badge ${className}`}>{role}</span>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div className="manageuser-action-buttons">
          <button
            className="manageuser-edit-btn"
            onClick={() => handleEditOpen(params.row)}
            title="Edit"
          >
            <FaEdit />
          </button>
          <button
            className="manageuser-delete-btn"
            onClick={() => {
              setDeleteUserId(params.row._id);
              setShowDeleteModal(true);
            }}
            title="Delete"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="manageuser-container">
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

      <div className="manageuser-actions">
        <TextField
          size="small"
          label="Search users..."
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="manageuser-buttons">
          <CSVLink data={filteredUsers} filename="users.csv">
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

      <Box className="manageuser-table-wrapper">
        <DataGrid
          rows={filteredUsers}
          columns={columns}
          pageSize={7}
          rowsPerPageOptions={[7, 15, 25]}
          autoHeight
          disableSelectionOnClick
        />
      </Box>

      <Dialog
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent className="manageuser-form">
          {["firstName", "lastName", "email"].map((field) => (
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
            />
          ))}
          <TextField
            name="password"
            label="Password"
            fullWidth
            margin="dense"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Select
            fullWidth
            name="roleId"
            value={formData.roleId}
            onChange={(e) =>
              setFormData({ ...formData, roleId: e.target.value })
            }
            displayEmpty
            sx={{ mt: 2 }}
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
          <Button variant="contained" onClick={handleAddSubmit}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent className="manageuser-form">
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
            displayEmpty
            sx={{ mt: 2 }}
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
          <Button onClick={() => setShowEditModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageUsers;
