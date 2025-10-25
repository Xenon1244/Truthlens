import React from 'react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1>Your Profile</h1>
        {user && (
          <div className="profile-info">
            <div className="profile-avatar">
              <img src={user.avatar} alt={user.name} />
            </div>
            <div className="profile-details">
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <p>Member since: {new Date(user.memberSince).toLocaleDateString()}</p>
            </div>
          </div>
        )}
        <div className="profile-actions">
          <button className="profile-btn">Edit Profile</button>
          <button className="profile-btn">Change Password</button>
          <button className="profile-btn">Privacy Settings</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;