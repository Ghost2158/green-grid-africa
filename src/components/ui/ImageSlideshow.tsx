import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const africanSolarImages = [
  {
    url: '/assets/pexels-cristian-rojas-8853507.jpg',
    caption: 'African woman engineer inspecting solar panels in Kenya',
    title: 'Empowering Communities'
  },
  {
    url: '/assets/pexels-gunas4life-19205947.jpg',
    caption: 'Solar technician maintaining renewable energy systems in Nigeria',
    title: 'Technical Excellence'
  },
  {
    url: '/assets/pexels-cristian-rojas-8853507.jpg',
    caption: 'Large-scale solar farm powering communities across Ghana',
    title: 'Sustainable Infrastructure'
  },
  {
    url: '/assets/pexels-okiki-onipede-1803710719-29387385.jpg',
    caption: 'African family benefiting from clean solar energy in their home',
    title: 'Energy Access for All'
  },
  {
    url: '/assets/pexels-pixabay-371917.jpg',
    caption: 'Solar installation team working on rooftop systems in South Africa',
    title: 'Building the Future'
  },
  {
    url: '/assets/pexels-wo-nfoni-media-311038690-13998756.jpg',
    caption: 'Community solar project bringing electricity to rural African village',
    title: 'Rural Electrification'
  }
];

export const ImageSlideshow: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === africanSolarImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? africanSolarImages.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === africanSolarImages.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Images */}
      <div className="relative w-full h-full">
        {africanSolarImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.url}
              alt={image.caption}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
            
            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="max-w-2xl">
                <h3 className="text-2xl font-bold mb-2 text-shadow-lg">
                  {image.title}
                </h3>
                <p className="text-lg opacity-90 text-shadow">
                  {image.caption}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {africanSolarImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};