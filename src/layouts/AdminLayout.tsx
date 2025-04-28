import { Outlet } from "react-router-dom";

const AdminLayout = () => (
  <div>
    <nav>Admin Navbar</nav>
    {/* {children} */}
    <Outlet />
  </div>
);

export default AdminLayout;