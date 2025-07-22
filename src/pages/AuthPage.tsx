import React, { useState } from 'react';
import { Sun, Zap, Users, Globe, TrendingUp, Shield, Battery } from 'lucide-react';
import { LoginForm } from '../components/auth/LoginForm';
import { SignupForm } from '../components/auth/SignupForm';
import { AdminLoginForm } from '../components/auth/AdminLoginForm';
import { ImageSlideshow } from '../components/ui/ImageSlideshow';

type AuthMode = 'login' | 'signup' | 'admin';

export const AuthPage: React.FC = () => {
  const [authMode, setAuthMode] = useState<AuthMode>('login');

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image Slideshow */}
      <div className="hidden lg:flex lg:w-3/5 relative">
        <ImageSlideshow />
        
        {/* Overlay Content */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex flex-col justify-center p-12">
          <div className="max-w-2xl">
            {/* Logo */}
            <div className="flex items-center space-x-4 mb-8">
              <div className="relative w-16 h-16">
                <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Sun className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  <span className="bg-gradient-to-r from-green-400 to-yellow-500 bg-clip-text text-transparent">
                    GreenGrid
                  </span>
                  <span className="text-white ml-2">Africa</span>
                </h1>
                <p className="text-green-200 text-sm">Powering Africa's Sustainable Future</p>
              </div>
            </div>
            
            {/* Main Heading */}
            <h2 className="text-5xl font-bold text-white leading-tight mb-6">
              Transforming Africa's
              <span className="block bg-gradient-to-r from-green-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
                Energy Landscape
              </span>
            </h2>
            
            <p className="text-xl text-gray-200 leading-relaxed mb-8">
              Join the renewable energy revolution across Africa. Monitor, optimize, and control 
              solar energy systems with our intelligent AI-powered platform.
            </p>
            
            {/* Feature Cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <Zap className="w-8 h-8 text-yellow-400 mb-3" />
                <h3 className="font-semibold text-white mb-2">Real-time Monitoring</h3>
                <p className="text-sm text-gray-300">Live energy production data across all installations</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <TrendingUp className="w-8 h-8 text-green-400 mb-3" />
                <h3 className="font-semibold text-white mb-2">AI Predictions</h3>
                <p className="text-sm text-gray-300">Smart forecasting and optimization algorithms</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <Users className="w-8 h-8 text-blue-400 mb-3" />
                <h3 className="font-semibold text-white mb-2">Community Impact</h3>
                <p className="text-sm text-gray-300">Empowering communities across Africa</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <Globe className="w-8 h-8 text-purple-400 mb-3" />
                <h3 className="font-semibold text-white mb-2">Pan-African Network</h3>
                <p className="text-sm text-gray-300">Connected solar installations continent-wide</p>
              </div>
            </div>
            
            {/* Statistics */}
            <div className="flex space-x-8 text-center">
              <div>
                <div className="text-3xl font-bold text-green-400">500+</div>
                <div className="text-sm text-gray-300">Solar Sites</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400">2.5GW</div>
                <div className="text-sm text-gray-300">Total Capacity</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400">1M+</div>
                <div className="text-sm text-gray-300">People Served</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400">15</div>
                <div className="text-sm text-gray-300">Countries</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Authentication Forms */}
      <div className="w-full lg:w-2/5 flex flex-col justify-center bg-white">
        <div className="px-8 py-12 lg:px-12">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
              <Sun className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-green-600 to-yellow-600 bg-clip-text text-transparent">
                  GreenGrid
                </span>
                <span className="text-gray-900 ml-1">Africa</span>
              </h1>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-8 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                authMode === 'login'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthMode('signup')}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                authMode === 'signup'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sign Up
            </button>
            <button
              onClick={() => setAuthMode('admin')}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                authMode === 'admin'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Shield className="w-4 h-4 inline mr-1" />
              Admin
            </button>
          </div>

          {/* Auth Forms */}
          <div className="transition-all duration-300">
            {authMode === 'login' && (
              <LoginForm
                onSwitchToSignup={() => setAuthMode('signup')}
                onSwitchToAdmin={() => setAuthMode('admin')}
              />
            )}
            {authMode === 'signup' && (
              <SignupForm
                onSwitchToLogin={() => setAuthMode('login')}
              />
            )}
            {authMode === 'admin' && (
              <AdminLoginForm
                onSwitchToLogin={() => setAuthMode('login')}
              />
            )}
          </div>

          {/* Footer */}
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
            <div className="flex items-center justify-center space-x-4 mt-4 text-xs text-gray-400">
              <span>© 2024 GreenGrid Africa</span>
              <span>•</span>
              <span>Powering Sustainable Development</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};