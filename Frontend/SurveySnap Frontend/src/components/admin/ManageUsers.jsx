import React, { useState } from "react";
import "./ManageUsers.css";

const ManageUsers = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", role: "Survey Creator", email: "john@example.com" },
    { id: 2, name: "Jane Smith", role: "Respondent", email: "jane@example.com" }
  ]);

  return (
    <div className="admin-content">
      <h2>Manage Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
