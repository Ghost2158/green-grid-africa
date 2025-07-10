import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo.jsx';
import './Header.css';

// Remove AnimatedHeaderBG and its usage

const scrollToTitle = (id) => {
    setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, 100);
};

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const pageTitleIds = {
        '/': 'dashboard-title',
        '/challenges': 'challenges-title',
        '/solutions': 'solutions-title',
        '/team': 'team-title',
    };

    const handleNavigation = (path) => {
        if (location.pathname === path) {
            scrollToTitle(pageTitleIds[path]);
        } else {
            navigate(path);
            setTimeout(() => scrollToTitle(pageTitleIds[path]), 200);
        }
    };

    return (
        <header className="header glass-header">
            <Link to="/" className="header-title logo-animate" onClick={() => handleNavigation('/')}
                aria-label="GreenGrid Africa Home">
                <Logo />
            </Link>
            <div className="nav-buttons">
                <button onClick={() => handleNavigation('/')} className="nav-btn glow-underline">Dashboard</button>
                <button onClick={() => handleNavigation('/challenges')} className="nav-btn glow-underline">Challenges</button>
                <button onClick={() => handleNavigation('/solutions')} className="nav-btn glow-underline">Solutions</button>
                <button onClick={() => handleNavigation('/team')} className="nav-btn glow-underline">Team</button>
            </div>
        </header>
    );
};

export default Header;