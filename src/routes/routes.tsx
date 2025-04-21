import { createBrowserRouter } from "react-router-dom";
import OwnerLayout from "../layouts/OwnerLayout";
import HotelForm from "../components/hotel/HotelForm";
import ClientLayout from "../layouts/ClientLayout";
import ClientHome from "../components/client/ClientHome";
import LoginPage from "../pages/auth/LoginPage";


export const rouets = createBrowserRouter([
  {
    element: <OwnerLayout />,
    children: [
      {
        path: "/dashboard",
        // element: <DashboardHome/>
      },
      {
        path: "/dashboard/clients",
        // element: <Users/>
      },
      {
        path: "/create-hotel",
        element: <HotelForm />,
      },
    ],
  },
  {
    element: <ClientLayout />,
    children: [
      {
        path: "/",
        element: <ClientHome />,
      },
      {
        path:"/register",
        // element : 
      },{
        path : '/login',
        element : <LoginPage/>
      }
    ],
  },
]);
