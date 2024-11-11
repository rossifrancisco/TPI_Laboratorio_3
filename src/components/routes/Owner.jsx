import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";

const Owner = ({ children }) => {
    const { auth } = useAuthContext();

    if (auth.role !== "Owner") {
        Swal.fire({
            title: 'Error',
            text: 'No tienes permiso para esta funcionalidad',
            icon: 'error',
            confirmButtonText: 'Volver al inicio'
        });
        return <Navigate to="/" replace />;
    }
    return children;
};

export default Owner;