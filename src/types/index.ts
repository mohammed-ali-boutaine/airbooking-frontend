export type UserType = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "client" | 'owner' | 'super-admin';
  created_at: string;
  updated_at: string;
}

export interface Hotel {
  id: number;
  name: string;
  location: string;
  rooms: number;
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
