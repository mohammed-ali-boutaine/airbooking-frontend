import { Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import PrivateRoute from "./PrivateRoute";
import { UserType } from "../types";
// import { useUserStore } from "../store/useUserStore";
// import { useEffect } from "react";

export const AdminRoutes = (user?: UserType | null) => {
  // const { user, fetchUserFromToken } = useUserStore();

  // useEffect(() => {
  //   if (!user) {
  //     fetchUserFromToken();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    // <Routes>
    user && (
      <Route
        path="/admin"
        element={
          <PrivateRoute allowedRoles={["admin", "super-admin"]} user={user} />
        }
      >
        <Route element={<AdminLayout />}>
          {/* Admin specific routes would go here */}
        </Route>
      </Route>
    )

    //   user &&    (   <Route
    //   path="/admin"
    //   element={
    //     <PrivateRoute allowedRoles={["admin", "super-admin"]} user={user} />
    //   }
    // >
    //   <Route element={<AdminLayout />}>
    //     {/* Admin specific routes would go here */}
    //   </Route>
    // </Route>)
    // }

    // </Routes>
  );
};
