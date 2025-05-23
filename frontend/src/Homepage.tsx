import React from 'react';
import ParallaxDesign from './homepage/ParallaxDesign';
import Features from './homepage/Features';
import Pricing from './homepage/Pricing';
import Testimonials from './homepage/Testimonials';
import FAQ from './homepage/FAQ';
import Footer from './homepage/Footer';
import SignInButton from './components/SignInButton';
import './Homepage.css';

const Homepage: React.FC = () => {
  return (
    <div className="homepage-container">
      <section className="section parallax-section" id="home">
        <div className="parallax-content-wrapper">
          <div className="project-explanation">
            <h1>Welcome to Madad</h1>
            <p>Your comprehensive agricultural solution platform</p>
            <div className="explanation-text">
              <p>Madad is an innovative platform designed to revolutionize farming practices through technology. Our solution provides:</p>
              <ul>
                <li>Real-time crop monitoring and analysis</li>
                <li>Smart irrigation management</li>
                <li>Disease detection and prevention</li>
                <li>Market price predictions</li>
                <li>Expert consultation services</li>
              </ul>
              <p>Join us in transforming traditional farming into smart, efficient, and sustainable agriculture.</p>
              <SignInButton className="sign-in-button-top" />
            </div>
          </div>
          <div className="parallax-wrapper">
            <ParallaxDesign />
          </div>
        </div>
      </section>

      <section className="section features-section" id="features">
        <Features />
      </section>

      <section className="pricing-section" id="pricing">
        <Pricing />
      </section>

      <section className="testimonials-section" id="testimonials">
        <Testimonials />
      </section>

      <section className="section faq-section" id="faq">
        <FAQ />
      </section>

      <div className="sign-in-section">
        <SignInButton className="bottom-center" />
      </div>

      <div className="footer-section">
        <Footer />
      </div>
    </div>
  );
};

export default Homepage; 