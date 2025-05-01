import { Route } from "react-router-dom";
import ClientLayout from "../layouts/ClientLayout";
import Homepage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import HotelDetailPage from "../pages/HotelDetailPage";
import RoomDetailPage from "../pages/RoomDetailPage";
import WishlistPage from "../pages/WishlistPage";
import { UserType } from "../types";

export const ClientRoutes = (user?: UserType | null) => (
  <Route path="/" element={<ClientLayout />}>
    <Route index element={<Homepage />} />
    <Route path="hotels/:id" element={<HotelDetailPage />} />
    <Route path="rooms/:id" element={<RoomDetailPage />} />
    {user && (
      <>
        <Route path="profile" element={<ProfilePage />} />
        <Route path="wishlist" element={<WishlistPage />} />
      </>
    )}
  </Route>
);
