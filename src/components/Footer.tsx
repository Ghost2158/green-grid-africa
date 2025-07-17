import { Link } from 'react-router-dom';
import { Zap, Linkedin, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black/90 border-t border-grid-blue-light mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Zap className="w-6 h-6 text-grid-yellow" />
              <div className="flex flex-col">
                <span className="text-grid-yellow font-bold text-lg leading-none">GreenGrid Africa</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
              Empowering African communities through sustainable energy solutions
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-grid-green font-semibold text-lg">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-300 hover:text-grid-yellow transition-colors duration-300 text-sm">
                About Us
              </Link>
              <Link to="/solutions" className="block text-gray-300 hover:text-grid-yellow transition-colors duration-300 text-sm">
                Solutions
              </Link>
              <Link to="/challenges" className="block text-gray-300 hover:text-grid-yellow transition-colors duration-300 text-sm">
                Challenges
              </Link>
              <Link to="/team" className="block text-gray-300 hover:text-grid-yellow transition-colors duration-300 text-sm">
                Team
              </Link>
              <Link to="/contact" className="block text-gray-300 hover:text-grid-yellow transition-colors duration-300 text-sm">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Connect With Us */}
          <div className="space-y-4">
            <h3 className="text-grid-green font-semibold text-lg">Connect With Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-2 bg-grid-blue-light hover:bg-grid-yellow hover:text-black transition-all duration-300 rounded-lg group"
              >
                <Twitter className="w-5 h-5 text-white group-hover:text-black" />
              </a>
              <a
                href="#"
                className="p-2 bg-grid-blue-light hover:bg-grid-yellow hover:text-black transition-all duration-300 rounded-lg group"
              >
                <Linkedin className="w-5 h-5 text-white group-hover:text-black" />
              </a>
              <a
                href="#"
                className="p-2 bg-grid-blue-light hover:bg-grid-yellow hover:text-black transition-all duration-300 rounded-lg group"
              >
                <Facebook className="w-5 h-5 text-white group-hover:text-black" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-grid-blue-light mt-8 pt-8">
          <p className="text-center text-gray-400 text-sm">
            Copyright © 2025 GreenGrid Africa. All rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;