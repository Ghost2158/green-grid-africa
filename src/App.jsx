import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Dashboard from './components/Dashboard.jsx';
import Challenges from './components/Challenges.jsx';
import Solutions from './components/Solutions.jsx';
import Team from './components/Team.jsx';
import './App.css';

// ✅ Vite environment variable — make sure VITE_API_URL is defined in .env
const API_URL = import.meta.env.VITE_API_URL;

function App() {
    return (
        <Router>
            <div className="app">
                {/* Optional Debug: */}
                {/* <p>API: {API_URL}</p> */}

                <Header />

                <main style={{ minHeight: '80vh' }}>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/challenges" element={<Challenges />} />
                        <Route path="/solutions" element={<Solutions />} />
                        <Route path="/team" element={<Team />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </Router>
    );
}

export default App;
