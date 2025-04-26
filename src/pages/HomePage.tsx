import React, { useEffect } from "react";
import { useUserStore } from "../store/useUserStore";

// import AdminHome from "../components/admin/AdminHome";
// import ClientHome from "../components/client/ClientHome";
// import OwnerHome from "../components/owner/OwnerHome";


// import AdminLayout from "../layouts/AdminLayout";
// import OwnerLayout from "../layouts/OwnerLayout";
// import OwnerDashboard from "../components/owner/OwnerDashboard";

const Homepage: React.FC = () => {
  const { user } = useUserStore();
  const {loading} = useUserStore();

  // console.log(user);
useEffect(() => {
  console.log(user);
  
}, []);
  if (loading) return <div>Loading...</div>;
  // console.log(user);
  // if(loading) return <div className="text-center">Loading</div>


      return <>client</>


};

export default Homepage;
