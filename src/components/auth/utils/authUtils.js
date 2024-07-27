// utils/authUtils.js

export const setAuthToken = (token) => {
    localStorage.setItem('token', token);
  };
  
  export const getAuthToken = () => {
    return localStorage.getItem('token');
  };
  
  export const setUserDetails = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  };
  
  export const getUserDetails = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };
  
  export const clearAuthData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };
  