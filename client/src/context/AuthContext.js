import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, tokenUtils, userUtils } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = async () => {
    try {
      // End session on server
      await authAPI.endSession();
    } catch (error) {
      console.error('Failed to end session:', error);
    }
    
    tokenUtils.removeToken();
    userUtils.removeUser();
    setUser(null);
    setIsAuthenticated(false);
  };

  // Check if user is authenticated on app load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = tokenUtils.getToken();
        const savedUser = userUtils.getUser();

        if (token && savedUser) {
          // Verify token is still valid by fetching user profile
          const response = await authAPI.getProfile();
          if (response.success) {
            setUser({
              ...response.user,
              skillsOffered: response.user.skillsOffered || [],
              skillsLearning: response.user.skillsLearning || []
            });
            setIsAuthenticated(true);
            // Update saved user data with latest from server
            userUtils.setUser({
              ...response.user,
              skillsOffered: response.user.skillsOffered || [],
              skillsLearning: response.user.skillsLearning || []
            });
          } else {
            // Token is invalid, clear storage
            logout();
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        // Token is invalid, clear storage
        logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      if (response.success) {
        const userData = {
          ...response.user,
          skillsOffered: response.user.skillsOffered || [],
          skillsLearning: response.user.skillsLearning || []
        };
        tokenUtils.setToken(response.token);
        userUtils.setUser(userData);
        setUser(userData);
        setIsAuthenticated(true);
        
        // Start session for credit tracking
        try {
          await authAPI.startSession();
        } catch (sessionError) {
          console.error('Failed to start session:', sessionError);
        }
        
        return response;
      }
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      if (response.success) {
        const userDataWithSkills = {
          ...response.user,
          skillsOffered: response.user.skillsOffered || [],
          skillsLearning: response.user.skillsLearning || []
        };
        tokenUtils.setToken(response.token);
        userUtils.setUser(userDataWithSkills);
        setUser(userDataWithSkills);
        setIsAuthenticated(true);
        return response;
      }
    } catch (error) {
      throw error;
    }
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    userUtils.setUser(updatedUser);
  };

  const updateCredits = (newCredits) => {
    if (user) {
      const updatedUser = { ...user, credits: newCredits };
      setUser(updatedUser);
      userUtils.setUser(updatedUser);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
    updateCredits
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};