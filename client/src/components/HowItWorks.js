import React from 'react';
import { motion } from 'framer-motion';
import { FiUserPlus, FiSearch, FiCalendar, FiStar } from 'react-icons/fi';
import './HowItWorks.css';

const HowItWorks = () => {
  const steps = [
    {
      icon: FiUserPlus,
      title: 'Sign Up & Create Profile',
      description: 'Join our community and showcase your skills. Tell us what you can teach and what you want to learn.',
      step: '01'
    },
    {
      icon: FiSearch,
      title: 'Find Your Match',
      description: 'Browse available skills or let our AI match you with the perfect learning partner based on your interests.',
      step: '02'
    },
    {
      icon: FiCalendar,
      title: 'Schedule Sessions',
      description: 'Book convenient time slots that work for both you and your learning partner. Flexible scheduling available.',
      step: '03'
    },
    {
      icon: FiStar,
      title: 'Learn & Earn Credits',
      description: 'Attend sessions, learn new skills, and earn credits by teaching others. Build your skill portfolio!',
      step: '04'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="how-it-works" className="how-it-works">
      <div className="how-it-works-container">
        <motion.div
          className="how-it-works-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="how-it-works-title">
            How <span className="highlight">LearnInfinity</span> Works
          </h2>
          <p className="how-it-works-subtitle">
            Get started in just 4 simple steps and begin your learning journey today
          </p>
        </motion.div>

        <motion.div
          className="steps-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                className="step-card"
                variants={stepVariants}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="step-number">{step.step}</div>
                
                <motion.div
                  className="step-icon"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon />
                </motion.div>
                
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
                
                {index < steps.length - 1 && (
                  <motion.div
                    className="step-connector"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    viewport={{ once: true }}
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="demo-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="demo-content">
            <h3 className="demo-title">Ready to Start Your Journey?</h3>
            <p className="demo-description">
              Join thousands of learners who are already trading skills and building their expertise
            </p>
            <motion.button
              className="demo-btn"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 15px 30px rgba(255, 215, 0, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Free Trial
            </motion.button>
          </div>
          
          <motion.div
            className="demo-visual"
            animate={{
              y: [-10, 10, -10],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="credit-counter">
              <motion.div
                className="counter-display"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <span className="counter-label">Your Credits</span>
                <motion.span
                  className="counter-value"
                  animate={{
                    color: ['#FFD700', '#FFC107', '#FFD700'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  24
                </motion.span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background elements */}
      <div className="how-it-works-bg">
        <motion.div
          className="bg-shape bg-shape-1"
          animate={{
            rotate: [0, 360],
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

export default HowItWorks;