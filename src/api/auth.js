import axios from './axios';

export const authAPI = {
  // Register new user
  register: async (userData) => {
    const response = await axios.post('/auth/register', userData);
    return response;
  },

  // Login user
  login: async (credentials) => {
    const response = await axios.post('/auth/login', credentials);
    return response;
  },

  // Get current user
  getMe: async () => {
    const response = await axios.get('/auth/me');
    return response;
  },

  // Update user profile
  updateProfile: async (userData) => {
    const response = await axios.put('/auth/updateprofile', userData);
    return response;
  },

  // Verify email with token
  verifyEmail: async (token) => {
    const response = await axios.post('/auth/verify-email', { token });
    return response;
  },

  // Resend verification email
  resendVerification: async (email) => {
    const response = await axios.post('/auth/resend-verification', { email });
    return response;
  }
};
