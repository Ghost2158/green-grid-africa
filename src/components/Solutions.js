import React from 'react';
import './Solutions.css';

const Solutions = () => {
    return (
        <div className="solutions-page">
            <div className="content-sections">
                <section className="welcome-section">
                    <h1>Our Solutions</h1>
                    <p>Innovative approaches to address Africa's energy challenges.</p>
                </section>

                <section className="solutions-grid">
                    <div className="solution-item">
                        <h3>Smart Grid Technology</h3>
                        <p>Implementing advanced monitoring and control systems to optimize energy distribution and reduce losses.</p>
                        <ul>
                            <li>Real-time monitoring and control</li>
                            <li>Automated fault detection</li>
                            <li>Predictive maintenance systems</li>
                        </ul>
                    </div>
                    <div className="solution-item">
                        <h3>Renewable Energy Integration</h3>
                        <p>Harnessing solar, wind, and other renewable sources to provide clean, sustainable power.</p>
                        <ul>
                            <li>Solar mini-grids</li>
                            <li>Hybrid power systems</li>
                            <li>Energy storage solutions</li>
                        </ul>
                    </div>
                    <div className="solution-item">
                        <h3>Community Empowerment</h3>
                        <p>Training and supporting local communities to maintain and benefit from sustainable energy systems.</p>
                        <ul>
                            <li>Technical training programs</li>
                            <li>Local maintenance teams</li>
                            <li>Community ownership models</li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Solutions; 