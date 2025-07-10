import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo.jsx';
import './Header.css';

const scrollToTitle = (id) => {
    setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            // fallback to top if not found
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, 100); // slight delay to ensure DOM is updated
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
        <header className="header">
            <Link to="/" className="header-title" onClick={() => handleNavigation('/')}>
                <Logo />
            </Link>
            <div className="nav-buttons">
                <button onClick={() => handleNavigation('/')} className="nav-btn">Dashboard</button>
                <button onClick={() => handleNavigation('/challenges')} className="nav-btn">Challenges</button>
                <button onClick={() => handleNavigation('/solutions')} className="nav-btn">Solutions</button>
                <button onClick={() => handleNavigation('/team')} className="nav-btn">Team</button>
            </div>
        </header>
    );
};

export default Header;