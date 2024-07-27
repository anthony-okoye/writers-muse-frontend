// src/services/articleService.js
import axiosInstance from '../utils/axiosInstance';

export const sendPromptToAI = async (prompt, conversationId, userId) => {
  try {
    console.log('details:', prompt, conversationId, userId)
    const response = await axiosInstance.post('/chat/llama', { prompt, conversationId, userId });
    return response.data;
  } catch (error) {
    console.error('Error sending prompt to AI:', error);
    throw error;
  }
};

export const saveChatInteraction = async (chatInteraction) => {
  try {
    console.log('Sending chat interaction:', chatInteraction);
    const response = await axiosInstance.post('/chat/save', chatInteraction);
    return response.data;
  } catch (error) {
    console.error('Error saving chat interaction:', error);
    throw error;
  }
};

export const fetchConversationMessages = async (conversationId, userId) => {
  try {
    const response = await axiosInstance.get(`/chat/conversation/${conversationId}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching conversation messages:', error);
    throw error;
  }
};

export const fetchConversations = async (userId) => {
  try {
    const response = await axiosInstance.get(`/chat/conversations/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching conversations:', error);
    throw error;
  }
};
