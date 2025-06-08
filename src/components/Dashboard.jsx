import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHeaderMinimized, setIsHeaderMinimized] = useState(false);
    const slideshowRef = useRef(null);
    const slides = [
        {
            image: '/images/slide1.jpg',
            title: 'Smart Energy Management',
            description: 'Optimize your energy consumption with our AI-powered platform'
        },
        {
            image: '/images/slide2.jpg',
            title: 'Grid Optimization',
            description: 'Enhance grid performance with advanced analytics and real-time monitoring'
        },
        {
            image: '/images/slide3.jpg',
            title: 'Renewable Integration',
            description: 'Seamlessly integrate renewable energy sources into your existing infrastructure'
        }
    ];

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsHeaderMinimized(scrollPosition > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [slides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div className="dashboard">
            <div className="energy-container">
                <div className="energy-pulse"></div>
                <div className="energy-pulse"></div>
                <div className="energy-pulse"></div>
            </div>
            <div className="gradient-overlay"></div>
            <div className="particles">
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
            </div>
            <div className="electric-lines">
                <div className="electric-line"></div>
                <div className="electric-line"></div>
                <div className="electric-line"></div>
                <div className="electric-line"></div>
            </div>
            <div className="welcome-section">
                <h1>Welcome to GreenGrid</h1>
                <p>
                    Transform your energy management with our cutting-edge platform.
                    Optimize consumption, reduce costs, and embrace sustainability.
                </p>
                <Link to="/contact" className="get-started-button">
                    Get Started
                </Link>
            </div>

            <div className="content-sections">
                <div className="slideshow-container" ref={slideshowRef}>
                    <div 
                        className="slideshow" 
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
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
                        <button onClick={prevSlide}>←</button>
                        <button onClick={nextSlide}>→</button>
                    </div>
                </div>

                <div id="challenges">
                    <h2>Challenges</h2>
                    <div className="challenge-item">
                        <h3>Energy Management</h3>
                        <p>Managing energy consumption and distribution efficiently is a complex task that requires real-time monitoring and optimization.</p>
                        <ul>
                            <li>Peak demand management during high-usage periods</li>
                            <li>Integration of renewable energy sources</li>
                            <li>Grid stability and reliability concerns</li>
                            <li>Energy storage optimization</li>
                        </ul>
                        <div className="impact">
                            <h4>Impact on Business</h4>
                            <p>Inefficient energy management can lead to increased operational costs, reduced reliability, and missed opportunities for sustainability.</p>
                        </div>
                    </div>
                    <div className="challenge-item">
                        <h3>Grid Optimization</h3>
                        <p>Modern power grids require sophisticated optimization to handle increasing complexity and demand.</p>
                        <ul>
                            <li>Load balancing across the network</li>
                            <li>Voltage regulation and power quality</li>
                            <li>Grid congestion management</li>
                            <li>Integration of distributed energy resources</li>
                        </ul>
                        <div className="impact">
                            <h4>Impact on Business</h4>
                            <p>Suboptimal grid performance can result in service disruptions, increased maintenance costs, and reduced customer satisfaction.</p>
                        </div>
                    </div>
                    <div className="challenge-item">
                        <h3>Renewable Integration</h3>
                        <p>The transition to renewable energy sources presents unique challenges for grid operators.</p>
                        <ul>
                            <li>Intermittent power generation</li>
                            <li>Weather-dependent production</li>
                            <li>Grid stability with variable inputs</li>
                            <li>Storage and distribution challenges</li>
                        </ul>
                        <div className="impact">
                            <h4>Impact on Business</h4>
                            <p>Poor renewable integration can lead to wasted energy, reduced efficiency, and missed sustainability goals.</p>
                        </div>
                    </div>
                </div>

                <div id="solutions">
                    <h2>Solutions</h2>
                    <div className="solution-item">
                        <h3>Smart Energy Management</h3>
                        <p>Our AI-powered platform provides comprehensive energy management solutions.</p>
                        <ul>
                            <li>Real-time consumption monitoring</li>
                            <li>Predictive analytics for demand forecasting</li>
                            <li>Automated load balancing</li>
                            <li>Energy efficiency optimization</li>
                        </ul>
                        <div className="benefits">
                            <h4>Key Benefits</h4>
                            <p>Reduce energy costs by up to 30%, improve operational efficiency, and achieve sustainability goals.</p>
                        </div>
                    </div>
                    <div className="solution-item">
                        <h3>Advanced Grid Optimization</h3>
                        <p>State-of-the-art grid optimization tools for modern power networks.</p>
                        <ul>
                            <li>AI-driven load forecasting</li>
                            <li>Dynamic voltage control</li>
                            <li>Real-time grid analytics</li>
                            <li>Automated fault detection</li>
                        </ul>
                        <div className="benefits">
                            <h4>Key Benefits</h4>
                            <p>Enhance grid reliability, reduce downtime, and optimize maintenance schedules.</p>
                        </div>
                    </div>
                    <div className="solution-item">
                        <h3>Renewable Energy Integration</h3>
                        <p>Seamless integration of renewable energy sources into existing grids.</p>
                        <ul>
                            <li>Weather-based generation forecasting</li>
                            <li>Smart storage management</li>
                            <li>Grid stability optimization</li>
                            <li>Renewable portfolio management</li>
                        </ul>
                        <div className="benefits">
                            <h4>Key Benefits</h4>
                            <p>Maximize renewable energy utilization, reduce carbon footprint, and improve grid resilience.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 