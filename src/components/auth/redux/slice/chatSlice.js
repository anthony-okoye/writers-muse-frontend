// src/features/chat/chatSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchConversationMessages, saveChatInteraction, sendPromptToAI } from '../../../../services/articleService';

// Async thunks
export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async ({ conversationId, userId }) => {
    const response = await fetchConversationMessages(conversationId, userId);
    return response; // Ensure this is the expected data structure
  }
);

export const saveMessage = createAsyncThunk(
  'chat/saveMessage',
  async ({ message }) => {
    const response = await saveChatInteraction(message);
    return response; // Ensure this is the expected data structure
  }
);

export const sendAIMessage = createAsyncThunk(
  'chat/sendAIMessage',
  async ({ prompt, conversationId, userId }) => {
    const response = await sendPromptToAI(prompt, conversationId, userId);
    const aiMessage = {
      sender: 'ai',
      text: response.text,
      avatar: 'https://path.to/ai/avatar.jpg',
      conversationId,
      userId,
    };
    return { conversationId, aiMessage };
  }
);

// Slice
const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    currentConversationId: null,
    conversations: {},
    messages: [],
  },
  reducers: {
    setCurrentConversationId(state, action) {
      state.currentConversationId = action.payload;
    },
    setMessages(state, action) {
      state.messages = action.payload;
    },
    appendMessage(state, action) {
      state.messages.push(action.payload);
    },
    setConversations(state, action) {
      state.conversations = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
      })
      .addCase(saveMessage.fulfilled, (state, action) => {
        const { conversationId, message } = action.payload;
        if (!state.conversations[conversationId]) {
          state.conversations[conversationId] = [];
        }
        state.conversations[conversationId].push(message);
        state.messages = [...state.messages, message];
      })
      .addCase(sendAIMessage.fulfilled, (state, action) => {
        const { conversationId, aiMessage } = action.payload;
        if (!state.conversations[conversationId]) {
          state.conversations[conversationId] = [];
        }
        state.conversations[conversationId].push(aiMessage);
        state.messages = [...state.messages, aiMessage];
      });
  },
});

export const { setCurrentConversationId, setMessages, appendMessage, setConversations } = chatSlice.actions;

export default chatSlice.reducer;
