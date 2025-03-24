import React from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";

import NotFound from "./components/NotFound";
import Home from "./pages/Home";

import Navbar from "./components/NavBar";
// import Register from "./components/Register";
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./admin/Dashboard";
const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
