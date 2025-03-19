import React from 'react';
import '../styles/Integrations.css';

const Integrations = () => {
  return (
    <section id="integrations" className="integrations">
      <h2 className="section-title">Integrations</h2>
      <div className="integration-cards">
        <div className="card">
          <h3>CRM</h3>
          <p>Sync survey data with your CRM for better insights.</p>
        </div>
        <div className="card">
          <h3>Email Marketing</h3>
          <p>Send surveys directly to your email list.</p>
        </div>
        <div className="card">
          <h3>Analytics</h3>
          <p>Integrate with analytics tools for deeper analysis.</p>
        </div>
      </div>
    </section>
  );
};

export default Integrations;