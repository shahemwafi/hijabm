"use client";
import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-100 transition-colors duration-200"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <FaTimes className="h-6 w-6" />
        ) : (
          <FaBars className="h-6 w-6" />
        )}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-fade-in">
          <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-green-50 to-blue-50 rounded-t-xl">
            <h3 className="font-semibold text-gray-900 text-lg">Menu</h3>
          </div>
          
          <div className="py-2">
            <Link
              href="/"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              onClick={closeMenu}
            >
              <span className="font-medium">Home</span>
            </Link>
            
            <Link
              href="/about"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              onClick={closeMenu}
            >
              <span className="font-medium">About</span>
            </Link>
            
            <Link
              href="/pay"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              onClick={closeMenu}
            >
              <span className="font-medium">Post Rishta</span>
            </Link>
            
            <Link
              href="/portfolio"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              onClick={closeMenu}
            >
              <span className="font-medium">Portfolio</span>
            </Link>
            
            <Link
              href="/terms"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              onClick={closeMenu}
            >
              <span className="font-medium">Terms</span>
            </Link>
            
            <Link
              href="/contact"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              onClick={closeMenu}
            >
              <span className="font-medium">Contact</span>
            </Link>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40"
          onClick={closeMenu}
        />
      )}
    </div>
  );
} 