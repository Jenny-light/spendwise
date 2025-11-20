import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">$</span>
            </div>
            <span className="text-xl font-bold text-secondary">SpendWise</span>
          </Link>

          {/* Desktop Navigation */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-gray-100"
              >
                <LayoutDashboard size={20} />
                Dashboard
              </Link>
              <Link
                to="/expenses"
                className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-gray-100"
              >
                <User size={20} />
                Expenses
              </Link>
              
              {/* User Menu */}
              <div className="flex items-center gap-3 ml-4 pl-4 border-l">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium">{user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-accent-red hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </div>
            </div>
          )}

          {!isAuthenticated && (
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/login" className="btn btn-outline">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t">
          <div className="px-4 py-4 space-y-2">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  <LayoutDashboard size={20} />
                  Dashboard
                </Link>
                <Link
                  to="/expenses"
                  className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  <User size={20} />
                  Expenses
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 text-accent-red hover:bg-red-50 px-3 py-2 rounded-lg transition-colors w-full"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block btn btn-outline w-full"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block btn btn-primary w-full"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;