import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [activeButton, setActiveButton] = useState('home');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    
    // Smooth scroll to the appropriate section
    switch(buttonName) {
      case 'challenges':
        document.getElementById('challenges')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        break;
      case 'solutions':
        document.getElementById('solutions')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        break;
      default:
        window.scrollTo({ 
          top: 0, 
          behavior: 'smooth' 
        });
    }
  };

  return (
    <header className="header">
      <h1 className="header-title">
        <span>GreenGrid</span> Africa
      </h1>
      <nav className="nav-buttons">
        <button
          className={`nav-btn ${activeButton === 'home' ? 'active' : ''}`}
          onClick={() => handleButtonClick('home')}
        >
          Home
        </button>
        <button
          className={`nav-btn ${activeButton === 'challenges' ? 'active' : ''}`}
          onClick={() => handleButtonClick('challenges')}
        >
          Challenges
        </button>
        <button
          className={`nav-btn ${activeButton === 'solutions' ? 'active' : ''}`}
          onClick={() => handleButtonClick('solutions')}
        >
          Solutions
        </button>
        <button
          className={`nav-btn ${activeButton === 'impact' ? 'active' : ''}`}
          onClick={() => handleButtonClick('impact')}
        >
          Impact
        </button>
        <button
          className={`nav-btn ${activeButton === 'contact' ? 'active' : ''}`}
          onClick={() => handleButtonClick('contact')}
        >
          Contact
        </button>
        <button className="contact-btn">Get Started</button>
      </nav>
    </header>
  );
};

export default Header;
