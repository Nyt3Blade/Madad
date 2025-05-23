import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to console page regardless of input
    navigate('/console');
  };

  return (
    <div className="sign-in-container">
      <div className="sign-in-card">
        <h1>Welcome Back</h1>
        <p className="subtitle">Sign in to your account</p>
        
        <form onSubmit={handleSubmit} className="sign-in-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>

          <button type="submit" className="sign-in-submit">
            Sign In
          </button>

          <p className="sign-up-prompt">
            Don't have an account?{' '}
            <a href="#" onClick={() => navigate('/signup')}>
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn; 