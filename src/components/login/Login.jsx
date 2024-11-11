import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Navbar from '../navbarDefault/NavbarDefault';
import Footer from '../footer/Footer'
import './Login.css'
import { useAuthContext } from "../../context/AuthContext";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

const Login = () => {
    const { login, auth, error } = useAuthContext();
    const navigate = useNavigate(); 
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleProfile = () => {
        navigate("/user"); 
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const credentials = {
            username: username,
            password: password
        }
        const response = await login(credentials);
        if (response){
            navigate("/rent");
        }
        else {
            Swal.fire({
                title: 'Error',
                text: 'Usuario y/o contraseña incorrectos. Intente nuevamente peton',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };
    return (
        <>
            <Navbar />
            <div className="login-container">
                {auth.loggedIn ? (
                    <div>
                        <h4>Estás logueado como: {auth.firstName} {auth.lastName}</h4>
                        <Button onClick={handleProfile}>Ir al perfil</Button>
                    </div>
                ) : (
                    <>
                        <h1 style={{ textAlign: "center", margin: "50px" }}>
                            Ingrese su cuenta
                        </h1>
                        <form onSubmit={onSubmitHandler} className="login">
                            <label className="field">
                                <p>Nombre de usuario:</p>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
                                    required
                                />
                                {error.username && <p className="error">{error.username}</p>}
                            </label>
                            <label className="field">
                                <p>Contraseña:</p>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                />
                                {error.password && <p className="error">{error.password}</p>}
                            </label>
                            <button type="submit">Ingresar</button>
                            <button 
                                style={{ backgroundColor: '#1c55a7'}} 
                                onClick={() => navigate('/SignUp')}
                            >
                                ¿No tienes una cuenta? Registrate
                            </button>
                        </form>
                    </>
                )}
            </div>
            <Footer />
        </>
    );
}

export default Login;