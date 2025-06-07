import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [activeButton, setActiveButton] = useState('Home');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    // Add navigation logic here
    console.log(`Navigating to: ${buttonName}`);
  };

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">GreenGrid Africa</h1>

        <nav className="nav-section" role="navigation" aria-label="Primary navigation">
          <button
            className={`nav-btn ${activeButton === 'Home' ? 'active' : ''}`}
            onClick={() => handleButtonClick('Home')}
          >
            Home
          </button>
          <button
            className={`nav-btn ${activeButton === 'Main Dashboard' ? 'active' : ''}`}
            onClick={() => handleButtonClick('Main Dashboard')}
          >
            Main Dashboard
          </button>
          <button
            className={`nav-btn ${activeButton === 'Users Dashboard' ? 'active' : ''}`}
            onClick={() => handleButtonClick('Users Dashboard')}
          >
            Users Dashboard
          </button>
          <button
            className={`nav-btn ${activeButton === 'Operators Dashboard' ? 'active' : ''}`}
            onClick={() => handleButtonClick('Operators Dashboard')}
          >
            Operators Dashboard
          </button>
          <button
            className={`nav-btn ${activeButton === 'AI Predictions' ? 'active' : ''}`}
            onClick={() => handleButtonClick('AI Predictions')}
          >
            AI Predictions
          </button>
          <button
            className={`nav-btn ${activeButton === 'Community Portal' ? 'active' : ''}`}
            onClick={() => handleButtonClick('Community Portal')}
          >
            Community Portal
          </button>
          <button
            className={`nav-btn ${activeButton === 'Reports & Insights' ? 'active' : ''}`}
            onClick={() => handleButtonClick('Reports & Insights')}
          >
            Reports & Insights
          </button>
          <button
            className={`nav-btn contact-btn ${activeButton === 'Contact Us' ? 'active' : ''}`}
            onClick={() => handleButtonClick('Contact Us')}
          >
            Contact Us
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
