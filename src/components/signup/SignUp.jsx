import { useState } from "react";
import Navbar from '../navbarDefault/NavbarDefault';
import Footer from '../footer/Footer'
import './SignUp.css';
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

const SignUp = () => {
    const {register, auth, logout} = useAuthContext();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [passWord, setPassWord] = useState('');
    const [email, setEmail] = useState('');
    const [photo, setPhoto] = useState('');
    const [role, setRole] = useState(null);

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (!role) {
            Swal.fire({
                title: 'Error',
                text: 'Por favor seleccione un rol (Tenant o Owner).',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        const newUser = {
            username: userName,
            password: passWord,
            name: firstName,
            lastname: lastName,
            email: email,
            photo: `https://unavatar.io/${userName}`,
            role: role,
        };

        const user = register(newUser); 

        if (user) {
            Swal.fire({
                title: '¡Éxito!',
                text: '¡Usuario registrado correctamente!',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                setFirstName('');
                setLastName('');
                setUserName('');
                setEmail('');
                setPassWord('');
                setPhoto('');
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
                                <p>Email: </p>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
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
                            <Form.Group controlId="roleSelect">
                                <Form.Control
                                    as="select"
                                    value={role || ""}
                                    onChange={(event) => setRole(event.target.value)}
                                    required
                                >
                                    <option value="" disabled>Seleccione un rol</option>
                                    <option value="tenant">Inquilino</option>
                                    <option value="owner">Propietario</option>
                                </Form.Control>
                            </Form.Group>
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