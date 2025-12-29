import axios from 'axios';

// Create axios instance with base configuration
const API = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  // Register new user
  register: async (userData) => {
    try {
      const response = await API.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await API.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  // Get current user profile
  getProfile: async () => {
    try {
      const response = await API.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to get profile' };
    }
  },

  // Update user profile
  updateProfile: async (profileData) => {
    try {
      const response = await API.put('/auth/profile', profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update profile' };
    }
  },

  // Add skill
  addSkill: async (skillData) => {
    try {
      const response = await API.post('/auth/skills', skillData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to add skill' };
    }
  },

  // Remove skill
  removeSkill: async (type, index) => {
    try {
      const response = await API.delete(`/auth/skills/${type}/${index}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to remove skill' };
    }
  },

  // Deduct credit (hourly usage)
  deductCredit: async () => {
    try {
      const response = await API.post('/auth/deduct-credit');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to deduct credit' };
    }
  },

  // Add credit (when teaching)
  addCredit: async (hours = 1) => {
    try {
      const response = await API.post('/auth/add-credit', { hours });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to add credit' };
    }
  },

  // Start user session
  startSession: async () => {
    try {
      const response = await API.post('/auth/start-session');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to start session' };
    }
  },

  // End user session
  endSession: async () => {
    try {
      const response = await API.post('/auth/end-session');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to end session' };
    }
  },

  // Logout user (client-side)
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// Utility functions for token management
export const tokenUtils = {
  setToken: (token) => {
    localStorage.setItem('token', token);
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  removeToken: () => {
    localStorage.removeItem('token');
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token;
  }
};

// User data management
export const userUtils = {
  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  },

  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  removeUser: () => {
    localStorage.removeItem('user');
  },

  updateUserCredits: (credits) => {
    const user = userUtils.getUser();
    if (user) {
      user.credits = credits;
      userUtils.setUser(user);
    }
  }
};

export default API;