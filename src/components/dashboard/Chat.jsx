import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
//import { fetchConversationMessages } from '../../services/articleService';
import ReactMarkdown from 'react-markdown';
import { ChatCopyIcon } from '../common/icons/Icons';
import'./loader.css';
import { HoverEffect } from './common/utils/card-hover-effect';
import Notification from './common/utils/notification';

const Chat = ({ messages }) => {
  console.log('Home messages:', messages);
  const { conversationId: urlConversationId } = useParams();
  const userId = useSelector((state) => state.auth.user.userId);
  const [chatMessages, setChatMessages] = React.useState([]);
  const [showNotification, setShowNotification] = useState('');
  const currentConversationId = useSelector((state) => state.chat.currentConversationId);
  const isLoading = useSelector((state) => state.chat.loading[currentConversationId]); // Get loading state for the specific conversation
  console.log('isLoading:', isLoading);
  // State to handle display of loading animation
  const [displayLoading, setDisplayLoading] = useState(false);

  useEffect(() => {
    // Update the local conversation ID if the URL changes
    if (urlConversationId !== currentConversationId) {
      setChatMessages([]);
    } else {
      setChatMessages(messages);
    }
  }, [urlConversationId, currentConversationId, messages]);


  useEffect(() => {
    if (currentConversationId && userId) {
      // Fetch messages if currentConversationId changes
      setChatMessages(messages);
    }
  }, [currentConversationId, userId, messages]);

  useEffect(() => {
    // Update the displayLoading state based on isLoading
    if (isLoading) {
      setDisplayLoading(true);
    } else {
      // Delay hiding the loader to ensure it's visible long enough
      const timer = setTimeout(() => {
        setDisplayLoading(false);
      }, 300); // Adjust delay as needed

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setShowNotification('Copied to clipboard!');
    }).catch((err) => {
      console.error('Failed to copy: ', err);
    });
  };

  const handleCloseNotification = () => {
    setShowNotification('');
  };

  // Sample projects data for HoverEffect
  const projects = [
    {
      title: 'History',
      description:
        "What's the impact of history on modern technology?",
      link: 'https://stripe.com',
    },
    {
      title: 'Entertainment',
      description:
        'What are the top movies of this decade?',
      link: 'https://netflix.com',
    },
    {
      title: 'Business',
      description:
        'How can tech improve business productivity?',
      link: 'https://google.com',
    },
    {
      title: 'Finance',
      description:
        'What are current trends in global financial markets?',
      link: 'https://meta.com',
    },
    {
      title: 'Education',
      description:
        'How is AI transforming educational methods?',
      link: 'https://amazon.com',
    },
    {
      title: 'Politics',
      description:
        "What are the key issues in today's political landscape?",
      link: 'https://microsoft.com',
    },
  ];

  return (
    <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
      {!urlConversationId && !currentConversationId && <HoverEffect items={projects} />}
      {showNotification && (
        <Notification message={showNotification} onClose={handleCloseNotification} />
      )}

      {displayLoading && (
        <div className="flex items-center justify-center w-full h-full">
          <div className="loaderAI"></div>
        </div>
      )}

      {chatMessages.length > 0 && (
        chatMessages.map((msg) => (
          <div key={msg._id ? (msg._id.$oid || msg._id) : Date.now()} className="chat-message">
            <div className={`flex items-end ${msg.sender === 'ai' ? '' : 'justify-end'}`}>
              {msg.sender === 'ai' ? (
                <>
                  {isLoading && msg.text === '' ? (
                    <div className="relative group">
                      <div className="loaderAI"></div>
                    </div>
                  ) : (
                    <div className="relative group">
                      <img src='../logo.png' alt="Profile" className="w-6 h-6 rounded-full order-1" />
                      <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                        <div className="relative group-hover:opacity-100 transition-opacity">
                          <span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600 rounded-bl-none">
                            <ReactMarkdown>{msg.text}</ReactMarkdown>
                          </span>
                          <button 
                            className="absolute top-0 right-0 mt-2 mr-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => copyToClipboard(msg.text)}
                          > 
                            <ChatCopyIcon fontSize={1000} />
                            Copy
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
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
        ))
      )}
    </div>
  );
  
};

export default Chat;
