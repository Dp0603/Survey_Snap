import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Hero.css";

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/signup");
  };

  return (
    <section className="hero-section">
      <div className="hero-content-box">
        <h1 className="hero-heading">The Complete Survey Solution</h1>
        <p className="hero-subtext">
          Create engaging surveys, analyze data, and produce visual reports with SurveySnap.
        </p>
        <button className="hero-button" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </section>
  );
};

export default Hero;
