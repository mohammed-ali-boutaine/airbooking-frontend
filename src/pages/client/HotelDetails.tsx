import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Hotel } from '../../types/hotel';

const HotelDetails: React.FC = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/hotels/${id}`);
        setHotel(response.data.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch hotel details');
        console.error('Error fetching hotel:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!hotel) return <div>Hotel not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {hotel.cover_path && (
          <img 
            src={hotel.cover_path} 
            alt={hotel.name} 
            className="w-full h-96 object-cover rounded-lg mb-6"
          />
        )}
        
        <h1 className="text-4xl font-bold mb-4">{hotel.name}</h1>
        
        <div className="flex items-center text-gray-600 mb-4">
          <span className="mr-4">{hotel.city}, {hotel.country}</span>
          {hotel.owner && (
            <span>Owned by: {hotel.owner.name}</span>
          )}
        </div>

        <div className="prose max-w-none mb-8">
          <p className="text-gray-700">{hotel.description}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Rooms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hotel.rooms?.map((room) => (
              <div key={room.id} className="border rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
                <p className="text-gray-600 mb-2">Price: ${room.price}</p>
                <p className="text-gray-700">{room.description}</p>
              </div>
            ))}
          </div>
        </div>

        {hotel.reviews && hotel.reviews.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
            <div className="space-y-4">
              {hotel.reviews.map((review) => (
                <div key={review.id} className="border rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <span className="font-semibold">{review.user.name}</span>
                    <span className="text-gray-500 ml-2">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelDetails; 