import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Hotel } from "../../types/hotel";
import axiosInstance from "../../utils/axios";
import LoadingSpinner from "../../components/static/LoadingSpinner";

const Hotels: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const [deleteConfirmation, setDeleteConfirmation] = useState<number | null>(
  //   null
  // );
  // const [notification, setNotification] = useState<{
  //   message: string;
  //   type: "success" | "error";
  // } | null>(null);
  const location = useLocation();
  // const { term } = useParams();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        const url = "/owner/hotels";

        const response = await axiosInstance.get(url);
        // console.log(response.data);

        setHotels(response.data.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch hotels");
        console.error("Error fetching hotels:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [location.pathname]);

  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/hotels/${id}`);
      setHotels(hotels.filter((hotel) => hotel.id !== id));
      // setDeleteConfirmation(null);
      // setNotification({
      //   message: "Hotel deleted successfully",
      //   type: "success",
      // });
      console.log("Hotel deleted successfully:", id);
    } catch (err) {
      console.error("Error deleting hotel:", err);
      // setNotification({ message: "Failed to delete hotel", type: "error" });
    }
  };

  // // Automatically hide notification after 3 seconds
  // useEffect(() => {
  //   if (notification) {
  //     const timer = setTimeout(() => {
  //       setNotification(null);
  //     }, 3000);

  //     return () => clearTimeout(timer);
  //   }
  // }, [notification]);

  if (loading) return <LoadingSpinner />
    // return (
    //   <div className="flex justify-center items-center min-h-screen">
    //     <div className="text-xl">Loading...</div>
    //   </div>
    // );
  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );

  const isOwner = true;

  return (
    <div className="container mx-auto px-4 py-8">
   

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          {isOwner ? "My Hotels" : "All Hotels"}
        </h1>
        {isOwner && (
          <Link
            to="/owner/hotels/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Add New Hotel
          </Link>
        )}
      </div>

      {/* Responsive grid: 1 column on small screens, 2 on medium, 3 on large */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 w-full relative"
          >
            {/* Edit and Delete buttons */}
            {isOwner && (
              <div className="absolute top-2 right-2 flex gap-2 z-10">

              {/* update button redirection  */}
                <Link
                  to={`/owner/hotels/${hotel.id}/edit`}
                  className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition duration-300 hover:scale-110"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </Link>


                {/* delete button  */}
                <button
                  onClick={()=>{handleDelete(hotel.id)}}
                  className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition duration-300 hover:scale-110"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            )}

            {/* Hotel Image with hover zoom effect */}
            <div className="overflow-hidden">
              {hotel.cover_path ? (
                <img
                  src={`http://127.0.0.1:8000/storage/${hotel.profile_path}`}
                  alt={hotel.name}
                  className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No image available</span>
                </div>
              )}
            </div>

            <div className="p-5">
              <h2 className="text-lg font-semibold mb-1 hover:text-blue-600 transition-colors duration-300">
                {hotel.name}
              </h2>
              <p className="text-gray-600 text-sm mb-1">
                <span className="inline-block mr-1">📍</span>
                {hotel.city}, {hotel.country}
              </p>
              <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                {hotel.description}
              </p>

              <div className="mt-4">
                {/* Side-by-side buttons instead of stacked */}
                <div className="flex gap-2">
                  <Link
                    to={`/owner/hotels/${hotel.id}`}
                    className="flex-1 py-2 px-3 text-center border border-gray-300 rounded-md hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-300 text-gray-700 flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    Details
                  </Link>

                  {isOwner && (
                    <Link
                      to={`/owner/hotels/${hotel.id}/rooms`}
                      className="flex-1 py-2 px-3 text-center border border-gray-300 rounded-md hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-300 text-gray-700 flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      Rooms
                    </Link>
                  )}
                </div>

            
              </div>
            </div>
          </div>
        ))}

        {hotels.length === 0 && (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500 text-lg">No hotels found</p>
            {isOwner && (
              <Link
                to="/owner/hotels/new"
                className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Add Your First Hotel
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hotels;
