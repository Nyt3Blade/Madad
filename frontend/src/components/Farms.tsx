import React from 'react';
import './Farms.css';

const Farms: React.FC = () => {
  return (
    <div className="farms-container">
      <div className="farms-header">
        <h2>My Farms</h2>
        <button className="add-farm-btn">Add New Farm</button>
      </div>
      <div className="farms-grid">
        <div className="farm-card">
          <div className="farm-image">
            <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Farm" />
          </div>
          <div className="farm-info">
            <h3>Green Valley Farm</h3>
            <p className="farm-location">📍 New York, USA</p>
            <div className="farm-stats">
              <div className="stat">
                <span className="stat-label">Area</span>
                <span className="stat-value">50 acres</span>
              </div>
              <div className="stat">
                <span className="stat-label">Crops</span>
                <span className="stat-value">3 types</span>
              </div>
            </div>
          </div>
        </div>

        <div className="farm-card">
          <div className="farm-image">
            <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Farm" />
          </div>
          <div className="farm-info">
            <h3>Sunset Fields</h3>
            <p className="farm-location">📍 California, USA</p>
            <div className="farm-stats">
              <div className="stat">
                <span className="stat-label">Area</span>
                <span className="stat-value">75 acres</span>
              </div>
              <div className="stat">
                <span className="stat-label">Crops</span>
                <span className="stat-value">5 types</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Farms; 