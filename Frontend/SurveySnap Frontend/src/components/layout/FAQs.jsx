import React from 'react';
import '../styles/FAQs.css';

const FAQs = () => {
  return (
    <section id="faqs" className="faqs-section">
      <h2 className="faqs-title">FAQs</h2>
      <div className="faqs-list">
        <div className="faqs-item">
          <h3>How do I create a survey?</h3>
          <p>Use our drag-and-drop builder to create surveys in minutes.</p>
        </div>
        <div className="faqs-item">
          <h3>Can I customize my survey?</h3>
          <p>Yes, you can add your branding and customize themes.</p>
        </div>
        <div className="faqs-item">
          <h3>How do I analyze results?</h3>
          <p>Use our real-time analytics and export data in multiple formats.</p>
        </div>
      </div>
    </section>
  );
};

export default FAQs;
