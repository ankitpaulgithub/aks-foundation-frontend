import axios from 'axios';
import toast from 'react-hot-toast';

// Create axios instance with base URL
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Don't override Content-Type for FormData (let browser set it with boundary)
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    // Return successful response as-is
    return response;
  },
  (error) => {
    const { response } = error;
    
    if (response) {
      const { status, data } = response;
      
      switch (status) {
        case 401:
          // Unauthorized - Token expired or invalid
          toast.error('Session expired. Please login again.');
          
          // Clear auth data from localStorage
          if (typeof window !== 'undefined') {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userRole');
          }
          
          // Redirect to login page
          if (typeof window !== 'undefined') {
            // Use setTimeout to allow toast to show before redirect
            setTimeout(() => {
              window.location.href = '/login';
            }, 1500);
          }
          break;
          
        case 403:
          // Forbidden - User doesn't have permission
          toast.error('You do not have permission to perform this action.');
          break;
          
        case 404:
          // Not found
          toast.error(data?.message || 'Resource not found.');
          break;
          
        case 500:
          // Server error
          toast.error(data?.message || 'Server error. Please try again later.');
          break;
          
        default:
          // Other errors
          toast.error(data?.message || 'An error occurred. Please try again.');
      }
    } else if (error.request) {
      // Request was made but no response received (network error)
      toast.error('Network error. Please check your internet connection.');
    } else {
      // Something else happened
      toast.error('An unexpected error occurred.');
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
