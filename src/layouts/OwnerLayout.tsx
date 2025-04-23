import { Outlet } from "react-router-dom";
// import OwnerNavBar from "../components/navbars/OwnerNavbar";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../components/static/Logo"; // Assuming you have a Logo component
import { useUserStore } from "../store/useUserStore";

const OwnerLayout = () => {


  const {user} = useUserStore()

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Profile dropdown links
    const profileLinks = [
      { name: "Profile", href: "/owner/profile" },
      { name: "Contact", href: "/owner/contact" },
      { name: "Help", href: "/owner/help" },
      // { name: "Logout", href: "/logout" },
    ];
  // ];

  // Sidebar links
  const sidebarLinks = [
    { name: "Dashboard", href: "/owner", icon: "📊" },
    { name: "View Hotels", href: "/owner/hotels", icon: "🏨" },
    { name: "Add Hotel", href: "/owner/hotels/new", icon: "🏨" },
    { name: "Manage Rooms", href: "/owner/rooms", icon: "🛏️" },
    { name: "Statistics", href: "/owner/statistics", icon: "📈" },
    { name: "Bookings", href: "/owner/bookings", icon: "📅" },
  ];

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-screen">
      {/* Main Navbar */}
      <div className="fixed d-block h-16 w-full z-10 bg-white shadow-sm">
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
            {/* <Link to="/owner" className="flex items-center"> */}
              <Logo to="/owner" />
            {/* </Link> */}
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
                    e.currentTarget.src = "https://placehold.co/40";
                  }}
                />
              </div>
              <span className="hidden md:block">{user?.name}</span>
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

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                {profileLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-16 left-0 h-full w-64 bg-white shadow-md transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-10`}
      >
        <div className="p-4">
          <nav className="space-y-2">
            {sidebarLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <span className="mr-2">{link.icon}</span>
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className={`relative min-h-full pt-16 ${sidebarOpen ? "ml-64" : ""} transition-all duration-300`}>
        <Outlet />
      </div>
    </div>
  );
};

export default OwnerLayout;
