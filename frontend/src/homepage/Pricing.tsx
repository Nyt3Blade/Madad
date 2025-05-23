import React from 'react';
import { Check } from 'lucide-react';

interface PricingFeature {
  name: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: PricingFeature[];
  recommended?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Basic",
    price: "Free",
    description: "Perfect for small-scale farmers starting with smart farming",
    features: [
      { name: "Basic crop monitoring", included: true },
      { name: "Weather alerts", included: true },
      { name: "Basic soil analysis", included: true },
      { name: "Community support", included: true },
      { name: "Market price updates", included: true },
      { name: "Disease detection", included: false },
      { name: "Smart irrigation", included: false },
      { name: "Expert consultation", included: false },
    ]
  },
  {
    name: "Professional",
    price: "Free",
    description: "Ideal for medium-sized farms with advanced needs",
    recommended: true,
    features: [
      { name: "Advanced crop monitoring", included: true },
      { name: "Weather alerts", included: true },
      { name: "Detailed soil analysis", included: true },
      { name: "Priority support", included: true },
      { name: "Real-time market predictions", included: true },
      { name: "Disease detection", included: true },
      { name: "Smart irrigation", included: true },
      { name: "Monthly expert consultation", included: true },
    ]
  },
  {
    name: "Enterprise",
    price: "Free",
    description: "Complete solution for large-scale farming operations",
    features: [
      { name: "Premium crop monitoring", included: true },
      { name: "Advanced weather forecasting", included: true },
      { name: "Comprehensive soil analysis", included: true },
      { name: "24/7 dedicated support", included: true },
      { name: "AI-powered market predictions", included: true },
      { name: "Advanced disease detection", included: true },
      { name: "Automated irrigation system", included: true },
      { name: "Weekly expert consultation", included: true },
    ]
  }
];

const Pricing: React.FC = () => {
  return (
    <div className="pricing-container">
      <h2>Choose Your Plan</h2>
      <p className="pricing-subtitle">Select the perfect plan for your farming needs</p>
      
      <div className="pricing-grid">
        {pricingPlans.map((plan, index) => (
          <div 
            key={index} 
            className={`pricing-card ${plan.recommended ? 'recommended' : ''}`}
          >
            {plan.recommended && (
              <div className="recommended-badge">Most Popular</div>
            )}
            <div className="pricing-header">
              <h3>{plan.name}</h3>
              <div className="price">{plan.price}<span>/month</span></div>
              <p className="description">{plan.description}</p>
            </div>
            
            <ul className="features-list">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className={feature.included ? 'included' : 'not-included'}>
                  <Check size={16} />
                  <span>{feature.name}</span>
                </li>
              ))}
            </ul>
            
            <button className="pricing-button">
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing; 