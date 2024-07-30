// Notification.jsx
import React, { useEffect, useState } from 'react';
import './notification.css'; // Create this CSS file for animations

const Notification = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onClose(), 500); // Close the notification after fade-out
    }, 3000); // Show notification for 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`notification ${visible ? 'slide-down' : 'fade-out'}`}>
      {message}
    </div>
  );
};

export default Notification;
