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
    else if (path === '/team') setActiveButton('team');
    else if (path === '/') setActiveButton('home');
  }, [location]);

  // Scroll to top whenever route changes (ensures each page starts from top)
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);

  // Function to scroll to top of page smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Individual button handlers with independent scrolling
  const handleHomeClick = () => {
    setActiveButton('home');
    // If already on home page, just scroll to top
    if (location.pathname === '/') {
      scrollToTop();
    } else {
      // Navigate to home, useEffect will handle scrolling
      navigate('/');
    }
  };

  const handleChallengesClick = () => {
    setActiveButton('challenges');
    // If we're on the auth page, navigate to home first
    if (location.pathname === '/auth') {
      navigate('/');
      return;
    }
    // If already on challenges page, just scroll to top
    if (location.pathname === '/challenges') {
      scrollToTop();
    } else {
      // Navigate to challenges, useEffect will handle scrolling
      navigate('/challenges');
    }
  };

  const handleSolutionsClick = () => {
    setActiveButton('solutions');
    // If we're on the auth page, navigate to home first
    if (location.pathname === '/auth') {
      navigate('/');
      return;
    }
    // If already on solutions page, just scroll to top
    if (location.pathname === '/solutions') {
      scrollToTop();
    } else {
      // Navigate to solutions, useEffect will handle scrolling
      navigate('/solutions');
    }
  };

  const handleTeamClick = () => {
    setActiveButton('team');
    // If we're on the auth page, navigate to home first
    if (location.pathname === '/auth') {
      navigate('/');
      return;
    }
    // If already on team page, just scroll to top
    if (location.pathname === '/team') {
      scrollToTop();
    } else {
      // Navigate to team, useEffect will handle scrolling
      navigate('/team');
    }
  };

  const handleGetStarted = () => {
    // Always scroll to top before navigating to auth
    scrollToTop();
    // Small delay to ensure scroll animation starts
    setTimeout(() => {
      navigate('/auth');
    }, 200);
  };

  // Keep the old scrollToSection function for other uses if needed
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

  return (
    <header className={`header ${isAuthPage ? 'header-minimized' : ''}`}>
      <div className="logo-container" onClick={handleHomeClick}>
        <Logo />
      </div>
      {!isAuthPage && (
        <nav className="nav-buttons">
          <button
            className={`nav-btn ${activeButton === 'home' ? 'active' : ''}`}
            onClick={handleHomeClick}
          >
            Home
          </button>
          <button
            className={`nav-btn ${activeButton === 'challenges' ? 'active' : ''}`}
            onClick={handleChallengesClick}
          >
            Challenges
          </button>
          <button
            className={`nav-btn ${activeButton === 'solutions' ? 'active' : ''}`}
            onClick={handleSolutionsClick}
          >
            Solutions
          </button>
          <button
            className={`nav-btn ${activeButton === 'team' ? 'active' : ''}`}
            onClick={handleTeamClick}
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