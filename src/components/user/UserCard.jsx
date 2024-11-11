import { useState } from 'react'
import { Button, Modal, Form, Card } from 'react-bootstrap'
import { useAuthContext } from '../../context/AuthContext'
import NavbarDefault from '../navbarDefault/NavbarDefault';
import Swal from 'sweetalert2';
import './userCard.css';
import { useNavigate } from "react-router-dom";

const UserCard = () => {
    const navigate = useNavigate();
    const { auth, setAuth, logout, updateUserProfile, getData } = useAuthContext();
    const [isOpen, setIsOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const userData = getData(localStorage.getItem('token'));
    
    // Estado local para los datos del formulario
    const [formData, setFormData] = useState({
        username: userData.username || '',
        email: userData.email || '',
        password: userData.password || '',
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        photo: userData.photo || '',
    });

    // Actualizar el estado local
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
            photo: name === 'username' ? `https://unavatar.io/${value}` : prevFormData.photo
        }));
    }

    // Al enviar el formulario, actualizar auth en el contexto
    const handleSubmit = async (e) => {  
        e.preventDefault();
    
        try {
          const success = await updateUserProfile(formData, `/api/${formData.role}/update/${auth.userId}`); 
    
          if (success) {
            setIsOpen(false);
            Swal.fire({
              title: '¡Éxito!',
              text: 'Tu perfil ha sido actualizado.',
              icon: 'success',
              confirmButtonText: 'OK',
            });
          }
        } catch (error) {
          console.error("Error al actualizar el perfil:", error);
          Swal.fire({
            title: 'Error',
            text: error.message || "No se pudo actualizar el perfil",
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
    
        // Actualizar auth con formData
        setAuth(prevAuth => ({
          ...prevAuth,
          ...formData
        }));
    
        setIsOpen(false);  // Cerrar el modal después de la actualización
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prevShowPassword => !prevShowPassword);
        console.log(auth.photo);
    };
    const maskedPassword = auth.password ? 'x'.repeat(auth.password.length) : '';

    return (
        <>
            <NavbarDefault />
            <Card.Header className='-100 max-w-md mx-auto mt-5 d-flex justify-content-center align-items-center'>
                <h5>Perfil de Usuario</h5>
            </Card.Header>
            <Card className="w-100 max-w-md mx-auto mt-5 d-flex justify-content-center align-items-center">
                <Card.Body>
                    <div className="mb-3">
                        <p><strong>Nombre de Usuario:</strong> {auth.username}</p>
                        <p>
                            <strong>Contraseña:</strong> {showPassword ? auth.password : maskedPassword}
                            <button onClick={togglePasswordVisibility} style={{ marginLeft: '10px' }}>
                                {showPassword ? 'Ocultar' : 'Mostrar'}
                            </button>
                        </p>
                        <p><strong>Email:</strong> {auth.email}</p>
                        <p><strong>Nombre:</strong> {auth.firstName}</p>
                        <p><strong>Apellido:</strong> {auth.lastName}</p>
                        <img className='image' src={auth.photo} alt="foto de perfil"/>
                        <p><strong>Rol:</strong> {auth.role}</p>
                    </div>
                    <Button variant="dark" onClick={() => setIsOpen(true)}>
                        Editar Perfil
                    </Button>
                    <Button variant="dark" onClick={logout} style={{ marginLeft: 5}}>
                        Cerrar sesión
                    </Button>

                    {/* Botones exclusivos para el rol Owner */}
                    {auth.role === 'Owner' && (
                        <>
                            <Button variant="dark" onClick={() => navigate('/CreateBuilding')}>
                                Crear Edificio
                            </Button>
                            <Button variant="dark" onClick={() => navigate('/BuildingSelect')}>
                                Crear Departamento
                            </Button>
                        </>
                    )}

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
                                        value={formData.username}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="firstName">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="lastName">
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
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