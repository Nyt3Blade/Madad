import React from 'react';
import './Analytics.css';

const Analytics: React.FC = () => {
  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h2>Farm Analytics</h2>
        <select className="date-filter">
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 3 months</option>
          <option value="365">Last year</option>
        </select>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>Yield Overview</h3>
          <div className="chart-placeholder">
            <div className="chart-bar" style={{ height: '60%' }}></div>
            <div className="chart-bar" style={{ height: '80%' }}></div>
            <div className="chart-bar" style={{ height: '40%' }}></div>
            <div className="chart-bar" style={{ height: '90%' }}></div>
            <div className="chart-bar" style={{ height: '70%' }}></div>
          </div>
        </div>

        <div className="analytics-card">
          <h3>Resource Usage</h3>
          <div className="resource-stats">
            <div className="resource-item">
              <span className="resource-label">Water</span>
              <div className="progress-bar">
                <div className="progress" style={{ width: '75%' }}></div>
              </div>
              <span className="resource-value">75%</span>
            </div>
            <div className="resource-item">
              <span className="resource-label">Energy</span>
              <div className="progress-bar">
                <div className="progress" style={{ width: '45%' }}></div>
              </div>
              <span className="resource-value">45%</span>
            </div>
            <div className="resource-item">
              <span className="resource-label">Fertilizer</span>
              <div className="progress-bar">
                <div className="progress" style={{ width: '60%' }}></div>
              </div>
              <span className="resource-value">60%</span>
            </div>
          </div>
        </div>

        <div className="analytics-card">
          <h3>Weather Impact</h3>
          <div className="weather-stats">
            <div className="weather-item">
              <span className="weather-icon">🌡️</span>
              <span className="weather-value">24°C</span>
              <span className="weather-label">Temperature</span>
            </div>
            <div className="weather-item">
              <span className="weather-icon">💧</span>
              <span className="weather-value">65%</span>
              <span className="weather-label">Humidity</span>
            </div>
            <div className="weather-item">
              <span className="weather-icon">💨</span>
              <span className="weather-value">12 km/h</span>
              <span className="weather-label">Wind Speed</span>
            </div>
          </div>
        </div>

        <div className="analytics-card">
          <h3>Cost Analysis</h3>
          <div className="cost-breakdown">
            <div className="cost-item">
              <span className="cost-label">Labor</span>
              <span className="cost-value">$2,500</span>
            </div>
            <div className="cost-item">
              <span className="cost-label">Equipment</span>
              <span className="cost-value">$1,800</span>
            </div>
            <div className="cost-item">
              <span className="cost-label">Supplies</span>
              <span className="cost-value">$3,200</span>
            </div>
            <div className="cost-item total">
              <span className="cost-label">Total</span>
              <span className="cost-value">$7,500</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 