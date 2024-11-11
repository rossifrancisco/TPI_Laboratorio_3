import { useEffect, useState } from 'react'
import { Button, Modal, Form, Card } from 'react-bootstrap'
import { useAuthContext } from '../../context/AuthContext'
import NavbarDefault from '../navbarDefault/NavbarDefault';
import Swal from 'sweetalert2';
import './userCard.css';
import { useNavigate } from "react-router-dom";
import AvatarGenerator from '../avatarGenerator/AvatarGenerator';
import { useUserContext } from '../../context/UserContext';

const UserCard = () => {
    const navigate = useNavigate();
    const { auth, setAuth, logout, getData, login } = useAuthContext();
    const { updateUser } = useUserContext();
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [email, setEmail] = useState('');
    const [photo, setPhoto] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [showAvatarEditor, setShowAvatarEditor] = useState(false);  // Añadido para abrir el modal de avatar

    const token = localStorage.getItem('token');
    let user = {};

    useEffect(() => {
        const fetchUser = async () => {
            let userData = await getData(token);
            user = {
                username: userData.username,
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                photo: userData.photo,
            }

            setUsername(user.username);
            setEmail(user.email);
            setPhoto(user.photo);
            setFirstName(user.firstName);
            setLastName(user.lastName);
        };
        fetchUser();
    }, [token]);

    // Al enviar el formulario, actualizar auth en el contexto
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que los campos no estén vacíos
        if (username.trim().length === 0 || email.trim().length === 0 ||
            firstName.trim().length === 0 || lastName.trim().length === 0) {
            Swal.fire({
                title: 'Error',
                text: 'Error. Faltan completar campos.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        console.log(auth.username, oldPassword)
        const credentials = {
            username: auth.username,
            password: oldPassword,
        }
        const response = await login(credentials)
        if (!response) {
            Swal.fire({
                title: 'Error',
                text: "Contraseña incorrecta",
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        let finalPassword = newPassword.trim() === '' ? oldPassword : newPassword;

        console.log(finalPassword, 'Final Password'); // Verifica que finalPassword tenga el valor esperado

        try {
            let updatedUser = {
                username: username,
                password: finalPassword, // Utilizamos finalPassword en lugar de newPassword
                name: firstName,
                lastName: lastName,
                email: email,
                photo: photo,
            };

            console.log(updatedUser, 'Usuario actualizado');

            const success = await updateUser(auth.role, auth.userId, updatedUser);

            if (success) {
                setIsOpen(false);
                Swal.fire({
                    title: '¡Éxito!',
                    text: 'Tu perfil ha sido actualizado.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
                setAuth(prevAuth => ({
                    ...prevAuth,
                    username: username,
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    photo: photo,
                }));

                setOldPassword('')
                setNewPassword('')
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

        setIsOpen(false);  // Cerrar el modal después de la actualización
    };

    const handleSaveAvatar = (url) => {
        setPhoto(url);
    };

    const handleAvatarClick = () => {
        setShowAvatarEditor(true);  // Abrir el modal del avatar
    };

    return (
        <>
            <NavbarDefault />
            <Card.Header className='-100 max-w-md mx-auto mt-5 d-flex justify-content-center align-items-center'>
                <h5>Perfil de Usuario</h5>
            </Card.Header>
            <Card className="w-100 max-w-md mx-auto mt-5 d-flex justify-content-center align-items-center">
                <Card.Body>
                    <div className="mb-3">
                        <p><strong>Nombre de Usuario:</strong> {username}</p>
                        <p><strong>Email:</strong> {auth.email}</p>
                        <p><strong>Nombre:</strong> {auth.firstName}</p>
                        <p><strong>Apellido:</strong> {auth.lastName}</p>
                        <img className='image' src={auth.photo} alt="foto de perfil" />
                        <p><strong>Rol:</strong> {auth.role}</p>
                    </div>
                    <Button variant="dark" onClick={() => setIsOpen(true)}>
                        Editar Perfil
                    </Button>
                    <Button variant="dark" onClick={logout} style={{ marginLeft: 5 }}>
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
                            {/* Avatar predeterminado */}
                            <div style={{ textAlign: "center", marginBottom: "15px" }}>
                                <img
                                    src={photo}
                                    alt="Avatar"
                                    style={{ width: "100px", borderRadius: "50%", cursor: "pointer" }}
                                    onClick={handleAvatarClick}  // Abrir el modal para editar avatar
                                />
                                <p>Haz clic para personalizar tu avatar</p>
                            </div>

                            {/* Modal de edición de avatar */}
                            <Modal show={showAvatarEditor} onHide={() => setShowAvatarEditor(false)} centered>
                                <Modal.Header closeButton>
                                    <Modal.Title>Editor de Avatar</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <AvatarGenerator onSave={handleSaveAvatar} />
                                </Modal.Body>
                            </Modal>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="username">
                                    <Form.Label>Nombre de Usuario</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}  // Corregido el onChange
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="newPassword">
                                    <Form.Label>Nueva contraseña</Form.Label>
                                    <Form.Control
                                        type="password"  // Cambié el tipo a 'password' para mayor seguridad
                                        name="newPassword"
                                        placeholder='Dejar vacío si no se quiere cambiar'
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}  // Corregido el onChange
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}  // Corregido el onChange
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="firstName">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}  // Corregido el onChange
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="lastName">
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lastName"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}  // Corregido el onChange
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="oldPassword">
                                    <Form.Label>Ingrese su contraseña para confirmar cambios</Form.Label>
                                    <Form.Control
                                        type="text"  // Cambié el tipo a 'password' para mayor seguridad
                                        name="oldPassword"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}  // Corregido el onChange
                                        required="required"
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
