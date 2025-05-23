import React from 'react';
import './Profile.css';

const Profile: React.FC = () => {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Profile Settings</h2>
      </div>
      <div className="profile-content">
        <div className="profile-section">
          <div className="profile-avatar">
            <img 
              src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" 
              alt="Profile" 
            />
            <button className="change-avatar-btn">Change Photo</button>
          </div>
          <div className="profile-details">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" defaultValue="John Doe" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" defaultValue="john.doe@example.com" />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input type="tel" defaultValue="+1 234 567 890" />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input type="text" defaultValue="New York, USA" />
            </div>
          </div>
        </div>
        <div className="profile-actions">
          <button className="save-btn">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default Profile; 