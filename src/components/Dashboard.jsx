import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import solarBackground from '../assets/solar-background.jpg';
import pexels1 from '../assets/pexels-cristian-rojas-8853500.jpg';
import pexels2 from '../assets/pexels-cristian-rojas-8853511.jpg';
import pexels3 from '../assets/pexels-pixabay-371917.jpg';
import pexels4 from '../assets/pexels-tomfisk-9893727.jpg';
import pptFile from '../assets/Final ppt.pptx';
import './Dashboard.css';

// Import chart library and animation library
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import RemoteLottie from './RemoteLottie';
ChartJS.register(ArcElement, Tooltip, Legend);

// Animated SVG icons for floating background
const SolarSVG = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="12" fill="#ffd700" stroke="#ffb300" strokeWidth="3" />
    <g stroke="#ffd700" strokeWidth="2">
      <line x1="24" y1="2" x2="24" y2="10" />
      <line x1="24" y1="38" x2="24" y2="46" />
      <line x1="2" y1="24" x2="10" y2="24" />
      <line x1="38" y1="24" x2="46" y2="24" />
      <line x1="8" y1="8" x2="14" y2="14" />
      <line x1="40" y1="8" x2="34" y2="14" />
      <line x1="8" y1="40" x2="14" y2="34" />
      <line x1="40" y1="40" x2="34" y2="34" />
    </g>
  </svg>
);
const IoTSVG = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="10" fill="#00b4d8" stroke="#0077b6" strokeWidth="3" />
    <circle cx="24" cy="24" r="4" fill="#fff" />
    <g stroke="#00b4d8" strokeWidth="2">
      <path d="M24 4v6" />
      <path d="M24 38v6" />
      <path d="M4 24h6" />
      <path d="M38 24h6" />
    </g>
  </svg>
);
const AfricaSVG = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 10 Q20 5 30 10 Q40 15 50 10 Q55 20 50 30 Q45 40 50 50 Q40 55 30 50 Q20 45 10 50 Q5 40 10 30 Q15 20 10 10 Z" fill="#00a859" stroke="#007a43" strokeWidth="2" opacity="0.7" />
  </svg>
);

// Animated Counter component
const AnimatedCounter = ({ value, label, duration = 2000, start, onComplete }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startVal = 0;
    const end = value;
    if (startVal === end) return;
    let increment = end / (duration / 16);
    let raf;
    const step = () => {
      startVal += increment;
      if (startVal < end) {
        setCount(Math.floor(startVal));
        raf = requestAnimationFrame(step);
      } else {
        setCount(end);
        if (onComplete) onComplete();
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, duration, start, onComplete]);
  return (
    <div className="dashboard-counter">
      <span className="counter-value">{count.toLocaleString()}</span>
      <span className="counter-label">{label}</span>
    </div>
  );
};

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

const pieData = {
  labels: ['Solar', 'Wind', 'Hydro', 'Other'],
  datasets: [
    {
      label: 'Energy Mix',
      data: [65, 20, 10, 5],
      backgroundColor: [
        '#ffd700',
        '#00b4d8',
        '#00a859',
        '#8884d8',
      ],
      borderColor: '#fff',
      borderWidth: 2,
    },
  ],
};

