import React from 'react';
import './Help.css';

const Help: React.FC = () => {
  return (
    <div className="help-container">
      <div className="help-header">
        <h2>Help Center</h2>
      </div>
      <div className="help-content">
        <div className="help-search">
          <input type="text" placeholder="Search for help..." />
        </div>
        
        <div className="help-sections">
          <div className="help-section">
            <h3>Getting Started</h3>
            <div className="help-cards">
              <div className="help-card">
                <div className="help-card-icon">📱</div>
                <h4>Quick Start Guide</h4>
                <p>Learn the basics of using Madad</p>
              </div>
              <div className="help-card">
                <div className="help-card-icon">🌾</div>
                <h4>Farm Setup</h4>
                <p>Set up your first farm in Madad</p>
              </div>
              <div className="help-card">
                <div className="help-card-icon">📊</div>
                <h4>Dashboard Guide</h4>
                <p>Understanding your dashboard</p>
              </div>
            </div>
          </div>

          <div className="help-section">
            <h3>Common Issues</h3>
            <div className="faq-list">
              <div className="faq-item">
                <h4>How do I reset my password?</h4>
                <p>Go to Settings &gt; Security &gt; Change Password to update your password.</p>
              </div>
              <div className="faq-item">
                <h4>How do I add a new device?</h4>
                <p>Navigate to Devices in the sidebar and click "Add New Device".</p>
              </div>
              <div className="faq-item">
                <h4>How do I update my profile?</h4>
                <p>Click on your profile picture and select "Profile" to update your information.</p>
              </div>
            </div>
          </div>

          <div className="help-section">
            <h3>Contact Support</h3>
            <div className="support-options">
              <div className="support-card">
                <div className="support-icon">📧</div>
                <h4>Email Support</h4>
                <p>support@madad.com</p>
              </div>
              <div className="support-card">
                <div className="support-icon">💬</div>
                <h4>Live Chat</h4>
                <p>Available 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help; 