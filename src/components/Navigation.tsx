import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'DASHBOARD', path: '/' },
    { name: 'CHALLENGES', path: '/challenges' },
    { name: 'SOLUTIONS', path: '/solutions' },
    { name: 'TEAM', path: '/team' },
    { name: 'CONTACT US', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-grid-blue-light h-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Zap className="w-8 h-8 text-grid-yellow group-hover:text-grid-green transition-colors duration-300" />
              <div className="absolute inset-0 bg-grid-yellow/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-grid-yellow font-bold text-lg leading-none">GreenGrid</span>
              <span className="text-white text-sm leading-none">Africa</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  isActive(item.path)
                    ? 'text-grid-yellow'
                    : 'text-white hover:text-grid-yellow'
                }`}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                {item.name}
                {isActive(item.path) && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-grid-yellow to-grid-green" />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:text-grid-yellow"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-grid-blue/95 backdrop-blur-md border-t border-grid-blue-light">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 text-base font-medium transition-colors duration-300 ${
                    isActive(item.path)
                      ? 'text-grid-yellow bg-grid-blue-light/50'
                      : 'text-white hover:text-grid-yellow hover:bg-grid-blue-light/30'
                  }`}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;