import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FiLogOut, FiX, FiCheck } from 'react-icons/fi';
import './LogoutButton.css';

const LogoutButton = ({ 
  variant = 'default', 
  size = 'medium', 
  showConfirmation = true,
  onLogout,
  className = '',
  children 
}) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    if (showConfirmation) {
      setShowLogoutConfirm(true);
    } else {
      performLogout();
    }
  };

  const performLogout = () => {
    logout();
    if (onLogout) {
      onLogout();
    } else {
      navigate('/');
    }
    setShowLogoutConfirm(false);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const getButtonClass = () => {
    let baseClass = 'logout-button';
    if (variant) baseClass += ` logout-button-${variant}`;
    if (size) baseClass += ` logout-button-${size}`;
    if (className) baseClass += ` ${className}`;
    return baseClass;
  };

  return (
    <>
      <motion.button
        className={getButtonClass()}
        onClick={handleLogout}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FiLogOut />
        {children || 'Logout'}
      </motion.button>

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
                  onClick={performLogout}
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
    </>
  );
};

export default LogoutButton;