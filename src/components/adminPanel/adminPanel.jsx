import { Button, Card, Form } from "react-bootstrap";
import Navbar from '../navbarDefault/NavbarDefault';
import Footer from '../footer/Footer';
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useUserContext } from "../../context/UserContext";
import Swal from "sweetalert2";

const AdminPanel = () => {
    const { auth } = useAuthContext();
    const { getUserById, deleteUser } = useUserContext();
    const [userId, setUserId] = useState("");
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

   
    const getUser = async () => {
        if (userId) {
            setIsLoading(true);
            try {
                let fetchedUser = await getUserById("Owner", userId); 
                if (!fetchedUser) {
                    fetchedUser = await getUserById("Tenant", userId); 
                }
                if (fetchedUser) {
                    let userFound = {
                        id: fetchedUser.userId,
                        name: fetchedUser.firstName,
                        email: fetchedUser.email,
                        photo: fetchedUser.photo
                    }
                    setUser(userFound);
                    setError("");
                } else {
                    setError("Usuario no encontrado");
                    setUser(null);
                }
            } catch (err) {
                setError("Error al buscar el usuario");
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const deleteHandler = async () => {
        if (user) {
            setIsLoading(true);
            try {
                let responseTenant = await deleteUser('Tenant', userId);
                let responseOwner = await deleteUser('Owner', userId);
                if (responseOwner || responseTenant){
                    Swal.fire({
                        title: '¡Éxito!',
                        text: '¡Usuario eliminado correctamente!',
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    })
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'No se pudo eliminar el usuario',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    })
                }
                setUser(null);
                setUserId("");
                setError("");
            } catch (err) {
                console.error(err);
                setError("No se pudo eliminar el usuario");
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <>
            <Navbar />
            <Card className="w-80 mx-auto" style={{ maxWidth: "800px", marginTop: "20px", marginBottom: "20px" }}>
                <Card.Header>
                    <Card.Title>Buscar y Eliminar Usuario</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group controlId="userId" className="mb-3">
                            <Form.Label>ID de Usuario</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese la ID de usuario"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                required
                            />
                        </Form.Group>

                        {error && <p style={{ color: 'red' }}>{error}</p>} 
                        {isLoading && <p>Cargando...</p>}

                        {user && (
                            <div>
                                <h5>Detalles del Usuario</h5>
                                <p><strong>ID:</strong> {user.id}</p>
                                <p><strong>Nombre:</strong> {user.name}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Foto:</strong> <img src={user.photo} alt="Foto del usuario" style={{ maxWidth: '100px', maxHeight: '100px' }} /></p>
                            </div>
                        )}

                        <Button
                            type="button"
                            variant="primary"
                            className="w-100"
                            onClick={getUser}
                            disabled={isLoading || !userId.trim()} 
                        >
                            Buscar Usuario
                        </Button>

                        <Button
                            type="button"
                            variant="danger"
                            className="w-100 mt-3"
                            onClick={deleteHandler}
                            disabled={!user || isLoading}
                        >
                            Eliminar Usuario
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <Footer />
        </>
    );
};

export default AdminPanel;