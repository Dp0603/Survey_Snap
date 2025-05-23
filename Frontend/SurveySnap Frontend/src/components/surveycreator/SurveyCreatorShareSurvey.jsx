import React, { useEffect, useState } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import "./SurveyCreatorShareSurvey.css";
import { useToast } from "../../contexts/ToastContext"; 

const SurveyCreatorShareSurvey = () => {
  const [surveys, setSurveys] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [shareMethod, setShareMethod] = useState("");
  const { showToast } = useToast();

  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const res = await axios.get(`/survey/user/${userId}`);
        setSurveys(res.data.data);
      } catch (error) {
        console.error("Error fetching surveys", error);
        showToast("Failed to load surveys!", "error");
      }
    };
    fetchSurveys();
  }, [userId, showToast]);

  const handleShare = (survey) => {
    setSelectedSurvey(survey);
    setShowModal(true);
  };

  const handleSubmitShare = async () => {
    if (!recipient || !shareMethod) {
      return showToast(
        "Please enter recipient and select share method.",
        "error"
      );
    }

    try {
      await axios.post("/share/share/survey", {
        surveyId: selectedSurvey._id,
        recipient,
        method: shareMethod,
      });

      showToast("Survey shared successfully! 🎉", "success");
      setShowModal(false);
      setRecipient("");
      setShareMethod("");
    } catch (error) {
      console.error("Sharing failed", error);
      showToast("Failed to share survey. Please try again.", "error");
    }
  };

  return (
    <div className="survey-creator-share">
      <h2>Share Your Surveys</h2>
      <table className="share-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {surveys.map((survey) => (
            <tr key={survey._id}>
              <td>{survey.title}</td>
              <td>{survey.description}</td>
              <td>{survey.status}</td>
              <td>
                <button
                  className="share-btn"
                  onClick={() => handleShare(survey)}
                >
                  Share
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && selectedSurvey && (
        <div className="modal-overlay">
          <div className="share-modal">
            <h3>Share "{selectedSurvey.title}"</h3>
            <p>
              Survey Link:{" "}
              <a
                href={`https://surveysnap.com/survey/${selectedSurvey._id}`}
                target="_blank"
                rel="noreferrer"
              >
                https://surveysnap.com/survey/{selectedSurvey._id}
              </a>
            </p>

            <QRCodeCanvas
              value={`https://surveysnap.com/survey/${selectedSurvey._id}`}
              size={150}
              className="qr-code"
            />

            <input
              type="text"
              placeholder="Enter recipient (email or phone)"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />

            <select
              value={shareMethod}
              onChange={(e) => setShareMethod(e.target.value)}
            >
              <option value="">-- Select Method --</option>
              <option value="email">Email</option>
              <option value="sms">SMS</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="facebook">Facebook</option>
              <option value="twitter">Twitter</option>
            </select>

            <div className="modal-actions">
              <button className="submit-btn" onClick={handleSubmitShare}>
                Share Now
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveyCreatorShareSurvey;
