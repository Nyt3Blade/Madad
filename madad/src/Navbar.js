import React, { useState, useEffect } from 'react';
import './Navbar.css'; // Import your CSS file

const Navbar = () => {
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Set isSticky to true when scrolling down, and false when at the top
      setSticky(window.scrollY > 0);
    };

    // Attach the event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`navbar ${isSticky ? 'sticky' : ''}`}>
      
    </div>
  );
};

export default Navbar;