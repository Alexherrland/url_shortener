import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import authService from './services/authService';
import './App.css';

// PRC
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
                </Routes>
            </div>
        </Router>
    );
}

export default App;