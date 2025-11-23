import axios from 'axios';
import { API_URL } from '../utils/constants';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor - add token to requests
axiosInstance.interceptors.request.use(
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

// Response interceptor - handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    // Return only the data from successful responses
    return response.data;
  },
  (error) => {
    if (error.response) {
      // Handle 401 Unauthorized
      if (error.response.status === 401) {
        // Clear token and redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }

      // Handle 403 with EMAIL_NOT_VERIFIED code specially
      if (error.response.status === 403 && error.response.data?.code === 'EMAIL_NOT_VERIFIED') {
        const customError = new Error(error.response.data.message);
        customError.code = 'EMAIL_NOT_VERIFIED';
        customError.email = error.response.data.email;
        return Promise.reject(customError);
      }

      // Return error message from backend
      const message = error.response.data?.message || 'An error occurred';
      return Promise.reject(new Error(message));
    } else if (error.request) {
      // Network error
      return Promise.reject(new Error('Network error. Please check your connection.'));
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
