import AdminNavbar from "../components/navbar/AdminNavbar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AdminNavbar />
      <main>{children}</main>
    </div>
  );
};

export default AdminLayout;