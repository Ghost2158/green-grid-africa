import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from './Logo';
import './Header.css';

const Header = () => {
  const [activeButton, setActiveButton] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    
    // If we're on the auth page, first navigate to home
    if (location.pathname === '/auth') {
      navigate('/');
    }
    
    // Then handle the section scrolling
    switch(buttonName) {
      case 'challenges':
        const challengesSection = document.getElementById('challenges');
        if (challengesSection) {
          const headerOffset = 100;
          const elementPosition = challengesSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
        break;
      case 'solutions':
        const solutionsSection = document.getElementById('solutions');
        if (solutionsSection) {
          const headerOffset = 100;
          const elementPosition = solutionsSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
        break;
      default:
        window.scrollTo({ 
          top: 0, 
          behavior: 'smooth' 
        });
    }
  };

  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <header className={`header ${isAuthPage ? 'header-minimized' : ''}`}>
      <div className="logo" onClick={() => handleButtonClick('home')}>
        <Logo />
      </div>
      {!isAuthPage && (
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
          <button className="contact-btn" onClick={handleGetStarted}>Get Started</button>
        </nav>
      )}
    </header>
  );
};

export default Header;
