import React from 'react';
import './SplashScreen.css';
import penLogo from '../assets/logo.png'; // Ensure this path is correct

const SplashScreen = () => {
  return (
    <div className="splash-screen">
      <div className="pen-container">
        <img src={penLogo} alt="Logo" className="bounce-logo" />
      </div>
    </div>
  );
};

export default SplashScreen;
