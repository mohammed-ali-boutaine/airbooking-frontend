import React, { useEffect } from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import RoomForm from "./components/room/RoomForm";
import NotFound from "./components/static/NotFound";
import Home from "./pages/Home";

import Navbar from "./components/static/NavBar";
// import Register from "./components/Register";
// import RegisterForm from "./components/auth/RegisterForm";
// import Dashboard from "./admin/Dashboard";
import HotelForm from "./components/hotel/HotelForm";
import Register from "./components/auth/Register";
import Footer from "./components/static/Footer";
import { useUserStore } from "./store/useUserStore";

const App: React.FC = () => {
  const { user, loading, error, fetchUserFromToken } = useUserStore(
    (state) => ({
      user: state.user,
      loading: state.loading,
      error: state.error,
      fetchUserFromToken: state.fetchUserFromToken,
    })
  );

  useEffect(() => {
    if (!user) {
      fetchUserFromToken();
    }
  }, [user, fetchUserFromToken]);

  return (
    <Router>
      <Navbar />
      <div>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {user && <p>Welcome, {user.name}</p>}
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-room" element={<RoomForm />} />
        <Route path="/create-hotel" element={<HotelForm />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
