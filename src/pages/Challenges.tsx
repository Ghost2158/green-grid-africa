import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Plus, Grid, Leaf } from 'lucide-react';

const Challenges = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const challenges = [
    {
      icon: Plus,
      title: "Energy Access",
      description: "Millions of people in Africa lack reliable access to electricity, hindering economic development and quality of life.",
      points: [
        "Limited grid infrastructure in rural areas",
        "High costs of energy access",
        "Inconsistent power supply"
      ],
      color: "grid-yellow"
    },
    {
      icon: Grid,
      title: "Grid Reliability",
      description: "Existing power grids often suffer from inefficiencies, leading to frequent outages and energy losses.",
      points: [
        "Ageing infrastructure",
        "Technical losses in transmission",
        "Inadequate maintenance systems"
      ],
      color: "grid-blue-light"
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description: "Traditional energy sources contribute to environmental degradation and climate change.",
      points: [
        "High carbon emissions",
        "Environmental impact of fossil fuels",
        "Limited renewable energy integration"
      ],
      color: "grid-green"
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
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold">
                  <span className="text-grid-yellow">Challenges</span>
                  <span className="text-white"> We Address</span>
                </h1>
                <div className="w-32 h-1 bg-gradient-to-r from-grid-yellow to-grid-green mx-auto rounded-full" />
              </div>
              
              <div className="max-w-4xl mx-auto space-y-4">
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                  Understanding the key challenges in sustainable energy access across Africa.
                </p>
                <p className="text-lg text-gray-400 leading-relaxed">
                  We tackle barriers with innovation, technology, and community focus.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Challenges Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {challenges.map((challenge, index) => {
                const IconComponent = challenge.icon;
                return (
                  <div
                    key={challenge.title}
                    className={`glass rounded-3xl p-8 hover:shadow-elegant transition-all duration-700 group animate-fade-in-up`}
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                        challenge.color === 'grid-yellow' ? 'bg-grid-yellow/20 text-grid-yellow' :
                        challenge.color === 'grid-green' ? 'bg-grid-green/20 text-grid-green' :
                        'bg-grid-blue-light/30 text-white'
                      }`}>
                        <IconComponent className="w-8 h-8" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="text-center space-y-6">
                      <h3 className="text-2xl font-bold text-white group-hover:text-grid-yellow transition-colors duration-300">
                        {challenge.title}
                      </h3>
                      
                      <p className="text-gray-300 leading-relaxed">
                        {challenge.description}
                      </p>

                      {/* Challenge Points */}
                      <div className="space-y-3">
                        {challenge.points.map((point, pointIndex) => (
                          <div key={pointIndex} className="flex items-start space-x-3 text-left">
                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                              challenge.color === 'grid-yellow' ? 'bg-grid-yellow' :
                              challenge.color === 'grid-green' ? 'bg-grid-green' :
                              'bg-white'
                            }`} />
                            <p className="text-gray-400 text-sm leading-relaxed">{point}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="glass rounded-3xl p-12 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Ready to Make a <span className="text-grid-yellow">Difference?</span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Join us in addressing these critical challenges and building a sustainable energy future for Africa.
              </p>
              <div className="pt-4">
                <button className="px-8 py-4 bg-gradient-to-r from-grid-yellow to-grid-green text-black font-semibold rounded-2xl hover:shadow-glow transition-all duration-300 hover:scale-105">
                  Learn About Our Solutions
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Challenges;