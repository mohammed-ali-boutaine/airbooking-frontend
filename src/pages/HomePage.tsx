import React from "react";
import { useUserStore } from "../store/useUserStore";

import AdminHome from "../components/admin/AdminHome";
import ClientHome from "../components/client/ClientHome";
import OwnerHome from "../components/owner/OwnerHome";


const HomePage: React.FC = () => {


  const { user, loading } = useUserStore();

  if (loading) return <div>Loading...</div>;

  if(!user) return <ClientHome/>

  switch (user.role) {

    case "admin":
      return <AdminHome />;
    case "owner":
      return <OwnerHome />;
    case "client":
      return <ClientHome />;

    default:
      return <div>Role not recognized</div>;
  }

};

export default HomePage;
