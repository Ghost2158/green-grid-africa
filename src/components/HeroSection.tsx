import { useEffect, useState } from 'react';
import { Sun, Zap } from 'lucide-react';
import solarAfrica1 from '@/assets/solar-africa-1.jpg';
import solarAfrica2 from '@/assets/solar-africa-2.jpg';
import solarAfrica3 from '@/assets/solar-africa-3.jpg';

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const images = [solarAfrica1, solarAfrica2, solarAfrica3];

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-30' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Solar installation in Africa ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            {/* Floating Icon */}
            <div className="inline-flex items-center space-x-3 animate-float">
              <Sun className="w-8 h-8 text-grid-yellow" />
              <Zap className="w-6 h-6 text-grid-green" />
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-grid-yellow via-grid-green to-grid-yellow bg-clip-text text-transparent animate-pulse-glow">
                  GreenGrid
                </span>
                <br />
                <span className="text-white">
                  Africa
                </span>
              </h1>
            </div>

            {/* Description */}
            <div className="space-y-6">
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                Green Grid Africa is an AI-powered solar energy management platform that embraces IoT to optimise solar consumption and distribution in off-grid and underserved communities. It provides real-time monitoring, predictive analytics, and load optimization to ensure reliable, efficient, and sustainable power delivery.
              </p>
              
              <p className="text-lg text-gray-400 leading-relaxed">
                By empowering local operators with smart dashboards and actionable insights, it reduces energy waste and boosts community trust in clean energy systems. Our mission is to accelerate access to affordable, intelligent solar infrastructure across Africa.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-grid-yellow">100+</div>
                <div className="text-sm text-gray-400">Communities</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-grid-green">50MW</div>
                <div className="text-sm text-gray-400">Solar Capacity</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-grid-yellow">95%</div>
                <div className="text-sm text-gray-400">Efficiency</div>
              </div>
            </div>
          </div>

          {/* Right Content - Nature and Technology Card */}
          <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative glass rounded-3xl p-8 shadow-elegant border border-grid-yellow/20 hover:border-grid-yellow/40 transition-all duration-500 group">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-grid-yellow/10 to-grid-green/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Current Image */}
              <div className="relative mb-6 rounded-2xl overflow-hidden">
                <img
                  src={images[currentImageIndex]}
                  alt="Solar panels in Africa"
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex ? 'bg-grid-yellow' : 'bg-white/50'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </div>

              {/* Card Content */}
              <div className="relative z-10 space-y-4">
                <h3 className="text-2xl font-bold text-grid-yellow">
                  Nature and Technology
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Blending renewable energy with Africa's natural beauty.
                </p>
                
                {/* Floating Icons */}
                <div className="flex justify-between items-center pt-4">
                  <Sun className="w-6 h-6 text-grid-yellow animate-float" style={{ animationDelay: '0.5s' }} />
                  <Zap className="w-6 h-6 text-grid-green animate-float" style={{ animationDelay: '1s' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-grid-yellow rounded-full flex justify-center">
          <div className="w-1 h-2 bg-grid-yellow rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;