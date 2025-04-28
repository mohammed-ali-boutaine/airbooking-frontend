import { Route } from "react-router-dom";
import ClientLayout from "../layouts/ClientLayout";
import Homepage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import NotFound from "../components/static/NotFound";

export const clientRoutes = (
  <Route path="/" element={<ClientLayout />}>
    <Route index element={<Homepage />} />
    <Route path="profile" element={<ProfilePage />} />
    <Route path="*" element={<NotFound />} />

  </Route>
);
