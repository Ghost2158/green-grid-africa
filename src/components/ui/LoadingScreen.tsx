import React, { useState, useEffect } from 'react';
import { Sun, Zap, Users, Globe } from 'lucide-react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState('Initializing...');

  const phases = [
    'Initializing GreenGrid Africa...',
    'Connecting to solar networks...',
    'Loading energy data...',
    'Preparing dashboard...',
    'Ready to power Africa!'
  ];

  useEffect(() => {
    const duration = 4000; // 4 seconds
    const interval = 50; // Update every 50ms
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + increment;
        
        // Update phase based on progress
        const phaseIndex = Math.floor((newProgress / 100) * (phases.length - 1));
        setCurrentPhase(phases[Math.min(phaseIndex, phases.length - 1)]);

        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => onLoadingComplete(), 500);
          return 100;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadingComplete, phases]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center z-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/10 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-yellow-500/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-32 h-32 bg-orange-500/10 rounded-full animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Logo */}
        <div className="mb-8">
          <div className="relative mx-auto w-24 h-24 mb-6">
            {/* GreenGrid Africa Logo - Using SVG representation */}
            <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <div className="relative">
                <Sun className="w-12 h-12 text-white animate-spin-slow" />
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 animate-pulse"></div>
              </div>
            </div>
            {/* Orbiting elements */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-orange-500 rounded-full animate-bounce delay-500"></div>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-2">
            <span className="bg-gradient-to-r from-green-400 to-yellow-500 bg-clip-text text-transparent">
              GreenGrid
            </span>
            <span className="text-white ml-2">Africa</span>
          </h1>
          <p className="text-gray-300 text-lg font-medium">
            Powering Africa's Sustainable Future
          </p>
        </div>

        {/* Loading Progress */}
        <div className="mb-8">
          <div className="w-full bg-gray-700 rounded-full h-3 mb-4 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-orange-500 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
          <p className="text-gray-400 text-sm font-medium">{currentPhase}</p>
          <p className="text-gray-500 text-xs mt-1">{Math.round(progress)}% Complete</p>
        </div>

        {/* Feature Icons */}
        <div className="flex justify-center space-x-8 opacity-60">
          <div className="text-center">
            <Zap className="w-8 h-8 text-green-400 mx-auto mb-2 animate-pulse" />
            <p className="text-xs text-gray-400">Real-time Monitoring</p>
          </div>
          <div className="text-center">
            <Sun className="w-8 h-8 text-yellow-400 mx-auto mb-2 animate-pulse delay-300" />
            <p className="text-xs text-gray-400">AI Predictions</p>
          </div>
          <div className="text-center">
            <Users className="w-8 h-8 text-orange-400 mx-auto mb-2 animate-pulse delay-600" />
            <p className="text-xs text-gray-400">Community Impact</p>
          </div>
          <div className="text-center">
            <Globe className="w-8 h-8 text-blue-400 mx-auto mb-2 animate-pulse delay-900" />
            <p className="text-xs text-gray-400">Pan-African Network</p>
          </div>
        </div>
      </div>
    </div>
  );
};