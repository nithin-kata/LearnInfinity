import React from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiUsers, FiTrendingUp, FiShield, FiZap, FiHeart } from 'react-icons/fi';
import './Features.css';

const Features = () => {
  const features = [
    {
      icon: FiClock,
      title: 'Time-Based Credits',
      description: 'Fair exchange system where 1 hour of teaching equals 1 hour of learning credits.',
      color: '#FFCC00'
    },
    {
      icon: FiUsers,
      title: 'Peer-to-Peer Learning',
      description: 'Connect directly with skilled individuals in your community and beyond.',
      color: '#B13BFF'
    },
    {
      icon: FiTrendingUp,
      title: 'Skill Progression',
      description: 'Track your learning journey and build a comprehensive skill portfolio.',
      color: '#471396'
    },
    {
      icon: FiShield,
      title: 'Verified Instructors',
      description: 'All instructors are verified through our comprehensive review system.',
      color: '#B13BFF'
    },
    {
      icon: FiZap,
      title: 'Instant Matching',
      description: 'AI-powered matching system connects you with the perfect learning partner.',
      color: '#FFCC00'
    },
    {
      icon: FiHeart,
      title: 'Community Driven',
      description: 'Join a supportive community of lifelong learners and passionate teachers.',
      color: '#471396'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="features" className="features">
      <div className="features-container">
        <motion.div
          className="features-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="features-title">
            Why Choose <span className="highlight">LearnInfinity</span>?
          </h2>
          <p className="features-subtitle">
            Experience the future of learning with our innovative platform designed for modern learners
          </p>
        </motion.div>

        <motion.div
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="feature-card"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: `0 20px 40px rgba(177, 59, 255, 0.1)`
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="feature-icon"
                  style={{ color: feature.color }}
                  whileHover={{ 
                    scale: 1.2,
                    rotate: 360
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon />
                </motion.div>
                
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                
                <motion.div
                  className="feature-hover-effect"
                  style={{ background: feature.color }}
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 0.1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="features-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="features-btn"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 15px 30px rgba(255, 215, 0, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Explore All Features
          </motion.button>
        </motion.div>
      </div>

      {/* Background decorations */}
      <div className="features-bg">
        <motion.div
          className="bg-circle bg-circle-1"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="bg-circle bg-circle-2"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>
    </section>
  );
};

export default Features;