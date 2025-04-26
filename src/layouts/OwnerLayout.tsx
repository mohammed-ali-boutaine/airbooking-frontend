import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../components/static/Logo";
import { useUserStore } from "../store/useUserStore";
import { Loader2 } from "lucide-react";
import ProfileSection from "../components/navbars/ProfileSection";
// import ProfileHeader from "../components/navbars/ProfileHeader";
// import UserProfileSection from "../components/UserProfileSection";
// import ProfileSection from "../components/navbars/ProfileSection";


const OwnerLayout = () => {
  const { user, loading } = useUserStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sidebar links
  const sidebarLinks = [
    { name: "Dashboard", href: "/owner", icon: "📊" },
    { name: "View Hotels", href: "/owner/hotels", icon: "🏨" },
    { name: "Add Hotel", href: "/owner/hotels/new", icon: "🏨" },
    { name: "Manage Rooms", href: "/owner/rooms", icon: "🛏️" },
    { name: "Statistics", href: "/owner/statistics", icon: "📈" },
    { name: "Bookings", href: "/owner/bookings", icon: "📅" },
  ];

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
            <Logo to="/owner" />
          </div>
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            user && <ProfileSection user={user} />
          )}
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