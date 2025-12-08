import axios from 'axios';
import Cookies from 'js-cookie';

const csrfToken = Cookies.get('XSRF-TOKEN') || '';
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'X-CSRF-TOKEN': csrfToken,
    Accept: '*/*',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('authToken'); // Retrieve the token
    const token = Cookies.get('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Set Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token might be expired or invalid, handle it here
      // localStorage.removeItem('authToken'); // Optionally clear the token
      Cookies.remove('authToken');
      window.location.href = '/login'; // Redirect to login
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
