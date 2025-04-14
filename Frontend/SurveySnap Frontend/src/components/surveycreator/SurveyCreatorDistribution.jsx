import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./SurveyCreatorDistribution.css";

const SurveyCreatorDistribution = ({ surveyId }) => {
  const [email, setEmail] = useState("");
  const [shareLink, setShareLink] = useState(`https://yoursite.com/survey/${surveyId}`);
  const [showQR, setShowQR] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");

  const handleEmailShare = async () => {
    try {
      const res = await fetch("/distribution/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          survey_id: surveyId,
          distributed_to: email,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Survey shared via email successfully!");
        setEmail("");
      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
      alert("An error occurred: " + err.message);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopySuccess("Copied!");
    setTimeout(() => setCopySuccess(""), 2000);
  };

  const handleTwitterShare = () => {
    const twitterURL = `https://twitter.com/intent/tweet?text=Take%20my%20survey!&url=${encodeURIComponent(shareLink)}`;
    window.open(twitterURL, "_blank");
  };

  const handleFacebookShare = () => {
    const fbURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`;
    window.open(fbURL, "_blank");
  };

  return (
    <div className="survey-dist-container">
      <h2 className="survey-dist-title">Distribute Your Survey</h2>

      {/* Email Share */}
      <div className="survey-dist-email">
        <input
          type="email"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="survey-dist-email-input"
        />
        <button onClick={handleEmailShare} className="survey-dist-email-btn">
          Send via Email
        </button>
      </div>

      {/* Copy Link */}
      <div className="survey-dist-link-section">
        <input
          type="text"
          value={shareLink}
          readOnly
          className="survey-dist-link-input"
        />
        <button onClick={handleCopyLink} className="survey-dist-copy-btn">
          Copy Link
        </button>
        {copySuccess && <span className="survey-dist-copy-msg">{copySuccess}</span>}
      </div>

      {/* QR Code */}
      <div className="survey-dist-qr-section">
        <button onClick={() => setShowQR(!showQR)} className="survey-dist-qr-btn">
          {showQR ? "Hide QR Code" : "Generate QR Code"}
        </button>
        {showQR && (
          <div className="survey-dist-qr-display">
            <QRCodeCanvas value={shareLink} size={180} />
          </div>
        )}
      </div>

      {/* Social Media */}
      <div className="survey-dist-social">
        <button onClick={handleTwitterShare} className="survey-dist-twitter-btn">
          Share on Twitter
        </button>
        <button onClick={handleFacebookShare} className="survey-dist-fb-btn">
          Share on Facebook
        </button>
      </div>
    </div>
  );
};

export default SurveyCreatorDistribution;
