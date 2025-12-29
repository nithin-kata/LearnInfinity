import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiAward, FiStar, FiUsers, FiBookOpen, FiMapPin, FiLinkedin, FiGithub, FiGlobe, FiX, FiCalendar, FiClock, FiCheck } from 'react-icons/fi';
import InstructorAvatar from './InstructorAvatar';
import './TopInstructors.css';

const TopInstructors = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [showExchangeModal, setShowExchangeModal] = useState(false);

  const handleExchangeSkills = (instructor) => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    setSelectedInstructor(instructor);
    setShowExchangeModal(true);
  };

  const handleViewProfile = (instructor) => {
    setSelectedInstructor(instructor);
  };

  const closeModal = () => {
    setSelectedInstructor(null);
    setShowExchangeModal(false);
  };

  const handleBookSession = () => {
    // In a real app, this would integrate with a booking system
    alert(`Session booking request sent to ${selectedInstructor?.name}! They will contact you soon.`);
    closeModal();
  };

  const instructors = [
    {
      id: 1,
      name: 'Dr. Sarah Chen',
      title: 'Senior Data Scientist',
      company: 'Google AI',
      location: 'San Francisco, CA',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      rating: 4.9,
      students: 12500,
      courses: 8,
      category: 'data-science',
      skills: ['Python', 'Machine Learning', 'Deep Learning', 'TensorFlow', 'Data Analysis'],
      specialties: ['AI/ML', 'Data Science', 'Python'],
      bio: 'Leading AI researcher with 10+ years of experience in machine learning and data science. Published 50+ research papers and holds 12 patents in AI. Passionate about sharing knowledge through our credit-based learning system.',
      achievements: [
        'PhD in Computer Science from Stanford',
        'Former Lead Data Scientist at Tesla',
        'Google AI Researcher of the Year 2023',
        'Author of "Deep Learning Fundamentals"'
      ],
      creditsPerHour: 1,
      languages: ['English', 'Mandarin'],
      responseTime: '< 2 hours',
      social: {
        linkedin: 'https://linkedin.com/in/sarahchen',
        github: 'https://github.com/sarahchen',
        website: 'https://sarahchen.ai'
      }
    },
    {
      id: 2,
      name: 'Marcus Rodriguez',
      title: 'Full Stack Developer',
      company: 'Meta',
      location: 'New York, NY',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 4.8,
      students: 8900,
      courses: 12,
      category: 'programming',
      skills: ['React', 'Node.js', 'JavaScript', 'TypeScript', 'AWS', 'Docker'],
      specialties: ['Web Development', 'React', 'Node.js'],
      bio: 'Senior full-stack developer with expertise in modern web technologies. Built scalable applications serving millions of users at top tech companies. Believes in knowledge exchange and skill sharing.',
      achievements: [
        'MS in Software Engineering from MIT',
        'Lead Developer at Airbnb (2019-2022)',
        'Open source contributor with 50K+ GitHub stars',
        'Speaker at React Conf 2023'
      ],
      creditsPerHour: 1,
      languages: ['English', 'Spanish'],
      responseTime: '< 1 hour',
      social: {
        linkedin: 'https://linkedin.com/in/marcusrodriguez',
        github: 'https://github.com/marcusdev',
        website: 'https://marcusdev.io'
      }
    },
    {
      id: 3,
      name: 'Emily Watson',
      title: 'Senior UX Designer',
      company: 'Apple',
      location: 'Cupertino, CA',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      rating: 4.9,
      students: 6700,
      courses: 6,
      category: 'design',
      skills: ['Figma', 'Sketch', 'Adobe XD', 'Prototyping', 'User Research', 'Design Systems'],
      specialties: ['UI/UX Design', 'Product Design', 'Design Systems'],
      bio: 'Award-winning UX designer who has shaped user experiences for products used by billions. Expert in design thinking and user-centered design. Loves teaching and learning new skills through our community.',
      achievements: [
        'BFA in Interaction Design from RISD',
        'Lead Designer for iOS 16 Control Center',
        'Winner of UX Design Awards 2022',
        'Mentor at Design+Research Program'
      ],
      creditsPerHour: 1,
      languages: ['English', 'French'],
      responseTime: '< 3 hours',
      social: {
        linkedin: 'https://linkedin.com/in/emilywatson',
        website: 'https://emilywatson.design'
      }
    },
    {
      id: 4,
      name: 'Prof. David Kim',
      title: 'Computer Science Professor',
      company: 'Stanford University',
      location: 'Palo Alto, CA',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 4.9,
      students: 15200,
      courses: 15,
      category: 'computer-science',
      skills: ['Algorithms', 'Data Structures', 'System Design', 'Distributed Systems', 'Computer Networks'],
      specialties: ['Computer Science', 'Algorithms', 'System Design'],
      bio: 'Renowned computer science professor and researcher. Expert in algorithms, distributed systems, and computer architecture with 20+ years of teaching experience. Advocates for peer-to-peer learning.',
      achievements: [
        'PhD in Computer Science from MIT',
        'ACM Fellow and IEEE Senior Member',
        'Author of 3 bestselling CS textbooks',
        'Consultant for Google, Amazon, Microsoft'
      ],
      creditsPerHour: 1,
      languages: ['English', 'Korean'],
      responseTime: '< 4 hours',
      social: {
        linkedin: 'https://linkedin.com/in/profkim',
        website: 'https://cs.stanford.edu/~dkim'
      }
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      title: 'Digital Marketing Director',
      company: 'HubSpot',
      location: 'Boston, MA',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
      rating: 4.7,
      students: 9800,
      courses: 10,
      category: 'marketing',
      skills: ['SEO', 'Content Marketing', 'Social Media', 'Google Analytics', 'PPC', 'Email Marketing'],
      specialties: ['Digital Marketing', 'SEO', 'Content Strategy'],
      bio: 'Digital marketing expert who has driven growth for Fortune 500 companies. Specializes in data-driven marketing strategies and conversion optimization. Enjoys sharing marketing insights with fellow learners.',
      achievements: [
        'MBA in Marketing from Wharton',
        'Grew startup from 0 to $10M ARR',
        'Google Ads Certified Professional',
        'Featured speaker at MarketingProfs'
      ],
      creditsPerHour: 1,
      languages: ['English'],
      responseTime: '< 2 hours',
      social: {
        linkedin: 'https://linkedin.com/in/lisathompson',
        website: 'https://lisathompson.marketing'
      }
    },
    {
      id: 6,
      name: 'Ahmed Hassan',
      title: 'DevOps Engineer',
      company: 'Netflix',
      location: 'Los Angeles, CA',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      rating: 4.8,
      students: 5400,
      courses: 7,
      category: 'devops',
      skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'Monitoring'],
      specialties: ['DevOps', 'Cloud Architecture', 'CI/CD'],
      bio: 'Senior DevOps engineer with expertise in cloud infrastructure and automation. Has built and maintained systems serving millions of users globally. Passionate about knowledge sharing and continuous learning.',
      achievements: [
        'BS in Computer Engineering from UC Berkeley',
        'AWS Solutions Architect Professional',
        'Kubernetes Certified Administrator',
        'Built Netflix\'s deployment pipeline'
      ],
      creditsPerHour: 1,
      languages: ['English', 'Arabic'],
      responseTime: '< 2 hours',
      social: {
        linkedin: 'https://linkedin.com/in/ahmedhassan',
        github: 'https://github.com/ahmeddevops'
      }
    }
  ];

  const categories = [
    { id: 'all', label: 'All Instructors', count: instructors.length },
    { id: 'data-science', label: 'Data Science', count: instructors.filter(i => i.category === 'data-science').length },
    { id: 'programming', label: 'Programming', count: instructors.filter(i => i.category === 'programming').length },
    { id: 'design', label: 'Design', count: instructors.filter(i => i.category === 'design').length },
    { id: 'computer-science', label: 'Computer Science', count: instructors.filter(i => i.category === 'computer-science').length },
    { id: 'marketing', label: 'Marketing', count: instructors.filter(i => i.category === 'marketing').length },
    { id: 'devops', label: 'DevOps', count: instructors.filter(i => i.category === 'devops').length }
  ];

  const filteredInstructors = selectedCategory === 'all' 
    ? instructors 
    : instructors.filter(instructor => instructor.category === selectedCategory);

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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="top-instructors" className="top-instructors">
      <div className="instructors-container">
        <motion.div
          className="instructors-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="instructors-title">
            <FiAward className="instructors-icon" />
            Top <span className="highlight">Instructors</span>
          </h2>
          <p className="instructors-subtitle">
            Learn from industry experts and world-class professionals who are passionate about sharing their knowledge through our credit-based system - teach 1 hour, learn 1 hour!
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="category-filter"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
              <span className="category-count">({category.count})</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Instructors Grid */}
        <motion.div
          className="instructors-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filteredInstructors.map((instructor) => (
            <motion.div
              key={instructor.id}
              className="instructor-card"
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(95, 149, 152, 0.15)"
              }}
            >
              <div className="instructor-header">
                <div className="instructor-avatar">
                  <InstructorAvatar 
                    src={instructor.avatar}
                    alt={instructor.name}
                    name={instructor.name}
                  />
                  <div className="online-indicator"></div>
                </div>
                <div className="instructor-basic">
                  <h3 className="instructor-name">{instructor.name}</h3>
                  <p className="instructor-title">{instructor.title}</p>
                  <p className="instructor-company">{instructor.company}</p>
                  <div className="instructor-location">
                    <FiMapPin />
                    <span>{instructor.location}</span>
                  </div>
                </div>
                <div className="instructor-rating">
                  <div className="rating-stars">
                    <FiStar className="star filled" />
                    <span>{instructor.rating}</span>
                  </div>
                  <div className="instructor-stats">
                    <div className="stat">
                      <FiUsers />
                      <span>{instructor.students.toLocaleString()} students</span>
                    </div>
                    <div className="stat">
                      <FiBookOpen />
                      <span>{instructor.courses} courses</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="instructor-bio">
                <p>{instructor.bio}</p>
              </div>

              <div className="instructor-skills">
                <h4>Specialties</h4>
                <div className="skills-tags">
                  {instructor.specialties.map((specialty, index) => (
                    <span key={index} className="skill-tag specialty">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div className="instructor-skills">
                <h4>Skills</h4>
                <div className="skills-tags">
                  {instructor.skills.slice(0, 4).map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                  {instructor.skills.length > 4 && (
                    <span className="skill-tag more">
                      +{instructor.skills.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              <div className="instructor-achievements">
                <h4>Key Achievements</h4>
                <ul>
                  {instructor.achievements.slice(0, 2).map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>

              <div className="instructor-details">
                <div className="detail-item">
                  <span className="detail-label">Rate:</span>
                  <span className="detail-value">{instructor.creditsPerHour} credit/hour</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Response:</span>
                  <span className="detail-value">{instructor.responseTime}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Languages:</span>
                  <span className="detail-value">{instructor.languages.join(', ')}</span>
                </div>
              </div>

              <div className="instructor-social">
                {instructor.social.linkedin && (
                  <a href={instructor.social.linkedin} target="_blank" rel="noopener noreferrer">
                    <FiLinkedin />
                  </a>
                )}
                {instructor.social.github && (
                  <a href={instructor.social.github} target="_blank" rel="noopener noreferrer">
                    <FiGithub />
                  </a>
                )}
                {instructor.social.website && (
                  <a href={instructor.social.website} target="_blank" rel="noopener noreferrer">
                    <FiGlobe />
                  </a>
                )}
              </div>

              <div className="instructor-actions">
                <motion.button
                  className="btn-primary"
                  onClick={() => handleExchangeSkills(instructor)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Exchange Skills
                </motion.button>
                <motion.button
                  className="btn-secondary"
                  onClick={() => handleViewProfile(instructor)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Profile
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="instructors-stats"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="stat-card">
            <div className="stat-number">500+</div>
            <div className="stat-label">Expert Instructors</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">50K+</div>
            <div className="stat-label">Students Taught</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">4.8</div>
            <div className="stat-label">Average Rating</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">95%</div>
            <div className="stat-label">Success Rate</div>
          </div>
        </motion.div>
      </div>

      {/* Exchange Skills Modal */}
      <AnimatePresence>
        {showExchangeModal && selectedInstructor && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="exchange-modal"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={closeModal}>
                <FiX />
              </button>
              
              <div className="modal-header">
                <div className="instructor-info">
                  <InstructorAvatar 
                    src={selectedInstructor.avatar}
                    alt={selectedInstructor.name}
                    name={selectedInstructor.name}
                  />
                  <div>
                    <h3>{selectedInstructor.name}</h3>
                    <p>{selectedInstructor.title}</p>
                  </div>
                </div>
              </div>

              <div className="modal-content">
                <h4>Exchange Skills with {selectedInstructor.name}</h4>
                <p>Ready to learn from this expert? Here's what you can expect:</p>
                
                <div className="exchange-details">
                  <div className="detail-item">
                    <FiClock />
                    <span>Rate: {selectedInstructor.creditsPerHour} credit per hour</span>
                  </div>
                  <div className="detail-item">
                    <FiStar />
                    <span>Rating: {selectedInstructor.rating}/5.0</span>
                  </div>
                  <div className="detail-item">
                    <FiUsers />
                    <span>Students: {selectedInstructor.students.toLocaleString()}</span>
                  </div>
                </div>

                <div className="skills-section">
                  <h5>Available Skills:</h5>
                  <div className="skills-list">
                    {selectedInstructor.skills.map((skill, index) => (
                      <span key={index} className="skill-badge">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="modal-actions">
                  <motion.button
                    className="btn-book-session"
                    onClick={handleBookSession}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiCalendar />
                    Book Learning Session
                  </motion.button>
                  <motion.button
                    className="btn-cancel"
                    onClick={closeModal}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Profile Modal */}
      <AnimatePresence>
        {selectedInstructor && !showExchangeModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="profile-modal"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={closeModal}>
                <FiX />
              </button>
              
              <div className="profile-header">
                <InstructorAvatar 
                  src={selectedInstructor.avatar}
                  alt={selectedInstructor.name}
                  name={selectedInstructor.name}
                />
                <div className="profile-info">
                  <h2>{selectedInstructor.name}</h2>
                  <p className="profile-title">{selectedInstructor.title}</p>
                  <p className="profile-company">{selectedInstructor.company}</p>
                  <div className="profile-location">
                    <FiMapPin />
                    <span>{selectedInstructor.location}</span>
                  </div>
                  <div className="profile-rating">
                    <FiStar />
                    <span>{selectedInstructor.rating}/5.0 ({selectedInstructor.students.toLocaleString()} students)</span>
                  </div>
                </div>
              </div>

              <div className="profile-content">
                <div className="profile-section">
                  <h4>About</h4>
                  <p>{selectedInstructor.bio}</p>
                </div>

                <div className="profile-section">
                  <h4>Skills & Expertise</h4>
                  <div className="skills-grid">
                    {selectedInstructor.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="profile-section">
                  <h4>Key Achievements</h4>
                  <ul className="achievements-list">
                    {selectedInstructor.achievements.map((achievement, index) => (
                      <li key={index}>
                        <FiCheck />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="profile-section">
                  <h4>Teaching Details</h4>
                  <div className="teaching-details">
                    <div className="detail">
                      <span className="label">Rate:</span>
                      <span className="value">{selectedInstructor.creditsPerHour} credit/hour</span>
                    </div>
                    <div className="detail">
                      <span className="label">Response Time:</span>
                      <span className="value">{selectedInstructor.responseTime}</span>
                    </div>
                    <div className="detail">
                      <span className="label">Languages:</span>
                      <span className="value">{selectedInstructor.languages.join(', ')}</span>
                    </div>
                  </div>
                </div>

                {selectedInstructor.social && (
                  <div className="profile-section">
                    <h4>Connect</h4>
                    <div className="social-links">
                      {selectedInstructor.social.linkedin && (
                        <a href={selectedInstructor.social.linkedin} target="_blank" rel="noopener noreferrer">
                          <FiLinkedin />
                          LinkedIn
                        </a>
                      )}
                      {selectedInstructor.social.github && (
                        <a href={selectedInstructor.social.github} target="_blank" rel="noopener noreferrer">
                          <FiGithub />
                          GitHub
                        </a>
                      )}
                      {selectedInstructor.social.website && (
                        <a href={selectedInstructor.social.website} target="_blank" rel="noopener noreferrer">
                          <FiGlobe />
                          Website
                        </a>
                      )}
                    </div>
                  </div>
                )}

                <div className="profile-actions">
                  <motion.button
                    className="btn-exchange"
                    onClick={() => {
                      setShowExchangeModal(true);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Exchange Skills
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background decorations */}
      <div className="instructors-bg">
        <motion.div
          className="bg-shape bg-shape-1"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="bg-shape bg-shape-2"
          animate={{
            rotate: [360, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    </section>
  );
};

export default TopInstructors;