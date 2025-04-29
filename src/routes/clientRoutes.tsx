import { Route } from "react-router-dom";
import ClientLayout from "../layouts/ClientLayout";
import Homepage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import { UserType } from "../types";

export const ClientRoutes = (user?: UserType | null) => (
   
    <Route path="/" element={<ClientLayout />}>
    <Route index element={<Homepage />} />
    {user && <Route path="profile" element={<ProfilePage />} />}
  </Route>
  
);
