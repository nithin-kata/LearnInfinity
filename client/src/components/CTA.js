import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import './CTA.css';

const CTA = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth');
  };

  const handleLearnMore = () => {
    navigate('/features');
  };

  const contactInfo = [
    {
      icon: FiMail,
      label: 'Email',
      value: 'learn@infinity.com',
      link: 'mailto:learn@infinity.com'
    },
    {
      icon: FiPhone,
      label: 'Phone',
      value: 'coming soon',
      link: '#'
    },
    {
      icon: FiMapPin,
      label: 'Location',
      value: 'Hyderabad, Telangana',
      link: '#'
    }
  ];

  return (
    <section id="contact" className="cta">
      <div className="cta-container">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="cta-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Ready to Start Your
            <br />
            <span className="highlight">Learning Journey</span>?
          </motion.h2>

          <motion.p
            className="cta-description"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Join thousands of learners and teachers in our vibrant community. 
            Start trading skills today and unlock unlimited learning potential.
          </motion.p>

          <motion.div
            className="cta-actions"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="cta-btn-primary"
              onClick={handleGetStarted}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(255, 215, 0, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Free
              <FiArrowRight className="btn-icon" />
            </motion.button>

            <motion.button
              className="cta-btn-secondary"
              onClick={handleLearnMore}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>

          <motion.div
            className="cta-stats"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="stat-item">
              <motion.span
                className="stat-number"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                10K+
              </motion.span>
              <span className="stat-label">Active Users</span>
            </div>
            <div className="stat-item">
              <motion.span
                className="stat-number"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                500+
              </motion.span>
              <span className="stat-label">Skills Available</span>
            </div>
            <div className="stat-item">
              <motion.span
                className="stat-number"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                98%
              </motion.span>
              <span className="stat-label">Satisfaction Rate</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="contact-section"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="contact-title">Get in Touch</h3>
          <p className="contact-description">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>

          <div className="contact-info">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              const isPhoneComingSoon = info.label === 'Phone' && info.value === 'coming soon';
              
              return (
                <motion.div
                  key={index}
                  className={`contact-item ${isPhoneComingSoon ? 'disabled' : ''}`}
                  whileHover={!isPhoneComingSoon ? { scale: 1.05, x: 10 } : {}}
                  whileTap={!isPhoneComingSoon ? { scale: 0.95 } : {}}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={!isPhoneComingSoon && info.link !== '#' ? () => window.location.href = info.link : undefined}
                  style={{ cursor: isPhoneComingSoon ? 'default' : 'pointer' }}
                >
                  <div className="contact-icon">
                    <Icon />
                  </div>
                  <div className="contact-details">
                    <span className="contact-label">{info.label}</span>
                    <span className="contact-value">{info.value}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        className="footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="footer-content">
          <div className="footer-logo">
            <div className="logo-container">
              <div className="logo-icon">∞</div>
              <div className="logo-text">
                <span className="logo-skill">Learn</span>
                <span className="logo-swap">Infinity</span>
              </div>
            </div>
          </div>
          <p className="footer-text">
            © 2024 LearnInfinity. All rights reserved. Trade Skills, Not Cash.
          </p>
        </div>
      </motion.footer>

      {/* Background decorations */}
      <div className="cta-bg">
        <motion.div
          className="bg-gradient bg-gradient-1"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="bg-gradient bg-gradient-2"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>
    </section>
  );
};

export default CTA;