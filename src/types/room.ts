import { Image } from "./Image";

export interface Room {
  id: number;
  name: string;
  bed_numbers: number;
  number_of_guests: number;
  price: number;
  images?: Image[];
}
