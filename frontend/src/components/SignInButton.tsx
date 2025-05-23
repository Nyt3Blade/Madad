import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SignInButton.css';

interface SignInButtonProps {
  className?: string;
}

const SignInButton: React.FC<SignInButtonProps> = ({ className = '' }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/signin');
  };

  return (
    <button className={`sign-in-button ${className}`} onClick={handleClick}>
      Sign In
    </button>
  );
};

export default SignInButton; 