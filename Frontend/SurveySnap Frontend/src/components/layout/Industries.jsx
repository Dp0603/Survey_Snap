import React from 'react';
import '../styles/Industries.css';

const Industries = () => {
  return (
    <section id="industries" className="industries">
      <h2 className="section-title">Industries We Serve</h2>
      <div className="industry-cards">
        <div className="card">
          <h3>Education</h3>
          <p>Collect feedback from students, teachers, and parents.</p>
        </div>
        <div className="card">
          <h3>Healthcare</h3>
          <p>Improve patient satisfaction and staff engagement.</p>
        </div>
        <div className="card">
          <h3>Marketing</h3>
          <p>Conduct market research and analyze customer feedback.</p>
        </div>
      </div>
    </section>
  );
};

export default Industries;