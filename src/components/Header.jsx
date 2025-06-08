import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className={`header ${isHeaderMinimized ? 'header-minimized' : ''}`}>
            <Link to="/" className="header-title">
                <div className="logo">
                    <span className="logo-text">GreenGrid</span>
                    <span className="logo-subtitle">Smart Energy Solutions</span>
                </div>
            </Link>
            <div className="nav-buttons">
                <Link to="/" className="nav-btn">Dashboard</Link>
                <Link to="/auth" className="nav-btn">Login</Link>
                <Link to="/contact" className="contact-btn">Contact Us</Link>
            </div>
        </header>
    );
};

export default Header; 