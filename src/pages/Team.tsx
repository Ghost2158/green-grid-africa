import { useEffect, useState } from 'react';
import drLawrence from '@/assets/Dr Lawrence Nderu.png';
import michelleMwangi from '@/assets/MICHELLE MWANGI.png';
import benedictMutua from '@/assets/BENEDICT MUTUA.png';
import jahongaSheldon from '@/assets/JAHONGA SHELDON.png';
import brianKipkemboi from '@/assets/BRIAN KIPKEMBOI.png';
import joyBiwott from '@/assets/JOY BIWOTT.png';
import johnNyongesa from '@/assets/JOHN NYONGESA.png';
import siahJessicah from '@/assets/SIAH JESSICAH MUTHONI.jpeg';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Linkedin, Users } from 'lucide-react';

const Team = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const teamMembers = [
    {
      name: "Dr. Lawrence Nderu",
      role: "Principal Investigator",
      description: "Providing visionary leadership, strategic direction, and academic expertise to guide the GreengridAfrica project toward impactful research and innovation in sustainable energy across Africa.",
      image: drLawrence,
      linkedin: "https://www.linkedin.com/in/dr-lawrence-nderu/"
    },
    {
      name: "Michelle Mwangi",
      role: "Project Lead & Backend Developer",
      description: "Leading the project with expertise in backend development and project management.",
      image: michelleMwangi,
      linkedin: "https://www.linkedin.com/in/michelle-mwangi-0b2a8626b/"
    },
    {
      name: "Benedict Mutua Mutuku",
      role: "IoT Engineer",
      description: "Specializing in IoT solutions and hardware integration for smart energy systems.",
      image: benedictMutua,
      linkedin: "https://www.linkedin.com/in/benedict-mutua-451a68367/"
    },
    {
      name: "Sheldon Jahonga",
      role: "UI/UX and Frontend Development Specialist",
      description: "Creating intuitive and engaging user interfaces for our energy management platform.",
      image: jahongaSheldon,
      linkedin: "https://www.linkedin.com/in/sheldon-jahonga-06b16327a/"
    },
    {
      name: "Brian Kipkemboi",
      role: "AI/ML Specialist",
      description: "Developing advanced AI and machine learning solutions for energy optimization.",
      image: brianKipkemboi,
      linkedin: "https://www.linkedin.com/in/brian-kipkemboi-209a0636a/"
    },
    {
      name: "Joy Biwott",
      role: "Backend Developer ",
      description: "Designs and implements robust backend systems, ensuring reliable data management and seamless integration for smart energy solutions.",
      image: joyBiwott,
      linkedin: "https://www.linkedin.com/in/joy-biwott-123456789/"
    },
    {
      name: "John Nyongesa",
      role: "Data Analyst",
      description: "Analyzing energy data to drive insights and optimization strategies.",
      image: johnNyongesa,
      linkedin: "https://www.linkedin.com/in/john-nyongesa-b3a523369/"
    },
    {
      name: "Siah Jessicah Muthoni",
      role: "Social Media Manager",
      description: "Managing our social media presence and digital communications to engage with our community.",
      image: siahJessicah,
      linkedin: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {/* Header with Icon */}
              <div className="flex items-center justify-center space-x-4 mb-8">
                <div className="p-4 bg-gradient-to-br from-grid-yellow to-grid-green rounded-2xl">
                  <Users className="w-8 h-8 text-black" />
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold">
                  <span className="text-white">Our </span>
                  <span className="text-grid-yellow">Team</span>
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-grid-yellow to-grid-green mx-auto rounded-full" />
              </div>
              
              <div className="max-w-4xl mx-auto space-y-4">
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                  Meet the passionate individuals driving sustainable energy solutions across Africa.
                </p>
                <p className="text-lg text-gray-400 leading-relaxed">
                  We are innovators, engineers, and dreamers united by a common goal.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={member.name}
                  className={`glass rounded-3xl p-8 hover:shadow-elegant transition-all duration-700 group animate-fade-in-up`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Profile Image */}
                  <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-grid-yellow/20 to-grid-green/20 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-full border-4 border-grid-yellow shadow-lg"
                    />
                  </div>
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-grid-yellow/10 to-grid-green/10 scale-0 group-hover:scale-110 transition-transform duration-500" />
                  </div>

                  {/* Member Info */}
                  <div className="text-center space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-grid-yellow transition-colors duration-300">
                        {member.name}
                      </h3>
                      <p className="text-grid-green font-medium text-sm mt-1">
                        {member.role}
                      </p>
                    </div>
                    
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {member.description}
                    </p>

                    {/* LinkedIn Button */}
                    <div className="pt-4">
                      <a
                        href={member.linkedin}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-grid-blue-light hover:bg-grid-yellow hover:text-black text-white rounded-xl transition-all duration-300 group-hover:scale-105"
                      >
                        <Linkedin className="w-4 h-4" />
                        <span className="text-sm font-medium">Connect on LinkedIn</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass rounded-3xl p-12 text-center space-y-6 hover:shadow-elegant transition-all duration-500">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Join Our <span className="text-grid-yellow">Mission</span>
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
                Are you passionate about sustainable energy and making a difference in Africa? We're always looking for talented individuals to join our growing team.
              </p>
              <div className="pt-4">
                <button className="px-8 py-4 bg-gradient-to-r from-grid-yellow to-grid-green text-black font-semibold rounded-2xl hover:shadow-glow transition-all duration-300 hover:scale-105">
                  Get In Touch
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Team Stats */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-grid-yellow">7</div>
                <div className="text-gray-400">Team Members</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-grid-green">5+</div>
                <div className="text-gray-400">Specializations</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-grid-yellow">100%</div>
                <div className="text-gray-400">Dedicated</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-grid-green">∞</div>
                <div className="text-gray-400">Impact Potential</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Team;