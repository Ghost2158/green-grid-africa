import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';

const Dashboard = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      {/* Main Content */}
      <main className="pt-16">
        <HeroSection />
        
        {/* Additional Dashboard Content */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {/* Mission Statement */}
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Revolutionizing <span className="text-grid-yellow">Solar Energy</span> Management
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Through cutting-edge AI and IoT technologies, we're creating a more sustainable and accessible energy future for African communities. Our platform transforms how solar energy is managed, distributed, and optimized across the continent.
                </p>
              </div>

              {/* Key Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                <div className="glass rounded-2xl p-6 hover:shadow-glow transition-all duration-500 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-grid-yellow to-grid-green rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Real-time Monitoring</h3>
                  <p className="text-gray-400">Continuous tracking of energy production, consumption, and system performance</p>
                </div>

                <div className="glass rounded-2xl p-6 hover:shadow-glow transition-all duration-500 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-grid-green to-grid-yellow rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9,12A3,3 0 0,1 12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12M12,17L18.36,10.64C21.15,7.85 21.15,3.15 18.36,0.36C15.57,-2.43 10.87,-2.43 8.08,0.36C5.29,3.15 5.29,7.85 8.08,10.64L12,17Z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Predictive Analytics</h3>
                  <p className="text-gray-400">AI-powered insights for optimizing energy distribution and maintenance</p>
                </div>

                <div className="glass rounded-2xl p-6 hover:shadow-glow transition-all duration-500 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-grid-yellow to-grid-green rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,18.5C4.5,18.5 2,12 2,12C2,12 4.5,5.5 12,5.5C19.5,5.5 22,12 22,12C22,12 19.5,18.5 12,18.5Z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Smart Dashboards</h3>
                  <p className="text-gray-400">Intuitive interfaces for local operators to manage energy systems effectively</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;