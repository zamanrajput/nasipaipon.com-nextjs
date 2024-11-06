'use client'
import { useState } from 'react';

const OpeningHoursDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Dropdown Button */}
      <button
        onClick={toggleDropdown}
        className="
          inline-flex justify-between w-full 
          px-4 py-2 
          text-sm font-medium 
          text-gray-700 
          bg-gray-100 
          border border-gray-300 
          rounded-md 
          shadow-sm 
          focus:outline-none 
          focus:ring-2 focus:ring-blue-500 
          transition-all duration-300
        "
      >
        Opening Hours
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 ml-2 transform ${isOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown Content */}
      <div
        className={`
          absolute right-0 z-10 mt-2 w-56 origin-top-right 
          bg-white rounded-md shadow-lg 
          ring-1 ring-black ring-opacity-5 
          transition-all duration-300 
          ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}
        style={{ overflow: 'hidden' }}
      >
        <div className="py-1">
          <p className="block px-4 py-2 text-sm text-gray-700">Monday: 09:00AM - 07:00PM PM</p>
          <p className="block px-4 py-2 text-sm text-gray-700">Tuesday: 09:00AM - 07:00PM PM</p>
          <p className="block px-4 py-2 text-sm text-gray-700">Wednesday: 09:00AM - 07:00PM PM</p>
          <p className="block px-4 py-2 text-sm text-gray-700">Thursday: 09:00AM - 07:00PM PM</p>
          <p className="block px-4 py-2 text-sm text-gray-700">Friday: 09:00AM - 07:00PM PM</p>
          <p className="block px-4 py-2 text-sm text-gray-700">Saturday: 09:00AM - 07:00PM PM</p>
          <p className="block px-4 py-2 text-sm text-gray-700">Sunday: 09:00AM - 07:00PM PM</p>
        </div>
      </div>
    </div>
  );
};

export default OpeningHoursDropdown;
