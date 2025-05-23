import React from 'react';
import '../styles/Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-site-index">
        <h2 className="footer-site-index-title">
          <Link to="/sitemap">Site Index</Link>
        </h2>
        <div className="footer-site-index-table">
          <div className="footer-site-index-column">
            <h3>About</h3>
            <ul>
              <li><a href="#company-overview">Company Overview</a></li>
              <li><a href="#leadership">Leadership</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#research-partners">Research Partners</a></li>
              <li><a href="#security">Security, Accessibility, and Professional Outline</a></li>
              <li><a href="#collaborate">Collaborate With Us</a></li>
            </ul>
          </div>

          <div className="footer-site-index-column">
            <h3>Survey Software</h3>
            <ul>
              <li><a href="#survey-software">SurveySnap Survey Software</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#updates">Software Updates</a></li>
              <li><a href="#specifications">Technical Specifications</a></li>
              <li><a href="#features">Complete Feature List</a></li>
              <li><a href="#status">Service Status</a></li>
            </ul>
          </div>

          <div className="footer-site-index-column">
            <h3>Additional Products</h3>
            <ul>
              <li><a href="#offline-interviewer">SurveySnap Offline Interviewer</a></li>
              <li><a href="#scanning-edition">SurveySnap Scanning Edition</a></li>
              <li><a href="#enterprise">SurveySnap Enterprise</a></li>
              <li><a href="#on-premises">SurveySnap On-Premises Server Edition</a></li>
            </ul>
          </div>

          <div className="footer-site-index-column">
            <h3>Comparisons</h3>
            <ul>
              <li><a href="#smartsurvey">SmartSurvey</a></li>
              <li><a href="#qualtrics">Qualtrics</a></li>
              <li><a href="#survey-system">The Survey System</a></li>
            </ul>
          </div>

          <div className="footer-site-index-column">
            <h3>Contact Us</h3>
            <ul>
              <li>Sales: <a href="tel:999999999">+91 9999999999</a></li>
              <li>Email: <a href="mailto:info@surveysnap.com">info@surveysnap.com</a></li>
              <li>Support: <a href="tel:0123456789">+91 0123456789</a></li>
              <li>Email: <a href="mailto:support@surveysnap.com">support@surveysnap.com</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-connect">
        <h3>Connect with Us</h3>
        <div className="footer-social-icons">
          <a href="#facebook"><img src="/icons/facebook.png" alt="Facebook" /></a>
          <a href="#linkedin"><img src="/icons/linkedin.png" alt="LinkedIn" /></a>
          <a href="#twitter"><img src="/icons/twitter.png" alt="Twitter" /></a>
          <a href="#youtube"><img src="/icons/youtube.png" alt="YouTube" /></a>
          <a href="#instagram"><img src="/icons/instagram.png" alt="Instagram" /></a>
        </div>
        <div className="footer-updates">
          <input type="checkbox" id="updates" />
          <label htmlFor="updates">Get regular updates</label>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright © 2025 SurveySnap. All rights reserved worldwide.</p>
        <ul>
          <li><a href="#privacy-policy">Privacy Policy</a></li>
          <li><a href="#legal-statement">Legal Statement</a></li>
          <li><a href="#legal-agreements">Legal Agreements</a></li>
          <li><Link to="/sitemap">Sitemap</Link></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
