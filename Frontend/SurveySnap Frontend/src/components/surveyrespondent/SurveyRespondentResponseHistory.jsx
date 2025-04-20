// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./SurveyRespondentResponseHistory.css";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const SurveyRespondentResponseHistory = () => {
//   const [responses, setResponses] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userId = localStorage.getItem("id");
//     if (!userId) {
//       toast.error("You must be logged in to view your response history!");
//       navigate("/login");
//     } else {
//       fetchResponseHistory(userId);
//     }
//   }, [navigate]);

//   const fetchResponseHistory = async (userId) => {
//     try {
//       const response = await axios.get(`/responses/stats/${userId}`);
//       const filled = response.data?.filledDetails || [];
//       setResponses(filled);
//     } catch (error) {
//       toast.error("Failed to fetch response history! ❌");
//       console.error("Error fetching responses:", error);
//       setResponses([]);
//     }
//   };

//   return (
//     <div className="survey-history-container">
//       <h2>🧾 Your Survey Response History</h2>

//       {responses.length === 0 ? (
//         <p>No survey responses yet.</p>
//       ) : (
//         <ul className="response-list">
//           {responses.map((response, index) => (
//             <li key={index} className="response-item">
//               <h3>{response.surveyTitle}</h3>
//               <p>
//                 <strong>Status:</strong> {response.status}
//               </p>
//               <p>
//                 <strong>Submitted on:</strong> {response.submittedOn}
//               </p>
//               <button
//                 className="view-btn"
//                 onClick={() =>
//                   navigate(
//                     `/respondent-dashboard/response-history/view-response/${response.id}`
//                   )
//                 }
//               >
//                 View Responses
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}

//       <ToastContainer position="top-center" />
//     </div>
//   );
// };

// export default SurveyRespondentResponseHistory;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SurveyRespondentResponseHistory.css"; // Create this CSS file for styling if needed
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SurveyRespondentResponseHistory = () => {
  const [responses, setResponses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("id");
    if (!userId) {
      toast.error("You must be logged in to view your response history!");
      navigate("/login");
    } else {
      fetchResponseHistory(userId);
    }
  }, [navigate]);

  const fetchResponseHistory = async (userId) => {
    try {
      const response = await axios.get(`/responses/stats/${userId}`);
      setResponses(response.data);
    } catch (error) {
      toast.error("Failed to fetch response history! ❌");
      console.error("Error fetching responses:", error);
    }
  };

  return (
    <div className="survey-history-container">
      <h2>🧾 Your Survey Response History</h2>
      {responses.length === 0 ? (
        <p>No survey responses yet.</p>
      ) : (
        <ul className="response-list">
          {responses.map(
            (response, index) => (
              console.log("Response object:", response),
              (
                <li key={index} className="response-item">
                  <h3>{response.surveyTitle}</h3>
                  <p>
                    <strong>Status:</strong> {response.status}
                  </p>
                  <p>
                    <strong>Submitted on:</strong> {response.submittedOn}
                  </p>
                  <button
                    className="view-btn"
                    onClick={() =>
                      navigate(
                        `/respondent-dashboard/response-history/view-response/${response._id}`
                      )
                    }
                  >
                    View Responses
                  </button>
                </li>
              )
            )
          )}
        </ul>
      )}

      <ToastContainer position="top-center" />
    </div>
  );
};

export default SurveyRespondentResponseHistory;
