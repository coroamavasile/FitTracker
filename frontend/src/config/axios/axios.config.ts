import axios from 'axios';

// Create an Axios instance with default configuration
const fitTrackerApi = axios.create({
  baseURL: 'http://localhost:5000', // Replace with your API base URL
  // baseURL: 'https://fittrackr-api-87xb.onrender.com/', // Replace with your API   timeout: 10000, // Timeout for requests (in milliseconds)
  headers: {
    'Content-Type': 'application/json',
  },
});

fitTrackerApi.interceptors.request.use(
  (config) => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      config.headers.Authorization = `Bearer ${jwt}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// fitTrackerApi.interceptors.response.use(
//   (response) => {
//     if (!response) {
//       return Promise.reject('Response canceled!');
//     }
//     return response;
//   },
//   (error) => {
//     const responseData = error.response?.data;

//     if (responseData && responseData.errorCode === ErrorCode.INVALID_TOKEN) {
//       localStorage.clear();
//       window.location.href = '/login';
//     }

//     return Promise.reject({
//       code: responseData?.errorCode?.toString() || 'Unknown',
//       message: responseData?.message || 'An error occurred',
//     });
//   },
// );

export { fitTrackerApi };
