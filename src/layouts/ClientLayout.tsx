import ClientNavBar from "../components/navbars/ClientNavBar";
import { Outlet } from "react-router-dom";

const ClientLayout = () => {
  return (
    <div>
      <ClientNavBar />
      <main>

        <Outlet/>
      </main>
      {/* add foter  */}
    </div>
  );
};

export default ClientLayout;