import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import solarBackground from '../assets/solar-background.jpg';
import pexels1 from '../assets/pexels-cristian-rojas-8853500.jpg';
import pexels2 from '../assets/pexels-cristian-rojas-8853511.jpg';
import pexels3 from '../assets/pexels-pixabay-371917.jpg';
import pexels4 from '../assets/pexels-tomfisk-9893727.jpg';
import './Dashboard.css';

const slides = [
    {
        image: solarBackground,
        title: 'Solar Power for Africa',
        description: 'Harnessing the sun to power communities and drive sustainable growth.'
    },
    {
        image: pexels1,
        title: 'Modern Solar Mini Grids',
        description: 'Mini grids bringing reliable power to remote communities.'
    },
    {
        image: pexels2,
        title: 'Clean Energy for All',
        description: 'Expanding access to clean, reliable energy across the continent.'
    },
    {
        image: pexels3,
        title: 'Sustainable Landscapes',
        description: 'Protecting the environment while meeting energy needs.'
    },
    {
        image: pexels4,
        title: 'Solar Farms in Action',
        description: 'Large-scale solar farms transforming the energy sector.'
    },
    {
        image: pexels1,
        title: 'Village Electrification',
        description: 'Solar mini grids lighting up rural villages and schools.'
    },
    {
        image: pexels2,
        title: 'Off-grid Innovation',
        description: 'Innovative off-grid solar solutions for remote areas.'
    },
    {
        image: pexels3,
        title: 'Nature and Technology',
        description: 'Blending renewable energy with Africa\'s natural beauty.'
    },
    {
        image: pexels4,
        title: 'Future of Energy',
        description: 'A glimpse into the future of sustainable energy in Africa.'
    },
    {
        image: solarBackground,
        title: 'Empowering Communities',
        description: 'Solar energy empowering local communities and businesses.'
    },
    {
        image: pexels2,
        title: 'Solar Rooftop Solutions',
        description: 'Urban and rural rooftops equipped with efficient solar panels.'
    },
    {
        image: pexels3,
        title: 'Sunset Over Solar Fields',
        description: 'A beautiful sunset illuminating vast solar fields.'
    }
];

const AUTO_ADVANCE_INTERVAL = 5000; // 5 seconds
const LAST_SLIDE_PAUSE = 2000; // 2 seconds pause on last slide before reset

const Dashboard = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHeaderMinimized, setIsHeaderMinimized] = useState(false);
    const slideshowRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsHeaderMinimized(scrollPosition > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        let interval;
        if (currentSlide < slides.length - 1) {
            interval = setInterval(() => {
                setCurrentSlide((prev) => prev + 1);
            }, AUTO_ADVANCE_INTERVAL);
        } else {
            interval = setInterval(() => {
                setCurrentSlide(0);
            }, LAST_SLIDE_PAUSE);
        }
        return () => clearInterval(interval);
    }, [currentSlide]);

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
                <h1 id="dashboard-title">GreenGrid Africa</h1>
                <p>
                   Green Grid Africa is an AI-powered solar energy management platform that embraces IoT to optimise solar consumption and distribution in off-grid and underserved communities.
                    It provides real-time monitoring, predictive analytics, and load optimization to ensure reliable, efficient, and sustainable power delivery.
                    By empowering local operators with smart dashboards and actionable insights, it reduces energy waste and boosts community trust in clean energy systems. 
                    Our mission is to accelerate access to affordable, intelligent solar infrastructure across Africa.
                </p>
            </div>

            <div className="content-sections">
                <div className="slideshow-container" ref={slideshowRef}>
                    <div 
                        className="slideshow" 
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {slides.map((slide, index) => (
                            <div key={index} className="slide">
                                <img src={slide.image} alt={slide.title || 'Slide'} />
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
            </div>
        </div>
    );
};

export default Dashboard;