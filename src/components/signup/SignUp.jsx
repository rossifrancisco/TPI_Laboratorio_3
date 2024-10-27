import { useState } from "react";
import { addUser, getUsers } from "../users/Users";
import Navbar from '../navbarDefault/NavbarDefault';
import Footer from '../footer/Footer'
import './SignUp.css';
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";

const SignUp = () => {
    const {register, auth, logout} = useAuthContext();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [passWord, setPassWord] = useState('');
    

    const onSubmitHandler = () => {
        event.preventDefault();

        const newUser = {
            userName: userName,
            passWord: passWord,
            FirstName: firstName,
            lastName: lastName,
            userId: getUsers().length + 1,
            isAdmin: false,
        };

        const success = register(newUser); 

        if (success) {
            Swal.fire({
                title: '¡Éxito!',
                text: '¡Usuario registrado correctamente!',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                setFirstName('');
                setLastName('');
                setUserName('');
                setPassWord('');
                navigate("/Login"); // Redirigir a crear el inmueble
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: 'El nombre de usuario ya está en uso, elija otro.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    return (
        <>
            <Navbar />
            {
                auth.loggedIn ? (
                    <div className="login-container">
                        <div>
                            <h4>Estás logueado como: {auth.firstName} {auth.lastName}</h4>
                            <Button onClick={logout}>Cerrar sesión</Button>
                        </div>
                    </div>
                      
                ) : (
                    <div className="signup-container">
                        <h1 style={{ textAlign: "center", margin: "50px" }}>Ingrese sus datos</h1>
                        <form onSubmit={onSubmitHandler} className="signup">
                            <label>
                                <p>Nombre:</p>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(event) => setFirstName(event.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                <p>Apellido: </p>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(event) => setLastName(event.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                <p>Nombre de Usuario: </p>
                                <input
                                    type="text"
                                    value={userName}
                                    onChange={(event) => setUserName(event.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                <p>Contraseña: </p>
                                <input
                                    type="password"
                                    value={passWord}
                                    onChange={(event) => setPassWord(event.target.value)}
                                    required
                                />
                            </label>
                            <button type="submit"> Registrarse </button>
                        </form>
                    </div>
                )
            }
            <Footer />
        </>
    );
}
export default SignUp;