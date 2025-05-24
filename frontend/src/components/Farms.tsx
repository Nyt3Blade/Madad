import React, { useState, useEffect } from 'react';
import './Farms.css';

interface Farm {
  _id: string;
  name: string;
  location: string;
  size: number;
  cropType: string;
  soilType: string;
  irrigationSystem: string;
  harvestingDate: string;
  createdAt: string;
}

const Farms: React.FC = () => {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingFarm, setEditingFarm] = useState<Farm | null>(null);
  const [harvestingAlerts, setHarvestingAlerts] = useState<Farm[]>([]);
  const [showAnalyzePopup, setShowAnalyzePopup] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    size: '',
    cropType: '',
    soilType: '',
    irrigationSystem: '',
    harvestingDate: ''
  });

  useEffect(() => {
    if (showAnalyzePopup) {
      const timer = setTimeout(() => {
        setShowAnalyzePopup(false);
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, [showAnalyzePopup]);

  const checkHarvestingDates = (farmsList: Farm[]) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time part to compare only dates

    const alerts = farmsList.filter(farm => {
      const harvestDate = new Date(farm.harvestingDate);
      harvestDate.setHours(0, 0, 0, 0);
      return harvestDate.getTime() === today.getTime();
    });

    setHarvestingAlerts(alerts);
  };

  const fetchFarms = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/farms', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch farms');
      }

      const data = await response.json();
      setFarms(data.farms);
      checkHarvestingDates(data.farms);
      setError(null);
    } catch (err) {
      setError('Error loading farms. Please try again later.');
      console.error('Error fetching farms:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarms();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDelete = async (farmId: string) => {
    if (!window.confirm('Are you sure you want to delete this farm?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/farms/${farmId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete farm');
      }

      // Remove the deleted farm from the state
      setFarms(farms.filter(farm => farm._id !== farmId));
      setError(null);
    } catch (err) {
      setError('Error deleting farm. Please try again.');
      console.error('Error deleting farm:', err);
    }
  };

  const handleEdit = (farm: Farm) => {
    setEditingFarm(farm);
    setFormData({
      name: farm.name,
      location: farm.location,
      size: farm.size.toString(),
      cropType: farm.cropType,
      soilType: farm.soilType,
      irrigationSystem: farm.irrigationSystem,
      harvestingDate: farm.harvestingDate
    });
    setShowAddForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = editingFarm 
        ? `http://localhost:5000/farms/${editingFarm._id}`
        : 'http://localhost:5000/farms';
      
      const response = await fetch(url, {
        method: editingFarm ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(editingFarm ? 'Failed to update farm' : 'Failed to add farm');
      }

      // Reset form and refresh farms list
      setFormData({
        name: '',
        location: '',
        size: '',
        cropType: '',
        soilType: '',
        irrigationSystem: '',
        harvestingDate: ''
      });
      setShowAddForm(false);
      setEditingFarm(null);
      fetchFarms();
    } catch (err) {
      setError(editingFarm ? 'Error updating farm. Please try again.' : 'Error adding farm. Please try again.');
      console.error('Error:', err);
    }
  };

  if (loading) {
    return <div className="farms-container">Loading farms...</div>;
  }

  return (
    <div className="farms-container">
      {showAnalyzePopup && (
        <div className="analyze-notification">
          <button 
            className="close-notification-button"
            onClick={() => setShowAnalyzePopup(false)}
          >
            ×
          </button>
          <div className="notification-content">
            <h4>📊 Smart Farming Tip</h4>
            <p>Check out the Analyze section for better crop planning!</p>
            <button 
              className="analyze-link-button"
              onClick={() => {
                setShowAnalyzePopup(false);
                window.location.href = '/console/analyze';
              }}
            >
              View Analysis
            </button>
          </div>
        </div>
      )}

      <div className="farms-header">
        <h2>Your Farms</h2>
        <button 
          className="add-farm-button"
          onClick={() => {
            setShowAddForm(!showAddForm);
            if (!showAddForm) {
              setEditingFarm(null);
              setFormData({
                name: '',
                location: '',
                size: '',
                cropType: '',
                soilType: '',
                irrigationSystem: '',
                harvestingDate: ''
              });
            }
          }}
        >
          {showAddForm ? 'Cancel' : '+ Add New Farm'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {harvestingAlerts.length > 0 && (
        <div className="harvesting-alert">
          <h3>🌾 Harvesting Alerts</h3>
          <div className="alert-list">
            {harvestingAlerts.map(farm => (
              <div key={farm._id} className="alert-item">
                <p>
                  <strong>{farm.name}</strong> is ready for harvesting today!
                  <br />
                  <span className="alert-details">
                    Location: {farm.location} | Crop: {farm.cropType}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {showAddForm && (
        <div className="add-farm-form">
          <h3>{editingFarm ? 'Edit Farm' : 'Add New Farm'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Farm Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="size">Size (acres)</label>
              <input
                type="number"
                id="size"
                name="size"
                value={formData.size}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
              />
            </div>

            <div className="form-group">
              <label htmlFor="cropType">Crop Type</label>
              <select
                id="cropType"
                name="cropType"
                value={formData.cropType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Crop Type</option>
                <option value="wheat">Wheat</option>
                <option value="rice">Rice</option>
                <option value="corn">Corn</option>
                <option value="soybeans">Soybeans</option>
                <option value="cotton">Cotton</option>
                <option value="vegetables">Vegetables</option>
                <option value="fruits">Fruits</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="soilType">Soil Type</label>
              <select
                id="soilType"
                name="soilType"
                value={formData.soilType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Soil Type</option>
                <option value="clay">Clay</option>
                <option value="sandy">Sandy</option>
                <option value="loamy">Loamy</option>
                <option value="silt">Silt</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="irrigationSystem">Irrigation System</label>
              <select
                id="irrigationSystem"
                name="irrigationSystem"
                value={formData.irrigationSystem}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Irrigation System</option>
                <option value="drip">Drip Irrigation</option>
                <option value="sprinkler">Sprinkler System</option>
                <option value="flood">Flood Irrigation</option>
                <option value="manual">Manual Irrigation</option>
                <option value="none">No Irrigation</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="harvestingDate">Expected Harvesting Date</label>
              <input
                type="date"
                id="harvestingDate"
                name="harvestingDate"
                value={formData.harvestingDate}
                onChange={handleInputChange}
                required
              />
            </div>

            <button type="submit" className="submit-button">
              {editingFarm ? 'Update Farm' : 'Add Farm'}
            </button>
          </form>
        </div>
      )}

      <div className="farms-grid">
        {farms.map(farm => (
          <div key={farm._id} className="farm-card">
            <div className="farm-header">
              <h3>{farm.name}</h3>
              <div className="farm-actions">
                <button 
                  className="edit-button"
                  onClick={() => handleEdit(farm)}
                >
                  Edit
                </button>
                <button 
                  className="delete-button"
                  onClick={() => handleDelete(farm._id)}
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="farm-details">
              <p><strong>Location:</strong> {farm.location}</p>
              <p><strong>Size:</strong> {farm.size} acres</p>
              <p><strong>Crop Type:</strong> {farm.cropType}</p>
              <p><strong>Soil Type:</strong> {farm.soilType}</p>
              <p><strong>Irrigation:</strong> {farm.irrigationSystem}</p>
              <p><strong>Harvesting Date:</strong> {new Date(farm.harvestingDate).toLocaleDateString()}</p>
              <p><strong>Added:</strong> {new Date(farm.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Farms; 