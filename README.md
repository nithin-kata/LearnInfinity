# LearnInfinity ∞

> **Trade Skills, Not Cash** - A modern MERN stack platform for skill sharing through credit-based exchanges

![LearnInfinity](https://img.shields.io/badge/LearnInfinity-Skill%20Sharing%20Platform-teal)
![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![Status](https://img.shields.io/badge/Status-Active%20Development-blue)

## 🌟 Overview

LearnInfinity is a comprehensive skill-sharing platform that revolutionizes how people learn and teach by implementing a credit-based economy instead of traditional monetary transactions. Users can offer their expertise in exchange for credits, which they can then use to learn new skills from other community members.

### ✨ Key Features

- 🎯 **Credit-Based System**: Trade skills using credits instead of money
- 🚀 **Modern UI/UX**: Elegant design with smooth animations
- 📱 **Responsive Design**: Works seamlessly on all devices
- 🔐 **Secure Authentication**: JWT-based user authentication
- ⏱️ **Automatic Session Tracking**: Smart credit deduction system
- 🎓 **Skills Management**: Comprehensive skill offering and learning system
- 👥 **Instructor Profiles**: Detailed instructor showcases with ratings
- 🎬 **Embedded Video Learning**: In-platform video tutorials

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern component-based UI
- **React Router** - Client-side routing
- **Framer Motion** - Smooth animations
- **CSS3** - Custom styling with modern design

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - Object Document Mapper

### Authentication & Security
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd learninfinity
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   PORT=5000
   ```

5. **Start the development servers**
   ```bash
   # Start backend server (from root directory)
   npm run dev
   
   # Start frontend server (in a new terminal)
   cd client
   npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🎨 Design System

### Color Palette
- **Primary Dark**: `#061E29` - Deep navy for headers and primary elements
- **Primary Medium**: `#1D546D` - Teal for interactive elements
- **Primary Light**: `#5F9598` - Light teal for accents
- **Background**: `#F3F4F4` - Light gray for backgrounds

### Typography
- Modern, clean fonts with excellent readability
- Hierarchical text sizing for clear information architecture

## 📊 Credit System

### How It Works
- **New Users**: Receive 24 free credits upon registration
- **Learning**: 1 credit deducted per hour of platform usage
- **Teaching**: Earn credits by offering skills to other users
- **Automatic Tracking**: Server-side session management with hourly deduction

### Credit Management
- Real-time credit balance updates
- Transparent usage tracking
- Earning opportunities through skill sharing

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get user profile
- `PUT /api/auth/profile` - Update profile

### Skills Management
- `POST /api/auth/skills` - Add new skill
- `DELETE /api/auth/skills/:type/:index` - Remove skill

### Session Management
- `POST /api/auth/start-session` - Start learning session
- `POST /api/auth/end-session` - End session
- `POST /api/auth/deduct-credit` - Manual credit deduction

## 📱 Features Overview

### 🏠 Homepage
- Hero section with compelling call-to-actions
- Feature highlights and benefits
- "How It Works" explanation
- Contact information and support

### 🎓 Skills Exploration
- Browse available skills by category
- Embedded video tutorials
- Skill difficulty levels and descriptions
- Direct instructor contact

### 👨‍🏫 Instructor Profiles
- Detailed instructor information
- Skills offered and expertise levels
- Ratings and reviews
- Direct booking system

### 👤 User Profile
- Personal dashboard with statistics
- Skills offered and learning management
- Credit balance and usage history
- Profile customization options

## 🔐 Security Features

- Secure password hashing with bcrypt
- JWT token-based authentication
- Protected API routes
- Input validation and sanitization
- Session management and automatic cleanup

## 📞 Contact & Support

- **Email**: learn@infinity.com
- **Phone**: Coming soon
- **Location**: Hyderabad, Telangana

## 🤝 Contributing

We welcome contributions to LearnInfinity! Please read our contributing guidelines and feel free to submit pull requests or open issues.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by the sharing economy and skill exchange communities
- Designed for seamless user experience and accessibility

---

**LearnInfinity** - Empowering skill sharing through innovative technology ∞