import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Authentication from './components/Authentication';
import Challenges from './components/Challenges';
import Solutions from './components/Solutions';
import './App.css';

function App() {
    return (
        <Router>
            <div className="app">
                <Header />
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/auth" element={<Authentication />} />
                    <Route path="/challenges" element={<Challenges />} />
                    <Route path="/solutions" element={<Solutions />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App; 