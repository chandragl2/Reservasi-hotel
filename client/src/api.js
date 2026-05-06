import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000/api',
});

// Add a request interceptor to include JWT token in headers
api.interceptors.request.use((config) => {
  try {
    const userInfoString = localStorage.getItem('userInfo');
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      if (userInfo && userInfo.token) {
        config.headers.Authorization = `Bearer ${userInfo.token}`;
      }
    }
  } catch (error) {
    console.error('Error parsing userInfo from localStorage', error);
  }
  return config;
});

export default api;
