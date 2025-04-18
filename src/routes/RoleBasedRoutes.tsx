import AdminRoutes from "./AdminRoutes";
import OwnerRoutes from "./OwnerRoutes";
import ClientRoutes from "./ClientRoutes";
import { useUserStore } from "../store/useUserStore";

const RoleBasedRoutes = () => {
  // const { role } = useAuth();

  const {user , loading} = useUserStore()


  if (loading) return <div>Loading...</div>;

  if(!user) return <ClientRoutes />

  const role = user.role;
  if (role === "admin") return <AdminRoutes />;
  if (role === "owner") return <OwnerRoutes />;
  if (role === "client") return <ClientRoutes />;
  return <div>Invalid Role</div>;
};

export default RoleBasedRoutes;