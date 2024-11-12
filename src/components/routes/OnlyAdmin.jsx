import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";

const OnlyAdmin = ({ children }) => {
  const { auth } = useAuthContext();

  if (auth.role != "Admin") {
    Swal.fire({
        title: 'Error',
        text: 'No tenes permiso para esta funcionalidad',
        icon: 'error',
        confirmButtonText: 'Volver al incio'
    });
    return <Navigate to="/" replace />;
  }

  return children;
};

export default OnlyAdmin;