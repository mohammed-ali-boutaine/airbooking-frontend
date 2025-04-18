import React, { useState, useRef, useEffect } from "react";
import Button from "../../ui/Button";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useUserStore } from "../../store/useUserStore";


import ProfileHeader from "./ProfileHeader";
// import { UserType } from "../../types";

// ProfileHeader component


const MainNav: React.FC = () => {
  // const fetchUserFromToken = useUserStore((state) => state.fetchUserFromToken);
// console.log(user);

const user = useUserStore((state) => state.user);
const loading = useUserStore((state) => state.loading);

// console.log(user);



  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
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
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <img width="144" height="35" src={logo} alt="airbooking-logo" />
            </Link>
          </div>

          <div className="hidden md:block flex-grow mx-8">
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-xl">
                <SearchBar />
              </div>
            </div>
          </div>

          {/* if user login show profile else show login and register  */}
          <div className="flex items-center space-x-4">
  {loading ? (
    // <Skeleton className="h-10 w-24" />
    <>Loading</>
  ) : user ? (
    <ProfileHeader user={user} />
  ) : (
    <>
      <Link to="/login">
        <Button type="button" variant="outline">
          Login
        </Button>
      </Link>
      <Link to="/register">
        <Button variant="primary">Sign up</Button>
      </Link>

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

        {/* Dropdown Menu */}
         {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 ring-1 ring-black ring-opacity-5">
            <a
              href="/contact"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Contact
            </a>
            <a
              href="/features"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              About
            </a>
            <a
              href="/features"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Features
            </a>
            <a
              href="/help-center"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Help Center
            </a>
          </div>
        )} 
      </div>
    </>
  )}
</div>
</div>


</div>
</nav>
  )
};

export default MainNav;
