import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import OwnerLayout from "./layouts/OwnerLayout";
// import ClientLayout from "./layouts/ClientLayout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import Homepage from "./pages/HomePage";
import Hotels from "./pages/owner/Hotels";
import HotelForm from "./components/hotel/HotelForm";
import ProfilePage from "./pages/ProfilePage";
// import OwnerHomePage from "./pages/owner/OwnerHomePage";
import HotelDetail from "./pages/owner/HotelDetail";
import { useEffect } from "react";
import { useUserStore } from "./store/useUserStore";
import ClientLayout from "./layouts/ClientLayout";
// import RoomList from "./components/room/RoomList";
import RoomForm from "./components/room/RoomForm";
// import OwnerRooms from "./pages/owner/OwnerRooms";
// import OwnerHomePage from "./pages/owner/OwnerHomePage";
import Rooms from "./pages/owner/Rooms";
import RoomDetail from "./pages/owner/RoomDetail";
import OwnerHomePage from "./pages/owner/OwnerHomePage";
import HotelRooms from "./pages/owner/HotelRooms";
// import OwnerDashboard from "./components/owner/OwnerDashboard";

const App: React.FC = () => {
  // const fetchUserFromToken = useUserStore(state => state.fetchUserFromToken)
  const { user, fetchUserFromToken } = useUserStore();
  useEffect(() => {
    if (!user) {
      fetchUserFromToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if()

  return (
    <Router>
      <Routes>
        {/* Auth pages  */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route path="/" element={<ClientLayout />}>
          <Route index element={<Homepage />} />
          {/* { */}
          {user && <Route path="profile" element={<ProfilePage />} />} {/* } */}
        </Route>

        {/* Owner Routes */}
        <Route path="/owner" element={<OwnerLayout />}>
          <Route index element={<OwnerHomePage />} />
          <Route path="hotels" element={<Hotels />} />
          <Route path="hotels/new" element={<HotelForm />} />
          <Route path="hotels/:id" element={<HotelDetail />} />
          <Route path="hotels/:id/edit" element={<HotelForm />} />

          <Route path="hotels/:hotelId/rooms" element={<HotelRooms />} />
          <Route path="hotels/:hotelId/rooms/new" element={<RoomForm />} />
          <Route path="rooms/:id" element={<RoomDetail />} />
          <Route path="rooms/:id/edit" element={<RoomForm />} />

          <Route path="rooms" element={<Rooms />} />
          <Route path="booking" element={<ProfilePage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* <Route path="/rooms" element={<Homepage />} /> */}

        {/* <Route path="/hotels" element={<Hotels />} /> */}
        {/* <Route path="/hotels/search/:term" element={<Hotels />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
