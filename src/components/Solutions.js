import React from 'react';
import './Solutions.css';

const Solutions = () => {
    return (
        <div className="solutions-page">
            <div className="content-sections">
                <section className="welcome-section">
                    <h1>Our Solutions</h1>
                    <p style={{ color: 'white', textShadow: 'none' }}>Innovative approaches to address Africa's energy challenges through data-driven decisions and sustainable practices.</p>
                </section>

                <section className="solutions-grid">
                    <div className="solution-item">
                        <h3>Data-Driven Decisions</h3>
                        <p>Empowering stakeholders with actionable insights for better energy management.</p>
                        <ul>
                            <li>Real-time energy demand analytics</li>
                            <li>Predictive maintenance insights</li>
                            <li>Customized reporting for NGOs and local leaders</li>
                            <li>Performance optimization recommendations</li>
                        </ul>
                    </div>
                    <div className="solution-item">
                        <h3>Sustainability</h3>
                        <p>Supporting global sustainability goals through clean energy initiatives.</p>
                        <ul>
                            <li>Alignment with UN SDG 7 (Affordable and Clean Energy)</li>
                            <li>Reduced carbon footprint through renewable energy</li>
                            <li>Community-focused sustainable practices</li>
                            <li>Environmental impact monitoring</li>
                        </ul>
                    </div>
                    <div className="solution-item">
                        <h3>Scalability</h3>
                        <p>Flexible and adaptable solutions for growing energy needs.</p>
                        <ul>
                            <li>Modular design for easy replication</li>
                            <li>Cloud-based IoT and AI architecture</li>
                            <li>Integration with mobile payments and alerts</li>
                            <li>Open-source tools for community development</li>
                        </ul>
                    </div>
                    <div className="solution-item">
                        <h3>Global Goals Alignment</h3>
                        <p>Contributing to United Nations Sustainable Development Goals.</p>
                        <ul>
                            <li>SDG 7: Affordable and Clean Energy</li>
                            <li>SDG 9: Industry, Innovation and Infrastructure</li>
                            <li>SDG 11: Sustainable Cities and Communities</li>
                            <li>Cross-sector collaboration opportunities</li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Solutions; 