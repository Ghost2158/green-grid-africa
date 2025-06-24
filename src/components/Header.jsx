import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <Link to="/" className="header-title">
                <Logo />
            </Link>
            <div className="nav-buttons">
                <Link to="/" className="nav-btn">Dashboard</Link>
                <Link to="/challenges" className="nav-btn">Challenges</Link>
                <Link to="/solutions" className="nav-btn">Solutions</Link>
                <Link to="/team" className="nav-btn">Team</Link>
            </div>
        </header>
    );
};

export default Header; 