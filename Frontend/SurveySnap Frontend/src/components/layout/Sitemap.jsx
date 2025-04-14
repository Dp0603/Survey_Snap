import React from 'react';
import '../styles/Sitemap.css';

const Sitemap = () => {
  return (
    <div className="sitemap-section">
      <h1 className="sitemap-title">Site Map</h1>
      <div className="sitemap-container">
        <div className="sitemap-column">
          <h2>About</h2>
          <ul>
            <li><a href="#company-overview">Company Overview</a></li>
            <li><a href="#leadership">Leadership</a></li>
            <li><a href="#careers">Careers</a></li>
            <li><a href="#research-partners">Research Partners</a></li>
            <li><a href="#security">Security, Accessibility, and Professional Outline</a></li>
            <li><a href="#collaborate">Collaborate With Us</a></li>
          </ul>
        </div>

        <div className="sitemap-column">
          <h2>Survey Software</h2>
          <ul>
            <li><a href="#survey-software">SurveySnap Survey Software</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#updates">Software Updates</a></li>
            <li><a href="#specifications">Technical Specifications</a></li>
            <li><a href="#features">Complete Feature List</a></li>
            <li><a href="#status">Service Status</a></li>
          </ul>
        </div>

        <div className="sitemap-column">
          <h2>Additional Products</h2>
          <ul>
            <li><a href="#offline-interviewer">SurveySnap Offline Interviewer</a></li>
            <li><a href="#scanning-edition">SurveySnap Scanning Edition</a></li>
            <li><a href="#enterprise">SurveySnap Enterprise</a></li>
            <li><a href="#on-premises">SurveySnap On-Premises Server Edition</a></li>
          </ul>
        </div>

        <div className="sitemap-column">
          <h2>Comparisons</h2>
          <ul>
            <li><a href="#smartsurvey">SmartSurvey</a></li>
            <li><a href="#qualtrics">Qualtrics</a></li>
            <li><a href="#survey-system">The Survey System</a></li>
          </ul>
        </div>

        <div className="sitemap-column">
          <h2>Contact Us</h2>
          <ul>
            <li>Sales: <a href="tel:02077478900">020 7747 8900</a></li>
            <li>Email: <a href="mailto:info@surveysnap.com">info@surveysnap.com</a></li>
            <li>Support: <a href="tel:01454280828">01454 280828</a></li>
            <li>Email: <a href="mailto:support@surveysnap.com">support@surveysnap.com</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
