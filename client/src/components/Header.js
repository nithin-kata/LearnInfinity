import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiCreditCard } from 'react-icons/fi';
import LogoutButton from './LogoutButton';
import './Header.css';

const Header = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <motion.header
      className="app-header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="header-content">
        <div className="header-user">
          <motion.button
            className="header-profile-btn"
            onClick={handleProfileClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="header-avatar">
              <FiUser />
            </div>
            <div className="header-user-info">
              <span className="header-username">{user.name}</span>
              <div className="header-credits">
                <FiCreditCard />
                <span>{user.credits} credits</span>
              </div>
            </div>
          </motion.button>
        </div>

        <div className="header-actions">
          <LogoutButton 
            variant="ghost" 
            size="small" 
            showConfirmation={true}
          />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;