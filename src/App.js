import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import Authentication from './components/Authentication';
import Challenges from './components/Challenges';
import Solutions from './components/Solutions';
import Team from './components/Team';
import './App.css'; // Make sure you import your CSS here

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/team" element={<Team />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
