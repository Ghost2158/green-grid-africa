import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import './App.css'; // Make sure you import your CSS here

const App = () => {
  return (
    <div>
      <Header />
      <Dashboard />
      <Footer />
    </div>
  );
};

export default App;
