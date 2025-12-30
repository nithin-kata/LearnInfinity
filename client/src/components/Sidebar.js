import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiHome, FiStar, FiUsers, FiCompass, FiAward, FiMessageCircle, FiMenu, FiX, FiUser, FiVideo } from 'react-icons/fi';
import LogoutButton from './LogoutButton';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const menuItems = [
    { id: '/', label: 'Home', icon: FiHome },
    { id: '/features', label: 'Features', icon: FiStar },
    { id: '/how-it-works', label: 'How It Works', icon: FiUsers },
    { id: '/explore-skills', label: 'Explore Skills', icon: FiCompass },
    { id: '/top-instructors', label: 'Top Instructors', icon: FiAward },
    { id: '/become-creator', label: 'Become Creator', icon: FiVideo },
    { id: '/profile', label: 'Profile', icon: FiUser },
    { id: '/contact', label: 'Contact', icon: FiMessageCircle },
  ];

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

  const handleNavClick = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleGetStarted = () => {
    navigate('/auth');
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
      <nav className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
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
                    className={`nav-item ${location.pathname === item.id ? 'active' : ''}`}
                    onClick={() => handleNavClick(item.id)}
                  >
                    <Icon className="nav-icon" />
                    <span>{item.label}</span>
                  </button>
                </motion.li>
              );
            })}
          </motion.ul>

          {/* CTA Button or Logout */}
          {isAuthenticated ? (
            <motion.div
              className="sidebar-logout"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <LogoutButton 
                variant="ghost" 
                size="small" 
                className="sidebar-logout-btn"
                showConfirmation={true}
              >
                Logout Account
              </LogoutButton>
            </motion.div>
          ) : (
            <motion.div
              className="sidebar-cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                className="cta-button"
                onClick={handleGetStarted}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(255, 215, 0, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </motion.div>
          )}
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
      </nav>

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