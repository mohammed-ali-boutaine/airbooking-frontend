import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../utils/axios";
import {  HotelType, RoomType } from "../types";


const RoomDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [room, setRoom] = useState<RoomType | null>(null);
  const [hotel, setHotel] = useState<HotelType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<number>(0);
  const [bookingDates, setBookingDates] = useState({
    checkIn: "",
    checkOut: "",
  });
  const [guestCount, setGuestCount] = useState<number>(1);
  const [totalNights, setTotalNights] = useState<number>(1);

  // Calculate total nights when dates change
  useEffect(() => {
    if (bookingDates.checkIn && bookingDates.checkOut) {
      const start = new Date(bookingDates.checkIn);
      const end = new Date(bookingDates.checkOut);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setTotalNights(diffDays || 1);
    }
  }, [bookingDates]);

  useEffect(() => {
    const fetchRoomDetail = async () => {
      try {
        setLoading(true);
        const roomResponse = await axiosInstance.get(`/rooms/${id}`);
        setRoom(roomResponse.data);

        // Fetch hotel details based on the room's hotel_id
        if (roomResponse.data.hotel_id) {
          const hotelResponse = await axiosInstance.get(
            `/hotels/${roomResponse.data.hotel_id}`
          );
          setHotel(hotelResponse.data);
        }

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

  const handleBooking = () => {
    // Implement booking logic here
    console.log("Booking room:", room);
    console.log("Dates:", bookingDates);
    console.log("Guests:", guestCount);

    // This would typically make an API call to create a booking
    alert("Booking functionality would be implemented here!");
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-96 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="h-6 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
            </div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-gray-700">
          Home
        </Link>
        <svg className="h-4 w-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
        {hotel && (
          <>
            <Link to={`/hotels/${hotel.id}`} className="hover:text-gray-700">
              {hotel.name}
            </Link>
            <svg
              className="h-4 w-4 mx-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </>
        )}
        <span className="text-gray-700">{room.name}</span>
      </nav>

      {/* Room Name & Type Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{room.name}</h1>
        <div className="flex items-center mt-1">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {room.type}
          </span>
          <span className="mx-2 text-gray-400">•</span>
          <span className="text-gray-700">
            Room {room.room_number}, Floor {room.floor}
          </span>
          {room.is_available ? (
            <span className="ml-3 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              Available
            </span>
          ) : (
            <span className="ml-3 bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              Not Available
            </span>
          )}
        </div>
      </div>

      {/* Image Gallery */}
      <div className="mb-8">
        <div className="relative">
          {/* Main Image */}
          <div className="rounded-xl overflow-hidden h-96 bg-gray-100">
            {room.images && room.images.length > 0 ? (
              <img
                src={`http://127.0.0.1:8000/storage/${room.images[activeImage]?.image_path}`}
                alt={room.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder-room.png";
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}

            {/* Navigation Arrows */}
            {room.images && room.images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setActiveImage((prev) =>
                      prev === 0 ? room.images.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={() =>
                    setActiveImage((prev) =>
                      prev === room.images.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Images */}
          {room.images && room.images.length > 1 && (
            <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
              {room.images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setActiveImage(index)}
                  className={`w-24 h-16 flex-shrink-0 rounded-md overflow-hidden ${
                    index === activeImage
                      ? "ring-2 ring-blue-500"
                      : "opacity-70"
                  }`}
                >
                  <img
                    src={`http://127.0.0.1:8000/storage/${image.image_path}`}
                    alt={`Room view ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder-room.png";
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Room Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-2">
          {/* Room Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">About this room</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {room.description}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                <span>
                  <strong>{room.capacity}</strong> guests maximum
                </span>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                </svg>
                <span>
                  <strong>{room.bed_numbers}</strong> beds
                </span>
              </div>
            </div>
          </div>

          {/* Room Amenities */}
          {room.amenities && room.amenities.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                What this room offers
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {room.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="capitalize">
                      {amenity.replace("_", " ")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hotel Information */}
          {hotel && (
            <div className="border-t pt-8">
              <h2 className="text-2xl font-semibold mb-4">About the hotel</h2>
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <img
                    src={`http://127.0.0.1:8000/storage/${hotel.profile_path}`}
                    alt={hotel.name}
                    className="w-16 h-16 rounded-lg object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder-hotel.png";
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-medium text-lg">{hotel.name}</h3>
                  <p className="text-gray-600">
                    {hotel.city}, {hotel.country}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{hotel.address}</p>
              <Link
                to={`/hotels/${hotel.id}`}
                className="text-blue-600 hover:underline flex items-center"
              >
                <span>View more about this hotel</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          )}
        </div>

        {/* Booking Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 h-fit sticky top-8">
          <div className="mb-4">
            <div className="flex items-center">
              <span className="font-semibold text-2xl text-gray-900">
                ${room.price_per_night}
              </span>
              <span className="ml-1 text-gray-600">/night</span>
            </div>
          </div>

          <div className="mb-6">
            <div className="border rounded-lg overflow-hidden">
              <div className="p-4 border-b">
                <div className="grid grid-cols-2">
                  <div className="border-r pr-2">
                    <label className="block text-xs text-gray-600 uppercase">
                      Check-in
                    </label>
                    <input
                      type="date"
                      className="mt-1 block w-full border-none p-0 focus:ring-0 text-sm"
                      onChange={(e) =>
                        setBookingDates({
                          ...bookingDates,
                          checkIn: e.target.value,
                        })
                      }
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>
                  <div className="pl-2">
                    <label className="block text-xs text-gray-600 uppercase">
                      Check-out
                    </label>
                    <input
                      type="date"
                      className="mt-1 block w-full border-none p-0 focus:ring-0 text-sm"
                      onChange={(e) =>
                        setBookingDates({
                          ...bookingDates,
                          checkOut: e.target.value,
                        })
                      }
                      min={
                        bookingDates.checkIn ||
                        new Date().toISOString().split("T")[0]
                      }
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <label className="block text-xs text-gray-600 uppercase">
                  Guests
                </label>
                <select
                  className="mt-1 block w-full border-none p-0 focus:ring-0 text-sm"
                  value={guestCount}
                  onChange={(e) => setGuestCount(parseInt(e.target.value))}
                >
                  {[...Array(room.capacity)].map((_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1} {i === 0 ? "guest" : "guests"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={handleBooking}
            disabled={
              !bookingDates.checkIn ||
              !bookingDates.checkOut ||
              !room.is_available
            }
            className={`w-full ${
              room.is_available
                ? "bg-rose-600 hover:bg-rose-700"
                : "bg-gray-400 cursor-not-allowed"
            } text-white rounded-lg py-3 font-medium transition-colors`}
          >
            {room.is_available ? "Reserve" : "Not Available"}
          </button>

          <div className="mt-4 text-center text-gray-500 text-sm">
            You won't be charged yet
          </div>

          {bookingDates.checkIn && bookingDates.checkOut && (
            <div className="mt-6 border-t pt-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">
                  ${room.price_per_night} x {totalNights}{" "}
                  {totalNights === 1 ? "night" : "nights"}
                </span>
                {/* <span>
                  ${(parseFloat(room.price_per_night) * totalNights).toFixed(2)}
                </span> */}
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Cleaning fee</span>
                <span>$40.00</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Service fee</span>
                <span>$35.00</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-4 mt-4">
                <span>Total before taxes</span>
                {/* <span>
                  $
                  {(
                    parseFloat(room.price_per_night) * totalNights +
                    40 +
                    35
                  ).toFixed(2)}
                </span> */}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* House Rules Section */}
      <div className="border-t pt-8 mb-12">
        <h2 className="text-2xl font-semibold mb-6">House rules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-4">Check-in & Check-out</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 mr-2 mt-0.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <span className="font-medium">Check-in:</span> After 3:00 PM
                </div>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 mr-2 mt-0.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <span className="font-medium">Check-out:</span> Before 11:00
                  AM
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4">Policies</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 mr-2 mt-0.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <span className="font-medium">No smoking</span>
                </div>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 mr-2 mt-0.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <span className="font-medium">No parties or events</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Cancellation Policy */}
      <div className="border-t pt-8 pb-12">
        <h2 className="text-2xl font-semibold mb-4">Cancellation policy</h2>
        <p className="text-gray-700 mb-4">
          Free cancellation for 48 hours. After that, cancel before 3:00 PM on
          the day of check-in and get a full refund, minus the service fee.
        </p>
        <button className="text-blue-600 underline hover:text-blue-800">
          Learn more about cancellation policies
        </button>
      </div>
    </div>
  );
};

export default RoomDetailPage;
