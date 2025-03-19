import React from 'react';
import '../styles/Pricing.css';

const Pricing = () => {
  return (
    <section id="pricing" className="pricing">
      <h2 className="section-title">Pricing</h2>
      <div className="pricing-cards">
        <div className="card">
          <h3>Basic</h3>
          <p>Perfect for individuals and small teams.</p>
          <p className="price">$19/month</p>
          <button className="cta">Get Started</button>
        </div>
        <div className="card">
          <h3>Pro</h3>
          <p>For growing businesses and advanced features.</p>
          <p className="price">$49/month</p>
          <button className="cta">Get Started</button>
        </div>
        <div className="card">
          <h3>Enterprise</h3>
          <p>Custom solutions for large organizations.</p>
          <p className="price">Contact Us</p>
          <button className="cta">Contact Sales</button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;