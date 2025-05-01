import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageSliderProps {
  images: string[];
  onImageClick?: (index: number) => void;
  className?: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  onImageClick = () => {},
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [imageFailed, setImageFailed] = useState(false);

  // Reset slider when images change
  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setIsLoading(true);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    setIsLoading(true);
  };

  const handleImageClick = () => {
    onImageClick(currentIndex);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
    setImageFailed(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setImageFailed(true);
  };

  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-400">
        No images available
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {/* Main Image */}
      <div
        className="w-full h-full flex items-center justify-center overflow-hidden"
        onClick={handleImageClick}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400"></div>
          </div>
        )}

        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className={`transition-opacity duration-300 ${className} ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />

        {imageFailed && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mb-2"
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
            <p>Image failed to load</p>
          </div>
        )}
      </div>

      {/* Navigation arrows (only show if more than one image) */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-1 shadow focus:outline-none transition-all hover:scale-110"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-1 shadow focus:outline-none transition-all hover:scale-110"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </button>

          {/* Image counter */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
            <span>
              {currentIndex + 1} / {images.length}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageSlider;
