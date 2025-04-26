import { HotelType } from "./hotel";

// Re-export all types for easy imports
export * from "./hotel";
export * from "./review";
export * from "./room";
export * from "./tag";
export * from "./user";
export * from "./form";

export interface RoomType {
  id: number;
  hotel_id: number;
  name: string;
  room_number: string;
  type: string;
  floor: number | null;
  is_available: boolean;
  description: string | null;
  bed_numbers: number;
  capacity: number;
  price_per_night: number;
  amenities: string[] | null;
  images: RoomImage[];
  hotel?: HotelType;
  bookings?: BookingType[];
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface RoomImage {
  id: number;
  room_id: number;
  image_path: string;
  is_primary: boolean;
}

export interface BookingType {
  id: number;
  room_id: number;
  user_id: number;
  check_in: string;
  check_out: string;
  total_price: number;
  status: string;
  created_at: string;
  updated_at: string;
}
