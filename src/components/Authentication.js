import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Authentication.css';

const Authentication = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: ''
    });
    const navigate = useNavigate();
    const location = useLocation();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Implement actual authentication logic when backend is ready
        console.log('Form submitted:', formData);
        // For now, just redirect to dashboard
        navigate('/dashboard');
    };

    const toggleMode = () => {
        setIsSignIn(!isSignIn);
        setFormData({
            email: '',
            password: '',
            confirmPassword: '',
            name: ''
        });
    };

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className="auth-container">
            <button className="back-button" onClick={handleBack}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Back to Home
            </button>
            <div className="auth-box">
                <h2>{isSignIn ? 'Sign In' : 'Create Account'}</h2>
                <form onSubmit={handleSubmit} className="auth-form">
                    {!isSignIn && (
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter your full name"
                            />
                        </div>
                    )}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your password"
                        />
                    </div>
                    {!isSignIn && (
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                required
                                placeholder="Confirm your password"
                            />
                        </div>
                    )}
                    <button type="submit" className="auth-submit-btn">
                        {isSignIn ? 'Sign In' : 'Sign Up'}
                    </button>
                </form>
                <div className="auth-divider">
                    <span>or</span>
                </div>
                <button className="google-auth-btn">
                    <img src="https://www.google.com/favicon.ico" alt="Google" />
                    Continue with Google
                </button>
                <p className="auth-toggle">
                    {isSignIn ? "Don't have an account? " : "Already have an account? "}
                    <button onClick={toggleMode} className="toggle-btn">
                        {isSignIn ? 'Sign Up' : 'Sign In'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Authentication; 