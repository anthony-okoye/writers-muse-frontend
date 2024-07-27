import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import SplashScreen from '../components/common/splashscreen/SplashScreen';

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  const isTokenExpired = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // in seconds
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error('Failed to decode token', error);
      return true;
    }
  };

  useEffect(() => {
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem('token');
      setLoading(false); // Skip splash screen if not authenticated
    } else {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 3000); // Splash screen duration (3 seconds)
      return () => clearTimeout(timer);
    }
  }, [token]);

  if (loading) {
    return <SplashScreen />;
  }

  if (!token || isTokenExpired(token)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
