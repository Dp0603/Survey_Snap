import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/Hero.css";

const Hero = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleGetStarted = () => {
    navigate("/signup"); // Navigate to the signup page
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="animated-text">The Complete Survey Solution</h1>
        <p className="animated-subtext">
          Create engaging surveys, analyze data, and produce visual reports with SurveySnap.
        </p>
        <button className="cta animated-button" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </section>
  );
};

export default Hero;
