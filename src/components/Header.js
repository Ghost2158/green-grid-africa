import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from './Logo';
import './Header.css';

const Header = () => {
  const [activeButton, setActiveButton] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';

  // Update active button based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/challenges') setActiveButton('challenges');
    else if (path === '/solutions') setActiveButton('solutions');
    else if (path === '/dashboard') setActiveButton('dashboard');
    else if (path === '/') setActiveButton('home');
  }, [location]);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerOffset = 100;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    
    // If we're on the auth page, first navigate to home
    if (location.pathname === '/auth') {
      navigate('/');
      return;
    }
    
    // Handle navigation
    switch(buttonName) {
      case 'challenges':
        navigate('/challenges');
        break;
      case 'solutions':
        navigate('/solutions');
        break;
      case 'team':
        navigate('/team');
        break;
      case 'home':
        navigate('/');
        break;
      default:
        navigate('/');
    }
  };

  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <header className={`header ${isAuthPage ? 'header-minimized' : ''}`}>
      <div className="logo-container" onClick={() => handleButtonClick('home')}>
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
            className={`nav-btn ${activeButton === 'team' ? 'active' : ''}`}
            onClick={() => handleButtonClick('team')}
          >
            Team
          </button>
          <button className="contact-btn" onClick={handleGetStarted}>Get Started</button>
        </nav>
      )}
    </header>
  );
};

export default Header;
