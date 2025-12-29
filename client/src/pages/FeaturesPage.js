import { motion } from 'framer-motion';
import { 
  FiClock, 
  FiUsers, 
  FiShield, 
  FiZap, 
  FiAward,
  FiSmartphone,
  FiVideo,
  FiMessageCircle,
  FiCalendar,
  FiBarChart2,
  FiCheck
} from 'react-icons/fi';

const FeaturesPage = () => {
  const mainFeatures = [
    {
      icon: FiClock,
      title: 'Time-Based Credit System',
      description: 'Our revolutionary credit system ensures fair exchange - teach for 1 hour, earn 1 credit to learn for 1 hour.',
      details: [
        'Automatic credit tracking and management',
        'Transparent pricing with no hidden fees',
        'Credits never expire',
        'Earn credits by teaching others'
      ],
      color: '#5F9598'
    },
    {
      icon: FiUsers,
      title: 'Global Learning Community',
      description: 'Connect with learners and teachers from around the world in our vibrant community.',
      details: [
        'Over 10,000 active learners worldwide',
        'Expert instructors from top companies',
        'Peer-to-peer learning opportunities',
        'Community forums and discussions'
      ],
      color: '#1D546D'
    },
    {
      icon: FiZap,
      title: 'AI-Powered Matching',
      description: 'Advanced algorithms match you with the perfect learning partners based on your goals and schedule.',
      details: [
        'Smart skill matching technology',
        'Schedule compatibility analysis',
        'Learning style preferences',
        'Instant notifications for matches'
      ],
      color: '#5F9598'
    },
    {
      icon: FiShield,
      title: 'Verified & Secure',
      description: 'All instructors are thoroughly vetted and our platform ensures secure, quality learning experiences.',
      details: [
        'Comprehensive instructor verification',
        'Secure payment processing',
        'Quality assurance monitoring',
        'Dispute resolution system'
      ],
      color: '#1D546D'
    }
  ];

  const additionalFeatures = [
    {
      icon: FiVideo,
      title: 'Multi-Format Learning',
      description: 'Video calls, screen sharing, interactive whiteboards, and file sharing.'
    },
    {
      icon: FiCalendar,
      title: 'Flexible Scheduling',
      description: 'Book sessions that fit your schedule with automatic timezone conversion.'
    },
    {
      icon: FiBarChart2,
      title: 'Progress Tracking',
      description: 'Detailed analytics and progress reports to track your learning journey.'
    },
    {
      icon: FiAward,
      title: 'Skill Certificates',
      description: 'Earn verified certificates upon completing learning milestones.'
    },
    {
      icon: FiSmartphone,
      title: 'Mobile Learning',
      description: 'Learn on-the-go with our responsive mobile-friendly platform.'
    },
    {
      icon: FiMessageCircle,
      title: '24/7 Support',
      description: 'Round-the-clock customer support to help with any questions.'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Active Learners' },
    { number: '500+', label: 'Skills Available' },
    { number: '50K+', label: 'Hours Exchanged' },
    { number: '4.9', label: 'Average Rating' }
  ];

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
    <div className="features-page">
      {/* Hero Section */}
      <motion.section 
        className="features-hero"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <h1 className="features-hero-title">
            Discover All <span className="highlight">Features</span>
          </h1>
          <p className="features-hero-subtitle">
            Explore the comprehensive suite of tools and features that make LearnInfinity 
            the world's most innovative skill-sharing platform
          </p>
        </div>
      </motion.section>

      {/* Main Features */}
      <motion.section 
        className="main-features-section"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container">
          <motion.h2 className="section-title" variants={itemVariants}>
            Core Features
          </motion.h2>
          
          <div className="main-features-grid">
            {mainFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="main-feature-card"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="feature-card-header">
                    <div className="feature-icon-large" style={{ color: feature.color }}>
                      <Icon />
                    </div>
                    <h3>{feature.title}</h3>
                  </div>
                  <p className="feature-description">{feature.description}</p>
                  <ul className="feature-details">
                    {feature.details.map((detail, idx) => (
                      <li key={idx}>
                        <FiCheck className="check-icon" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        className="stats-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-item"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Additional Features */}
      <motion.section 
        className="additional-features-section"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container">
          <motion.h2 className="section-title" variants={itemVariants}>
            Additional Features
          </motion.h2>
          
          <div className="additional-features-grid">
            {additionalFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="additional-feature-card"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(95, 149, 152, 0.1)" }}
                >
                  <div className="feature-icon">
                    <Icon />
                  </div>
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="features-cta-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <h2>Ready to Start Learning?</h2>
          <p>Join thousands of learners who are already exchanging skills on LearnInfinity</p>
          <motion.button
            className="cta-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/auth'}
          >
            Get Started Today
          </motion.button>
        </div>
      </motion.section>

      <style jsx>{`
        .features-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #061E29 0%, #1D546D 100%);
          color: #F3F4F4;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .features-hero {
          padding: 120px 0 80px;
          text-align: center;
        }

        .features-hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }

        .highlight {
          color: #5F9598;
        }

        .features-hero-subtitle {
          font-size: 1.25rem;
          opacity: 0.9;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .main-features-section,
        .additional-features-section {
          padding: 80px 0;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 600;
          text-align: center;
          margin-bottom: 3rem;
          color: #F3F4F4;
        }

        .main-features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .main-feature-card {
          background: rgba(95, 149, 152, 0.1);
          border-radius: 20px;
          padding: 2.5rem;
          border: 1px solid rgba(95, 149, 152, 0.2);
          backdrop-filter: blur(10px);
        }

        .feature-card-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .feature-icon-large {
          font-size: 2.5rem;
        }

        .feature-card-header h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0;
        }

        .feature-description {
          font-size: 1.1rem;
          opacity: 0.9;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .feature-details {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .feature-details li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
          font-size: 1rem;
        }

        .check-icon {
          color: #5F9598;
          font-size: 1.2rem;
        }

        .stats-section {
          padding: 60px 0;
          background: rgba(29, 84, 109, 0.3);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          text-align: center;
        }

        .stat-item {
          padding: 1.5rem;
        }

        .stat-number {
          font-size: 3rem;
          font-weight: 700;
          color: #5F9598;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 1.1rem;
          opacity: 0.9;
        }

        .additional-features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-top: 3rem;
        }

        .additional-feature-card {
          background: rgba(95, 149, 152, 0.05);
          border-radius: 15px;
          padding: 2rem;
          text-align: center;
          border: 1px solid rgba(95, 149, 152, 0.1);
          transition: all 0.3s ease;
        }

        .feature-icon {
          font-size: 2rem;
          color: #5F9598;
          margin-bottom: 1rem;
        }

        .additional-feature-card h4 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #F3F4F4;
        }

        .additional-feature-card p {
          opacity: 0.9;
          line-height: 1.6;
        }

        .features-cta-section {
          padding: 80px 0;
          text-align: center;
          background: rgba(29, 84, 109, 0.2);
        }

        .features-cta-section h2 {
          font-size: 2.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .features-cta-section p {
          font-size: 1.25rem;
          opacity: 0.9;
          margin-bottom: 2rem;
        }

        .cta-button {
          background: linear-gradient(135deg, #5F9598 0%, #1D546D 100%);
          color: #F3F4F4;
          border: none;
          padding: 1rem 2.5rem;
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cta-button:hover {
          box-shadow: 0 15px 30px rgba(95, 149, 152, 0.3);
        }

        @media (max-width: 768px) {
          .features-hero-title {
            font-size: 2.5rem;
          }

          .main-features-grid {
            grid-template-columns: 1fr;
          }

          .additional-features-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
};

export default FeaturesPage;