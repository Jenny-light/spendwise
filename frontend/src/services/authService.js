import api from './api';

const authService = {
  // Register user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('user');
  },

  // Get user profile
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  // Update user profile
  updateProfile: async (userData) => {
    const response = await api.put('/auth/profile', userData);
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

export default authService;