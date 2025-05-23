import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Console from './pages/Console';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/console/*" element={<Console />} />
      </Routes>
    </Router>
  );
};

export default App; 