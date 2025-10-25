import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './AccountPage.css';

const AccountPage = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch(activeSection) {
      case 'dashboard':
        return (
          <div className="account-main">
            <h1 className="main-title">Account Dashboard</h1>
            <h2 className="welcome-message">Welcome back, {user?.name || 'Xenonking1244'}!</h2>
            <p className="description">
              Here you can manage your account settings, preferences, and subscription.
            </p>

            <div className="content-sections">
              <div className="content-section">
                <h3>Stories</h3>
                <p>View your saved stories and reading history</p>
                <button className="action-btn">View Stories</button>
              </div>

              <div className="content-section">
                <h3>Subscription Status</h3>
                <p>Current plan: <strong>Free</strong></p>
                <button className="action-btn primary">Upgrade Plan</button>
              </div>
            </div>
          </div>
        );
      
      case 'account-info':
        return (
          <div className="account-main">
            <h1 className="main-title">Account Information</h1>
            
            <div className="account-info-content">
              <div className="info-section">
                <div className="info-row">
                  <span className="info-label">Uid:</span>
                  <span className="info-value">7171411</span>
                </div>
              </div>

              <div className="info-section">
                <h3 className="section-subtitle">Profile picture</h3>
                <div className="profile-picture-section">
                  <div className="profile-picture">
                    <i className="fas fa-user-circle"></i>
                  </div>
                  <button className="change-photo-btn">Change Photo</button>
                </div>
              </div>

              <div className="info-section">
                <div className="info-row">
                  <span className="info-label">Name</span>
                  <div className="info-value-edit">
                    <span>kokolo excellent</span>
                    <button className="edit-btn">Edit</button>
                  </div>
                </div>
                <div className="info-row">
                  <span className="info-label">Email</span>
                  <div className="info-value-edit">
                    <span>excellentkokolo50@gmail.com</span>
                    <button className="edit-btn">Edit</button>
                  </div>
                </div>
              </div>

              <div className="info-section">
                <h3 className="section-subtitle">Sign-in methods</h3>
                <div className="signin-methods">
                  <div className="method-item">
                    <div className="method-info">
                      <div className="method-icon">G</div>
                      <div className="method-details">
                        <span className="method-name">Google</span>
                        <span className="method-email">excellentkokolo50@gmail.com</span>
                      </div>
                    </div>
                    <div className="method-actions">
                      <span className="method-status connected">Connected</span>
                      <span className="cannot-remove">Cannot remove</span>
                    </div>
                  </div>
                  
                  <div className="method-item">
                    <div className="method-info">
                      <div className="method-icon">A</div>
                      <div className="method-details">
                        <span className="method-name">Apple</span>
                        <span className="method-email">Not connected</span>
                      </div>
                    </div>
                    <div className="method-actions">
                      <span className="method-status not-connected">Not Connected</span>
                      <button className="connect-btn">+ Connect</button>
                    </div>
                  </div>
                  
                  <div className="method-item">
                    <div className="method-info">
                      <div className="method-icon">F</div>
                      <div className="method-details">
                        <span className="method-name">Facebook</span>
                        <span className="method-email">Not connected</span>
                      </div>
                    </div>
                    <div className="method-actions">
                      <span className="method-status not-connected">Not Connected</span>
                      <button className="connect-btn">+ Connect</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'subscription':
        return (
          <div className="account-main">
            <h1 className="main-title">Subscription</h1>
            <p className="description">Manage your subscription plan and billing</p>
            {/* Add subscription specific content here */}
          </div>
        );
      
      case 'stories':
        return (
          <div className="account-main">
            <h1 className="main-title">Stories</h1>
            <p className="description">View your saved stories and reading history</p>
            {/* Add stories specific content here */}
          </div>
        );
      
      case 'privacy':
        return (
          <div className="account-main">
            <h1 className="main-title">Privacy</h1>
            <p className="description">Manage your privacy settings</p>
            {/* Add privacy specific content here */}
          </div>
        );
      
      case 'link-institutions':
        return (
          <div className="account-main">
            <h1 className="main-title">Link Institutions</h1>
            <p className="description">Connect your institutional accounts</p>
            {/* Add link institutions specific content here */}
          </div>
        );
      
      default:
        return (
          <div className="account-main">
            <h1 className="main-title">Account Dashboard</h1>
            <h2 className="welcome-message">Welcome back, {user?.name || 'Xenonking1244'}!</h2>
            <p className="description">
              Here you can manage your account settings, preferences, and subscription.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="groundnews-account">
      <div className="account-layout">
        {/* Left Sidebar - 25% */}
        <div className="account-sidebar">
          <div className="sidebar-section">
            <h3 className="sidebar-title">My Profile</h3>
            <div 
              className={`sidebar-item clickable ${activeSection === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveSection('dashboard')}
            >
              Account Dashboard
            </div>
            <div 
              className={`sidebar-item clickable ${activeSection === 'account-info' ? 'active' : ''}`}
              onClick={() => setActiveSection('account-info')}
            >
              Account Information
            </div>
            <div 
              className={`sidebar-item clickable ${activeSection === 'subscription' ? 'active' : ''}`}
              onClick={() => setActiveSection('subscription')}
            >
              Subscription
            </div>
            <div 
              className={`sidebar-item clickable ${activeSection === 'stories' ? 'active' : ''}`}
              onClick={() => setActiveSection('stories')}
            >
              Stories
            </div>
            <div 
              className={`sidebar-item clickable ${activeSection === 'privacy' ? 'active' : ''}`}
              onClick={() => setActiveSection('privacy')}
            >
              Privacy
            </div>
            <div 
              className={`sidebar-item clickable ${activeSection === 'link-institutions' ? 'active' : ''}`}
              onClick={() => setActiveSection('link-institutions')}
            >
              Link Institutions
            </div>
          </div>
        </div>

        {/* Right Content - 75% - Dynamic based on selection */}
        {renderContent()}
      </div>
    </div>
  );
};

export default AccountPage;