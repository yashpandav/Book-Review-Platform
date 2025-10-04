import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBook } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-white flex items-center gap-2">
            <FaBook /> Modern Scholar
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="nav-link">
              Home
            </Link>
            
            {user ? (
              <>
                <Link to="/add-book" className="nav-link">
                  Add Book
                </Link>
                <Link to="/profile" className="nav-link">
                  Profile
                </Link>
                <span className="text-white font-medium">
                  Welcome, {user.name}
                </span>
                <button onClick={handleLogout} className="btn-primary">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              
              {user ? (
                <>
                  <Link
                    to="/add-book"
                    className="nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Add Book
                  </Link>
                  <Link
                    to="/profile"
                    className="nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <span className="text-white font-medium py-2">
                    Welcome, {user.name}
                  </span>
                  <button onClick={handleLogout} className="btn-primary text-left">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn-primary text-left"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;