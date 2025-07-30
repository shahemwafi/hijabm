"use client";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { FaUser, FaCog, FaSignOutAlt, FaChevronDown } from "react-icons/fa";

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
      <Link
        className="bg-amber-500 text-sm p-1.5 mx-3 rounded-xl hover:underline"
        href="/login"
      >
        SignIn
      </Link>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-amber-500 text-sm p-1.5 mx-3 rounded-xl hover:bg-amber-600 transition-colors flex items-center gap-2"
      >
        <FaUser className="text-white" />
                       <span className="text-white font-medium">
                 {user.email?.split('@')[0] || 'User'}
               </span>
        <FaChevronDown className={`text-white transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                           <div className="px-4 py-2 border-b border-gray-100">
                   <p className="text-sm font-semibold text-gray-900">
                     {user.email?.split('@')[0] || 'User'}
                   </p>
                   <p className="text-xs text-gray-500">
                     {user.email}
                   </p>
                 </div>
          
          <Link
            href="/profile"
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <FaUser className="text-gray-500" />
            My Profile
          </Link>
          
          <Link
            href="/change-password"
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <FaCog className="text-gray-500" />
            Change Password
          </Link>
          
          <div className="border-t border-gray-100 mt-1">
                               <button
                     onClick={() => {
                       logout();
                       setIsOpen(false);
                     }}
                     className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                   >
                     <FaSignOutAlt />
                     Sign Out
                   </button>
          </div>
        </div>
      )}
    </div>
  );
} 