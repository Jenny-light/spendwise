import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-lg font-bold">$</span>
            </div>
            <span className="text-lg font-bold">SpendWise</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span>Made with</span>
            <Heart size={16} className="text-accent-red fill-current" />
            <span>by Team Elites</span>
          </div>

          <div className="text-sm text-gray-400 mt-4 md:mt-0">
            © 2025 SpendWise. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;