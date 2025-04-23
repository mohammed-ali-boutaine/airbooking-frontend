import { Review } from "./review";
import { Room } from "./room";
import { Tag } from "./tag";
import { UserType } from "./user";

export interface Hotel {
  id?: number;
  name: string;
  address: string;
  city: string;
  country: string;
  tags: Tag[];
  description: string;
  coordinate: {
    lat: number;
    lng: number;
  };
  profile_path?: string | null | File;
  cover_path?: string | null | File;
  owner_id: number;
  owner?: UserType;
  rooms?: Room[];
  reviews?: Review[];
  created_at: string;
  updated_at: string;
}

export interface HotelFormErrors {
  name?: string;
  address?: string;
  city?: string;
  country?: string;
  tags?: string;
  description?: string;
  profile_path?: string;
  cover_path?: string;
  coordinate?: string;
}

export type HotelType = Hotel;