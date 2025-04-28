import { Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import PrivateRoute from "./PrivateRoute";

export const adminRoutes = (
     <Route 
       path="/admin" 
       element={<PrivateRoute allowedRoles={['admin', 'super-admin']} user={user} />}
     >
       <Route element={<AdminLayout />}>
         {/* Admin specific routes would go here */}
       </Route>
     </Route>
   );