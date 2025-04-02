import React from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import RoomForm from "./components/room/RoomForm";
import NotFound from "./components/static/NotFound";
import Home from "./pages/Home";

import Navbar from "./components/static/NavBar";
// import Register from "./components/Register";
import RegisterForm from "./components/auth/RegisterForm";
import Dashboard from "./admin/Dashboard";
import HotelForm from "./components/hotel/HotelForm";
const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/create-room" element={<RoomForm />} />
        <Route path="/create-hotel" element={<HotelForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
