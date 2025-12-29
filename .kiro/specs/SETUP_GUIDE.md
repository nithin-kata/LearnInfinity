# LearnInfinity Development Setup Guide

This comprehensive guide will help you set up the LearnInfinity project for local development.

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software
- **Node.js** (v14.0.0 or higher)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`
- **npm** (comes with Node.js) or **yarn**
  - Verify npm: `npm --version`
  - Or install yarn: `npm install -g yarn`
- **Git** for version control
  - Download from [git-scm.com](https://git-scm.com/)
  - Verify installation: `git --version`

### Database Setup
- **MongoDB Atlas Account** (recommended) or local MongoDB installation
  - Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
  - Or install MongoDB locally: [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)

### Development Tools (Optional but Recommended)
- **Visual Studio Code** - Code editor with excellent React/Node.js support
- **MongoDB Compass** - GUI for MongoDB database management
- **Postman** - API testing tool

## 🚀 Installation Steps

### 1. Clone the Repository

```bash
# Clone the repository
git clone [your-repository-url]
cd learninfinity

# Or if you're starting fresh, create the directory structure
mkdir learninfinity
cd learninfinity
```

### 2. Backend Setup

#### Install Backend Dependencies
```bash
# From the root directory
npm install
```

#### Backend Dependencies Installed
- **express** - Web application framework
- **mongoose** - MongoDB object modeling
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variable management
- **nodemon** - Development server with auto-restart (dev dependency)

#### Create Environment Configuration
Create a `.env` file in the root directory:

```env
# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/learninfinity?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_complex

# Server Configuration
NODE_ENV=development
PORT=5000

# Optional: Add other environment variables as needed
```

**Important Environment Variables:**
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token signing (use a long, random string)
- `NODE_ENV`: Set to 'development' for local development
- `PORT`: Server port (default: 5000)

### 3. Frontend Setup

#### Navigate to Client Directory and Install Dependencies
```bash
cd client
npm install
```

#### Frontend Dependencies Installed
- **react** - UI library
- **react-dom** - React DOM rendering
- **react-router-dom** - Client-side routing
- **framer-motion** - Animation library
- **react-icons** - Icon components
- **react-scripts** - Create React App scripts

#### Frontend Configuration
The frontend is configured to proxy API requests to the backend server. Check `client/package.json` for the proxy setting:

```json
{
  "name": "client",
  "proxy": "http://localhost:5000",
  ...
}
```

### 4. Database Setup

#### Option A: MongoDB Atlas (Recommended)

1. **Create MongoDB Atlas Account**
   - Visit [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create a Cluster**
   - Choose the free tier (M0 Sandbox)
   - Select a cloud provider and region
   - Create cluster (takes 1-3 minutes)

3. **Configure Database Access**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Create a user with read/write permissions
   - Note the username and password

4. **Configure Network Access**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - For development, you can add `0.0.0.0/0` (allow access from anywhere)
   - For production, restrict to specific IPs

5. **Get Connection String**
   - Go to "Clusters" and click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `learninfinity`

#### Option B: Local MongoDB Installation

1. **Install MongoDB Community Edition**
   - Follow instructions for your OS at [mongodb.com/docs/manual/installation/](https://docs.mongodb.com/manual/installation/)

2. **Start MongoDB Service**
   ```bash
   # On macOS with Homebrew
   brew services start mongodb-community

   # On Windows (as Administrator)
   net start MongoDB

   # On Linux (systemd)
   sudo systemctl start mongod
   ```

3. **Use Local Connection String**
   ```env
   MONGODB_URI=mongodb://localhost:27017/learninfinity
   ```

## 🏃‍♂️ Running the Application

### Development Mode

#### Option 1: Run Both Servers Separately

**Terminal 1 - Backend Server:**
```bash
# From root directory
npm run dev
# or
nodemon server.js
```

**Terminal 2 - Frontend Server:**
```bash
# From client directory
cd client
npm start
```

#### Option 2: Concurrent Development (if configured)
```bash
# From root directory (if you have concurrently installed)
npm run dev:full
```

### Production Mode

#### Build Frontend
```bash
cd client
npm run build
```

#### Start Production Server
```bash
# From root directory
NODE_ENV=production npm start
```

## 🌐 Accessing the Application

Once both servers are running:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 🔧 Development Scripts

### Backend Scripts (from root directory)
```bash
# Start development server with nodemon
npm run dev

