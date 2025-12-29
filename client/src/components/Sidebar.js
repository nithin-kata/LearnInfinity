import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiHome, FiStar, FiUsers, FiMessageCircle, FiMenu, FiX } from 'react-icons/fi';
import './Sidebar.css';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Home', icon: FiHome },
    { id: 'features', label: 'Features', icon: FiStar },
    { id: 'how-it-works', label: 'How It Works', icon: FiUsers },
    { id: 'contact', label: 'Contact', icon: FiMessageCircle },
  ];

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 40
      }
    },
    closed: {
      x: -280,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 40
      }
    }
  };

  const itemVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    },
    closed: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        className="mobile-menu-btn"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </motion.button>

      {/* Sidebar */}
      <motion.nav
        className="sidebar"
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
      >
        <div className="sidebar-content">
          {/* Logo */}
          <motion.div
            className="logo"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="logo-container">
              <div className="logo-icon">∞</div>
              <div className="logo-text">
                <span className="logo-learn">Learn</span>
                <span className="logo-infinity">Infinity</span>
              </div>
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Trade Skills, Not Cash
          </motion.p>

          {/* Navigation Menu */}
          <motion.ul
            className="nav-menu"
            variants={{
              open: {
                transition: { staggerChildren: 0.07, delayChildren: 0.2 }
              },
              closed: {
                transition: { staggerChildren: 0.05, staggerDirection: -1 }
              }
            }}
          >
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.li
                  key={item.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                    onClick={() => handleNavClick(item.id)}
                  >
                    <Icon className="nav-icon" />
                    <span>{item.label}</span>
                  </button>
                </motion.li>
              );
            })}
          </motion.ul>

          {/* CTA Button */}
          <motion.div
            className="sidebar-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              className="cta-button"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(255, 215, 0, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="sidebar-decoration">
          <motion.div
            className="decoration-circle"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.nav>

      {/* Overlay for mobile */}
      {isOpen && (
        <motion.div
          className="sidebar-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;