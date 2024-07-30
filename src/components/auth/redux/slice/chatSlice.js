// src/features/chat/chatSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchConversationMessages, saveChatInteraction, sendPromptToAI } from '../../../../services/articleService';
//import { Remarkable } from 'remarkable';

// Initialize Remarkable instance
//const md = new Remarkable();

const formatPlainTextResponse = (text) => {
    // Split the text into paragraphs
    const paragraphs = text.split('\n\n').filter(paragraph => paragraph.trim() !== '');
  
    let formattedText = '';
    let isList = false;
  
    paragraphs.forEach((paragraph) => {
      // Detect titles and subheadings
      if (/^Title:/.test(paragraph)) {
        formattedText += `# ${paragraph.replace('Title: ', '')}\n\n`;
      } else if (/^[A-Z][a-z]+.*:\s/.test(paragraph)) {
        formattedText += `## ${paragraph}\n\n`;
      } else if (paragraph.startsWith('* ') || paragraph.startsWith('- ')) {
        if (!isList) {
          isList = true;
          formattedText += '\n'; // Ensure list starts on a new line
        }
        formattedText += `${paragraph}\n`;
      } else if (/^\d+\./.test(paragraph)) {
        if (!isList) {
          isList = true;
          formattedText += '\n'; // Ensure list starts on a new line
        }
        formattedText += `${paragraph.replace(/(\d+)\./g, '$1. ')}\n`;
      } else {
        if (isList) {
          isList = false;
          formattedText += '\n'; // End list
        }
        formattedText += `${paragraph}\n\n`;
      }
    });
  
    return formattedText.trim();
  };

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
      text: formatPlainTextResponse(response.text),
      avatar: 'https://path.to/ai/avatar.jpg',
      conversationId,
      userId,
      //formattedText: formatPlainTextResponse(response.text)
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
    loading: {},
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
    setLoading(state, action) {
        state.loading[action.payload.conversationId] = action.payload.isLoading; // Update loading state
      }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state, action) => {
        const { conversationId } = action.meta.arg;
        state.loading[conversationId] = true; // Set loading to true for fetch
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
        const { conversationId } = action.meta.arg;
        state.loading[conversationId] = false; // Set loading to false after fetch
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        const { conversationId } = action.meta.arg;
        state.loading[conversationId] = false; // Set loading to false on error
      })
      .addCase(saveMessage.fulfilled, (state, action) => {
        const { conversationId, message } = action.payload;
        if (!state.conversations[conversationId]) {
          state.conversations[conversationId] = [];
        }
        state.conversations[conversationId].push(message);
        state.messages = [...state.messages, message];
      })
      .addCase(sendAIMessage.pending, (state, action) => {
        const { conversationId } = action.meta.arg;
        state.loading[conversationId] = true; // Set loading to true for AI message
      })
      .addCase(sendAIMessage.fulfilled, (state, action) => {
        const { conversationId, aiMessage } = action.payload;
        if (!state.conversations[conversationId]) {
          state.conversations[conversationId] = [];
        }
        state.conversations[conversationId].push(aiMessage);
        state.messages = [...state.messages, aiMessage];
        state.loading[conversationId] = false; // Set loading to false when response is received
      })
      .addCase(sendAIMessage.rejected, (state, action) => {
        const { conversationId } = action.meta.arg;
        state.loading[conversationId] = false; // Set loading to false on error
      });
  },
});

export const { setCurrentConversationId, setMessages, appendMessage, setConversations, setLoading } = chatSlice.actions;

export default chatSlice.reducer;
