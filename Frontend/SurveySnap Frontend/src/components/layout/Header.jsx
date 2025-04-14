import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/Header.css";

const Header = ({ scrollToSection }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get user data from localStorage (or use Context API if needed)
  const user = JSON.parse(localStorage.getItem("user"));

  // Define the pages where the navbar should be visible
  const showNavbar =
    location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup";

  // Hide Navbar on Admin Dashboard and Other Admin Pages
  if (!showNavbar) return null;

  return (
    <motion.header 
      className="header-ss"
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6 }}
    >
      {/* Logo */}
      <Link to="/">
        <h2 className="header-ss-logo">SurveySnap</h2>
      </Link>

      {/* If on Login/Signup page, show only Home & Switch Auth */}
      {location.pathname === "/login" || location.pathname === "/signup" ? (
        <div className="header-ss-auth-nav">
          <button className="header-ss-back-home" onClick={() => navigate("/")}>🏠 Back to Home</button>
          <button 
            className="header-ss-switch-auth" 
            onClick={() => navigate(location.pathname === "/login" ? "/signup" : "/login")}
          >
            {location.pathname === "/login" ? "Sign Up" : "Login"}
          </button>
        </div>
      ) : (
        <>
          {/* Navigation Links */}
          <nav className="header-ss-nav">
            <ul>
              <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button onClick={() => scrollToSection("features")}>Features</button>
              </motion.li>
              <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button onClick={() => scrollToSection("howItWorks")}>How It Works</button>
              </motion.li>
              <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button onClick={() => scrollToSection("pricing")}>Pricing</button>
              </motion.li>
              <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button onClick={() => scrollToSection("footer")}>Contact</button>
              </motion.li>

              {/* Admin Panel Link (Visible Only for Admins) */}
              {user?.role === "admin" && (
                <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <button onClick={() => navigate("/admin-dashboard")}>Admin Panel</button>
                </motion.li>
              )}
            </ul>
          </nav>

          {/* Authentication Buttons */}
          <div className="header-ss-auth-buttons">
            <motion.button 
              onClick={() => navigate("/login")} 
              className="header-ss-login-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
            <motion.button 
              onClick={() => navigate("/signup")} 
              className="header-ss-signup-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up
            </motion.button>
          </div>
        </>
      )}
    </motion.header>
  );
};

export default Header;
