import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Navbar from '../navbarDefault/NavbarDefault';
import Footer from '../footer/Footer'
import { useAuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { Button, Card, Form } from "react-bootstrap";

const Login = () => {
    const { login, auth, error } = useAuthContext();
    const navigate = useNavigate(); 
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
            <div style={{minHeight: "100vh"}}>
                <Card className="w-80 mx-auto" style={{ maxWidth: "800px", marginTop: "20px", marginBottom: "20px"}}>
                    <Card.Header>
                        <Card.Title>Ingrese su cuenta</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={onSubmitHandler}>
                            <Form.Group controlId="username" className="mb-3">
                                <Form.Label>Nombre de usuario</Form.Label>
                                <Form.Control
                                    type="string"
                                    placeholder="Ingrese su nombre de usuario"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="floor" className="mb-3">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    type="string"
                                    placeholder="Ingrese su contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>

                            <Button
                                type="submit"
                                variant="success"
                                className="w-100"
                                style={{marginBottom: "20px"}}
                            >
                                Ingresar
                            </Button>
                            <Button
                                type="submit"
                                variant="primary"
                                className="w-100"
                                onClick={() => navigate('/SignUp')}
                            >
                                ¿No tienes una cuenta? Registrate
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
            <Footer />
        </>
    );
}

export default Login;