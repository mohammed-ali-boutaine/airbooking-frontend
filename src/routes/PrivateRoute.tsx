import { Navigate, Outlet } from 'react-router-dom';
import { UserRole, UserType } from '../types/user'; // Adjust the import path as needed

interface PrivateRouteProps {
  allowedRoles: UserRole[];
  user: UserType | null;
}

const PrivateRoute = ({ allowedRoles, user }: PrivateRouteProps) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
    // Or you can redirect to an unauthorized page
    // return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;