// src/features/chat/chatSlice.js

import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchConversationMessages, saveChatInteraction, sendPromptToAI } from '../../services/articleService';

export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async (payload, { dispatch }) => {
    const { conversationId, userId } = payload;
    const messages = await fetchConversationMessages(conversationId, userId);
    dispatch(setMessages(messages));
    return messages;
  }
);

export const saveMessage = createAsyncThunk(
  'chat/saveMessage',
  async (payload, { dispatch }) => {
    const { message } = payload;
    const response = await saveChatInteraction(message);
    dispatch(appendMessage(response.message));
    return response;
  }
);

export const sendAIMessage = createAsyncThunk(
  'chat/sendAIMessage',
  async (payload, { dispatch }) => {
    const { prompt, conversationId, userId } = payload;
    const aiResponse = await sendPromptToAI(prompt, conversationId, userId);
    const aiMessage = {
      sender: 'ai',
      text: aiResponse.text,
      avatar: 'https://path.to/ai/avatar.jpg',
      conversationId,
      userId,
    };
    dispatch(appendMessage(aiMessage));
    return { conversationId, aiMessage };
  }
);
