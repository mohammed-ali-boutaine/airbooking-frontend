import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";

const AdminRoutes = () => (
  <AdminLayout>
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  </AdminLayout>
);