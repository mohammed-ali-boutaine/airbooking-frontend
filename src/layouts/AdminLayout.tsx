// import { Outlet } from "react-router-dom";

const AdminLayout = ({ children }: { children: React.ReactNode }) => (
  <div>
    <nav>Admin Navbar</nav>
    {children}
  </div>
);

export default AdminLayout;