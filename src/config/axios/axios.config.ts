import axios from 'axios';

// Create an Axios instance with default configuration
const fitTrackerApi = axios.create({
  baseURL: 'http://localhost:5000', // Replace with your API base URL
  timeout: 10000, // Timeout for requests (in milliseconds)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to handle authentication tokens if needed
fitTrackerApi.interceptors.request.use(
  (config) => {
    // You can modify the request headers here, e.g., add an authentication token
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export {fitTrackerApi};
