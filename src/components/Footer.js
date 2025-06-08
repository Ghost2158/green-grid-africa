import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>GreenGrid Africa</h4>
                    <p>Empowering African communities through sustainable energy solutions</p>
                </div>
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#solutions">Solutions</a></li>
                        <li><a href="#impact">Impact</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Connect With Us</h4>
                    <div className="social-links">
                        <a href="#" className="social-link">Twitter</a>
                        <a href="#" className="social-link">LinkedIn</a>
                        <a href="#" className="social-link">Facebook</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>Copyright © 2025 GreenGrid Africa. All rights Reserved</p>
            </div>
        </footer>
    );
};

export default Footer;