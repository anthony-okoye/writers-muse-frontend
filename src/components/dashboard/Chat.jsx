import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchConversationMessages } from '../../services/articleService';

const Chat = ({ messages }) => {
  console.log('Home messages:', messages);
  const { conversationId: urlConversationId } = useParams();
  const userId = useSelector((state) => state.auth.user.userId);
  const [chatMessages, setChatMessages] = React.useState([]);
  const currentConversationId = useSelector((state) => state.chat.currentConversationId);

  useEffect(() => {
    // Update the local conversation ID if the URL changes
    if (urlConversationId !== currentConversationId) {
      setChatMessages([]);
    } else {
      setChatMessages(messages);
    }
  }, [urlConversationId, currentConversationId, messages]);

  /*useEffect(() => {
    const loadMessages = async () => {
      if (currentConversationId && userId) {
        try {
          const response = await fetchConversationMessages(currentConversationId, userId);

          // Deduplicate messages by _id
          const uniqueMessages = Array.from(new Set(response.map(msg => msg._id ? (msg._id.$oid || msg._id) : '')))
            .map(id => response.find(msg => (msg._id && (msg._id.$oid || msg._id)) === id));

          setChatMessages(uniqueMessages);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
    };

    loadMessages();
  }, [currentConversationId, userId]);*/

  useEffect(() => {
    if (currentConversationId && userId) {
      // Fetch messages if currentConversationId changes
      setChatMessages(messages);
    }
  }, [currentConversationId, userId, messages]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    }).catch((err) => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
      {chatMessages.map((msg) => (
        <div key={msg._id ? (msg._id.$oid || msg._id) : Date.now()} className="chat-message">
          <div className={`flex items-end ${msg.sender === 'ai' ? '' : 'justify-end'}`}>
            {msg.sender === 'ai' ? (
              <>
                <img src={msg.avatar} alt="Profile" className="w-6 h-6 rounded-full order-1" />
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                  <div className="relative">
                    <span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600 rounded-bl-none">
                      {msg.text}
                    </span>
                    <button 
                      className="absolute top-0 right-0 mt-2 mr-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                      onClick={() => copyToClipboard(msg.text)}
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                  <div>
                    <span className="px-4 py-2 rounded-lg inline-block bg-gradient-to-br from-cyan-400 via-sky-500 to-indigo-300 text-white rounded-br-none">
                      {msg.text}
                    </span>
                  </div>
                </div>
                <img src={msg.avatar} alt="Profile" className="w-6 h-6 rounded-full order-2" />
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chat;
