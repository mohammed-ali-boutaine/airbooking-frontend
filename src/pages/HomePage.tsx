import React, { useEffect, useState } from "react";
import { Hotel, Tag } from "../types";
import axiosInstance from "../utils/axios";
import TagList from "../components/tags/TagList";

const Homepage: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [activeTag, setActiveTag] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        // Fetch hotels and tags in parallel
        const [hotelsResponse, tagsResponse] = await Promise.all([
          axiosInstance.get("/homePageHotels"),
          axiosInstance.get("/tags"),
        ]);

        // console.log(tagsResponse.data.data);
        

        setHotels(hotelsResponse.data.data || []);
        setTags(tagsResponse.data.data || []);

        // Set first tag as active if available
        if (tagsResponse.data.data && tagsResponse.data.data.length > 0) {
          setActiveTag(tagsResponse.data.data[0].id);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleTagChange = (tagId: string) => {
    setActiveTag(tagId);
    // Optionally filter hotels based on selected tag
    // You could make another API call or filter the existing hotels
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Tag List Section */}
      {!loading && tags.length > 0 && (
        <div className="my-1">
          <TagList activeTag={activeTag} onTagChange={handleTagChange} />
        </div>
      )}

      {/* Hotels Section */}
      <div className="mt-8">
        {loading ? (
          <div className="flex justify-center">
            <div className="w-full max-w-md p-4 rounded-md">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : hotels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map((hotel) => (
              <div key={hotel.id} className="border rounded-md shadow-sm p-4">
                <h3 className="text-lg font-medium">{hotel.name}</h3>
                <p className="text-gray-600">
                  {hotel.city}, {hotel.country}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No hotels found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
