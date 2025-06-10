import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();

    const slides = [
        {
            image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            title: 'Sustainable Energy Solutions',
            description: 'Discover innovative ways to harness renewable energy for a greener future.'
        },
        {
            image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            title: 'Smart Grid Technology',
            description: 'Experience the power of intelligent energy distribution systems.'
        },
        {
            image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            title: 'Community Impact',
            description: 'See how our solutions are transforming communities across Africa.'
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const handleGetStarted = () => {
        navigate('/auth');
    };

    return (
        <div className="dashboard">
            <div className="content-sections">
                <section className="welcome-section">
                    <h1>Welcome to GreenGrid Africa</h1>
                    <p>Empowering communities through sustainable energy solutions and smart grid technology.</p>
                    <p>Are you A Solar Mini-Grid Operator or A solar power  Consumer ? Press Get Started!! </p>
                    <button className="get-started-button" onClick={handleGetStarted}>
                        Get Started
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </section>

                <div className="slideshow-container">
                    <div className="slideshow" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                        {slides.map((slide, index) => (
                            <div key={index} className="slide">
                                <img src={slide.image} alt={slide.title} />
                                <div className="slide-content">
                                    <h3>{slide.title}</h3>
                                    <p>{slide.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="slideshow-controls">
                        <button onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}>
                            ←
                        </button>
                        <button onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}>
                            →
                        </button>
                    </div>
                </div>

                <section id="challenges">
                    <h2>Challenges We Address</h2>
                    <div className="challenge-item">
                        <h3>Energy Access</h3>
                        <p>Millions of people in Africa lack reliable access to electricity, hindering economic development and quality of life.</p>
                    </div>
                    <div className="challenge-item">
                        <h3>Grid Reliability</h3>
                        <p>Existing power grids often suffer from inefficiencies, leading to frequent outages and energy losses.</p>
                    </div>
                    <div className="challenge-item">
                        <h3>Sustainability</h3>
                        <p>Traditional energy sources contribute to environmental degradation and climate change.</p>
                    </div>
                </section>

                <section id="solutions">
                    <h2>Our Solutions</h2>
                    <div className="solution-item">
                        <h3>Smart Grid Technology</h3>
                        <p>Implementing advanced monitoring and control systems to optimize energy distribution and reduce losses.</p>
                    </div>
                    <div className="solution-item">
                        <h3>Renewable Energy Integration</h3>
                        <p>Harnessing solar, wind, and other renewable sources to provide clean, sustainable power.</p>
                    </div>
                    <div className="solution-item">
                        <h3>Community Empowerment</h3>
                        <p>Training and supporting local communities to maintain and benefit from sustainable energy systems.</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
