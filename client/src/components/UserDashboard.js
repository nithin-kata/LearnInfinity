import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiCreditCard, FiTrendingUp, FiAward, FiLogOut, FiSettings, FiX, FiCheck } from 'react-icons/fi';
import './UserDashboard.css';

const UserDashboard = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    logout();
    navigate('/');
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const handleViewProfile = () => {
    navigate('/profile');
  };

  const handleEarnCredit = () => {
    // Navigate to a page where users can offer their skills to teach
    navigate('/profile?tab=skills-offered');
  };

  const handleFindSkills = () => {
    // Navigate to explore skills page
    navigate('/explore-skills');
  };

  return (
    <motion.div
      className="user-dashboard"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="dashboard-header">
        <div className="user-info">
          <div className="user-avatar">
            <FiUser />
          </div>
          <div className="user-details">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        </div>
        <div className="user-actions">
          <motion.button
            className="profile-btn"
            onClick={handleViewProfile}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiSettings />
          </motion.button>
          <motion.button
            className="logout-btn"
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiLogOut />
          </motion.button>
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <FiCreditCard />
          </div>
          <div className="stat-info">
            <span className="stat-value">{user.credits}</span>
            <span className="stat-label">Credits</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FiTrendingUp />
          </div>
          <div className="stat-info">
            <span className="stat-value">{user.stats?.sessionsCompleted || 0}</span>
            <span className="stat-label">Sessions</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FiAward />
          </div>
          <div className="stat-info">
            <span className="stat-value">{user.stats?.rating || 5.0}</span>
            <span className="stat-label">Rating</span>
          </div>
        </div>
      </div>

      <div className="dashboard-actions">
        <motion.button
          className="action-btn primary"
          onClick={handleFindSkills}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Find Skills to Learn
        </motion.button>
        <motion.button
          className="action-btn secondary"
          onClick={handleEarnCredit}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Earn Credit (Teach)
        </motion.button>
      </div>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            className="logout-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={cancelLogout}
          >
            <motion.div
              className="logout-modal"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Confirm Logout</h3>
              <p>Are you sure you want to logout from your account?</p>
              <div className="modal-actions">
                <motion.button
                  className="btn-confirm"
                  onClick={confirmLogout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiCheck /> Yes, Logout
                </motion.button>
                <motion.button
                  className="btn-cancel-modal"
                  onClick={cancelLogout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiX /> Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default UserDashboard;