"use client";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { FaUser, FaCog, FaSignOutAlt, FaChevronDown, FaShieldAlt, FaUsers, FaChartBar, FaCrown } from "react-icons/fa";

export default function UserProfileDropdown() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!user) {
    return (
      <div className="flex items-center space-x-2 sm:space-x-4">
        <Link
          href="/login"
          className="btn-primary px-3 py-2 text-sm sm:px-4 sm:py-2"
        >
          Sign In
        </Link>
        <Link
          href="/register"
          className="btn-primary px-3 py-2 text-sm sm:px-4 sm:py-2"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 sm:px-4 sm:py-2 transition-all duration-200 shadow-sm hover:shadow-md"
      >
        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold text-xs sm:text-sm">
            {user.email?.charAt(0).toUpperCase() || 'U'}
          </span>
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-sm font-medium text-gray-900">
            {user.email?.split('@')[0] || 'User'}
          </p>
          {user.isAdmin && (
            <div className="flex items-center mt-1">
              <FaCrown className="text-yellow-500 text-xs mr-1" />
              <span className="text-xs text-yellow-600 font-medium">Admin</span>
            </div>
          )}
        </div>
        <FaChevronDown className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 sm:w-72 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-fade-in">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-green-50 to-blue-50 rounded-t-xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
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
                {user.isAdmin && (
                  <div className="flex items-center mt-1">
                    <FaCrown className="text-yellow-500 text-xs mr-1" />
                    <span className="text-xs text-yellow-600 font-medium">Administrator</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="py-2">
            <Link
              href="/profile"
              className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              <FaUser className="text-gray-400 flex-shrink-0" />
              <span>My Profile</span>
            </Link>
            
            <Link
              href="/change-password"
              className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              <FaCog className="text-gray-400 flex-shrink-0" />
              <span>Change Password</span>
            </Link>
          </div>

          {/* Admin Panel */}
          {user.isAdmin && (
            <>
              <div className="border-t border-gray-100 my-2">
                <div className="px-4 py-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Admin Panel
                  </p>
                </div>
              </div>
              
              <div className="py-2">
                <Link
                  href="/admin"
                  className="flex items-center space-x-3 px-4 py-3 text-sm text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <FaShieldAlt className="text-blue-500 flex-shrink-0" />
                  <span>Dashboard</span>
                </Link>
                
                <Link
                  href="/admin/users"
                  className="flex items-center space-x-3 px-4 py-3 text-sm text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <FaUsers className="text-blue-500 flex-shrink-0" />
                  <span>Manage Users</span>
                </Link>
                
                <Link
                  href="/admin/analytics"
                  className="flex items-center space-x-3 px-4 py-3 text-sm text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <FaChartBar className="text-blue-500 flex-shrink-0" />
                  <span>Analytics</span>
                </Link>
              </div>
            </>
          )}
          
          {/* Logout */}
          <div className="border-t border-gray-100 mt-2">
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="flex items-center space-x-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 w-full text-left"
            >
              <FaSignOutAlt className="text-red-500 flex-shrink-0" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 