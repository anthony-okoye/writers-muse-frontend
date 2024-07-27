import axios from 'axios';
import config from '../config';

const axiosInstance = axios.create({
    baseURL: config.baseURL,
    withCredentials: true, // Ensure cookies are sent with the request if needed
    headers: {
        'Content-Type': 'application/json',
      },
});

// Interceptor to add the token to requests
axiosInstance.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token && req.url !== '/auth/login' && req.url !== '/auth/register') {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default axiosInstance;