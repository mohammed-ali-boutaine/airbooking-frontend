import React from 'react';
import { Link } from 'react-router-dom';
import { FaHotel, FaPlus, FaChartLine, FaUsers, FaCalendarAlt, FaStar } from 'react-icons/fa';

const OwnerHomePage: React.FC = () => {
  // Mock data - in a real app, this would come from an API
  const stats = {
    totalHotels: 3,
    totalBookings: 24,
    averageRating: 4.5,
    upcomingBookings: 5,
    totalRevenue: 12500,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Owner Dashboard</h1>
          <div className="text-sm text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg mr-4">
                <FaHotel className="text-blue-600 text-xl" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Hotels</p>
                <h3 className="text-2xl font-bold text-gray-800">{stats.totalHotels}</h3>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg mr-4">
                <FaCalendarAlt className="text-green-600 text-xl" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Bookings</p>
                <h3 className="text-2xl font-bold text-gray-800">{stats.totalBookings}</h3>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg mr-4">
                <FaStar className="text-yellow-600 text-xl" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Average Rating</p>
                <h3 className="text-2xl font-bold text-gray-800">{stats.averageRating}</h3>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg mr-4">
                <FaChartLine className="text-purple-600 text-xl" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Revenue</p>
                <h3 className="text-2xl font-bold text-gray-800">${stats.totalRevenue.toLocaleString()}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link 
            to="/owner/hotels"
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-blue-100 rounded-lg mr-4 group-hover:bg-blue-200 transition-colors">
                <FaHotel className="text-blue-600 text-xl" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">My Hotels</h2>
            </div>
            <p className="text-gray-600">Manage your hotel listings, update information, and view bookings</p>
          </Link>

          <Link 
            to="/owner/hotels/add"
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-green-100 rounded-lg mr-4 group-hover:bg-green-200 transition-colors">
                <FaPlus className="text-green-600 text-xl" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Add New Hotel</h2>
            </div>
            <p className="text-gray-600">Create a new hotel listing and start accepting bookings</p>
          </Link>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-purple-100 rounded-lg mr-4">
                <FaUsers className="text-purple-600 text-xl" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Upcoming Bookings</h2>
            </div>
            <div className="space-y-3">
              <p className="text-gray-600">You have {stats.upcomingBookings} upcoming bookings</p>
              <Link 
                to="/owner/bookings"
                className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
              >
                View all bookings
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerHomePage;
