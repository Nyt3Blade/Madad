import React, { useState } from 'react';
import './Medical.css';

interface Doctor {
  id: number;
  name: string;
  phone: string;
  email: string;
  location: string;
  type: 'plant' | 'animal';
}

const plantDoctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Sarah Green",
    phone: "+1 (555) 123-4567",
    email: "sarah.green@plantcare.com",
    location: "Agricultural Research Center, Block A",
    type: "plant"
  },
  {
    id: 2,
    name: "Dr. Michael Leaf",
    phone: "+1 (555) 234-5678",
    email: "michael.leaf@plantcare.com",
    location: "Botanical Gardens, East Wing",
    type: "plant"
  },
  {
    id: 3,
    name: "Dr. Emily Root",
    phone: "+1 (555) 345-6789",
    email: "emily.root@plantcare.com",
    location: "Horticulture Center, Room 302",
    type: "plant"
  }
];

const animalDoctors: Doctor[] = [
  {
    id: 4,
    name: "Dr. James Farm",
    phone: "+1 (555) 456-7890",
    email: "james.farm@animalcare.com",
    location: "Veterinary Clinic, Main Building",
    type: "animal"
  },
  {
    id: 5,
    name: "Dr. Lisa Field",
    phone: "+1 (555) 567-8901",
    email: "lisa.field@animalcare.com",
    location: "Animal Health Center, Block B",
    type: "animal"
  },
  {
    id: 6,
    name: "Dr. Robert Ranch",
    phone: "+1 (555) 678-9012",
    email: "robert.ranch@animalcare.com",
    location: "Livestock Medical Center, South Wing",
    type: "animal"
  }
];

const Medical: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'plant' | 'animal'>('plant');

  return (
    <div className="medical-container">
      <h2>Medical Professionals</h2>
      
      <div className="tab-buttons">
        <button 
          className={`tab-button ${activeTab === 'plant' ? 'active' : ''}`}
          onClick={() => setActiveTab('plant')}
        >
          🌱 Plant Doctors
        </button>
        <button 
          className={`tab-button ${activeTab === 'animal' ? 'active' : ''}`}
          onClick={() => setActiveTab('animal')}
        >
          🐄 Animal Doctors
        </button>
      </div>

      <div className="doctors-grid">
        {(activeTab === 'plant' ? plantDoctors : animalDoctors).map(doctor => (
          <div key={doctor.id} className="doctor-card">
            <div className="doctor-header">
              <h3>{doctor.name}</h3>
              <span className="doctor-type">
                {doctor.type === 'plant' ? '🌱 Plant Specialist' : '🐄 Animal Specialist'}
              </span>
            </div>
            <div className="doctor-details">
              <p>
                <strong>Phone:</strong>
                <a href={`tel:${doctor.phone}`}>{doctor.phone}</a>
              </p>
              <p>
                <strong>Email:</strong>
                <a href={`mailto:${doctor.email}`}>{doctor.email}</a>
              </p>
              <p>
                <strong>Location:</strong>
                {doctor.location}
              </p>
            </div>
            <button className="contact-button">
              Contact Doctor
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Medical; 