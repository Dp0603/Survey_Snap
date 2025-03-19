import React from 'react';
import '../styles/Features.css';

const Features = () => {
  return (
    <section id="features" className="features">
      <h2 className="section-title">Features</h2>
      <div className="feature-cards">
        <div className="card animated-card">
          <h3>Create</h3>
          <p>Build surveys with interactive question types and sophisticated logic.</p>
        </div>
        <div className="card animated-card">
          <h3>Collaborate</h3>
          <p>Work smarter with your team and clients in real-time.</p>
        </div>
        <div className="card animated-card">
          <h3>Analyze</h3>
          <p>Get actionable insights with real-time analytics and visual reports.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;