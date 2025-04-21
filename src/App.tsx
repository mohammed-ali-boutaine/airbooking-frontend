import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import "./index.css";

import AuthLayout from "./layouts/AuthLayout";
import OwnerLayout from "./layouts/OwnerLayout";
import HotelForm from "./components/hotel/HotelForm";
// import OwnerHome from "./components/owner/OwnerHome";
import ProfilePage from "./pages/ProfilePage";
// import HotelDashboard from "./components/admin/HotelDashboard";
import Homepage from "./pages/HomePage";
import HotelsPage from "./pages/owner/Hotels";
// import HotelDetailsPage from "./pages/client/HotelDetails";
import OwnerHomePage from "./pages/owner/OwnerHomePage";
// import Homepage from "./pages/Homepage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route path="/" element={<Homepage />} />
        <Route path="/rooms" element={<Homepage />} />

        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/hotels/search/:term" element={<HotelsPage />} />

        {/* Owner Routes */}
        <Route path="/owner" element={<OwnerLayout />}>
          <Route index element={<OwnerHomePage />} />
          <Route path="hotels" element={<HotelsPage />} />
          <Route path="hotels/new" element={<HotelForm />} />
          <Route path="hotels/:id/edit" element={<HotelForm />} />
          <Route path="rooms" element={<ProfilePage />} />
          <Route path="booking" element={<ProfilePage />} />
          <Route path="statistics" element={<ProfilePage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

      </Routes>
    </Router>
  );
};

export default App;
