import React from 'react';
import './Devices.css';

const Devices: React.FC = () => {
  return (
    <div className="devices-container">
      <div className="devices-header">
        <h2>Smart Devices</h2>
        <button className="add-device-btn">Add New Device</button>
      </div>

      <div className="devices-grid">
        <div className="device-card">
          <div className="device-status online"></div>
          <div className="device-icon">🌡️</div>
          <div className="device-info">
            <h3>Temperature Sensor</h3>
            <p className="device-location">Green Valley Farm</p>
            <div className="device-data">
              <span className="data-value">24°C</span>
              <span className="data-label">Current</span>
            </div>
          </div>
          <div className="device-actions">
            <button className="action-btn">View Details</button>
          </div>
        </div>

        <div className="device-card">
          <div className="device-status online"></div>
          <div className="device-icon">💧</div>
          <div className="device-info">
            <h3>Moisture Sensor</h3>
            <p className="device-location">Green Valley Farm</p>
            <div className="device-data">
              <span className="data-value">65%</span>
              <span className="data-label">Humidity</span>
            </div>
          </div>
          <div className="device-actions">
            <button className="action-btn">View Details</button>
          </div>
        </div>

        <div className="device-card">
          <div className="device-status offline"></div>
          <div className="device-icon">🌱</div>
          <div className="device-info">
            <h3>Soil Analyzer</h3>
            <p className="device-location">Sunset Fields</p>
            <div className="device-data">
              <span className="data-value">--</span>
              <span className="data-label">Offline</span>
            </div>
          </div>
          <div className="device-actions">
            <button className="action-btn">View Details</button>
          </div>
        </div>

        <div className="device-card">
          <div className="device-status online"></div>
          <div className="device-icon">📡</div>
          <div className="device-info">
            <h3>Weather Station</h3>
            <p className="device-location">Sunset Fields</p>
            <div className="device-data">
              <span className="data-value">12 km/h</span>
              <span className="data-label">Wind Speed</span>
            </div>
          </div>
          <div className="device-actions">
            <button className="action-btn">View Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Devices; 