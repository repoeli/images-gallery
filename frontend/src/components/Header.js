import React from 'react';
import { BellIcon } from '@heroicons/react/24/outline';

const Header = ({ title, searchTerm, setSearchTerm, handleSubmit }) => {
  return (
    <header className="w-full bg-white py-4">
      <div className="mx-auto max-w-[1400px] px-4">
        <div className="flex items-center justify-between">
          {/* Left - Simple text logo */}
          <a href="/" className="text-base text-gray-900 hover:text-gray-600">
            Image Gallery
          </a>

          {/* Center - Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="/dashboard" className="text-gray-900 text-sm">Dashboard</a>
            <a href="/team" className="text-gray-500 text-sm hover:text-gray-900">Team</a>
            <a href="/projects" className="text-gray-500 text-sm hover:text-gray-900">Projects</a>
            <a href="/calendar" className="text-gray-500 text-sm hover:text-gray-900">Calendar</a>
          </nav>

          {/* Right side - Search, Notifications, Profile */}
          <div className="flex items-center gap-6">
            {/* Search Form */}
            <form onSubmit={handleSubmit} className="relative group">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search"
                className="w-32 sm:w-48 py-1 px-2 text-sm border-none bg-transparent focus:outline-none text-gray-900 placeholder-gray-500"
              />
              <svg 
                className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-900" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
            </form>

            {/* Notification Icon */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="group relative p-1.5 text-gray-800 hover:text-gray-600"
              >
                <div className="absolute -right-1 -top-1 h-4 w-4 rounded-full border-2 border-white bg-gray-50">
                  <span className="text-[10px] font-medium text-gray-900">0</span>
                </div>
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-5 w-5" />
              </button>

              {/* Profile Picture */}
              <img
                src="https://i.pravatar.cc/32?img=3"
                alt=""
                className="h-8 w-8 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;