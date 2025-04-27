import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import LoadingSpinner from "../../components/static/LoadingSpinner";

const RoomDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [room, setRoom] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get(`/rooms/${id}`)
      .then((res) => setRoom(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;
    try {
      await axiosInstance.delete(`/rooms/${id}`);
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("Failed to delete room.");
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!room) return <p>Room not found.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">{room.name}</h2>
      <p className="mb-2">Room #: {room.room_number}</p>
      <p className="mb-2">Type: {room.type}</p>
      <p className="mb-2">Floor: {room.floor}</p>
      <p className="mb-2">Beds: {room.bed_numbers}</p>
      <p className="mb-2">Capacity: {room.capacity}</p>
      <p className="mb-2">Price/night: ${room.price_per_night}</p>
      <p className="mb-4">Description: {room.description}</p>
      <div className="flex space-x-4">
        <button
          onClick={() => navigate(`/rooms/${id}/edit`)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Edit Room
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete Room
        </button>
      </div>
    </div>
  );
};

export default RoomDetail;
