import React, { useState, useEffect, useCallback } from 'react';
import { MdExpandLess, MdExpandMore, MdAdd } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LogoIcon from '../../../common/assets/logo.png';
import { fetchConversations } from '../../../../services/articleService';
import { clearConversation } from '../../../auth/redux/actions/chatActions';
import useAuth from '../../../auth/utils/useAuth';
import UpdatesModal from './UpdatesModal';

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
  const { conversationId } = useParams(); // Get the conversationId from URL parameters
  const [showModal, setShowModal] = useState(false);


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

  const handleModalToggle = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  return (
    <div className={`h-full flex flex-col bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 text-white ${collapsed ? 'w-20' : 'w-64'} transition-width duration-300`}>
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
      <div className="flex-grow p-2 overflow-y-auto" onScroll={handleScroll}>
        <ul>
          {conversations.map((conversation, index) => (
            <li key={`${conversation.conversationId}-${index}`} className="my-2">
              <Link to={`/chat/${conversation.conversationId}`}>
                <button
                  className={`flex items-center p-2 w-full text-left rounded-md ${
                    conversation.conversationId === conversationId
                      ? 'bg-gradient-to-br from-cyan-400 via-sky-500 to-indigo-300 text-white'
                      : 'hover:bg-gradient-to-br from-cyan-400 via-sky-500 to-indigo-300'
                  }`}
                >
                  <span className="chat-title truncate overflow-hidden whitespace-nowrap">{conversation.latestMessage.topic}</span>
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-2 h-[52rem] bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 text-black text-center">
      {!collapsed && ( // Conditionally render the button based on `collapsed` state
      <div className="flex flex-col leading-tight items-center justify-center h-full">
          <div className="text-2xl mt-1 flex items-center">
            {/* Updated section */}
          <button
            type="button"
            onClick={handleModalToggle}
            className="inline-flex items-center text-sm font-medium text-white py-2 px-4 rounded-full transition-colors duration-300 hover:bg-gradient-to-br from-cyan-400 via-sky-500 to-indigo-300 hover:bg-gradient-to-br from-cyan-500 via-sky-600 to-indigo-400"
          >
            Coming Updates
            {showModal ? (
                <MdExpandLess className="ml-1" />
              ) : (
                <MdExpandMore className="ml-1" />
              )}
          </button>
          </div>
        </div>
        )}
      </div>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="text-white text-lg">Loading...</div>
        </div>
      )}
      {/* Modal */}
      <UpdatesModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        //onSubscribe={handleSubscribe}
      />
    </div>
  );
};

export default Sidebar;
