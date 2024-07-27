// src/services/authService.js
import axiosInstance from '../utils/axiosInstance';

export const login = async (email, password) => {
    const response = await axiosInstance.post('/auth/login', {email, password});
    return response.data;
};

export const register = async (
    username,
    email,
    firstName,
    lastName,
    middleName,
    phoneNumber,
    password) => {
    const response = await axiosInstance.post('/auth/register', 
        username,
        email,
        firstName,
        lastName,
        middleName,
        phoneNumber,
        password);
    return response.data;
};
