import { Outlet } from "react-router-dom";

const AdminLayout = () => (
  <div>
    <nav>Admin Navbar</nav>
    <Outlet />
  </div>
);

export default AdminLayout;