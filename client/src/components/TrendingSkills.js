import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiPlay, FiEye, FiThumbsUp, FiClock, FiTrendingUp, FiStar, FiX } from 'react-icons/fi';
import './TrendingSkills.css';

const TrendingSkills = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleBecomeCreator = () => {
    navigate('/auth');
  };

  // Extract YouTube video ID from URL
  const extractVideoId = (url) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : null;
  };

  // Your actual course data
  const trendingVideos = [
    {
      id: 1,
      title: 'Complete Python Programming Course',
      creator: 'Programming with Mosh',
      category: 'programming',
      url: 'https://youtu.be/ix9cRaBkVe0?si=UI4xLfhxtMHVPYsi',
      videoId: extractVideoId('https://youtu.be/ix9cRaBkVe0?si=UI4xLfhxtMHVPYsi'),
      duration: '6:14:07',
      views: '2.8M',
      likes: '89K',
      rating: 4.9,
      description: 'Learn Python programming from scratch with this comprehensive course covering all fundamentals and advanced concepts.',
      tags: ['Python', 'Programming', 'Beginner'],
      trending: true
    },
    {
      id: 2,
      title: 'JavaScript Full Course for Beginners',
      creator: 'freeCodeCamp.org',
      category: 'programming',
      url: 'https://youtu.be/lfmg-EJ8gm4?si=xieR2mbmWs2IFtMz',
      videoId: extractVideoId('https://youtu.be/lfmg-EJ8gm4?si=xieR2mbmWs2IFtMz'),
      duration: '3:26:42',
      views: '1.5M',
      likes: '65K',
      rating: 4.8,
      description: 'Master JavaScript from basics to advanced concepts. Perfect for beginners starting their web development journey.',
      tags: ['JavaScript', 'Web Development', 'Frontend'],
      trending: true
    },
    {
      id: 3,
      title: 'Learn German - Complete Course',
      creator: 'Deutsch für Euch',
      category: 'language',
      url: 'https://youtu.be/0p4RCJ8P5ko?si=C3PIAavPFfqWh8dQ',
      videoId: extractVideoId('https://youtu.be/0p4RCJ8P5ko?si=C3PIAavPFfqWh8dQ'),
      duration: '2:15:30',
      views: '890K',
      likes: '42K',
      rating: 4.7,
      description: 'Comprehensive German language course covering grammar, vocabulary, and conversation skills for beginners.',
      tags: ['German', 'Language', 'Communication'],
      trending: true
    },
    {
      id: 4,
      title: 'Computer Basics - Complete Course',
      creator: 'ExamPro',
      category: 'computer-science',
      url: 'https://youtu.be/y2kg3MOk1sY?si=Agui0wUBrgYkQkWQ',
      videoId: extractVideoId('https://youtu.be/y2kg3MOk1sY?si=Agui0wUBrgYkQkWQ'),
      duration: '4:32:15',
      views: '1.2M',
      likes: '58K',
      rating: 4.8,
      description: 'Learn computer fundamentals including hardware, software, networking, and digital literacy concepts.',
      tags: ['Computer Science', 'Basics', 'Technology'],
      trending: false
    },
    {
      id: 5,
      title: 'Operating Systems Complete Course',
      creator: 'Neso Academy',
      category: 'computer-science',
      url: 'https://youtu.be/yK1uBHPdp30?si=TzbJqZHoqsjwLUnF',
      videoId: extractVideoId('https://youtu.be/yK1uBHPdp30?si=TzbJqZHoqsjwLUnF'),
      duration: '5:45:20',
      views: '2.1M',
      likes: '78K',
      rating: 4.9,
      description: 'Comprehensive operating systems course covering processes, memory management, file systems, and more.',
      tags: ['Operating Systems', 'Computer Science', 'Advanced'],
      trending: true
    }
  ];

  const categories = [
    { id: 'all', label: 'All Skills', icon: FiTrendingUp },
    { id: 'programming', label: 'Programming', icon: FiPlay },
    { id: 'language', label: 'Languages', icon: FiStar },
    { id: 'computer-science', label: 'Computer Science', icon: FiEye }
  ];

  const filteredVideos = activeCategory === 'all' 
    ? trendingVideos 
    : trendingVideos.filter(video => video.category === activeCategory);

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

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const closeVideoPlayer = () => {
    setSelectedVideo(null);
  };

  return (
    <section id="explore-skills" className="trending-skills">
      <div className="trending-container">
        <motion.div
          className="trending-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="trending-title">
            <FiTrendingUp className="trending-icon" />
            Explore <span className="highlight">Skills</span>
          </h2>
          <p className="trending-subtitle">
            Discover the most popular learning content from top creators in the community
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
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="category-icon" />
                {category.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Videos Grid */}
        <motion.div
          className="videos-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filteredVideos.map((video) => (
            <motion.div
              key={video.id}
              className="video-card"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(177, 59, 255, 0.15)"
              }}
              onClick={() => handleVideoClick(video)}
            >
              {video.trending && (
                <div className="trending-badge">
                  <FiTrendingUp />
                  Trending
                </div>
              )}

              <div className="video-thumbnail">
                <img src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`} alt={video.title} />
                <div className="play-overlay">
                  <motion.div
                    className="play-button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiPlay />
                  </motion.div>
                </div>
                <div className="video-duration">
                  <FiClock />
                  {video.duration}
                </div>
              </div>

              <div className="video-content">
                <h3 className="video-title">{video.title}</h3>
                <p className="video-creator">by {video.creator}</p>
                <p className="video-description">{video.description}</p>

                <div className="video-tags">
                  {video.tags.map((tag, index) => (
                    <span key={index} className="video-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="video-stats">
                  <div className="stat">
                    <FiEye />
                    <span>{video.views} views</span>
                  </div>
                  <div className="stat">
                    <FiThumbsUp />
                    <span>{video.likes}</span>
                  </div>
                  <div className="stat rating">
                    <FiStar />
                    <span>{video.rating}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="trending-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3>Ready to Share Your Skills?</h3>
          <p>Join our community of creators and start teaching what you love</p>
          <motion.button
            className="become-creator-btn"
            onClick={handleBecomeCreator}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 15px 30px rgba(177, 59, 255, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Become a Creator
          </motion.button>
        </motion.div>
      </div>

      {/* Embedded Video Player Modal */}
      {selectedVideo && (
        <motion.div
          className="video-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeVideoPlayer}
        >
          <motion.div
            className="video-modal"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-video-btn" onClick={closeVideoPlayer}>
              <FiX />
            </button>
            <div className="video-player-container">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1&rel=0`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="video-modal-info">
              <h3>{selectedVideo.title}</h3>
              <p className="modal-creator">by {selectedVideo.creator}</p>
              <p className="modal-description">{selectedVideo.description}</p>
              <div className="modal-stats">
                <span><FiEye /> {selectedVideo.views} views</span>
                <span><FiThumbsUp /> {selectedVideo.likes}</span>
                <span><FiStar /> {selectedVideo.rating}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Background decorations */}
      <div className="trending-bg">
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

export default TrendingSkills;