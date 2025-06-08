import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import solarBackground from '../assets/solar-background.jpg';
import image1 from '../assets/pexels-pixabay-371917.jpg';
import image2 from '../assets/pexels-cristian-rojas-8853511.jpg';
import image3 from '../assets/pexels-tomfisk-9893727.jpg';
import image4 from '../assets/pexels-cristian-rojas-8853500.jpg';

const Dashboard = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        { image: solarBackground, title: "Welcome to GreenGrid Africa" },
        { image: image1, title: "Sustainable Energy Solutions" },
        { image: image2, title: "Powering African Communities" },
        { image: image3, title: "Innovative Technology" },
        { image: image4, title: "Building a Greener Future" }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div className="dashboard">
            <div className="background-overlay"></div>
            <div className="welcome-section">
                <div className="slideshow-container">
                    <div className="slideshow">
                        {slides.map((slide, index) => (
                            <div
                                key={index}
                                className={`slide ${index === currentSlide ? 'active' : ''}`}
                                style={{ backgroundImage: `url(${slide.image})` }}
                            >
                                <div className="slide-content">
                                    <h1>{slide.title}</h1>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="slideshow-btn prev" onClick={prevSlide}>❮</button>
                    <button className="slideshow-btn next" onClick={nextSlide}>❯</button>
                    <div className="slideshow-dots">
                        {slides.map((_, index) => (
                            <span
                                key={index}
                                className={`dot ${index === currentSlide ? 'active' : ''}`}
                                onClick={() => setCurrentSlide(index)}
                            />
                        ))}
                    </div>
                </div>
                <p>Empowering African communities through sustainable energy solutions</p>
                <div className="welcome-buttons">
                    <button className="welcome-btn google-btn primary-btn">
                        <span className="google-icon">G</span>
                        Get Started
                    </button>
                    <button className="welcome-btn google-btn secondary-btn">
                        <span className="google-icon">L</span>
                        Learn More
                    </button>
                </div>
            </div>

            <div className="content-sections">
                <div id="challenges" className="problem-section">
                    <h2 className="section-title">The Challenge</h2>
                    <div className="section-content">
                        <div className="challenge-card">
                            <h3>Energy Poverty</h3>
                            <p>Over 600 million Africans live without reliable electricity, trapped in a cycle of energy poverty that limits their potential for growth and development.</p>
                        </div>
                        <div className="challenge-card">
                            <h3>Infrastructure Barriers</h3>
                            <p>Remote communities face significant challenges in accessing traditional power grids, with high costs and complex logistics making conventional solutions impractical.</p>
                        </div>
                        <div className="challenge-card">
                            <h3>Economic Impact</h3>
                            <p>Without reliable power, businesses struggle to operate, students can't study after dark, and healthcare facilities can't provide essential services, creating a ripple effect of economic stagnation.</p>
                        </div>
                        <div className="challenge-card">
                            <h3>Environmental Concerns</h3>
                            <p>Many communities rely on harmful alternatives like kerosene lamps and diesel generators, contributing to both environmental degradation and health risks.</p>
                        </div>
                    </div>
                </div>

                <div id="solutions" className="solution-section">
                    <h2 className="section-title">Our Solution</h2>
                    <div className="section-content">
                        <div className="solution-card">
                            <h3>Revolutionary Technology</h3>
                            <p>As GreenGrid Africa, we're pioneering AI-powered microgrid systems that adapt to community needs in real-time, ensuring reliable and efficient energy distribution.</p>
                        </div>
                        <div className="solution-card">
                            <h3>Community Empowerment</h3>
                            <p>We're not just providing power – we're building sustainable energy ecosystems where communities take ownership of their energy future through our innovative management platforms.</p>
                        </div>
                        <div className="solution-card">
                            <h3>Smart Integration</h3>
                            <p>Our cutting-edge technology seamlessly integrates renewable energy sources, creating resilient power networks that can withstand environmental challenges and growing demand.</p>
                        </div>
                        <div className="solution-card">
                            <h3>Economic Transformation</h3>
                            <p>By bringing reliable energy to underserved communities, we're unlocking new economic opportunities, enabling businesses to thrive, and creating a foundation for sustainable growth.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
