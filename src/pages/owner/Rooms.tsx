import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Loader2, Plus, Edit, Trash2, Bed, Users, DollarSign, Hash, Building } from "lucide-react";
import { Hotel, Room } from "../../types";
import axiosInstance from "../../utils/axios";

const Rooms = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        // Fetch hotel details
        const hotelResponse = await axiosInstance.get(`/hotels/${hotelId}`);
        setHotel(hotelResponse.data);
        
        // Fetch rooms for this hotel
        const roomsResponse = await axiosInstance.get(`/hotels/${hotelId}/rooms`);
        // Ensure rooms is an array before setting state
        const roomsData = roomsResponse.data?.data || roomsResponse.data;
        setRooms(Array.isArray(roomsData) ? roomsData : []);
        setLoading(false);
      } catch (err) {
        setError("Failed to load rooms");
        setLoading(false);
        console.error(err);
      }
    };

    if (hotelId) {
      fetchRooms();
    }
  }, [hotelId]);

  const handleDeleteRoom = async (roomId: number) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      try {
        await axiosInstance.delete(`/api/rooms/${roomId}`);
        setRooms(rooms.filter(room => room.id !== roomId));
      } catch (err) {
        setError("Failed to delete room");
        console.error(err);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mt-8">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Rooms for {hotel?.name || "Hotel"}
          </h1>
          <p className="text-gray-600">{rooms.length} rooms available</p>
        </div>
        <Link
          to={`/owner/hotels/${hotelId}/rooms/new`}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          <Plus size={18} className="mr-2" /> Add New Room
        </Link>
      </div>

      {!Array.isArray(rooms) || rooms.length === 0 ? (
        <div className="text-center p-10 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-medium text-gray-600">No rooms yet!</h3>
          <p className="mt-2 text-gray-500">
            Start by adding a new room to this hotel.
          </p>
          <Link
            to={`/owner/hotels/${hotelId}/rooms/new`}
            className="mt-4 inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            <Plus size={18} className="mr-2" /> Add First Room
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
            >
              {room.images && room.images.length > 0 ? (
                <img
                  src={room.images[0].image_path}
                  alt={room.name}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <Bed size={48} className="text-gray-400" />
                </div>
              )}
              
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{room.name}</h3>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                    <Bed size={14} className="mr-1" /> {room.type}
                  </span>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                    <DollarSign size={14} className="mr-1" /> ${room.price_per_night}/night
                  </span>
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                    <Hash size={14} className="mr-1" /> {room.room_number}
                  </span>
                  {room.floor !== null && (
                    <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                      <Building size={14} className="mr-1" /> Floor {room.floor}
                    </span>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-x-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Users size={16} className="mr-1" />
                    <span>{room.capacity} guests</span>
                  </div>
                  <div className="flex items-center">
                    <Bed size={16} className="mr-1" />
                    <span>{room.bed_numbers} beds</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-2">{room.description}</p>
                
                {room.amenities && room.amenities.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Amenities:</h4>
                    <div className="flex flex-wrap gap-1">
                      {room.amenities.slice(0, 3).map((amenity, index) => (
                        <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded">
                          {amenity}
                        </span>
                      ))}
                      {room.amenities.length > 3 && (
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">
                          +{room.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                  <Link
                    to={`/owner/rooms/${room.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View Details
                  </Link>
                  <div className="flex space-x-2">
                    <Link
                      to={`/owner/rooms/${room.id}/edit`}
                      className="p-2 text-yellow-600 hover:text-yellow-800 rounded-full hover:bg-yellow-50"
                    >
                      <Edit size={18} />
                    </Link>
                    <button
                      onClick={() => handleDeleteRoom(room.id)}
                      className="p-2 text-red-600 hover:text-red-800 rounded-full hover:bg-red-50"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Rooms;
