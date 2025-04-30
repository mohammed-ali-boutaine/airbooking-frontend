import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";

interface ImageSliderProps {
  images: string[];
  onImageClick?: () => void;
}

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-4 top-1/2 z-10 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-all"
    >
      <ChevronLeft className="w-6 h-6 text-gray-800" />
    </button>
  );
};

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-all"
    >
      <ChevronRight className="w-6 h-6 text-gray-800" />
    </button>
  );
};

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    autoplay: true,
    autoplaySpeed: 5000,
    beforeChange: (_: any, next: number) => setCurrentImageIndex(next),
  };

  const openGallery = (index: number) => {
    setCurrentImageIndex(index);
    setIsGalleryOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
    document.body.style.overflow = "unset";
  };

  const handleImageClick = (image: string, index: number) => {
    setSelectedImage(image);
    openGallery(index);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        galleryRef.current &&
        !galleryRef.current.contains(event.target as Node)
      ) {
        closeGallery();
      }
    };

    if (isGalleryOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isGalleryOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeGallery();
      }
    };

    if (isGalleryOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isGalleryOpen]);

  return (
    <>
      <div className="relative">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-[16/9] cursor-pointer group"
              onClick={() => handleImageClick(image, index)}
            >
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Overlay with expand button */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button
                  className="bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageClick(image, index);
                  }}
                >
                  <Maximize2 className="w-6 h-6 text-gray-800" />
                </button>
              </div>
            </div>
          ))}
        </Slider>

        {/* Selected Image Preview Button */}
        {selectedImage && (
          <button
            onClick={() => openGallery(currentImageIndex)}
            className="absolute bottom-4 right-4 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-all z-10"
          >
            <img
              src={selectedImage}
              alt="Selected preview"
              className="w-12 h-12 rounded-full object-cover"
            />
          </button>
        )}
      </div>

      {/* Gallery Popup */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <div
            ref={galleryRef}
            className="relative w-full max-w-7xl mx-auto px-4"
          >
            {/* Close button */}
            <button
              onClick={closeGallery}
              className="absolute -right-4 -top-4 z-50 bg-white/80 p-2 rounded-full hover:bg-white transition-all shadow-lg"
              aria-label="Close gallery"
            >
              <X className="w-6 h-6 text-gray-800" />
            </button>

            {/* Main image */}
            <div className="relative aspect-[16/9] mb-4">
              <img
                src={images[currentImageIndex]}
                alt={`Gallery image ${currentImageIndex + 1}`}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-6 gap-2 mt-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`aspect-square cursor-pointer ${
                    currentImageIndex === index ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageSlider;
