import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import HomePage from "./pages/HomePage";
import "./index.css";

// import HotelForm from "./components/hotel/HotelForm";
// import CreateHotel from "./components/hotel/CreateHotel";
// import ProfilePage from "./pages/ProfilePage";
import AuthLayout from "./layouts/AuthLayout";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* <Route path="/forgot-password" element={<ForgotPasswordPage />} /> */}

        </Route>

        {/* <Route path="/*" element={<RoleBasedRoutes />} /> */}

        <Route path="/" element={<HomePage />} />
        {/* <Route path="/create-room" element={<RoomForm />} /> */}
        {/* <Route path="/create-hotel" element={<HotelForm />} /> */}
        {/* <Route path="/create-hotell" element={<CreateHotel />} /> */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
        {/* <Route path="/profile" element={<ProfilePage />} /> */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
