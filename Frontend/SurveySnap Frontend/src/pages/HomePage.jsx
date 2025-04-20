import React, { useRef, useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Hero from "../components/layout/Hero";
import Features from "../components/layout/Features";
import HowItWorks from "../components/layout/HowItWorks";
import Pricing from "../components/layout/Pricing";
import Industries from "../components/layout/Industries";
// import Integrations from "../components/layout/Integrations"; // ✅ Imported Properly
import Resources from "../components/layout/Resources";
import FAQs from "../components/layout/FAQs";
import Testimonials from "../components/layout/Testimonials";
import Footer from "../components/layout/Footer";
import "../components/styles/HomePage.css";

const HomePage = () => {
  const sections = [
    { id: "hero", component: <Hero />, title: "Welcome to SurveySnap" },
    { id: "features", component: <Features /> },
    { id: "howItWorks", component: <HowItWorks /> },
    { id: "pricing", component: <Pricing /> },
    { id: "industries", component: <Industries /> },
    // { id: "integrations", component: <Integrations /> },
    { id: "resources", component: <Resources /> },
    { id: "testimonials", component: <Testimonials /> },
    { id: "faqs", component: <FAQs /> },
  ];

  const sectionsRef = sections.reduce((acc, section) => {
    acc[section.id] = useRef(null);
    return acc;
  }, {});

  const scrollToSection = (section) => {
    const ref = sectionsRef[section];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Smooth Scroll Animation Effect
  const [visibleSections, setVisibleSections] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      Object.keys(sectionsRef).forEach((key) => {
        const section = sectionsRef[key]?.current;
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.75) {
            setVisibleSections((prev) => [...new Set([...prev, key])]);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run initially

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="homepage-container">
      <Header scrollToSection={scrollToSection} />

      <main className="homepage-main">
        {sections.map((section) => (
          <section
            key={section.id}
            ref={sectionsRef[section.id]}
            className={`homepage-section ${
              visibleSections.includes(section.id) ? "visible" : ""
            }`}
          >
            <h2>{section.title}</h2>
            {section.component}
          </section>
        ))}
      </main>

      <footer ref={sectionsRef.footer} className="homepage-footer">
        <Footer />
      </footer>
    </div>
  );
};

export default HomePage;
