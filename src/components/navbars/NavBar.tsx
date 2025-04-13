// components/RoleBasedNavbar.tsx
import { useUserStore } from "../../store/useUserStore";
import AdminNavbar from "./AdminNavbar";
import ClientNavbar from "./ClientNavbar";

// import other navbars...

export default function RoleBasedNavbar() {
  const user = useUserStore((s:any) => s.user);

  if (!user) return null;

  switch (user.role) {
    case "admin":
      return <AdminNavbar />;
    case "client":
      return <ClientNavbar />;

    default:
      return null;
  }
}
