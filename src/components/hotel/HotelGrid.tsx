import React from "react";
import { Hotel } from "../../types";
import HotelCardSkeleton from "./HotelCardSkeleton";
import HotelCard from "./HotelCard";
// import HotelCard from "./HotelCard";
// import HotelCardSkeleton from "./HotelCardSkeleton";

interface HotelGridProps {
  hotels: Hotel[];
  loading?: boolean;
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: string;
  skeletonCount?: number;
}

const HotelGrid: React.FC<HotelGridProps> = ({
  hotels,
  loading = false,
  columns = {
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,
  },
  gap = "gap-x-6 gap-y-8",
  skeletonCount = 8,
}) => {
  // Determine grid columns based on screen size
  const getGridColsClasses = () => {
    const classes = [];

    if (columns.sm) classes.push(`grid-cols-${columns.sm}`);
    if (columns.md) classes.push(`md:grid-cols-${columns.md}`);
    if (columns.lg) classes.push(`lg:grid-cols-${columns.lg}`);
    if (columns.xl) classes.push(`xl:grid-cols-${columns.xl}`);

    return classes.join(" ");
  };

  const gridClasses = `grid ${getGridColsClasses()} ${gap}`;

  if (loading) {
    // When loading, show skeleton placeholders
    return (
      <div className={gridClasses}>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <HotelCardSkeleton key={`skeleton-${index}`} />
        ))}
      </div>
    );
  }

  if (!hotels || hotels.length === 0) {
    // When no hotels are found
    return (
      <div className="col-span-full py-10 text-center">
        <h2 className="text-xl font-medium mb-2">No hotels found</h2>
        <p className="text-gray-500">
          Try adjusting your search or browse different categories
        </p>
      </div>
    );
  }

  // Render actual hotel cards
  return (
    <div className={gridClasses}>
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </div>
  );
};

export default HotelGrid;
