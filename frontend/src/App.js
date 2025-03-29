import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import Contact from './components/Contact';
import authService from './services/authService';
import './App.css';

// PRC (Private Route Component)
const PrivateRoute = ({ children }) => {
    return authService.isAuthenticated() 
        ? children 
        : <Navigate to="/login" replace />;
};

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route 
                        path="/" 
                        element={
                            <PrivateRoute>
                                <LandingPage />
                            </PrivateRoute>
                        } 
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;