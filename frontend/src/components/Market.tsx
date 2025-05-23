import React from 'react';
import './Market.css';

const Market: React.FC = () => {
  return (
    <div className="market-container">
      <div className="market-header">
        <h2>Market Place</h2>
        <div className="market-filters">
          <select className="category-filter">
            <option value="">All Categories</option>
            <option value="seeds">Seeds</option>
            <option value="equipment">Equipment</option>
            <option value="fertilizers">Fertilizers</option>
            <option value="pesticides">Pesticides</option>
          </select>
          <input 
            type="text" 
            placeholder="Search products..." 
            className="search-input"
          />
        </div>
      </div>

      <div className="market-grid">
        {/* Product Card 1 */}
        <div className="product-card">
          <div className="product-image">
            <img src="https://via.placeholder.com/200" alt="Organic Seeds" />
          </div>
          <div className="product-info">
            <h3>Organic Wheat Seeds</h3>
            <p className="product-description">High-yield organic wheat seeds, perfect for sustainable farming.</p>
            <div className="product-meta">
              <span className="product-price">$24.99</span>
              <span className="product-rating">⭐ 4.8</span>
            </div>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        </div>

        {/* Product Card 2 */}
        <div className="product-card">
          <div className="product-image">
            <img src="https://via.placeholder.com/200" alt="Farming Equipment" />
          </div>
          <div className="product-info">
            <h3>Smart Irrigation System</h3>
            <p className="product-description">Automated irrigation system with moisture sensors and mobile app control.</p>
            <div className="product-meta">
              <span className="product-price">$299.99</span>
              <span className="product-rating">⭐ 4.9</span>
            </div>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        </div>

        {/* Product Card 3 */}
        <div className="product-card">
          <div className="product-image">
            <img src="https://via.placeholder.com/200" alt="Organic Fertilizer" />
          </div>
          <div className="product-info">
            <h3>Organic Fertilizer Pack</h3>
            <p className="product-description">Natural fertilizer blend for improved soil health and crop yield.</p>
            <div className="product-meta">
              <span className="product-price">$49.99</span>
              <span className="product-rating">⭐ 4.7</span>
            </div>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        </div>

        {/* Product Card 4 */}
        <div className="product-card">
          <div className="product-image">
            <img src="https://via.placeholder.com/200" alt="Pest Control" />
          </div>
          <div className="product-info">
            <h3>Eco-Friendly Pest Control</h3>
            <p className="product-description">Natural pest control solution safe for crops and environment.</p>
            <div className="product-meta">
              <span className="product-price">$34.99</span>
              <span className="product-rating">⭐ 4.6</span>
            </div>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Market; 