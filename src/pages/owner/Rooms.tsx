import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import LoadingSpinner from "../../components/static/LoadingSpinner";

const Rooms: React.FC = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axiosInstance.get(`/hotels/${hotelId}/rooms`);
        setRooms(res.data.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, [hotelId]);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Rooms</h2>
        <button
          onClick={() => navigate(`hotels/${hotelId}/rooms/new`)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add Room
        </button>
      </div>
      <ul className="space-y-2">
        {rooms.map((room) => (
          <li
            key={room.id}
            className="p-4 border rounded cursor-pointer hover:bg-gray-50"
            onClick={() => navigate(`/rooms/${room.id}`)}
          >
            {room.name} (Room #{room.room_number})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rooms;
