import React from 'react';
import './Reports.css';

const Reports: React.FC = () => {
  return (
    <div className="reports-container">
      <div className="reports-header">
        <h2>Farm Reports</h2>
        <div className="reports-actions">
          <select className="date-filter">
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 3 months</option>
            <option value="365">Last year</option>
          </select>
          <button className="generate-report-btn">Generate Report</button>
        </div>
      </div>

      <div className="reports-grid">
        <div className="report-card">
          <div className="report-icon">📊</div>
          <div className="report-info">
            <h3>Yield Report</h3>
            <p className="report-date">Generated: March 15, 2024</p>
            <div className="report-stats">
              <div className="stat">
                <span className="stat-value">85%</span>
                <span className="stat-label">Efficiency</span>
              </div>
              <div className="stat">
                <span className="stat-value">2.5T</span>
                <span className="stat-label">Total Yield</span>
              </div>
            </div>
          </div>
          <div className="report-actions">
            <button className="action-btn">View</button>
            <button className="action-btn">Download</button>
          </div>
        </div>

        <div className="report-card">
          <div className="report-icon">💧</div>
          <div className="report-info">
            <h3>Water Usage Report</h3>
            <p className="report-date">Generated: March 14, 2024</p>
            <div className="report-stats">
              <div className="stat">
                <span className="stat-value">75%</span>
                <span className="stat-label">Efficiency</span>
              </div>
              <div className="stat">
                <span className="stat-value">1.2M</span>
                <span className="stat-label">Gallons Used</span>
              </div>
            </div>
          </div>
          <div className="report-actions">
            <button className="action-btn">View</button>
            <button className="action-btn">Download</button>
          </div>
        </div>

        <div className="report-card">
          <div className="report-icon">💰</div>
          <div className="report-info">
            <h3>Financial Report</h3>
            <p className="report-date">Generated: March 13, 2024</p>
            <div className="report-stats">
              <div className="stat">
                <span className="stat-value">$7.5K</span>
                <span className="stat-label">Revenue</span>
              </div>
              <div className="stat">
                <span className="stat-value">$2.3K</span>
                <span className="stat-label">Expenses</span>
              </div>
            </div>
          </div>
          <div className="report-actions">
            <button className="action-btn">View</button>
            <button className="action-btn">Download</button>
          </div>
        </div>

        <div className="report-card">
          <div className="report-icon">🌡️</div>
          <div className="report-info">
            <h3>Weather Impact Report</h3>
            <p className="report-date">Generated: March 12, 2024</p>
            <div className="report-stats">
              <div className="stat">
                <span className="stat-value">24°C</span>
                <span className="stat-label">Avg Temp</span>
              </div>
              <div className="stat">
                <span className="stat-value">65%</span>
                <span className="stat-label">Humidity</span>
              </div>
            </div>
          </div>
          <div className="report-actions">
            <button className="action-btn">View</button>
            <button className="action-btn">Download</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports; 