import React from 'react';
import './Solutions.css';

// SVG icons for each solution
const DataIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="6" y="10" width="28" height="20" rx="6" fill="#e3f6fc" stroke="#0077b6" strokeWidth="3"/><circle cx="20" cy="20" r="6" fill="#ffd700" /></svg>
);
const SustainabilityIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><ellipse cx="20" cy="20" rx="16" ry="12" fill="#e0ffe0" stroke="#00a859" strokeWidth="3"/><path d="M20 28v-8M20 20l6-6M20 20l-6-6" stroke="#4CAF50" strokeWidth="2"/></svg>
);
const ScaleIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="8" y="8" width="24" height="24" rx="6" fill="#fffbe0" stroke="#ffd700" strokeWidth="3"/><path d="M20 12v16M12 20h16" stroke="#00a859" strokeWidth="2"/></svg>
);
const GlobalIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" stroke="#00b4d8" strokeWidth="3" fill="#e3f6fc" /><path d="M10 20h20M20 10v20" stroke="#0077b6" strokeWidth="3"/></svg>
);

const Solutions = () => {
    return (
        <div className="solutions-page">
            <div className="content-sections">
                <section className="welcome-section fade-in">
                    <h1 id="solutions-title">Our Solutions</h1>
                    <p>Innovative approaches to address Africa's energy challenges through data-driven decisions and sustainable practices. <br/> We combine technology, community, and vision for a brighter future.</p>
                </section>
                <section className="solutions-grid">
                    <div className="solution-item fade-in" style={{ animationDelay: '0.1s' }}>
                        <DataIcon />
                        <h3>Data-Driven Decisions</h3>
                        <p>Empowering stakeholders with actionable insights for better energy management.</p>
                        <ul>
                            <li>Real-time energy demand analytics</li>
                            <li>Predictive maintenance insights</li>
                            <li>Customized reporting for NGOs and local leaders</li>
                            <li>Performance optimization recommendations</li>
                        </ul>
                    </div>
                    <div className="solution-item fade-in" style={{ animationDelay: '0.3s' }}>
                        <SustainabilityIcon />
                        <h3>Sustainability</h3>
                        <p>Supporting global sustainability goals through clean energy initiatives.</p>
                        <ul>
                            <li>Alignment with UN SDG 7 (Affordable and Clean Energy)</li>
                            <li>Reduced carbon footprint through renewable energy</li>
                            <li>Community-focused sustainable practices</li>
                            <li>Environmental impact monitoring</li>
                        </ul>
                    </div>
                    <div className="solution-item fade-in" style={{ animationDelay: '0.5s' }}>
                        <ScaleIcon />
                        <h3>Scalability</h3>
                        <p>Flexible and adaptable solutions for growing energy needs.</p>
                        <ul>
                            <li>Modular design for easy replication</li>
                            <li>Cloud-based IoT and AI architecture</li>
                            <li>Integration with mobile payments and alerts</li>
                            <li>Open-source tools for community development</li>
                        </ul>
                    </div>
                    <div className="solution-item fade-in" style={{ animationDelay: '0.7s' }}>
                        <GlobalIcon />
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