const Dashboard = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHeaderMinimized, setIsHeaderMinimized] = useState(false);
    const slideshowRef = useRef(null);
    const heroLeftRef = useRef(null);
    const [heroLeftHeight, setHeroLeftHeight] = useState(0);

    useEffect(() => {
        if (heroLeftRef.current) {
            setHeroLeftHeight(heroLeftRef.current.offsetHeight);
        }
    }, []);

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

    // Floating SVG icons for visual appeal
    const floatingIcons = [
      { Comp: SolarSVG, className: 'floating-solar', style: { top: '12%', left: '8%' } },
      { Comp: IoTSVG, className: 'floating-iot', style: { top: '70%', left: '85%' } },
      { Comp: AfricaSVG, className: 'floating-africa', style: { top: '60%', left: '10%' } },
      { Comp: SolarSVG, className: 'floating-solar', style: { top: '30%', left: '80%' } },
      { Comp: IoTSVG, className: 'floating-iot', style: { top: '15%', left: '60%' } },
    ];

    return (
        <div className="dashboard">
            {/* Floating SVG icons */}
            {floatingIcons.map(({ Comp, className, style }, i) => (
              <div key={i} className={`floating-icon ${className}`} style={style}>
                <Comp />
              </div>
            ))}
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
            {/* New Hero Section Layout */}
            <section className="dashboard-hero">
              <div className="hero-left animated-hero-text" ref={heroLeftRef}>
                <h1 id="dashboard-title">GreenGrid Africa</h1>
                <p>
                   Green Grid Africa is an AI-powered solar energy management platform that embraces IoT to optimise solar consumption and distribution in off-grid and underserved communities.
                    It provides real-time monitoring, predictive analytics, and load optimization to ensure reliable, efficient, and sustainable power delivery.
                    By empowering local operators with smart dashboards and actionable insights, it reduces energy waste and boosts community trust in clean energy systems. 
                    Our mission is to accelerate access to affordable, intelligent solar infrastructure across Africa.
                </p>
                {/* Counters moved below hero section */}
              </div>
              <div className="hero-right">
                <div
                  className="slideshow-container parallax-slideshow"
                  ref={slideshowRef}
                  style={{ height: heroLeftHeight ? `${heroLeftHeight}px` : undefined }}
                >
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
            </section>
            {/* Counters now below hero */}
            <div className="dashboard-counters centered-counters">
              <AnimatedCounter value={120} label="Communities Powered" duration={2200} start={true} />
              <AnimatedCounter value={50000} label="Tons CO₂ Saved" duration={2200} start={true} />
              <AnimatedCounter value={350000} label="People Impacted" duration={2200} start={true} />
            </div>
            {/* Rest of dashboard sections */}
            <section className="mission-vision-section">
              <div className="mv-card mission">
                <h2>Our Mission</h2>
                <p>To accelerate access to affordable, intelligent solar infrastructure across Africa, empowering communities with sustainable, data-driven energy solutions.</p>
              </div>
              <div className="mv-card vision">
                <h2>Our Vision</h2>
                <p>To become Africa's leading platform for smart, clean energy management, fostering a future where every community thrives through innovation and sustainability.</p>
              </div>
            </section>
            <section className="dashboard-animations">
              <div className="animation-block">
                <RemoteLottie
                  url="https://assets2.lottiefiles.com/packages/lf20_2ks3pjua.json"
                  loop
                  className="lottie-people"
                />
                <h3>Empowering People</h3>
                <p>We put people at the heart of the energy revolution, connecting lives and powering dreams.</p>
              </div>
              <div className="animation-block">
                <RemoteLottie
                  url="https://assets2.lottiefiles.com/packages/lf20_4kx2q32n.json"
                  loop
                  className="lottie-solar"
                />
                <h3>Innovative Solar Solutions</h3>
                <p>Harnessing the sun with cutting-edge technology for a brighter, greener Africa.</p>
              </div>
            </section>
            <section className="dashboard-download">
              <h2>Download Our Presentation</h2>
              <p className="download-description">Get a detailed overview of our platform, technology, and impact. Click below to download our latest PowerPoint presentation and learn more about GreenGrid Africa's mission and solutions.</p>
              <a href={pptFile} download className="download-btn">Download PowerPoint</a>
            </section>
            <section className="dashboard-sponsors">
              <h2>Our Sponsors & Partnerships</h2>
              <p className="sponsors-description">We are currently seeking partnerships and sponsorships to accelerate our mission. If you are interested in supporting sustainable energy in Africa, please contact us!</p>
              <div className="sponsors-logos empty-sponsors">
                <span>No partnerships yet — your logo could be here!</span>
              </div>
            </section>
        </div>
    );
};

export default Dashboard;