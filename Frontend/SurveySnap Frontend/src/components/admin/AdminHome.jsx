import React, { useEffect, useState } from "react";
import { FaUsers, FaChartBar, FaFileAlt } from "react-icons/fa";
import "./AdminHome.css"; // Ensure this CSS is properly linked
import axios from "axios";

const AdminHome = () => {
  const [userCount, setUserCount] = useState(0);
  const [surveyCount, setSurveyCount] = useState(0);

  // useEffect(() => {
  //   const fetchUserCount = async () => {
  //     try {
  //       const response = await axios.get("/users"); // Ensure the correct API endpoint
  //       console.log("API Response:", response.data); // Debugging

  //       if (response.data.data) {
  //         setUserCount(response.data.data.length);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user count:", error);
  //     }
  //   };

  //   fetchUserCount();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Users Count
        const usersResponse = await axios.get("/users");
        if (usersResponse.data.data) {
          setUserCount(usersResponse.data.data.length);
        }

        // Fetch Surveys Count
        const surveysResponse = await axios.get("/survey/all");
        if (surveysResponse.data.data) {
          setSurveyCount(surveysResponse.data.data.length);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="admin-home-container">
      <h1 className="admin-home-title">Welcome, Admin 👨‍💼</h1>
      <p className="admin-home-subtitle">
        Manage users, surveys, and reports efficiently.
      </p>

      <div className="admin-home-stats">
        {/* Users Card */}
        <div className="admin-home-stat-card admin-home-users">
          <FaUsers className="admin-home-stat-icon" />
          <div className="admin-home-stat-info">
            <h3>{userCount}</h3>
            <p>Total Users</p>
          </div>
        </div>

        {/* Surveys Card */}
        <div className="admin-home-stat-card admin-home-surveys">
          <FaChartBar className="admin-home-stat-icon" />
          <div className="admin-home-stat-info">
            <h3>{surveyCount}</h3>
            <p>Total Surveys</p>
          </div>
        </div>

        {/* Reports Card */}
        <div className="admin-home-stat-card admin-home-reports">
          <FaFileAlt className="admin-home-stat-icon" />
          <div className="admin-home-stat-info">
            <h3>12,000</h3>
            <p>Total Reports</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
