import ClientNavBar from "../components/navbars/ClientNavBar";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ClientNavBar />
      <main>{children}</main>
    </div>
  );
};

export default ClientLayout;