import React, { useRef } from "react";
import Header from "../components/layout/Header";
import Hero from "../components/layout/Hero";
import Features from "../components/layout/Features";
import HowItWorks from "../components/layout/HowItWorks";
import Pricing from "../components/layout/Pricing";
import Industries from "../components/layout/Industries";
import Integrations from "../components/layout/Integrations";
import Resources from "../components/layout/Resources";
import FAQs from "../components/layout/FAQs";
import Footer from "../components/layout/Footer";
import "../components/styles/global.css";

const HomePage = () => {
  const sectionsRef = {
    hero: useRef(null),
    features: useRef(null),
    howItWorks: useRef(null),
    pricing: useRef(null),
    industries: useRef(null),
    integrations: useRef(null),
    resources: useRef(null),
    faqs: useRef(null),
    footer: useRef(null),
  };

  const scrollToSection = (section) => {
    const ref = sectionsRef[section];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="home-page">
      <Header scrollToSection={scrollToSection} />

      <main>
        <section ref={sectionsRef.hero} className="section">
          <Hero />
        </section>

        <section ref={sectionsRef.features} className="section">
          <Features />
        </section>

        <section ref={sectionsRef.howItWorks} className="section">
          <HowItWorks />
        </section>

        <section ref={sectionsRef.pricing} className="section">
          <Pricing />
        </section>

        <section ref={sectionsRef.industries} className="section">
          <Industries />
        </section>

        <section ref={sectionsRef.integrations} className="section">
          <Integrations />
        </section>

        <section ref={sectionsRef.resources} className="section">
          <Resources />
        </section>

        <section ref={sectionsRef.faqs} className="section">
          <FAQs />
        </section>
      </main>

      <footer ref={sectionsRef.footer}>
        <Footer />
      </footer>
    </div>
  );
};

export default HomePage;
