import { BrowserRouter as Router, Routes } from "react-router-dom";

import { useEffect } from "react";
import { useUserStore } from "./store/useUserStore";
import { authRoutes } from "./routes/authRoutes";
import { clientRoutes } from "./routes/clientRoutes";
import { OwnerRoutes } from "./routes/ownerRoutes";
// import NotFound from "./components/static/NotFound";
// import { ownerRoutes } from "./routes/ownerRoutes";


const App: React.FC = () => {
  const { user, fetchUserFromToken } = useUserStore();
  useEffect(() => {
    if (!user) {
      fetchUserFromToken();
    }
  }, []);

  return (
    <Router>
      <Routes>
        {authRoutes}
        {clientRoutes}
        {OwnerRoutes()}
        {/* <OwnerRoutes /> */}
     
        
        {/* Add a catch-all route for 404 */}
      </Routes>
    </Router>
  );

};

export default App;
