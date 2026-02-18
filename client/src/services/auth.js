import API from './api';

// Register new user
export const register = async (userData) => {
  try {
    const response = await API.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Login user
export const login = async (credentials) => {
  try {
    const response = await API.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Google OAuth Login
export const loginWithGoogle = async (googleData) => {
  try {
    const response = await API.post('/auth/google', googleData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Logout user
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/';
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const response = await API.get('/auth/me');
    return response.data.user;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Check if user is logged in
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// Get user from localStorage
export const getStoredUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};
