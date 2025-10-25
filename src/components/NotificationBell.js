// src/components/Notifications/NotificationBell.js
import React, { useState, useEffect } from 'react';
import { useNotifications } from '../../hooks/useNotifications';
import './NotificationBell.css';

const NotificationBell = () => {
  const { 
    isSupported, 
    permission, 
    isEnabled, 
    requestPermission 
  } = useNotifications();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleBellClick = async () => {
    if (!isSupported) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
      return;
    }

    if (permission === 'default') {
      await requestPermission();
    } else if (permission === 'denied') {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
    }
  };

  const getBellIcon = () => {
    if (!isSupported) return '🔕'; // Not supported
    if (!isEnabled) return '🔔'; // Supported but not enabled
    return '🔔'; // Enabled
  };

  const getTooltipText = () => {
    if (!isSupported) return 'Notifications not supported in your browser';
    if (permission === 'denied') return 'Please enable notifications in browser settings';
    return '';
  };

  if (!isSupported) {
    return null; // Don't show if not supported
  }

  return (
    <div className="notification-bell-container">
      <button 
        className={`notification-bell ${!isEnabled ? 'disabled' : ''}`}
        onClick={handleBellClick}
        title={getTooltipText()}
      >
        <span className="bell-icon">{getBellIcon()}</span>
        {!isEnabled && permission === 'default' && (
          <div className="notification-dot"></div>
        )}
      </button>
      
      {showTooltip && (
        <div className="notification-tooltip">
          {getTooltipText()}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;