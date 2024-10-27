import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const Private = ({ children }) => {
  const { auth } = useAuthContext();

  if (!auth.loggedIn) {
    return <Navigate to="/Login" replace />;
  }

  return children;
};

export default Private;