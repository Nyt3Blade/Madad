import React from 'react';
import './Settings.css';

const Settings: React.FC = () => {
  return (
    <div className="settings-container">
      <div className="settings-header">
        <h2>Account Settings</h2>
      </div>
      <div className="settings-content">
        <div className="settings-section">
          <h3>Preferences</h3>
          <div className="settings-group">
            <div className="setting-item">
              <div className="setting-info">
                <h4>Email Notifications</h4>
                <p>Receive email updates about your farm</p>
              </div>
              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <h4>SMS Alerts</h4>
                <p>Get important alerts via SMS</p>
              </div>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <h4>Dark Mode</h4>
                <p>Switch to dark theme</p>
              </div>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3>Security</h3>
          <div className="settings-group">
            <div className="setting-item">
              <div className="setting-info">
                <h4>Two-Factor Authentication</h4>
                <p>Add an extra layer of security to your account</p>
              </div>
              <button className="enable-btn">Enable</button>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <h4>Change Password</h4>
                <p>Update your account password</p>
              </div>
              <button className="change-btn">Change</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 