// src/services/wordpressService.js
import axiosInstance from '../utils/axiosInstance';

export const postToWordPress = async (credentials, articleData) => {
    const response = await axiosInstance.post('/wordpress/post', { credentials, articleData });
    return response.data;
};