# Start production server
npm start

# Run tests (if configured)
npm test
```

### Frontend Scripts (from client directory)
```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject from Create React App (irreversible)
npm run eject
```

## 🗂️ Project Structure

```
learninfinity/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/               # Source code
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context
│   │   ├── services/      # API services
│   │   └── ...
│   ├── package.json       # Frontend dependencies
│   └── ...
├── models/                # MongoDB models
│   └── User.js           # User model
├── routes/               # Express routes
│   └── auth.js          # Authentication routes
├── .env                 # Environment variables
├── .gitignore          # Git ignore rules
├── package.json        # Backend dependencies
├── server.js           # Express server
└── README.md           # Project documentation
```

## 🔍 Verification Steps

### 1. Backend Verification
```bash
# Test API health endpoint
curl http://localhost:5000/api/health

# Expected response:
{
  "message": "LearnInfinity API is running!",
  "database": "Connected",
  "timestamp": "2023-09-06T15:30:00.000Z"
}
```

### 2. Frontend Verification
- Navigate to http://localhost:3000
- You should see the LearnInfinity homepage
- Check browser console for any errors

### 3. Database Verification
- Register a new user account
- Login with the created account
- Check MongoDB database for the new user record

### 4. Full Stack Integration
- Register a new user (tests backend API and database)
- Login (tests authentication flow)
- Navigate between pages (tests frontend routing)
- Add skills to profile (tests CRUD operations)

## 🐛 Troubleshooting

### Common Issues and Solutions

#### Backend Issues

**Port Already in Use**
```bash
# Find process using port 5000
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill the process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

**MongoDB Connection Issues**
- Verify MongoDB is running (local) or accessible (Atlas)
- Check connection string format
- Ensure database user has proper permissions
- Check network access settings (Atlas)

**Environment Variables Not Loading**
- Ensure `.env` file is in the root directory
- Check for typos in variable names
- Restart the server after changing `.env`

#### Frontend Issues

**Module Not Found Errors**
```bash
# Clear npm cache and reinstall
cd client
rm -rf node_modules package-lock.json
npm install
```

**Proxy Issues**
- Ensure backend server is running on port 5000
- Check proxy setting in `client/package.json`
- Clear browser cache

**Build Issues**
```bash
# Clear build cache
cd client
rm -rf build
npm run build
```

#### Database Issues

**Connection Timeout**
- Check internet connection
- Verify MongoDB Atlas IP whitelist
- Ensure correct connection string

**Authentication Failed**
- Verify database username and password
- Check user permissions in MongoDB Atlas

### Getting Help

If you encounter issues not covered here:

1. **Check Console Logs**: Look for error messages in terminal and browser console
2. **Verify Prerequisites**: Ensure all required software is installed and updated
3. **Environment Variables**: Double-check all environment variables are set correctly
4. **Network Issues**: Verify internet connection and firewall settings
5. **Contact Support**: Email learn@infinity.com for additional help

## 🚀 Next Steps

After successful setup:

1. **Explore the Codebase**: Familiarize yourself with the project structure
2. **Read Documentation**: Review API documentation and user guides
3. **Run Tests**: Execute test suites to ensure everything works
4. **Start Development**: Begin implementing new features or fixes
5. **Set Up IDE**: Configure your development environment with extensions and settings

## 📚 Additional Resources

- **React Documentation**: [reactjs.org](https://reactjs.org/)
- **Express.js Guide**: [expressjs.com](https://expressjs.com/)
- **MongoDB Manual**: [docs.mongodb.com](https://docs.mongodb.com/)
- **Node.js Documentation**: [nodejs.org/docs](https://nodejs.org/en/docs/)
- **JWT Introduction**: [jwt.io/introduction](https://jwt.io/introduction/)

---

You're now ready to start developing with LearnInfinity! 🎉