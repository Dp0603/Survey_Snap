import React from 'react';
import '../styles/Resources.css';

const Resources = () => {
  return (
    <section id="resources" className="resources">
      <h2 className="section-title">Resources</h2>
      <div className="resource-cards">
        <div className="card">
          <h3>Blog</h3>
          <p>Read our latest articles on survey best practices.</p>
        </div>
        <div className="card">
          <h3>Case Studies</h3>
          <p>Learn how others are using SurveySnap.</p>
        </div>
        <div className="card">
          <h3>Whitepapers</h3>
          <p>Download in-depth guides and reports.</p>
        </div>
      </div>
    </section>
  );
};

export default Resources;