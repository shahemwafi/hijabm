
"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaBars, FaTimes, FaUser, FaSignInAlt, FaUserPlus, FaShieldAlt } from "react-icons/fa";
import { useAuth } from "@/contexts/AuthContext";

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    // Close menu on escape key
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div className="relative">
      {/* Hamburger Button */}
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className="p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <FaTimes className="h-6 w-6" />
        ) : (
          <FaBars className="h-6 w-6" />
        )}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeMenu}
          />
          
          {/* Menu Content */}
          <div 
            ref={menuRef}
            className="fixed top-16 right-0 w-80 max-h-[calc(100vh-4rem)] bg-white shadow-2xl border border-gray-100 z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto"
          >
            {/* Header */}
            <div className="px-4 py-4 border-b border-gray-100 bg-gradient-to-r from-green-50 to-blue-50">
              <h3 className="font-semibold text-gray-900 text-lg">Menu</h3>
            </div>
            
            {/* Navigation Links */}
            <div className="py-2">
              <Link
                href="/"
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200 active:bg-gray-100"
                onClick={closeMenu}
              >
                <span className="font-medium">Home</span>
              </Link>
              
              <Link
                href="/about"
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200 active:bg-gray-100"
                onClick={closeMenu}
              >
                <span className="font-medium">About</span>
              </Link>
              
              <Link
                href="/pay"
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200 active:bg-gray-100"
                onClick={closeMenu}
              >
                <span className="font-medium">Post Rishta</span>
              </Link>
              
              <Link
                href="/portfolio"
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200 active:bg-gray-100"
                onClick={closeMenu}
              >
                <span className="font-medium">Portfolio</span>
              </Link>
              
              <Link
                href="/terms"
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200 active:bg-gray-100"
                onClick={closeMenu}
              >
                <span className="font-medium">Terms</span>
              </Link>
              
              <Link
                href="/contact"
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200 active:bg-gray-100"
                onClick={closeMenu}
              >
                <span className="font-medium">Contact</span>
              </Link>
            </div>

            {/* User Authentication Section */}
            <div className="border-t border-gray-100 py-2">
              {!user ? (
                <>
                  <Link
                    href="/login"
                    className="flex items-center px-4 py-3 text-green-600 hover:bg-green-50 transition-colors duration-200 active:bg-green-100"
                    onClick={closeMenu}
                  >
                    <FaSignInAlt className="mr-3 text-green-500 flex-shrink-0" />
                    <span className="font-medium">Sign In</span>
                  </Link>
                  
                  <Link
                    href="/register"
                    className="flex items-center px-4 py-3 text-green-600 hover:bg-green-50 transition-colors duration-200 active:bg-green-100"
                    onClick={closeMenu}
                  >
                    <FaUserPlus className="mr-3 text-green-500 flex-shrink-0" />
                    <span className="font-medium">Sign Up</span>
                  </Link>
                </>
              ) : (
                <>
                  <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-green-50 to-blue-50">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-semibold text-sm">
                          {user.email?.charAt(0).toUpperCase() || 'U'}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {user.email?.split('@')[0] || 'User'}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Link
                    href="/profile"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200 active:bg-gray-100"
                    onClick={closeMenu}
                  >
                    <FaUser className="mr-3 text-gray-400 flex-shrink-0" />
                    <span>My Profile</span>
                  </Link>
                  
                  {user.isAdmin && (
                    <Link
                      href="/admin"
                      className="flex items-center px-4 py-3 text-blue-600 hover:bg-blue-50 transition-colors duration-200 active:bg-blue-100"
                      onClick={closeMenu}
                    >
                      <FaShieldAlt className="mr-3 text-blue-500 flex-shrink-0" />
                      <span>Admin Panel</span>
                    </Link>
                  )}
                  
                  <button
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                    className="flex items-center px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200 active:bg-red-100 w-full text-left"
                  >
                    <FaSignInAlt className="mr-3 text-red-500 flex-shrink-0" />
                    <span>Sign Out</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
} 