import React, { useState, useRef, useEffect } from 'react';
import Button from '../../ui/Button';
import logo from "../../assets/logo.png"
import { Link } from 'react-router-dom';


const Navbar: React.FC= () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
  
    // Close menu when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
          setMenuOpen(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  
    return (
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/">
              <img width="144" height="35" src={logo} alt="airbooking-logo" />
              </Link>
            </div>
            
            <div className="hidden md:block flex-grow mx-8">
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-xl">
                  {/* Search bar with input field */}
                  <div className="flex border border-gray-300 rounded-full overflow-hidden bg-white shadow-sm">
                    <div className="flex flex-grow items-center">
                      <input 
                        type="text" 
                        placeholder="Search destinations..." 
                        className="w-full px-4 py-2 text-sm text-gray-700 focus:outline-none"
                      />
                    </div>
                    <span className="border-r border-gray-300"></span>
                    <button className="px-4 py-2 text-sm text-gray-700 bg-white hover:bg-gray-50">
                      Any week
                    </button>
                    <span className="border-r border-gray-300"></span>
                    <button className="px-4 py-2 text-sm text-gray-700 bg-white hover:bg-gray-50">
                      Add guests
                    </button>
                    <button className="flex items-center justify-center w-8 h-8 bg-red-500 rounded-full m-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/login">
              <Button type='button' variant="outline" >
                Login</Button>
              </Link>
                <Link to="/register">
              <Button variant="primary" >
                Sign up
                </Button>
                </Link>
              <div className="relative" ref={menuRef}>
                <button 
                  className="p-1 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                
                {/* Dropdown Menu */}
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 ring-1 ring-black ring-opacity-5">
                    <a href="/contact" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Contact</a>
                    <a href="/features" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">About</a>
                    <a href="/features" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Features</a>
                    <a href="/help-center" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Help Center</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );



  return (
    <nav className="bg-[var(--primary-color)] p-4 text-white">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="hover:underline">Home</Link>
        </li>
        <li>
          <Link to="/login" className="hover:underline">Login</Link>
        </li>
        <li>
          <Link to="/register" className="hover:underline">Register</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;