import React from 'react';
import '../styles/Testimonials.css';

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <h2 className="testimonials-title">Trusted by Organizations Worldwide</h2>
      <div className="testimonials-cards">
        <div className="testimonials-card animated-testimonials-card">
          <p>“SurveySnap has transformed the way we collect and analyze feedback. It’s an essential tool for our business.”</p>
          <p><strong>— John Doe, CEO of Example Corp</strong></p>
        </div>
        <div className="testimonials-card animated-testimonials-card">
          <p>“The platform is intuitive, powerful, and delivers actionable insights every time.”</p>
          <p><strong>— Jane Smith, Director of Research</strong></p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
