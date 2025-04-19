import { Outlet } from "react-router-dom";
// import OwnerNavBar from "../components/navbars/OwnerNavbar";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../components/static/Logo"; // Assuming you have a Logo component

const OwnerLayout = () => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Profile dropdown links
  const profileLinks = [
    { name: "Profile", href: "/profile" },
    { name: "Contact", href: "/contact" },
    { name: "Help", href: "/help" },
    // { name: "Logout", href: "/logout" },
  ];

  // Sidebar links
  const sidebarLinks = [
    { name: "Dashboard", href: "/", icon: "📊" },
    { name: "View Hotels", href: "/hotels", icon: "🏨" },
    { name: "Add Hotel", href: "/hotels/add", icon: "🏨" },
    { name: "Manage Rooms", href: "/rooms", icon: "🛏️" },
    { name: "Statistics", href: "/statistics", icon: "📈" },
    { name: "Bookings", href: "/bookings", icon: "📅" },
  ];

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <div className=" h-screen">
        {/* Main Navbar */}
        <div className="d-block h-16 w-full z-10 bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="p-2 mr-2 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
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
              <Link to="/owner/dashboard" className="flex items-center">
                <Logo />
              </Link>
            </div>

            {/* Profile Section */}
            <div className="relative">
              <button
                onClick={toggleProfileDropdown}
                className="flex items-center p-2 space-x-2 text-gray-700 rounded-full hover:bg-gray-100"
              >
                <div className="w-8 h-8 overflow-hidden bg-gray-300 rounded-full">
                  <img
                    src="/avatar-placeholder.png"
                    alt="Profile"
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/40";
                    }}
                  />
                </div>
                <span className="hidden md:block">John Doe</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div className="absolute right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-lg">
                  {profileLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-1">
          {/* Sidebar */}
          <div
            className={`fixed top-[64px] left-0 z-10 h-full bg-gray-400 text-white transition-all duration-300 ease-in-out ${
              sidebarOpen ? "w-64" : "w-0 md:w-16"
            }`}
          >
            <div className="flex flex-col h-full py-4">
              {sidebarLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`flex items-center px-4 py-3 transition-colors hover:bg-opacity-80 hover:bg-gray-500 ${
                    sidebarOpen ? "justify-start" : "justify-center"
                  }`}
                >
                  <span className="text-xl">{link.icon}</span>
                  {sidebarOpen && <span className="ml-3">{link.name}</span>}
                </Link>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <main
            className={`transition-all duration-300 ease-in-out ml-0 ${
              sidebarOpen ? "md:ml-64" : "md:ml-16"
            } w-full p-4`}
          >
            <Outlet />
          </main>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default OwnerLayout;
