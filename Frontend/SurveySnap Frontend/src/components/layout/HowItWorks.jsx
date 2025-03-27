import React from 'react';
import '../styles/HowItWorks.css';

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="how-it-works-section">
      <h2 className="how-it-works-title">How It Works</h2>
      <div className="how-it-works-steps">
        <div className="how-it-works-step">
          <h3>1. Create</h3>
          <p>Design your survey using our intuitive drag-and-drop builder. Choose from multiple question types and templates.</p>
        </div>
        <div className="how-it-works-step">
          <h3>2. Distribute</h3>
          <p>Share your survey via email, social media, or embed it on your website. Reach your audience anywhere, anytime.</p>
        </div>
        <div className="how-it-works-step">
          <h3>3. Analyze</h3>
          <p>Get real-time insights with powerful analytics and visual reports. Export data in CSV, Excel, or PDF formats.</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
