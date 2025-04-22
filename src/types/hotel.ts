export interface User {
  id: number;
  name: string;
}

export interface Room {
  id: number;
  name: string;
  description: string;
  price: number;
  images?: Image[];
}


export interface Tag{
  id:number;
  name : string;
  icon_path?:string
}
export interface Image {
  id: number;
  path: string;
}

export interface Review {
  id: number;
  comment: string;
  rating: number;
  created_at: string;
  user: User;
}

export interface Hotel {
  id: number;
  name: string;
  address: string;
  city: string;
  country: string;
  tags:Tag[];
  description: string;
  coordinate: {
    lat: number;
    lng: number;
  };
  profile_path?: string;
  cover_path?: string;
  owner_id: number;
  owner?: User;
  rooms?: Room[];
  reviews?: Review[];
  created_at: string;
  updated_at: string;
} 