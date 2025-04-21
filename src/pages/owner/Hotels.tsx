import React, { useEffect, useState } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
// import axios from 'axios';
import { Hotel } from '../../types/hotel';
import axiosInstance from '../../utils/axios';

const Hotels: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const { term } = useParams();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        let url = '/hotels';
        
        if (location.pathname.includes('/owner/hotels')) {
          url = '/owner/hotels';
        } else if (term) {
          url = `/hotels/search/${term}`;
        }

        const response = await axiosInstance.get(url);
        setHotels(response.data.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch hotels');
        console.error('Error fetching hotels:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [location.pathname, term]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          {location.pathname.includes('/owner/hotels') ? 'My Hotels' : 'All Hotels'}
        </h1>
        {location.pathname.includes('/owner/hotels') && (
          <Link
            to="/owner/hotels/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add New Hotel
          </Link>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {hotel.cover_path && (
              <img 
                src={hotel.cover_path} 
                alt={hotel.name} 
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{hotel.name}</h2>
              <p className="text-gray-600 mb-2">{hotel.city}, {hotel.country}</p>
              <p className="text-gray-700 mb-4">{hotel.description}</p>
              <div className="flex justify-between items-center">
                <Link 
                  to={`/hotels/${hotel.id}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  View Details
                </Link>
                {location.pathname.includes('/owner/hotels') && (
                  <Link
                    to={`/owner/hotels/${hotel.id}/edit`}
                    className="text-green-600 hover:text-green-800"
                  >
                    Edit
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hotels;
