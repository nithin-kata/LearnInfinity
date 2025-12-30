import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FiVideo, FiUpload, FiPlay, FiEdit3, FiTrash2, FiEye, FiThumbsUp, 
  FiUsers, FiDollarSign, FiTrendingUp, FiPlus, FiX, FiCheck,
  FiBarChart2, FiStar
} from 'react-icons/fi';
import './CreatorDashboardPage.css';

const CreatorDashboardPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [videos, setVideos] = useState([]);
  const [uploadData, setUploadData] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
    videoUrl: '',
    thumbnail: '',
    difficulty: 'beginner',
    duration: '',
    price: 1
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    // Load creator's videos (mock data)
    setVideos([
      {
        id: 1,
        title: 'Introduction to React Hooks',
        description: 'Learn the fundamentals of React Hooks including useState, useEffect, and custom hooks.',
        category: 'programming',
        tags: ['React', 'JavaScript', 'Hooks'],
        videoUrl: 'https://youtu.be/O6P86uwfdR0',
        thumbnail: 'https://img.youtube.com/vi/O6P86uwfdR0/maxresdefault.jpg',
        difficulty: 'intermediate',
        duration: '45:30',
        price: 2,
        views: 1250,
        likes: 89,
        students: 156,
        earnings: 312,
        status: 'published',
        publishedDate: '2024-01-15'
      },
      {
        id: 2,
        title: 'Advanced JavaScript Concepts',
        description: 'Deep dive into closures, prototypes, and asynchronous programming in JavaScript.',
        category: 'programming',
        tags: ['JavaScript', 'Advanced', 'Async'],
        videoUrl: 'https://youtu.be/hQVTIJBZook',
        thumbnail: 'https://img.youtube.com/vi/hQVTIJBZook/maxresdefault.jpg',
        difficulty: 'advanced',
        duration: '1:12:45',
        price: 3,
        views: 890,
        likes: 67,
        students: 98,
        earnings: 294,
        status: 'published',
        publishedDate: '2024-01-10'
      }
    ]);
  }, [isAuthenticated, navigate]);

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    
    const newVideo = {
      id: videos.length + 1,
      ...uploadData,
      tags: uploadData.tags.split(',').map(tag => tag.trim()),
      views: 0,
      likes: 0,
      students: 0,
      earnings: 0,
      status: 'processing',
      publishedDate: new Date().toISOString().split('T')[0]
    };

    setVideos([newVideo, ...videos]);
    setShowUploadModal(false);
    setUploadData({
      title: '',
      description: '',
      category: '',
      tags: '',
      videoUrl: '',
      thumbnail: '',
      difficulty: 'beginner',
      duration: '',
      price: 1
    });
  };

  const handleDeleteVideo = (videoId) => {
    setVideos(videos.filter(video => video.id !== videoId));
  };

  const totalStats = {
    totalVideos: videos.length,
    totalViews: videos.reduce((sum, video) => sum + video.views, 0),
    totalStudents: videos.reduce((sum, video) => sum + video.students, 0),
    totalEarnings: videos.reduce((sum, video) => sum + video.earnings, 0)
  };

  const renderOverview = () => (
    <div className="overview-content">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <FiVideo />
          </div>
          <div className="stat-info">
            <div className="stat-number">{totalStats.totalVideos}</div>
            <div className="stat-label">Total Videos</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FiEye />
          </div>
          <div className="stat-info">
            <div className="stat-number">{totalStats.totalViews.toLocaleString()}</div>
            <div className="stat-label">Total Views</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FiUsers />
          </div>
          <div className="stat-info">
            <div className="stat-number">{totalStats.totalStudents}</div>
            <div className="stat-label">Students Taught</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FiDollarSign />
          </div>
          <div className="stat-info">
            <div className="stat-number">{totalStats.totalEarnings}</div>
            <div className="stat-label">Credits Earned</div>
          </div>
        </div>
      </div>

      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          <div className="activity-item">
            <FiTrendingUp className="activity-icon" />
            <div className="activity-content">
              <p>Your video "Introduction to React Hooks" gained 50 new views</p>
              <span className="activity-time">2 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <FiUsers className="activity-icon" />
            <div className="activity-content">
              <p>15 new students enrolled in your courses</p>
              <span className="activity-time">1 day ago</span>
            </div>
          </div>
          <div className="activity-item">
            <FiStar className="activity-icon" />
            <div className="activity-content">
              <p>You received a 5-star rating from a student</p>
              <span className="activity-time">2 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderVideos = () => (
    <div className="videos-content">
      <div className="videos-header">
        <h3>My Videos ({videos.length})</h3>
        <motion.button
          className="btn-upload"
          onClick={() => setShowUploadModal(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiPlus />
          Upload New Video
        </motion.button>
      </div>

      <div className="videos-grid">
        {videos.map((video) => (
          <motion.div
            key={video.id}
            className="video-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="video-thumbnail">
              <img src={video.thumbnail} alt={video.title} />
              <div className="video-overlay">
                <FiPlay className="play-icon" />
              </div>
              <div className="video-duration">{video.duration}</div>
              <div className={`video-status ${video.status}`}>
                {video.status}
              </div>
            </div>

            <div className="video-info">
              <h4>{video.title}</h4>
              <p>{video.description}</p>
              
              <div className="video-tags">
                {video.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>

              <div className="video-stats">
                <div className="stat">
                  <FiEye />
                  <span>{video.views}</span>
                </div>
                <div className="stat">
                  <FiThumbsUp />
                  <span>{video.likes}</span>
                </div>
                <div className="stat">
                  <FiUsers />
                  <span>{video.students}</span>
                </div>
                <div className="stat earnings">
                  <FiDollarSign />
                  <span>{video.earnings} credits</span>
                </div>
              </div>

              <div className="video-actions">
                <button className="action-btn edit">
                  <FiEdit3 />
                </button>
                <button 
                  className="action-btn delete"
                  onClick={() => handleDeleteVideo(video.id)}
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="analytics-content">
      <h3>Analytics & Performance</h3>
      <div className="analytics-grid">
        <div className="analytics-card">
          <h4>Video Performance</h4>
          <div className="performance-list">
            {videos.map((video) => (
              <div key={video.id} className="performance-item">
                <div className="performance-info">
                  <span className="video-title">{video.title}</span>
                  <div className="performance-stats">
                    <span>{video.views} views</span>
                    <span>{video.students} students</span>
                    <span>{video.earnings} credits</span>
                  </div>
                </div>
                <div className="performance-bar">
                  <div 
                    className="performance-fill"
                    style={{ width: `${(video.views / Math.max(...videos.map(v => v.views))) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="analytics-card">
          <h4>Monthly Earnings</h4>
          <div className="earnings-chart">
            <div className="chart-placeholder">
              <FiBarChart2 />
              <p>Earnings chart would be displayed here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="creator-dashboard">
      <div className="dashboard-container">
        <motion.div
          className="dashboard-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>
            <FiVideo className="header-icon" />
            Creator Dashboard
          </h1>
          <p>Welcome back, {user?.name}! Manage your content and track your performance.</p>
        </motion.div>

        <div className="dashboard-tabs">
          <button
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <FiBarChart2 />
            Overview
          </button>
          <button
            className={`tab-btn ${activeTab === 'videos' ? 'active' : ''}`}
            onClick={() => setActiveTab('videos')}
          >
            <FiVideo />
            My Videos
          </button>
          <button
            className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <FiTrendingUp />
            Analytics
          </button>
        </div>

        <div className="dashboard-content">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'videos' && renderVideos()}
          {activeTab === 'analytics' && renderAnalytics()}
        </div>
      </div>

      {/* Upload Video Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              className="upload-modal"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>Upload New Video</h3>
                <button 
                  className="close-btn"
                  onClick={() => setShowUploadModal(false)}
                >
                  <FiX />
                </button>
              </div>

              <form className="upload-form" onSubmit={handleUploadSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Video Title *</label>
                    <input
                      type="text"
                      value={uploadData.title}
                      onChange={(e) => setUploadData({...uploadData, title: e.target.value})}
                      placeholder="Enter video title"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Category *</label>
                    <select
                      value={uploadData.category}
                      onChange={(e) => setUploadData({...uploadData, category: e.target.value})}
                      required
                    >
                      <option value="">Select category</option>
                      <option value="programming">Programming</option>
                      <option value="design">Design</option>
                      <option value="marketing">Marketing</option>
                      <option value="business">Business</option>
                      <option value="language">Language</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Difficulty Level</label>
                    <select
                      value={uploadData.difficulty}
                      onChange={(e) => setUploadData({...uploadData, difficulty: e.target.value})}
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Duration</label>
                    <input
                      type="text"
                      value={uploadData.duration}
                      onChange={(e) => setUploadData({...uploadData, duration: e.target.value})}
                      placeholder="e.g., 45:30"
                    />
                  </div>

                  <div className="form-group">
                    <label>Video URL *</label>
                    <input
                      type="url"
                      value={uploadData.videoUrl}
                      onChange={(e) => setUploadData({...uploadData, videoUrl: e.target.value})}
                      placeholder="https://youtube.com/watch?v=..."
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Price (Credits per hour)</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={uploadData.price}
                      onChange={(e) => setUploadData({...uploadData, price: parseInt(e.target.value)})}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Description *</label>
                  <textarea
                    value={uploadData.description}
                    onChange={(e) => setUploadData({...uploadData, description: e.target.value})}
                    placeholder="Describe what students will learn in this video..."
                    rows="4"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Tags</label>
                  <input
                    type="text"
                    value={uploadData.tags}
                    onChange={(e) => setUploadData({...uploadData, tags: e.target.value})}
                    placeholder="React, JavaScript, Tutorial (comma separated)"
                  />
                </div>

                <div className="modal-actions">
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={() => setShowUploadModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-upload-submit">
                    <FiUpload />
                    Upload Video
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreatorDashboardPage;