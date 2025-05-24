import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Homepage from './Homepage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Console from './pages/Console';
import './App.css';

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/signin" />;
    }
    return <>{children}</>;
};

const App: React.FC = () => {
    return (
        <Router>
            <UserProvider>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route
                            path="/console/*"
                            element={
                                <ProtectedRoute>
                                    <Console />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </div>
            </UserProvider>
        </Router>
    );
};

export default App; 