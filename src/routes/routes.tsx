import { Routes, Route, Navigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import Login from "../components/auth/Login";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/owner"
        element={
          <ProtectedRoute allowedRoles={["owner"]}>
            <OwnerPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/client"
        element={
          <ProtectedRoute allowedRoles={["client", "admin", "owner"]}>
            <ClientPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
export default App;
