import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import { Tag } from "../../types";

// interface Tag {
//   id: string;
//   name: string;
//   icon: string; // URL or class for the icon
// }

interface TagListProps {
  activeTag: string;
  onTagChange: (tagId: string) => void;
}

const TagList: React.FC<TagListProps> = ({ activeTag, onTagChange }) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/tags");
        setTags(response.data.data || []);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <section className="flex w-full items-center xl:px-20 lg:px-16 md:px-10 px-3 relative">
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide gap-10 py-4 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {tags.map((tag) => (
          <a
            key={tag.id}
            href={`/?tag=${tag.id}`}
            onClick={(e) => {
              e.preventDefault();
              onTagChange(tag.id);
            }}
            className={`flex flex-col items-center min-w-[94px] hover:text-black my-4 ${
              activeTag === tag.id ? "text-black" : "text-[#717171]"
            } duration-300`}
          >
            {/* Display icon dynamically */}
            {/* {tag.icon_path ? (
              <img src={`http://127.0.0.1:8000/storage/icons/${tag.icon_path}`} alt={tag.name} className="w-8 h-8" />
            ) : ( */}
              <span className={`icon-class ${tag.name}`} />
            {/* )} */}
            <span className="relative text-[13px] font-semibold mt-2 text-center">
              {tag.name}
            </span>
            {activeTag === tag.id && (
              <div className="h-[2px] w-6 bg-black mt-2 rounded-full"></div>
            )}
          </a>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="absolute left-3 inline-flex items-center inset-y-0 z-10">
        <button
          onClick={handleScrollLeft}
          className="prevEl hover:bg-[#ffffffcd] duration-200 bg-[#ffffffb6] border border-[#cfcfcf] hover:shadow-lg shadow-xs inline-flex items-center justify-center w-[30px] rounded-full h-[30px]"
        >
          <ChevronLeft size={19} />
        </button>
      </div>
      <div className="absolute right-3 inline-flex items-center inset-y-0 z-10">
        <button
          onClick={handleScrollRight}
          className="nextEl hover:bg-[#ffffffcd] duration-200 bg-[#ffffffb6] border border-[#cfcfcf] hover:shadow-lg shadow-xs inline-flex items-center justify-center w-[30px] rounded-full h-[30px]"
        >
          <ChevronRight size={19} />
        </button>
      </div>

      {/* Filter button */}
      {/* <button className="md:flex hidden items-center gap-x-2 rounded-xl border border-[#ddd] hover:border-black hover:bg-[#f4f4f4] py-3 px-4 ml-4">
        <svg viewBox="0 0 32 32" height="22" width="22" fill="currentColor">
          <path d="M15 5C13.707 5 12.605 5.844 12.188 7H4V9H12.188C12.605 10.156 13.707 11 15 11C16.293 11 17.395 10.156 17.812 9H28V7H17.812C17.395 5.844 16.293 5 15 5ZM15 7C15.563 7 16 7.438 16 8C16 8.563 15.563 9 15 9C14.438 9 14 8.563 14 8C14 7.438 14.438 7 15 7ZM22 13C20.707 13 19.605 13.844 19.188 15H4V17H19.188C19.605 18.156 20.707 19 22 19C23.293 19 24.395 18.156 24.812 17H28V15H24.812C24.395 13.844 23.293 13 22 13ZM22 15C22.563 15 23 15.438 23 16C23 16.563 22.563 17 22 17C21.438 17 21 16.563 21 16C21 15.438 21.438 15 22 15ZM11 21C9.707 21 8.605 21.844 8.188 23H4V25H8.188C8.605 26.156 9.707 27 11 27C12.293 27 13.395 26.156 13.812 25H28V23H13.812C13.395 21.844 12.293 21 11 21ZM11 23C11.563 23 12 23.438 12 24C12 24.563 11.563 25 11 25C10.438 25 10 24.563 10 24C10 23.438 10.438 23 11 23Z" />
        </svg>
        <span className="text-[13px] font-semibold">Filters</span>
      </button> */}
    </section>
  );
};

export default TagList;
