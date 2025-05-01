import React, { useEffect, useState } from "react";
import { Hotel, Tag } from "../types";
import axiosInstance from "../utils/axios";
import TagList from "../components/tags/TagList";
import HotelGrid from "../components/hotel/HotelGrid";

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

        setHotels(hotelsResponse.data.data || []);

        console.log("Tags response:", tagsResponse);
        console.log("Hotels response:", hotelsResponse.data);
        
        
        setTags(tagsResponse.data.data || []);

        // Set first tag as active if available
        if (tagsResponse.data.data && tagsResponse.data.data.length > 0) {
          setActiveTag(tagsResponse.data.data[0].id);
        }

        // Ensure loading shows for at least 1 second for better UX
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleTagChange = (tagId: string) => {
    setActiveTag(tagId);
    setLoading(true);

    // Simulate filtering hotels based on tag
    setTimeout(() => {
      // Here you would actually fetch filtered hotels
      // For now, just simulate by ending the loading state
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Tag List Section */}
      {!loading && tags.length > 0 && (
        <div className="my-1">
          <TagList activeTag={activeTag} onTagChange={handleTagChange} />
        </div>
      )}

      {/* Hotels Grid Section */}
      <div className="mt-8">
        <HotelGrid
          hotels={hotels}
          loading={loading}
          columns={{
            sm: 1,
            md: 2,
            lg: 3,
            xl: 4,
          }}
          gap="gap-x-6 gap-y-8"
          skeletonCount={8}
        />
      </div>
    </div>
  );
};

export default Homepage;
