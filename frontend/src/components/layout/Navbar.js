import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  FaBars, 
  FaTimes, 
  FaUser, 
  FaSignOutAlt, 
  FaHome,
  FaLeaf,
  FaCog,
  FaClipboardList,
  FaUsers,
  FaBoxes
} from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout, hasRole } = useAuth();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/', icon: FaHome },
    { name: 'Products', path: '/products', icon: FaLeaf },
    { name: 'Services', path: '/services', icon: FaCog },
    { name: 'About', path: '/about', icon: FaUsers },
    { name: 'Contact', path: '/contact', icon: FaClipboardList },
  ];

  const farmerLinks = [
    { name: 'Dashboard', path: '/farmer', icon: FaHome },
    { name: 'My Products', path: '/farmer/products', icon: FaBoxes },
    { name: 'Inquiries', path: '/farmer/inquiries', icon: FaClipboardList },
    { name: 'Profile', path: '/farmer/profile', icon: FaUser },
  ];

  const adminLinks = [
    { name: 'Dashboard', path: '/admin', icon: FaHome },
    { name: 'Farmers', path: '/admin/farmers', icon: FaUsers },
    { name: 'Products', path: '/admin/products', icon: FaBoxes },
    { name: 'Services', path: '/admin/services', icon: FaCog },
    { name: 'Inquiries', path: '/admin/inquiries', icon: FaClipboardList },
  ];

  const getRoleLinks = () => {
    if (hasRole('admin')) return adminLinks;
    if (hasRole('farmer')) return farmerLinks;
    return [];
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <FaLeaf className="h-8 w-8 text-green-600" />
              <span className="text-xl font-bold text-gray-900">Digi-Farm</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Public Links */}
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                <link.icon className="h-4 w-4" />
                <span>{link.name}</span>
              </Link>
            ))}

            {/* Role-based Links */}
            {isAuthenticated && getRoleLinks().map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                <link.icon className="h-4 w-4" />
                <span>{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors">
                  <FaUser className="h-4 w-4" />
                  <span>{user?.name}</span>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                    <div className="font-medium">{user?.name}</div>
                    <div className="text-gray-500 capitalize">{user?.role}</div>
                  </div>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <FaSignOutAlt className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-green-600 focus:outline-none focus:text-green-600"
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            {/* Public Links */}
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={toggleMenu}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                <link.icon className="h-4 w-4" />
                <span>{link.name}</span>
              </Link>
            ))}

            {/* Role-based Links */}
            {isAuthenticated && getRoleLinks().map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={toggleMenu}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                <link.icon className="h-4 w-4" />
                <span>{link.name}</span>
              </Link>
            ))}

            {/* Auth Links */}
            {isAuthenticated ? (
              <div className="border-t border-gray-200 pt-4">
                <div className="px-3 py-2 text-sm text-gray-700">
                  <div className="font-medium">{user?.name}</div>
                  <div className="text-gray-500 capitalize">{user?.role}</div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                  className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 flex items-center space-x-2"
                >
                  <FaSignOutAlt className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <Link
                  to="/login"
                  onClick={toggleMenu}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-md"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={toggleMenu}
                  className="block px-3 py-2 text-base font-medium bg-green-600 hover:bg-green-700 text-white rounded-md text-center"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
