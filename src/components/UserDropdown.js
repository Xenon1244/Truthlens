import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './UserDropdown.css';

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setShowLanguageDropdown(false);
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

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const toggleLanguageDropdown = () => {
    setShowLanguageDropdown(!showLanguageDropdown);
  };

  const handleLanguageSelect = (language) => {
    console.log('Selected language:', language);
    setShowLanguageDropdown(false);
  };

  if (!user) return null;

  return (
    <div className="user-dropdown" ref={dropdownRef}>
      <button 
        className="user-avatar-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="User menu"
      >
        <img 
          src={user.avatar} 
          alt={user.name || 'User'} 
          className="user-avatar"
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.email)}&background=333333&color=fff`;
          }}
        />
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-header">
            <img src={user.avatar} alt={user.name} className="header-avatar" />
            <div className="user-info">
              <div className="user-name">{user.name || user.email.split('@')[0]}</div>
              <div className="user-email">{user.email}</div>
              {user.isPremium && <span className="premium-badge">PREMIUM</span>}
            </div>
          </div>

          <div className="bias-section">
            <div className="bias-title">YOUR READING BIAS</div>
            <div className="bias-stats">
              <div className="bias-stat">
                <div className="bias-percentage left">35%</div>
                <div className="bias-label">LEFT</div>
              </div>
              <div className="bias-stat">
                <div className="bias-percentage center">45%</div>
                <div className="bias-label">CENTER</div>
              </div>
              <div className="bias-stat">
                <div className="bias-percentage right">20%</div>
                <div className="bias-label">RIGHT</div>
              </div>
            </div>
          </div>

          <div className="dropdown-section">
            <div className="section-title">ACCOUNT</div>
            <button className="dropdown-item" onClick={() => handleNavigation('/profile-settings')}>
              <span className="item-icon">👤</span>
              <span className="item-text">Profile Settings</span>
            </button>
            <button className="dropdown-item" onClick={() => handleNavigation('/news-preferences')}>
              <span className="item-icon">⚙️</span>
              <span className="item-text">News Preferences</span>
            </button>
            <button className="dropdown-item" onClick={() => handleNavigation('/saved-articles')}>
              <span className="item-icon">📁</span>
              <span className="item-text">Saved Articles</span>
            </button>
            <div className="dropdown-item-with-arrow">
              <button className="dropdown-item" onClick={toggleLanguageDropdown}>
                <span className="item-icon">🌐</span>
                <span className="item-text">Language</span>
                <span className="item-arrow">{showLanguageDropdown ? '▲' : '▼'}</span>
              </button>
              {showLanguageDropdown && (
                <div className="nested-dropdown">
                  {['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Arabic', 'Russian'].map(language => (
                    <button key={language} className="nested-item" onClick={() => handleLanguageSelect(language)}>
                      {language}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="dropdown-section">
            <div className="section-title">MEMBERSHIP</div>
            <button className="dropdown-item" onClick={() => handleNavigation('/premium')}>
              <span className="item-icon">⭐</span>
              <span className="item-text">Upgrade to Premium</span>
            </button>
            <button className="dropdown-item">
              <span className="item-icon">🎁</span>
              <span className="item-text">Gift Membership</span>
            </button>
          </div>

          <div className="dropdown-section">
            <div className="section-title">DETAILS</div>
            <button className="dropdown-item">
              <span className="item-icon">🔍</span>
              <span className="item-text">Keyword Alerts</span>
            </button>
            <button className="dropdown-item" onClick={() => handleNavigation('/help')}>
              <span className="item-icon">❓</span>
              <span className="item-text">Help & Support</span>
            </button>
          </div>

          <button className="dropdown-item logout-btn" onClick={handleLogout}>
            <span className="item-icon">🚪</span>
            <span className="item-text">Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;