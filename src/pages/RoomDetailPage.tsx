import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { RoomType } from "../types";
import axiosInstance from "../utils/axios";

const RoomDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [room, setRoom] = useState<RoomType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoomDetail = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/rooms/${id}`);
        console.log("Room data:", response.data);

        setRoom(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching room details:", err);
        setError("Failed to load room details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRoomDetail();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Room not found</h2>
          <p className="mt-2 text-gray-600">
            The room you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <div className="flex items-center mb-4">
            <Link
              to={`/hotels/${room.hotel_id}`}
              className="text-blue-600 hover:underline flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Hotel
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">{room.name}</h1>
          <p className="text-gray-700 text-lg mb-4">
            Room {room.room_number}, Floor {room.floor}
          </p>

          <div className="border-t border-gray-200 pt-4 mt-4">
            <h2 className="text-xl font-semibold mb-2">Room ID: {id}</h2>
            <p className="text-gray-700 mb-4">{room.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="font-medium text-gray-900">Price</h3>
                <p className="text-xl font-bold text-blue-600">
                  ${room.price_per_night}{" "}
                  <span className="text-sm text-gray-500 font-normal">
                    per night
                  </span>
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Capacity</h3>
                <p className="text-lg">{room.capacity} guests</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Type</h3>
                <p className="text-lg">{room.type}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Beds</h3>
                <p className="text-lg">{room.bed_numbers} beds</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Amenities</h3>
              {room.amenities && room.amenities.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {room.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                    >
                      {amenity.replace("_", " ")}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No amenities listed</p>
              )}
            </div>
          </div>

          <div className="mt-8">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full">
              Book This Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailPage;
