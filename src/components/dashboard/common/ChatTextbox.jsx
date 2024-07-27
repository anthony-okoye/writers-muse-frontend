import React, { useState, useEffect } from 'react';
import { PlaceholdersAndVanishInput } from './utils/placeholders-and-vanish-input';

const ChatTextbox = ({ onSendMessage, conversationId }) => {
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      const userMessage = {
        sender: 'user',
        text: message,
        avatar: 'https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144', // Update with actual user avatar URL
        conversationId, // Use conversationId from props
        userId: '', // User ID should be handled in DashboardHome
      };

      // Call the handler to process the message
      onSendMessage(userMessage);
      setMessage('');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center px-4">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        onSubmit={handleSendMessage}
      />
    </div>
  );
};

export default ChatTextbox;
