import React from "react";
import { useUserStore } from "../store/useUserStore";

import AdminHome from "../components/admin/AdminHome";
import ClientHome from "../components/client/ClientHome";
// import OwnerHome from "../components/owner/OwnerHome";
import AdminLayout from "../layouts/AdminLayout";
import OwnerLayout from "../layouts/OwnerLayout";
import OwnerDashboard from "../components/owner/OwnerDashboard";


const Homepage: React.FC = () => {


  const { user } = useUserStore();
  // const {loading} = useUserStore();

  console.log(user);
  

  // if (loading) return <div>Loading...</div>;
// console.log(user);
  // if(loading) return <div className="text-center">Loading</div>
  
  if(!user) return <ClientHome/>

  switch (user.role) {

    case "admin":
      return (
        <AdminLayout>
          <AdminHome />
        </AdminLayout>
      )
      
    case "owner":
      return (
        <OwnerLayout>
          <OwnerDashboard />

        </OwnerLayout>

      )
      
    case "client":
      return <ClientHome />;

    default:
      return <ClientHome/>
  }

};

export default Homepage;
