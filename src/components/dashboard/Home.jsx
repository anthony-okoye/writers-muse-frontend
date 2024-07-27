import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './common/Header';
import Chat from './Chat';
import ChatTextbox from './common/ChatTextbox';
import useAuth from '../auth/utils/useAuth';
import Sidebar from './common/layout/Sidebar';
import { getUserDetails } from '../auth/utils/authUtils';
import { saveChatInteraction, sendPromptToAI, fetchConversationMessages } from '../../services/articleService';
import { fetchMessages, saveMessage, sendAIMessage, setCurrentConversationId } from '../auth/redux/slice/chatSlice';

const DashboardHome = () => {
  const { conversationId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useAuth().user;
  const messages = useSelector((state) => state.chat.messages);
  const currentConversationId = useSelector((state) => state.chat.currentConversationId);
  console.log('first messages log',messages)
  console.log('first conversationid log',currentConversationId)

  useEffect(() => {
    if (user) {
      if (conversationId) {
        console.log('Dispatching fetchMessages with:', { conversationId, userId: user.userId });
        dispatch(fetchMessages({ conversationId, userId: user.userId }))
        .unwrap()
        .then((data) => console.log('Messages fetched:', data))
        .catch((error) => console.error('Error fetching messages:', error));
        //console.log('fetched messages:', conversationId, user.userId)
        dispatch(setCurrentConversationId(conversationId));
      } /*else {
        // Handle initial load
        const fetchInitialConversation = async () => {
          // Assuming you have a method to create or fetch an initial conversation
          const response = await saveChatInteraction({ userId: user.userId });
          const newConversationId = response.conversationId;
          navigate(`/chat/${newConversationId}`);
        };
        fetchInitialConversation();
      }*/
    }
  }, [conversationId, user, dispatch, navigate]);

  const handleNewMessage = async (message) => {
    if (!user) return;
  
    try {
      // Dispatch saveMessage and wait for the response
      const saveResponse = await dispatch(saveMessage({ message: {
        ...message,
        userId: user.userId,
        conversationId: currentConversationId,
      }})).unwrap();
      
      // Extract conversationId from saveResponse
      const conversationId = saveResponse.conversationId || currentConversationId;
  
      // Update the chat slice state with the new conversationId
      dispatch(setCurrentConversationId(conversationId));
  
      // Navigate to the updated route with the new conversationId
      navigate(`/chat/${conversationId}`);
  
      // Dispatch sendAIMessage with the correct conversationId
      await dispatch(sendAIMessage({ 
        prompt: message.text, 
        conversationId, 
        userId: user.userId 
      }));
    } catch (error) {
      console.error('Error handling new message:', error);
    }
  };
  

  const handleNewChat = async () => {
    if (!user) return;

    const response = await saveChatInteraction({ userId: user.userId });
    const newConversationId = response.conversationId;
    dispatch(setCurrentConversationId(newConversationId));
    navigate(`/chat/${newConversationId}`);
  };

  const handleSelectChat = async (conversation) => {
    if (!user) return;

    dispatch(fetchMessages({ conversationId: conversation.id, userId: user.userId }));
    dispatch(setCurrentConversationId(conversation.id));
    navigate(`/chat/${conversation.id}`);
  };

  return (
    <div className="flex h-screen">
      <Sidebar onNewChat={handleNewChat} onSelectChat={handleSelectChat} />
      <div className="flex-1 p-2 sm:p-6 justify-between flex flex-col">
        <Header />
        <Chat messages={messages} />
        <ChatTextbox onSendMessage={handleNewMessage} conversationId={currentConversationId} />
      </div>
    </div>
  );
};

export default DashboardHome;