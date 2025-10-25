import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SearchBar from '../navigation/SearchBar';
import UserMenu from '../navigation/UserMenu';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [trendingTopics, setTrendingTopics] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setTrendingTopics([
      { name: "Ukraine", category: "world" },
      { name: "Trump", category: "politics" },
      { name: "Climate Summit", category: "world" },
      { name: "NBA Finals", category: "sports" },
      { name: "Immigration", category: "politics" },
      { name: "Cybersecurity", category: "tech" }
    ]);
  }, []);

  const handleTrendingClick = (topic) => {
    navigate(`/search?q=${encodeURIComponent(topic.name)}`);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      {/* Top Bar */}
      <div className="header-top-bar">
        <div className="container">
          <div className="top-bar-left">
            <span className="extension-text">Extension Theme: </span>
            <div className="theme-options">
              <button className="theme-option active">Light</button>
              <button className="theme-option">Dark</button>
              <button className="theme-option">Auto</button>
            </div>
          </div>
          
          <div className="top-bar-right">
            <span className="current-date">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
            <button className="location-button">Set Location</button>
            <span className="edition-separator">•</span>
            <button className="edition-button">Canada Edition</button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="main-navigation">
        <div className="container">
          <div className="nav-left">
            <Link to="/" className="logo">TruthLens</Link>
            <nav className="primary-nav">
              <Link to="/" className="nav-item">Home</Link>
              <Link to="/local" className="nav-item">Local</Link>
              <Link to="/for-you" className="nav-item">For You</Link>
            </nav>
          </div>

          <div className="nav-center">
            <SearchBar />
          </div>

          <div className="nav-right">
            <div className="auth-section">
              {user ? (
                <UserMenu user={user} />
              ) : (
                <>
                  <button className="auth-button login" onClick={() => navigate('/login')}>Login</button>
                  <button className="auth-button signup" onClick={() => navigate('/signup')}>Sign Up</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Trending Bar */}
      <div className="trending-bar">
        <div className="container">
          <span className="trending-label">Trending</span>
          <div className="trending-topics">
            {trendingTopics.map((topic, index) => (
              <span key={index} className="trending-topic" onClick={() => handleTrendingClick(topic)}>
                {topic.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;