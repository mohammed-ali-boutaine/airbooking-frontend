import React, { useEffect, useState } from "react";
import { useHotelStore } from "../store/useHotelStore";
import { useTagStore } from "../store/useTagStore";
import TagList from "../components/tags/TagList";
import HotelGrid from "../components/hotel/HotelGrid";

const Homepage: React.FC = () => {
  const {
    hotels,
    loading: hotelsLoading,
    fetchHomePageHotels,
  } = useHotelStore();
  const { tags, loading: tagsLoading, fetchTags } = useTagStore();
  const [activeTag, setActiveTag] = useState<string>("");
  const loading = hotelsLoading || tagsLoading;

  useEffect(() => {
    // No need to await this since the store manages the loading state
    fetchHomePageHotels();
    fetchTags();
  }, [fetchHomePageHotels, fetchTags]);

  useEffect(() => {
    if (tags.length > 0 && !activeTag) {
      setActiveTag(tags[0].id);
    }
  }, [tags, activeTag]);

  const handleTagChange = (tagId: string) => {
    setActiveTag(tagId);
    // Here you would fetch filtered hotels based on the tag
    // For now just using the existing placeholder functionality
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Tag List Section */}
      {tagsLoading ? (
        <div className="my-3 flex space-x-4 overflow-x-auto py-4">
          {[...Array(12)].map((_, index) => (
            <div
              key={index}
              className="h-10 w-32 bg-gray-200 animate-pulse rounded-full"
            ></div>
          ))}
        </div>
      ) : (
        tags.length > 0 && (
          <div className="my-1">
            <TagList activeTag={activeTag} onTagChange={handleTagChange} />
          </div>
        )
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
