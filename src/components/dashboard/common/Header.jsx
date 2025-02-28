import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../auth/utils/useAuth';
import { LogoutIcon } from '../../common/icons/Icons';
import { MdExpandLess } from 'react-icons/md';
import UpdatesModal from './layout/UpdatesModal';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  // Extract user details
  const firstName = user?.firstName || 'FirstName';
  const lastName = user?.lastName || 'LastName';
  const email = user?.email || 'email@example.com';

  const handleLogout = () => {
    logout(); // Call the logout function
    navigate('/'); // Redirect to the home page
  };

  return (
    <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
      <div className="relative flex items-center space-x-4">
        {/*<div className="relative">
          <span className="absolute text-green-500 right-0 bottom-0">
            <svg width="20" height="20">
              <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
            </svg>
          </span>
          <img 
            src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144" 
            alt="User Avatar" 
            className="w-10 sm:w-16 h-10 sm:h-16 rounded-full" 
          />
        </div>*/}
        <div className="flex flex-col leading-tight">
          <div className="text-2xl mt-1 flex items-center">
            {/* Updated section */}
          {/*<button
            type="button"
            onClick={() => setShowModal(true)}
            className="inline-flex items-center text-sm font-medium text-gray-900"
          >
            Updates
            <MdExpandLess className="ml-1" />
          </button>*/}
          </div>
          {/*<span className="text-lg text-gray-600">{email}</span>*/}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {/* Uncomment the buttons as needed */}
        {/* Logout Button */}
        <button 
          type="button" 
          onClick={handleLogout}
          className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
        >
          <LogoutIcon />
        </button>
         {/*<button type="button" className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
        <button type="button" className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
        </button>
        <button type="button" className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
          </svg>
        </button> */}
      </div>
      {/* Modal */}
      <UpdatesModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        //onSubscribe={handleSubscribe}
      />
    </div>
  );
};

export default Header;
