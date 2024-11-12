import { useState } from "react";
import Navbar from '../navbarDefault/NavbarDefault';
import Footer from '../footer/Footer'
import './SignUp.css';
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Button, Card, Form } from "react-bootstrap";


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

            <div style={{minHeight: "100vh"}}>
                <Card className="w-80 mx-auto" style={{ maxWidth: "800px", marginTop: "20px", marginBottom: "20px"}}>
                    <Card.Header>
                        <Card.Title>Ingrese sus datos</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={onSubmitHandler}>

                            <Form.Group controlId="nombre" className="mb-3">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="string"
                                    placeholder="Ingrese su nombre"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="apellido" className="mb-3">
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control
                                    type="string"
                                    placeholder="Ingrese su apellido"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="username" className="mb-3">
                                <Form.Label>Nombre de usuario</Form.Label>
                                <Form.Control
                                    type="string"
                                    placeholder="Ingrese su nombre de usuario"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="email" className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="string"
                                    placeholder="Ingrese su email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="contraseña" className="mb-3">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    type="string"
                                    placeholder="Ingrese su contraseña"
                                    value={passWord}
                                    onChange={(e) => setPassWord(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="roleSelect">
                                <Form.Control
                                    as="select"
                                    value={role || ""}
                                    onChange={(event) => setRole(event.target.value)}
                                    required
                                >
                                    <option value="" disabled>Seleccione un rol</option>
                                    <option value="Tenant">Inquilino</option>
                                    <option value="Owner">Propietario</option>
                                </Form.Control>
                            </Form.Group>

                            <Button
                                type="submit"
                                variant="success"
                                className="w-100"
                                style={{marginTop: "20px"}}
                            >
                                Registrarse
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
            <Footer />
        </>
    );
}
export default SignUp;