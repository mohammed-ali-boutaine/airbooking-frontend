import axiosInstance from "../../utils/axios";
import LoadingSpinner from "../../components/static/LoadingSpinner";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Room } from "../../types";

const RoomDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/rooms/${id}`);
        setRoom(response.data.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching room details:", err);
        setError("Failed to fetch room details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRoomData();
    }
  }, [id]);

  const handleNextImage = () => {
    if (room?.images && room.images.length > 0) {
      setActiveImageIndex((prev) => (prev + 1) % room.images.length);
    }
  };

  const handlePrevImage = () => {
    if (room?.images && room.images.length > 0) {
      setActiveImageIndex(
        (prev) => (prev - 1 + room.images.length) % room.images.length
      );
    }
  };

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
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;
  if (!room) return <p>Room not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Room Images */}
      <div className="mb-6">
        <div className="relative rounded-lg overflow-hidden h-80">
          {room.images && room.images.length > 0 ? (
            <>
              <img
                src={room.images[activeImageIndex].image_path}
                alt={`Room ${room.room_number}`}
                className="w-full h-full object-cover"
              />
              {room.images.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between">
                  <button
                    onClick={handlePrevImage}
                    className="bg-black bg-opacity-30 text-white p-2 rounded-full ml-2 hover:bg-opacity-50"
                  >
                    &lt;
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="bg-black bg-opacity-30 text-white p-2 rounded-full mr-2 hover:bg-opacity-50"
                  >
                    &gt;
                  </button>
                </div>
              )}
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-sm">
                {activeImageIndex + 1} / {room.images.length}
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
              No images available for this room
            </div>
          )}
        </div>
      </div>

      {/* Room Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">{room.name}</h1>
          <p className="text-gray-700">{room.description}</p>
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Room Information</h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="font-medium mr-2">Room Number:</span>{" "}
                {room.room_number}
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">Type:</span> {room.type}
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">Floor:</span> {room.floor}
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">Capacity:</span>{" "}
                {room.capacity} {room.capacity > 1 ? "people" : "person"}
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">Beds:</span>{" "}
                {room.bed_numbers}
              </li>
            </ul>
          </div>
        </div>

        <div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-gray-500">Price per night</p>
                <p className="text-2xl font-bold">${room.price_per_night}</p>
              </div>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {room.is_available ? "Available" : "Not Available"}
              </div>
            </div>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => navigate(`/owner/rooms/${id}/edit`)}
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

          {/* Amenities */}
          {room.amenities && room.amenities.length > 0 && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {room.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
