import React from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}>Features</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('pricing'); }}>Pricing</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('testimonials'); }}>Testimonials</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}>FAQ</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact Us</h3>
            <div className="contact-info">
              <p><Mail size={16} /> support@madad.com</p>
              <p><Phone size={16} /> +91 1234567890</p>
              <p><MapPin size={16} /> 123 Agriculture Street, Farm City, India</p>
            </div>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="#" aria-label="Facebook"><Facebook size={24} /></a>
              <a href="#" aria-label="Twitter"><Twitter size={24} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={24} /></a>
              <a href="#" aria-label="LinkedIn"><Linkedin size={24} /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Madad. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 