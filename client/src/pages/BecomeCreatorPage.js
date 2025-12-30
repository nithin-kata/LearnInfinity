import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiVideo, FiUser, FiMail, FiPhone, FiMapPin, FiGlobe, FiLinkedin, FiGithub, FiCheck, FiArrowRight } from 'react-icons/fi';
import './BecomeCreatorPage.css';

const BecomeCreatorPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    
    // Professional Information
    profession: '',
    company: '',
    experience: '',
    expertise: [],
    
    // Social Links
    website: '',
    linkedin: '',
    github: '',
    
    // Teaching Information
    teachingExperience: '',
    preferredSubjects: [],
    languagesSpoken: [],
    
    // Motivation
    whyTeach: '',
    goals: ''
  });

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    // Pre-fill user data if available
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.name || '',
        email: user.email || ''
      }));
    }
  }, [isAuthenticated, user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayInput = (name, value) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({
      ...prev,
      [name]: items
    }));
  };

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call to submit creator application
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to creator dashboard
      navigate('/creator-dashboard');
    } catch (error) {
      console.error('Error submitting application:', error);
    } finally {
      setLoading(false);
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  const renderStep1 = () => (
    <motion.div
      className="form-step"
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h3>Personal Information</h3>
      <p>Tell us about yourself to get started as a creator</p>
      
      <div className="form-grid">
        <div className="form-group">
          <label>Full Name *</label>
          <div className="input-wrapper">
            <FiUser className="input-icon" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Email Address *</label>
          <div className="input-wrapper">
            <FiMail className="input-icon" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <div className="input-wrapper">
            <FiPhone className="input-icon" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Location *</label>
          <div className="input-wrapper">
            <FiMapPin className="input-icon" />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="City, Country"
              required
            />
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>Bio *</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          placeholder="Tell us about yourself, your background, and what makes you passionate about teaching..."
          rows="4"
          required
        />
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      className="form-step"
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h3>Professional Background</h3>
      <p>Share your professional experience, education, and expertise</p>
      
      <div className="form-grid">
        <div className="form-group">
          <label>Current Role/Status *</label>
          <input
            type="text"
            name="profession"
            value={formData.profession}
            onChange={handleInputChange}
            placeholder="e.g., Software Engineer, Student, Designer, Freelancer"
            required
          />
        </div>

        <div className="form-group">
          <label>Company/Organization/University *</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            placeholder="e.g., Google, Stanford University, Self-employed"
            required
          />
        </div>

        <div className="form-group">
          <label>Experience/Academic Level *</label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            required
          >
            <option value="">Select your level</option>
            <option value="student-1st">1st Year Student</option>
            <option value="student-2nd">2nd Year Student</option>
            <option value="student-3rd">3rd Year Student</option>
            <option value="student-4th">4th Year Student</option>
            <option value="graduate">Recent Graduate</option>
            <option value="1-2">1-2 years experience</option>
            <option value="3-5">3-5 years experience</option>
            <option value="6-10">6-10 years experience</option>
            <option value="10+">10+ years experience</option>
          </select>
        </div>

        <div className="form-group">
          <label>Languages Spoken *</label>
          <input
            type="text"
            name="languagesSpoken"
            value={formData.languagesSpoken.join(', ')}
            onChange={(e) => handleArrayInput('languagesSpoken', e.target.value)}
            placeholder="English, Spanish, French (comma separated)"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label>Areas of Expertise *</label>
        <input
          type="text"
          name="expertise"
          value={formData.expertise.join(', ')}
          onChange={(e) => handleArrayInput('expertise', e.target.value)}
          placeholder="JavaScript, React, Mathematics, Design (comma separated)"
          required
        />
        <small>List your key skills, technologies, or subjects you're knowledgeable in (comma separated)</small>
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      className="form-step"
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h3>Teaching & Social Presence</h3>
      <p>Help us understand your teaching background and online presence</p>
      
      <div className="form-grid">
        <div className="form-group">
          <label>Teaching Experience</label>
          <select
            name="teachingExperience"
            value={formData.teachingExperience}
            onChange={handleInputChange}
          >
            <option value="">Select teaching experience</option>
            <option value="none">No formal teaching experience</option>
            <option value="informal">Informal mentoring/training</option>
            <option value="1-2">1-2 years</option>
            <option value="3-5">3-5 years</option>
            <option value="5+">5+ years</option>
          </select>
        </div>

        <div className="form-group">
          <label>Preferred Teaching Subjects *</label>
          <input
            type="text"
            name="preferredSubjects"
            value={formData.preferredSubjects.join(', ')}
            onChange={(e) => handleArrayInput('preferredSubjects', e.target.value)}
            placeholder="Web Development, Data Science, Design (comma separated)"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label>Website/Portfolio</label>
        <div className="input-wrapper">
          <FiGlobe className="input-icon" />
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            placeholder="https://yourwebsite.com"
          />
        </div>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>LinkedIn Profile</label>
          <div className="input-wrapper">
            <FiLinkedin className="input-icon" />
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleInputChange}
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>
        </div>

        <div className="form-group">
          <label>GitHub Profile</label>
          <div className="input-wrapper">
            <FiGithub className="input-icon" />
            <input
              type="url"
              name="github"
              value={formData.github}
              onChange={handleInputChange}
              placeholder="https://github.com/yourusername"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderStep4 = () => (
    <motion.div
      className="form-step"
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h3>Motivation & Goals</h3>
      <p>Tell us why you want to become a creator and your teaching goals</p>
      
      <div className="form-group">
        <label>Why do you want to teach on LearnInfinity? *</label>
        <textarea
          name="whyTeach"
          value={formData.whyTeach}
          onChange={handleInputChange}
          placeholder="Share your motivation for teaching and how you want to contribute to the learning community..."
          rows="4"
          required
        />
      </div>

      <div className="form-group">
        <label>What are your teaching goals? *</label>
        <textarea
          name="goals"
          value={formData.goals}
          onChange={handleInputChange}
          placeholder="Describe what you hope to achieve as an instructor and how you plan to help students..."
          rows="4"
          required
        />
      </div>

      <div className="creator-benefits">
        <h4>As a LearnInfinity Creator, you'll get:</h4>
        <div className="benefits-grid">
          <div className="benefit-item">
            <FiCheck className="benefit-icon" />
            <span>Earn credits for every hour you teach</span>
          </div>
          <div className="benefit-item">
            <FiCheck className="benefit-icon" />
            <span>Access to creator tools and analytics</span>
          </div>
          <div className="benefit-item">
            <FiCheck className="benefit-icon" />
            <span>Build your personal brand and following</span>
          </div>
          <div className="benefit-item">
            <FiCheck className="benefit-icon" />
            <span>Connect with learners worldwide</span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  if (!isAuthenticated) {
    return null; // Will redirect to auth page
  }

  return (
    <div className="become-creator-page">
      <div className="creator-container">
        <motion.div
          className="creator-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>
            <FiVideo className="header-icon" />
            Become a Creator
          </h1>
          <p>Join our community of expert instructors and start sharing your knowledge</p>
        </motion.div>

        {/* Progress Indicator */}
        <div className="progress-indicator">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div
              key={stepNumber}
              className={`progress-step ${step >= stepNumber ? 'active' : ''} ${step > stepNumber ? 'completed' : ''}`}
            >
              <div className="step-number">
                {step > stepNumber ? <FiCheck /> : stepNumber}
              </div>
              <div className="step-label">
                {stepNumber === 1 && 'Personal Info'}
                {stepNumber === 2 && 'Professional'}
                {stepNumber === 3 && 'Teaching & Social'}
                {stepNumber === 4 && 'Motivation'}
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <form className="creator-form" onSubmit={handleSubmit}>
          <div className="form-container">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}
          </div>

          {/* Navigation Buttons */}
          <div className="form-navigation">
            {step > 1 && (
              <motion.button
                type="button"
                className="btn-secondary"
                onClick={handlePrevStep}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Previous
              </motion.button>
            )}

            {step < 4 ? (
              <motion.button
                type="button"
                className="btn-primary"
                onClick={handleNextStep}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Next Step
                <FiArrowRight />
              </motion.button>
            ) : (
              <motion.button
                type="submit"
                className="btn-submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.05 } : {}}
                whileTap={!loading ? { scale: 0.95 } : {}}
              >
                {loading ? (
                  <>
                    <div className="loading-spinner"></div>
                    Submitting Application...
                  </>
                ) : (
                  <>
                    Submit Application
                    <FiCheck />
                  </>
                )}
              </motion.button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BecomeCreatorPage;