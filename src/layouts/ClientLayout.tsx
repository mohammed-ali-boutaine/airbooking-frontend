import AdminNavbar from "../components/navbar/AdminNavbar";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AdminNavbar />
      <main>{children}</main>
    </div>
  );
};

export default ClientLayout;