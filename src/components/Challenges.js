import React from 'react';
import './Challenges.css';

const Challenges = () => {
    return (
        <div className="challenges-page">
            <div className="content-sections">
                <section className="welcome-section">
                    <h1>Challenges We Address</h1>
                    <p style={{ color: 'white', textShadow: 'none' }}>Understanding the key challenges in sustainable energy access across Africa.</p>
                </section>

                <section className="challenges-grid">
                    <div className="challenge-item">
                        <h3>Energy Access</h3>
                        <p>Millions of people in Africa lack reliable access to electricity, hindering economic development and quality of life.</p>
                        <ul>
                            <li>Limited grid infrastructure in rural areas</li>
                            <li>High costs of energy access</li>
                            <li>Inconsistent power supply</li>
                        </ul>
                    </div>
                    <div className="challenge-item">
                        <h3>Grid Reliability</h3>
                        <p>Existing power grids often suffer from inefficiencies, leading to frequent outages and energy losses.</p>
                        <ul>
                            <li>Ageing infrastructure</li>
                            <li>Technical losses in transmission</li>
                            <li>Inadequate maintenance systems</li>
                        </ul>
                    </div>
                    <div className="challenge-item">
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