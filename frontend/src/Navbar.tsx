import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isSticky, setSticky] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

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