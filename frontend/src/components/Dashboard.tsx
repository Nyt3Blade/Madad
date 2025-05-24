import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import './Dashboard.css';

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  name: string; // City name from the API
}

const Dashboard: React.FC = () => {
  const { userDetails, loading, error } = useUser();
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  const fetchWeatherData = async (lat: number, lon: number) => {
    try {
      const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ed9c76ef5998cf659f29d3c1e10f1b1c&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('Weather data fetch failed');
      }

      const data = await response.json();
      setWeatherData(data);
      setWeatherError(null);
    } catch (error) {
      console.error('Error fetching weather:', error);
      setWeatherError('Unable to fetch weather data');
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          setLocation(newLocation);
          setLocationError(null);
          fetchWeatherData(newLocation.latitude, newLocation.longitude);
        },
        (error) => {
          setLocationError("Please allow location for better access to the advanced features");
          console.error("Error getting location:", error);
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser");
    }
  }, []);

  const getCropSafetyStatus = (temp: number, windSpeed: number) => {
    // Temperature ranges for crop safety (in Celsius)
    const tempStatus = temp < 5 ? 'unsafe' : 
                      temp < 10 ? 'moderate' : 
                      temp > 35 ? 'unsafe' : 
                      temp > 30 ? 'moderate' : 'safe';
    
    // Wind speed ranges (in m/s)
    const windStatus = windSpeed > 10 ? 'unsafe' : 
                      windSpeed > 7 ? 'moderate' : 'safe';

    // Determine specific warnings
    let specificWarnings = [];
    if (temp < 5) specificWarnings.push('Temperature is too low');
    if (temp > 35) specificWarnings.push('Temperature is too high');
    if (windSpeed > 10) specificWarnings.push('Wind speed is too high');

    // Overall status
    if (tempStatus === 'unsafe' || windStatus === 'unsafe') {
      return {
        status: 'unsafe',
        message: 'Current conditions may be harmful to crops. Consider taking protective measures.',
        warnings: specificWarnings.join(', ')
      };
    } else if (tempStatus === 'moderate' || windStatus === 'moderate') {
      return {
        status: 'moderate',
        message: 'Conditions are moderate. Monitor crops closely.',
        warnings: specificWarnings.join(', ')
      };
    } else {
      return {
        status: 'safe',
        message: 'Weather conditions are favorable for crops.',
        warnings: 'All parameters are within safe ranges'
      };
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading user details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h2>Dashboard Overview</h2>
      <div className="dashboard-welcome">
        <h3>Welcome back, {userDetails?.name || 'User'}!</h3>
        <p>Here's an overview of your farm's status</p>
      </div>

      {locationError && (
        <div className="location-error">
          <p>⚠️ {locationError}</p>
        </div>
      )}

      {location && (
        <div className="location-info">
          <p>📍 Location: {weatherData?.name || 'Loading...'} ({location.latitude.toFixed(4)}, {location.longitude.toFixed(4)})</p>
        </div>
      )}

      {weatherError && (
        <div className="weather-error">
          <p>⚠️ {weatherError}</p>
        </div>
      )}

      {weatherData && (
        <>
          <div className="weather-card">
            <div className="weather-header">
              <img 
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
                alt={weatherData.weather[0].description}
                className="weather-icon"
              />
              <div className="weather-main">
                <h3>{weatherData.weather[0].main}</h3>
                <p className="temperature">{Math.round(weatherData.main.temp)}°C</p>
                <p className="feels-like">Feels like: {Math.round(weatherData.main.feels_like)}°C</p>
              </div>
            </div>
            <div className="weather-details">
              <div className="weather-detail">
                <span className="detail-label">Humidity</span>
                <span className="detail-value">{weatherData.main.humidity}%</span>
              </div>
              <div className="weather-detail">
                <span className="detail-label">Wind Speed</span>
                <span className="detail-value">{weatherData.wind.speed} m/s</span>
              </div>
              <div className="weather-detail">
                <span className="detail-label">Description</span>
                <span className="detail-value">{weatherData.weather[0].description}</span>
              </div>
            </div>
          </div>

          <div className={`crop-safety ${getCropSafetyStatus(weatherData.main.temp, weatherData.wind.speed).status}`}>
            <h4>Crop Safety Assessment</h4>
            <p>{getCropSafetyStatus(weatherData.main.temp, weatherData.wind.speed).message}</p>
            <p className="specific-warnings">{getCropSafetyStatus(weatherData.main.temp, weatherData.wind.speed).warnings}</p>
          </div>
        </>
      )}

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-icon">🌾</div>
          <div className="card-content">
            <h4>Active Farms</h4>
            <p className="card-value">{userDetails?.farms || 0}</p>
            <p className="card-label">Total farms under management</p>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">📊</div>
          <div className="card-content">
            <h4>Analytics</h4>
            <p className="card-value">85%</p>
            <p className="card-label">Overall farm efficiency</p>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">📱</div>
          <div className="card-content">
            <h4>Active Devices</h4>
            <p className="card-value">12</p>
            <p className="card-label">Connected sensors and devices</p>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">📈</div>
          <div className="card-content">
            <h4>Growth Rate</h4>
            <p className="card-value">+15%</p>
            <p className="card-label">Compared to last month</p>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">👨‍⚕️</div>
          <div className="card-content">
            <h4>Medical Support</h4>
            <p className="card-value">6</p>
            <p className="card-label">Available specialists</p>
          </div>
        </div>
      </div>

      <div className="dashboard-recent">
        <h3>Recent Activities</h3>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon">🌡️</div>
            <div className="activity-content">
              <h4>Temperature Alert</h4>
              <p>High temperature detected in Farm A</p>
              <span className="activity-time">2 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">💧</div>
            <div className="activity-content">
              <h4>Irrigation Complete</h4>
              <p>Automated irrigation completed in Farm B</p>
              <span className="activity-time">4 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">📊</div>
            <div className="activity-content">
              <h4>Report Generated</h4>
              <p>Weekly farm report is ready</p>
              <span className="activity-time">1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 