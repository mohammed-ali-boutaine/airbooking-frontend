export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
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
  user: User;
}
