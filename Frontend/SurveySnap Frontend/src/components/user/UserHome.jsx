import React from "react";
import { FaUser, FaPoll, FaChartLine } from "react-icons/fa";
import "./UserHome.css"; 

const UserHome = () => {
  return (
    <div className="user-home-container">
      <h1 className="user-home-title">Welcome, User 👋</h1>
      <p className="user-home-subtitle">Participate in surveys, view your progress, and check your reports.</p>

      <div className="user-home-stats">
        <div className="user-home-stat-card user-home-profile">
          <FaUser className="user-home-stat-icon" />
          <div className="user-home-stat-info">
            <h3>John Doe</h3>
            <p>Your Profile</p>
          </div>
        </div>

        <div className="user-home-stat-card user-home-surveys">
          <FaPoll className="user-home-stat-icon" />
          <div className="user-home-stat-info">
            <h3>15</h3>
            <p>Surveys Taken</p>
          </div>
        </div>

        <div className="user-home-stat-card user-home-progress">
          <FaChartLine className="user-home-stat-icon" />
          <div className="user-home-stat-info">
            <h3>75%</h3>
            <p>Survey Completion</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;