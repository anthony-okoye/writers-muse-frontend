import React, { useState, useEffect, useCallback } from 'react';
import { MdExpandLess, MdExpandMore, MdAdd } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LogoIcon from '../../../common/assets/logo.png';
import { fetchConversations } from '../../../../services/articleService';
import { clearConversation } from '../../../auth/redux/actions/chatActions';
import useAuth from '../../../auth/utils/useAuth';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false); // State for loading effect
  const user = useAuth().user;
  const userId = useSelector((state) => state.auth.user?.userId); // Get userId from Redux state
  const navigate = useNavigate(); // Initialize useNavigate
  const dispatch = useDispatch();

  const loadConversations = useCallback(async () => {
    try {
      const response = await fetchConversations(userId, page);
      setConversations((prevConversations) => [...prevConversations, ...response]);
      setHasMore(response.length === 8); // Assuming 8 is the page size
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  }, [userId, page]);

  useEffect(() => {
    if (userId) {
      loadConversations();
    }
  }, [userId, loadConversations]);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleScroll = (e) => {
    if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleNewChat = () => {
    setLoading(true); // Start loading effect
    dispatch(clearConversation());
    setTimeout(() => {
      setLoading(false); // Stop loading effect
      navigate('/chat'); // Navigate to the /chat route
    }, 2000); // 2 seconds delay
  };

  return (
    <div className={`h-full bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 text-white ${collapsed ? 'w-20' : 'w-64'} transition-width duration-300`}>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <img src={LogoIcon} alt="Logo" className={`h-10 ${collapsed ? '' : 'logo-animate'}`} />
          {!collapsed && <h1 className="text-xl font-bold">WritersMuse</h1>}
        </div>
        <button onClick={toggleCollapse} className="focus:outline-none">
          {collapsed ? <MdExpandMore /> : <MdExpandLess />}
        </button>
      </div>
      <div className="p-2 flex justify-center">
        <button
          onClick={handleNewChat}
          className="flex items-center justify-start bg-gradient-to-br from-cyan-400 via-sky-500 to-indigo-300 rounded-full p-2 hover:opacity-80 transition-opacity duration-300"
          style={{ width: 'auto', maxWidth: '200px' }} // Set max width and auto width
        >
          <MdAdd className="text-white text-xl" />
          {!collapsed && <span className="ml-2 text-white">New Chat</span>}
        </button>
      </div>
      <ul className="p-2 overflow-y-auto h-[calc(100%-128px)]" onScroll={handleScroll}>
        {conversations.map((conversation, index) => (
          <li key={`${conversation.conversationId}-${index}`} className="my-2">
            <Link to={`/chat/${conversation.conversationId}`}>
              <button
                className="flex items-center p-2 w-full text-left hover:bg-gradient-to-br from-cyan-400 via-sky-500 to-indigo-300 rounded-md"
              >
                <span className="chat-title truncate overflow-hidden whitespace-nowrap">{conversation.latestMessage.topic}</span>
              </button>
            </Link>
          </li>
        ))}
      </ul>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="text-white text-lg">Loading...</div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
