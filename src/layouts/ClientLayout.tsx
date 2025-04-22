import ClientNavBar from "../components/navbars/ClientNavBar";
// import { Outlet } from "react-router-dom";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ClientNavBar />
      <main>{children} </main>
      {/* add foter  */}
    </div>
  );
};

export default ClientLayout;
