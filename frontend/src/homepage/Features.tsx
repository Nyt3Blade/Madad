import React from 'react';
import { Leaf, LineChart, Bot, Smartphone, CloudSun, Users } from 'lucide-react';
import './Features.css';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Leaf className="feature-icon" />,
    title: "Smart Crop Monitoring",
    description: "Real-time monitoring of crop health using advanced sensors and AI technology to detect early signs of disease and stress."
  },
  {
    icon: <LineChart className="feature-icon" />,
    title: "Yield Prediction",
    description: "Accurate yield predictions using machine learning algorithms and historical data analysis to help plan harvests."
  },
  {
    icon: <Bot className="feature-icon" />,
    title: "Automated Irrigation",
    description: "Smart irrigation systems that automatically adjust water levels based on soil moisture and weather conditions."
  },
  {
    icon: <Smartphone className="feature-icon" />,
    title: "Mobile App Integration",
    description: "Access all features on-the-go with our user-friendly mobile application for iOS and Android devices."
  },
  {
    icon: <CloudSun className="feature-icon" />,
    title: "Weather Analytics",
    description: "Advanced weather forecasting and analysis to help make informed decisions about farming activities."
  },
  {
    icon: <Users className="feature-icon" />,
    title: "Expert Community",
    description: "Connect with agricultural experts and fellow farmers to share knowledge and best practices."
  }
];

const Features: React.FC = () => {
  return (
    <div className="features-container">
      <h2 className="features-title">Our Features</h2>
      <p className="features-subtitle">Discover how Madad transforms modern agriculture</p>
      
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon-container">
              {feature.icon}
            </div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features; 