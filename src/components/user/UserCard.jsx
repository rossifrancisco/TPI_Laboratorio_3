import { useState } from 'react'
import { Button, Modal, Form, Card } from 'react-bootstrap'
import { useAuthContext } from '../../context/AuthContext'
import NavbarDefault from '../navbarDefault/NavbarDefault';
import Swal from 'sweetalert2'; 

const UserCard = () => {
    const { auth, setAuth, logout } = useAuthContext();
    const [isOpen, setIsOpen] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAuth(prevAuth => ({
            ...prevAuth,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsOpen(false);

        Swal.fire({
            title: '¡Éxito!',
            text: 'Tu perfil ha sido actualizado con éxito.',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    }

    return (
        <>
            <NavbarDefault />
            <Card.Header className='-100 max-w-md mx-auto mt-5 d-flex justify-content-center align-items-center'>
                <h5>Perfil de Usuario</h5>
            </Card.Header>
            <Card className="w-100 max-w-md mx-auto mt-5 d-flex justify-content-center align-items-center">
                <Card.Body>
                    <div className="mb-3">
                        <p><strong>ID de Usuario:</strong> {auth.userId}</p>
                        <p><strong>Nombre de Usuario:</strong> {auth.username}</p>
                        <p><strong>Email:</strong> {auth.email}</p>
                        <p><strong>Nombre:</strong> {auth.firstName}</p>
                        <p><strong>Apellido:</strong> {auth.lastName}</p>
                        <p><strong>Rol:</strong> {auth.role}</p>
                    </div>
                    <Button variant="dark" onClick={() => setIsOpen(true)}>
                        Editar Perfil
                    </Button>
                    <Button variant="dark" onClick={logout} style={{ marginLeft: 5}}>
                        Cerrar sesión
                    </Button>

                    <Modal show={isOpen} onHide={() => setIsOpen(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Editar Perfil</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="username">
                                    <Form.Label>Nombre de Usuario</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="username"
                                        value={auth.username || ''}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={auth.email || ''}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="firstName">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        value={auth.firstName || ''}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="lastName">
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lastName"
                                        value={auth.lastName || ''}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="role">
                                    <Form.Label>Rol</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="role"
                                        value={auth.role || ''}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Guardar Cambios
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </Card.Body>
            </Card>
            
        </>
    )
}

export default UserCard;
