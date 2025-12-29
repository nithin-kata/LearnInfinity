import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authAPI } from '../services/api';
import { 
  FiUser, 
  FiMail, 
  FiCalendar, 
  FiCreditCard, 
  FiStar, 
  FiTrendingUp, 
  FiBookOpen,
  FiEdit3,
  FiPlus,
  FiTrash2,
  FiSave,
  FiX,
  FiAward,
  FiClock,
  FiTarget,
  FiLogOut
} from 'react-icons/fi';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, isAuthenticated, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [newSkill, setNewSkill] = useState({
    skill: '',
    category: '',
    level: 'Beginner',
    description: ''
  });
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    if (user) {
      setEditedUser({
        name: user.name,
        email: user.email
      });
    }
    
    // Check for tab parameter in URL
    const tabParam = searchParams.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [isAuthenticated, user, navigate, searchParams]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing
      setEditedUser({
        name: user.name,
        email: user.email
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await authAPI.updateProfile(editedUser);
      if (response.success) {
        updateUser(response.user);
        setIsEditing(false);
      }
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = async (type) => {
    if (!newSkill.skill || !newSkill.category) {
      setError('Please fill in skill name and category');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await authAPI.addSkill({
        ...newSkill,
        type
      });
      
      if (response.success) {
        updateUser(response.user);
        setNewSkill({ skill: '', category: '', level: 'Beginner', description: '' });
        setShowAddSkill(false);
      }
    } catch (err) {
      setError(err.message || 'Failed to add skill');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveSkill = async (type, index) => {
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.removeSkill(type, index);
      if (response.success) {
        updateUser(response.user);
      }
    } catch (err) {
      setError(err.message || 'Failed to remove skill');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const skillCategories = [
    'Programming', 'Design', 'Marketing', 'Business', 'Language', 
    'Music', 'Art', 'Writing', 'Science', 'Mathematics', 'Other'
  ];

  return (
    <div className="profile-page">
      <motion.div
        className="profile-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Profile Header */}
        <motion.div className="profile-header" variants={itemVariants}>
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          <div className="profile-avatar">
            <FiUser />
          </div>
          <div className="profile-info">
            {isEditing ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={editedUser.name}
                  onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                  className="edit-input"
                  placeholder="Full Name"
                />
                <input
                  type="email"
                  value={editedUser.email}
                  onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                  className="edit-input"
                  placeholder="Email Address"
                />
              </div>
            ) : (
              <>
                <h1>{user.name}</h1>
                <p className="profile-email">
                  <FiMail /> {user.email}
                </p>
                <p className="profile-joined">
                  <FiCalendar /> Joined {formatDate(user.joinedDate)}
                </p>
              </>
            )}
          </div>
          <div className="profile-actions">
            {isEditing ? (
              <>
                <motion.button
                  className="btn-save"
                  onClick={handleSaveProfile}
                  disabled={loading}
                  whileHover={!loading ? { scale: 1.05 } : {}}
                  whileTap={!loading ? { scale: 0.95 } : {}}
                >
                  <FiSave /> {loading ? 'Saving...' : 'Save'}
                </motion.button>
                <motion.button
                  className="btn-cancel"
                  onClick={handleEditToggle}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiX /> Cancel
                </motion.button>
              </>
            ) : (
              <>
                <motion.button
                  className="btn-edit"
                  onClick={handleEditToggle}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiEdit3 /> Edit Profile
                </motion.button>
                <motion.button
                  className="btn-logout"
                  onClick={handleLogout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiLogOut /> Logout
                </motion.button>
              </>
            )}
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div className="profile-stats" variants={itemVariants}>
          <div className="stat-card">
            <div className="stat-icon">
              <FiCreditCard />
            </div>
            <div className="stat-content">
              <span className="stat-value">{user.credits}</span>
              <span className="stat-label">Credits Available</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FiTrendingUp />
            </div>
            <div className="stat-content">
              <span className="stat-value">{user.stats?.sessionsCompleted || 0}</span>
              <span className="stat-label">Sessions Completed</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FiClock />
            </div>
            <div className="stat-content">
              <span className="stat-value">{user.stats?.totalHoursTaught || 0}</span>
              <span className="stat-label">Hours Taught</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FiBookOpen />
            </div>
            <div className="stat-content">
              <span className="stat-value">{user.stats?.totalHoursLearned || 0}</span>
              <span className="stat-label">Hours Learned</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FiStar />
            </div>
            <div className="stat-content">
              <span className="stat-value">{user.stats?.rating || 5.0}</span>
              <span className="stat-label">Rating</span>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div className="profile-tabs" variants={itemVariants}>
          <button
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <FiUser /> Overview
          </button>
          <button
            className={`tab-btn ${activeTab === 'skills-offered' ? 'active' : ''}`}
            onClick={() => setActiveTab('skills-offered')}
          >
            <FiAward /> Skills I Offer
          </button>
          <button
            className={`tab-btn ${activeTab === 'skills-learning' ? 'active' : ''}`}
            onClick={() => setActiveTab('skills-learning')}
          >
            <FiTarget /> Skills I'm Learning
          </button>
        </motion.div>

        {/* Tab Content */}
        <motion.div className="profile-content" variants={itemVariants}>
          {activeTab === 'overview' && (
            <div className="overview-content">
              <div className="overview-section">
                <h3>Account Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Member Since</span>
                    <span className="info-value">{formatDate(user.joinedDate)}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Last Login</span>
                    <span className="info-value">{user.lastLogin ? formatDate(user.lastLogin) : 'N/A'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Account Status</span>
                    <span className="info-value status-active">Active</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Skills Offered</span>
                    <span className="info-value">{user.skillsOffered?.length || 0}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Skills Learning</span>
                    <span className="info-value">{user.skillsLearning?.length || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'skills-offered' && (
            <div className="skills-content">
              <div className="skills-header">
                <h3>Skills I Can Teach</h3>
                <motion.button
                  className="btn-add-skill"
                  onClick={() => setShowAddSkill(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiPlus /> Add Skill
                </motion.button>
              </div>

              {showAddSkill && (
                <motion.div
                  className="add-skill-form"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="form-row">
                    <input
                      type="text"
                      placeholder="Skill name (e.g., React Development)"
                      value={newSkill.skill}
                      onChange={(e) => setNewSkill({ ...newSkill, skill: e.target.value })}
                    />
                    <select
                      value={newSkill.category}
                      onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                    >
                      <option value="">Select Category</option>
                      {skillCategories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-row">
                    <select
                      value={newSkill.level}
                      onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Brief description (optional)"
                      value={newSkill.description}
                      onChange={(e) => setNewSkill({ ...newSkill, description: e.target.value })}
                    />
                  </div>
                  <div className="form-actions">
                    <button onClick={() => handleAddSkill('offered')} className="btn-save">
                      Add Skill
                    </button>
                    <button onClick={() => setShowAddSkill(false)} className="btn-cancel">
                      Cancel
                    </button>
                  </div>
                </motion.div>
              )}

              <div className="skills-grid">
                {user.skillsOffered?.length > 0 ? (
                  user.skillsOffered.map((skill, index) => (
                    <motion.div
                      key={index}
                      className="skill-card"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="skill-header">
                        <h4>{skill.skill}</h4>
                        <button
                          className="btn-remove"
                          onClick={() => handleRemoveSkill('offered', index)}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                      <p className="skill-category">{skill.category}</p>
                      <span className={`skill-level level-${skill.level.toLowerCase()}`}>
                        {skill.level}
                      </span>
                      {skill.description && (
                        <p className="skill-description">{skill.description}</p>
                      )}
                    </motion.div>
                  ))
                ) : (
                  <div className="empty-state">
                    <FiAward size={48} />
                    <h4>No skills added yet</h4>
                    <p>Add skills you can teach to start earning credits!</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'skills-learning' && (
            <div className="skills-content">
              <div className="skills-header">
                <h3>Skills I Want to Learn</h3>
                <motion.button
                  className="btn-add-skill"
                  onClick={() => setShowAddSkill(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiPlus /> Add Skill
                </motion.button>
              </div>

              {showAddSkill && (
                <motion.div
                  className="add-skill-form"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="form-row">
                    <input
                      type="text"
                      placeholder="Skill name (e.g., Python Programming)"
                      value={newSkill.skill}
                      onChange={(e) => setNewSkill({ ...newSkill, skill: e.target.value })}
                    />
                    <select
                      value={newSkill.category}
                      onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                    >
                      <option value="">Select Category</option>
                      {skillCategories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-row">
                    <select
                      value={newSkill.level}
                      onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Learning goals (optional)"
                      value={newSkill.description}
                      onChange={(e) => setNewSkill({ ...newSkill, description: e.target.value })}
                    />
                  </div>
                  <div className="form-actions">
                    <button onClick={() => handleAddSkill('learning')} className="btn-save">
                      Add Skill
                    </button>
                    <button onClick={() => setShowAddSkill(false)} className="btn-cancel">
                      Cancel
                    </button>
                  </div>
                </motion.div>
              )}

              <div className="skills-grid">
                {user.skillsLearning?.length > 0 ? (
                  user.skillsLearning.map((skill, index) => (
                    <motion.div
                      key={index}
                      className="skill-card"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="skill-header">
                        <h4>{skill.skill}</h4>
                        <button
                          className="btn-remove"
                          onClick={() => handleRemoveSkill('learning', index)}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                      <p className="skill-category">{skill.category}</p>
                      <span className={`skill-level level-${skill.level.toLowerCase()}`}>
                        Target: {skill.level}
                      </span>
                      {skill.progress !== undefined && (
                        <div className="skill-progress">
                          <div className="progress-bar">
                            <div 
                              className="progress-fill" 
                              style={{ width: `${skill.progress}%` }}
                            ></div>
                          </div>
                          <span className="progress-text">{skill.progress}% Complete</span>
                        </div>
                      )}
                      {skill.description && (
                        <p className="skill-description">{skill.description}</p>
                      )}
                    </motion.div>
                  ))
                ) : (
                  <div className="empty-state">
                    <FiTarget size={48} />
                    <h4>No learning goals yet</h4>
                    <p>Add skills you want to learn to find the right instructors!</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;