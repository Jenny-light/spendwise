import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-6 sm:py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-lg font-bold">$</span>
            </div>
            <span className="text-base sm:text-lg font-bold">SpendWise</span>
          </div>

          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <span>Made with</span>
            <Heart size={14} className="text-accent-red fill-current" />
            <span>by MERN Developers</span>
          </div>

          <div className="text-xs sm:text-sm text-gray-400">
            © 2025 SpendWise. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;