import React from 'react';
import '../styles/Pricing.css';

const Pricing = () => {
  return (
    <section id="pricing" className="pricing-section">
      <h2 className="pricing-title">Pricing</h2>
      <div className="pricing-cards">
        <div className="pricing-card">
          <h3>Basic</h3>
          <p>Perfect for individuals and small teams.</p>
          <p className="pricing-price">$19/month</p>
          <button className="pricing-cta">Get Started</button>
        </div>
        <div className="pricing-card">
          <h3>Pro</h3>
          <p>For growing businesses and advanced features.</p>
          <p className="pricing-price">$49/month</p>
          <button className="pricing-cta">Get Started</button>
        </div>
        <div className="pricing-card">
          <h3>Enterprise</h3>
          <p>Custom solutions for large organizations.</p>
          <p className="pricing-price">Contact Us</p>
          <button className="pricing-cta">Contact Sales</button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
