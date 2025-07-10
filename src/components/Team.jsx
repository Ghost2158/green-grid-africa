import React from 'react';
import './Team.css';
import michelleImage from '../assets/MICHELLE MWANGI.png';
import benedictImage from '../assets/BENEDICT MUTUA.png';
import sheldonImage from '../assets/JAHONGA SHELDON.png';
import brianImage from '../assets/BRIAN KIPKEMBOI.png';
import joyImage from '../assets/JOY BIWOTT.png';
import johnImage from '../assets/JOHN NYONGESA.png';
import siahImage from '../assets/SIAH JESSICAH MUTHONI.jpeg';

// Animated SVG background shape
const TeamBG = () => (
  <svg className="team-bg-svg" width="100%" height="180" viewBox="0 0 1440 180" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    <defs>
      <linearGradient id="teamGradient" x1="0" y1="0" x2="1440" y2="180" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00a859" />
        <stop offset="0.5" stopColor="#ffd700" />
        <stop offset="1" stopColor="#0077b6" />
      </linearGradient>
    </defs>
    <path d="M0,80 Q360,180 720,80 T1440,80 V180 H0 Z" fill="url(#teamGradient)">
      <animate attributeName="d" dur="7s" repeatCount="indefinite"
        values="M0,80 Q360,180 720,80 T1440,80 V180 H0 Z;
                M0,120 Q360,0 720,120 T1440,120 V180 H0 Z;
                M0,80 Q360,180 720,80 T1440,80 V180 H0 Z" />
    </path>
  </svg>
);

const Team = () => {
    const teamMembers = [
        {
            name: "Michelle Mwangi",
            role: "Project Lead &Backend Developer",
            image: michelleImage,
            description: "Leading the project with expertise in backend development and project management.",
            linkedin: "https://www.linkedin.com/in/michelle-mwangi-0b2a8626b"
        },
        {
            name: "Benedict Mutua Mutuku",
            role: "IoT Engineer",
            image: benedictImage,
            description: "Specializing in IoT solutions and hardware integration for smart energy systems.",
            linkedin: "http://www.linkedin.com/in/benedict-mutua-451a68367"
        },
        {
            name: "Sheldon Jahonga",
            role: "UI/UX and Frontend Development Specialist",
            image: sheldonImage,
            description: "Creating intuitive and engaging user interfaces for our energy management platform.",
            linkedin: "https://www.linkedin.com/in/sheldon-jahonga-06b16327a"
        },
        {
            name: "Brian Kipkemboi",
            role: "AI/ML Specialist",
            image: brianImage,
            description: "Developing advanced AI and machine learning solutions for energy optimization.",
            linkedin: "https://www.linkedin.com/in/brian-kipkemboi-209a0636a"
        },
        {
            name: "Joy Biwott",
            role: "Fiware Integrator",
            image: joyImage,
            description: "Expert in Fiware integration and smart city solutions.",
            linkedin: "https://ke.linkedin.com/in/joy-biwott-25040436a"
        },
        {
            name: "John Nyongesa",
            role: "Data Analyst",
            image: johnImage,
            description: "Analyzing energy data to drive insights and optimization strategies.",
            linkedin: "https://www.linkedin.com/in/john-nyongesa-b3a523369"
        },
        {
            name: "Siah Jessicah Muthoni",
            role: "Social Media Manager",
            image: siahImage,
            description: "Managing our social media presence and digital communications to engage with our community.",
            linkedin: "https://www.linkedin.com/in/jesca-muthoni-b6a16a36b"
        }
    ];

    return (
        <div className="team-page">
            <TeamBG />
            <div className="team-hero fade-in">
                <h1 id="team-title">Our Team</h1>
                <p>Meet the passionate individuals driving sustainable energy solutions across Africa.<br/>We are innovators, engineers, and dreamers united by a common goal.</p>
            </div>

            <div className="team-grid">
                {teamMembers.map((member, index) => (
                    <div key={index} className="team-card fade-in" style={{ animationDelay: `${0.1 + index * 0.1}s` }}>
                        <div className="team-card-image">
                            <img src={member.image} alt={member.name} />
                        </div>
                        <div className="team-card-content">
                            <h3>{member.name}</h3>
                            <h4>{member.role}</h4>
                            <p>{member.description}</p>
                            <a href={member.linkedin} className="linkedin-link" target="_blank" rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                </svg>
                                Connect on LinkedIn
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Team;