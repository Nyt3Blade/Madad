import React, { useEffect, useState } from 'react';
import image1 from './image_1-removebg-preview.png';
import image2 from './image_2-removebg-preview.png';
import image3 from './image_3-removebg-preview.png';
import image4 from './image_4.jpg';
import './ParallaxDesign.css';

const ParallaxDesign: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="parallax-container">
      {/* Background image (image_4) */}
      <div 
        className="parallax-background"
        style={{
          '--bg-image': `url(${image4})`,
          transform: `translateY(${scrollPosition * 0.05}px)`
        } as React.CSSProperties}
      />

      {/* Layered images with different parallax effects */}
      <div 
        className="parallax-layer layer-3"
        style={{
          transform: `translateY(${scrollPosition * 0.15}px)`
        }}
      >
        <img src={image3} alt="Layer 3" />
      </div>

      <div 
        className="parallax-layer layer-2"
        style={{
          transform: `translateY(${scrollPosition * 0.20}px)`
        }}
      >
        <img src={image2} alt="Layer 2" />
      </div>

      <div 
        className="parallax-layer layer-1"
        style={{
          transform: `translateY(${scrollPosition * 0.25}px)`
        }}
      >
        <img src={image1} alt="Layer 1" />
      </div>
    </div>
  );
};

export default ParallaxDesign; 