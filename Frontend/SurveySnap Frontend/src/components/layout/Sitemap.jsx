// import React from 'react';
// import '../styles/Sitemap.css';

// const Sitemap = () => {
//   return (
//     <div className="sitemap">
//       <h1>Sitemap</h1>
//       <div className="sitemap-sections">
//         <div className="sitemap-section">
//           <h2>Home</h2>
//           <ul>
//             <li><a href="/">Home</a></li>
//           </ul>
//         </div>

//         <div className="sitemap-section">
//           <h2>About</h2>
//           <ul>
//             <li><a href="/about/company-overview">Company Overview</a></li>
//             <li><a href="/about/leadership">Leadership</a></li>
//             <li><a href="/about/careers">Careers</a></li>
//             <li><a href="/about/security">Security</a></li>
//             <li><a href="/about/accessibility">Accessibility</a></li>
//           </ul>
//         </div>

//         <div className="sitemap-section">
//           <h2>Survey Software</h2>
//           <ul>
//             <li><a href="/survey-software/survey-creation">Survey Creation</a></li>
//             <li><a href="/survey-software/real-time-analytics">Real-Time Analytics</a></li>
//             <li><a href="/survey-software/survey-templates">Survey Templates</a></li>
//             <li><a href="/survey-software/custom-branding">Custom Branding</a></li>
//             <li><a href="/survey-software/security-features">Security Features</a></li>
//           </ul>
//         </div>

//         <div className="sitemap-section">
//           <h2>Industries</h2>
//           <ul>
//             <li><a href="/industries/education">Education</a></li>
//             <li><a href="/industries/healthcare">Healthcare</a></li>
//             <li><a href="/industries/marketing">Marketing</a></li>
//             <li><a href="/industries/research">Research</a></li>
//             <li><a href="/industries/business">Business</a></li>
//           </ul>
//         </div>

//         <div className="sitemap-section">
//           <h2>Pricing</h2>
//           <ul>
//             <li><a href="/pricing">Pricing</a></li>
//           </ul>
//         </div>

//         <div className="sitemap-section">
//           <h2>How It Works</h2>
//           <ul>
//             <li><a href="/how-it-works">How It Works</a></li>
//           </ul>
//         </div>

//         <div className="sitemap-section">
//           <h2>Testimonials</h2>
//           <ul>
//             <li><a href="/testimonials">Testimonials</a></li>
//           </ul>
//         </div>

//         <div className="sitemap-section">
//           <h2>Contact Us</h2>
//           <ul>
//             <li><a href="/contact">Contact Us</a></li>
//           </ul>
//         </div>

//         <div className="sitemap-section">
//           <h2>Resources</h2>
//           <ul>
//             <li><a href="/resources/blog">Blog</a></li>
//             <li><a href="/resources/case-studies">Case Studies</a></li>
//             <li><a href="/resources/whitepapers">Whitepapers</a></li>
//           </ul>
//         </div>

//         <div className="sitemap-section">
//           <h2>FAQs</h2>
//           <ul>
//             <li><a href="/faqs">FAQs</a></li>
//           </ul>
//         </div>

//         <div className="sitemap-section">
//           <h2>Legal</h2>
//           <ul>
//             <li><a href="/legal/privacy-policy">Privacy Policy</a></li>
//             <li><a href="/legal/legal-statement">Legal Statement</a></li>
//             <li><a href="/legal/legal-agreements">Legal Agreements</a></li>
//             <li><a href="/legal/sitemap">Sitemap</a></li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sitemap;



import React from 'react';
import '../styles/Sitemap.css';

const Sitemap = () => {
  return (
    <div className="sitemap-page">
      <h1>Site Map</h1>
      <div className="sitemap-content">
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