import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './UserMenu.css';

const UserMenu = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  return (
    <div className="user-menu" ref={dropdownRef}>
      <button className="user-avatar-btn" onClick={() => setIsOpen(!isOpen)}>
        <img src={user.avatar} alt={user.name} className="user-avatar" />
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-header">
            <img src={user.avatar} alt={user.name} className="header-avatar" />
            <div className="user-info">
              <div className="user-name">{user.name}</div>
              <div className="user-email">{user.email}</div>
            </div>
          </div>

          <div className="dropdown-section">
            <button className="dropdown-item" onClick={() => navigate('/profile')}>
              <span className="item-icon">👤</span>
              <span className="item-text">Profile Settings</span>
            </button>
            <button className="dropdown-item logout-btn" onClick={handleLogout}>
              <span className="item-icon">🚪</span>
              <span className="item-text">Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;