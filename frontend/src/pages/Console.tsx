import React, { useState } from 'react';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import './Console.css';
import Profile from '../components/Profile';
import Settings from '../components/Settings';
import Help from '../components/Help';
import Farms from '../components/Farms';
import Analytics from '../components/Analytics';
import Devices from '../components/Devices';
import Reports from '../components/Reports';
import Market from '../components/Market';

const Console: React.FC = () => {
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [notificationDropdown, setNotificationDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (path: string) => {
    navigate(path);
    setProfileDropdown(false);
  };

  return (
    <div className="console">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand" onClick={() => navigate('/')}>
          <span className="brand-icon">🌾</span>
          <span className="brand-name">Madad</span>
        </div>
        <div className="navbar-right">
          <div 
            className="notifications"
            onMouseEnter={() => setNotificationDropdown(true)}
            onMouseLeave={() => setNotificationDropdown(false)}
          >
            <button className="notification-button">
              <span className="notification-icon">🔔</span>
              <span className="notification-badge">2</span>
            </button>
            {notificationDropdown && (
              <div 
                className="notification-dropdown"
                onMouseEnter={() => setNotificationDropdown(true)}
                onMouseLeave={() => setNotificationDropdown(false)}
              >
                <div className="notification-header">
                  <h3>Notifications</h3>
                  <button className="mark-all-read">Mark all as read</button>
                </div>
                <div className="notification-list">
                  <div className="notification-item unread">
                    <div className="notification-icon">📢</div>
                    <div className="notification-content">
                      <span className="notification-title">System Update</span>
                      <p>New features have been added to the dashboard.</p>
                      <span className="notification-time">2 hours ago</span>
                    </div>
                  </div>
                  <div className="notification-item unread">
                    <div className="notification-icon">🌾</div>
                    <div className="notification-content">
                      <span className="notification-title">Crop Alert</span>
                      <p>Water levels are low in Field A.</p>
                      <span className="notification-time">4 hours ago</span>
                    </div>
                  </div>
                  <div className="notification-item">
                    <div className="notification-icon">📊</div>
                    <div className="notification-content">
                      <span className="notification-title">Report Ready</span>
                      <p>Your monthly farm report is now available.</p>
                      <span className="notification-time">1 day ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div 
            className="profile-dropdown"
            onMouseEnter={() => setProfileDropdown(true)}
            onMouseLeave={() => setProfileDropdown(false)}
          >
            <button className="profile-button">
              <img 
                src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" 
                alt="Profile" 
                className="profile-picture"
              />
              <span className="profile-name">John Doe</span>
              <span className="dropdown-arrow">▼</span>
            </button>
            {profileDropdown && (
              <div 
                className="dropdown-menu"
                onMouseEnter={() => setProfileDropdown(true)}
                onMouseLeave={() => setProfileDropdown(false)}
              >
                <div className="dropdown-header">
                  <img 
                    src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" 
                    alt="Profile" 
                    className="profile-picture-large"
                  />
                  <div className="profile-info">
                    <span className="profile-name-large">John Doe</span>
                    <span className="profile-email">john.doe@example.com</span>
                  </div>
                </div>
                <div className="dropdown-divider"></div>
                <button onClick={() => handleMenuClick('/console/profile')}>
                  <span className="menu-icon">👤</span>
                  Profile
                </button>
                <button onClick={() => handleMenuClick('/console/settings')}>
                  <span className="menu-icon">⚙️</span>
                  Settings
                </button>
                <button onClick={() => handleMenuClick('/console/help')}>
                  <span className="menu-icon">❓</span>
                  Help
                </button>
                <div className="dropdown-divider"></div>
                <button onClick={() => navigate('/')} className="sign-out">
                  <span className="menu-icon">🚪</span>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="console-content">
        {/* Sidebar */}
        <div className="sidebar">
          <div
            className={`menu-item ${
              location.pathname === '/console' ? 'active' : ''
            }`}
            onClick={() => handleMenuClick('/console')}
          >
            <span className="menu-icon">📊</span>
            Dashboard
          </div>
          <div
            className={`menu-item ${
              location.pathname === '/console/farms' ? 'active' : ''
            }`}
            onClick={() => handleMenuClick('/console/farms')}
          >
            <span className="menu-icon">🌾</span>
            Farms
          </div>
          <div
            className={`menu-item ${
              location.pathname === '/console/analytics' ? 'active' : ''
            }`}
            onClick={() => handleMenuClick('/console/analytics')}
          >
            <span className="menu-icon">📈</span>
            Analytics
          </div>
          <div
            className={`menu-item ${
              location.pathname === '/console/devices' ? 'active' : ''
            }`}
            onClick={() => handleMenuClick('/console/devices')}
          >
            <span className="menu-icon">📱</span>
            Devices
          </div>
          <div
            className={`menu-item ${
              location.pathname === '/console/reports' ? 'active' : ''
            }`}
            onClick={() => handleMenuClick('/console/reports')}
          >
            <span className="menu-icon">📄</span>
            Reports
          </div>
          <div
            className={`menu-item ${
              location.pathname === '/console/market' ? 'active' : ''
            }`}
            onClick={() => handleMenuClick('/console/market')}
          >
            <span className="menu-icon">🛒</span>
            Market
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<div>Dashboard Overview</div>} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} />
            <Route path="/farms" element={<Farms />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/market" element={<Market />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Console; 