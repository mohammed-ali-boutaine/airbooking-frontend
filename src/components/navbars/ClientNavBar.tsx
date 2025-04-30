import React, { useState, useRef, useEffect } from "react";
import Button from "../static/Button";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useUserStore } from "../../store/useUserStore";
import Logo from "../static/Logo";
import ProfileSection from "./ProfileSection";

const ClientNavBar: React.FC = () => {
  const { user, loading } = useUserStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    useUserStore.getState().fetchUserFromToken();

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          {loading ? (
            <div className="h-10 bg-gray-100 rounded-full animate-pulse" />
          ) : (
            <div className="flex-shrink-0 flex items-center">
              <Logo to="/" />
            </div>
          )}

          {/* Search Bar */}
          <div className="hidden lg:block flex-grow mx-8">
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-xl">
                {loading ? (
                  <div className="h-10 bg-gray-100 rounded-full animate-pulse" />
                ) : (
                  <SearchBar />
                )}
              </div>
            </div>
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {loading ? (
              // Custom loading skeletons for auth buttons
              <div className="flex items-center space-x-4">
                {/* <div className="w-20 h-10 bg-gray-200 rounded animate-pulse" /> */}
                <div className="w-20 h-10 bg-gray-200 rounded animate-pulse" />
              </div>
            ) : user ? (
              // Show profile section if user is logged in
              <ProfileSection user={user} />
            ) : (
              // Show login and register buttons if user is not logged in
              <>
                <Link to="/login">
                  <Button type="button" variant="outline">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary">Sign up</Button>
                </Link>

                {/* Dropdown Menu */}
                <div className="relative" ref={menuRef}>
                  <button
                    className="p-1 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>

                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 ring-1 ring-black ring-opacity-5">
                      {loading ? (
                        // Show loading indicators for menu items
                        <>
                          {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="px-4 py-2">
                              <div className="h-4 bg-gray-200 rounded animate-pulse" />
                            </div>
                          ))}
                        </>
                      ) : (
                        <>
                          <Link
                            to="/contact"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Contact
                          </Link>
                          <Link
                            to="/about"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            About
                          </Link>
                          <Link
                            to="/features"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Features
                          </Link>
                          <Link
                            to="/help-center"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Help Center
                          </Link>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ClientNavBar;
