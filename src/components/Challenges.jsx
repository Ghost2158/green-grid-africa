import React from 'react';
import './Challenges.css';

// SVG icons for each challenge
const AccessIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" stroke="#ffd700" strokeWidth="3" fill="#fffbe0" /><path d="M10 20h20M20 10v20" stroke="#00a859" strokeWidth="3"/></svg>
);
const GridIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="5" y="5" width="30" height="30" rx="6" fill="#e3f6fc" stroke="#0077b6" strokeWidth="3"/><path d="M10 20h20M20 10v20" stroke="#00b4d8" strokeWidth="3"/></svg>
);
const SustainabilityIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><ellipse cx="20" cy="20" rx="16" ry="12" fill="#e0ffe0" stroke="#00a859" strokeWidth="3"/><path d="M20 28v-8M20 20l6-6M20 20l-6-6" stroke="#4CAF50" strokeWidth="2"/></svg>
);

const Challenges = () => {
    return (
        <div className="challenges-page">
            <div className="content-sections">
                <section className="welcome-section fade-in">
                    <h1 id="challenges-title">Challenges We Address</h1>
                    <p>Understanding the key challenges in sustainable energy access across Africa. <br/> We tackle barriers with innovation, technology, and community focus.</p>
                </section>
                <section className="challenges-grid">
                    <div className="challenge-item fade-in" style={{ animationDelay: '0.1s' }}>
                        <AccessIcon />
                        <h3>Energy Access</h3>
                        <p>Millions of people in Africa lack reliable access to electricity, hindering economic development and quality of life.</p>
                        <ul>
                            <li>Limited grid infrastructure in rural areas</li>
                            <li>High costs of energy access</li>
                            <li>Inconsistent power supply</li>
                        </ul>
                    </div>
                    <div className="challenge-item fade-in" style={{ animationDelay: '0.3s' }}>
                        <GridIcon />
                        <h3>Grid Reliability</h3>
                        <p>Existing power grids often suffer from inefficiencies, leading to frequent outages and energy losses.</p>
                        <ul>
                            <li>Ageing infrastructure</li>
                            <li>Technical losses in transmission</li>
                            <li>Inadequate maintenance systems</li>
                        </ul>
                    </div>
                    <div className="challenge-item fade-in" style={{ animationDelay: '0.5s' }}>
                        <SustainabilityIcon />
                        <h3>Sustainability</h3>
                        <p>Traditional energy sources contribute to environmental degradation and climate change.</p>
                        <ul>
                            <li>High carbon emissions</li>
                            <li>Environmental impact of fossil fuels</li>
                            <li>Limited renewable energy integration</li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Challenges;