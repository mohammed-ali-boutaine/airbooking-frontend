// import { Tag } from "./hotel";


export type UserRole = 'client' | 'admin' | 'owner' | 'super-admin';
export interface Tag{
  id:number;
  name : string;
  icon_path?:string
}
export type UserType = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface HotelType {
  id? : number ;
  name: string;
  address: string;
  city: string;
  country: string;
  description: string;
  tags: Tag[] ; // array if tags ids
  profile_path: File | null;
  cover_path: File | null;
  coordinate: {
    lat: number;
    lng: number;
  };
  owner_id?: number;
  created_at?: string;
  updated_at?: string;
}

export interface FormErrors {
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

export interface Room {
  id: number;
  name: string;
  bed_numbers: number;
  number_of_guests: number;
  price: number;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface AuthResponse {
  token: string;
  user: UserType;
}
