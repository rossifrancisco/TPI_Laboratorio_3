import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import NavbarDefault from '../navbarDefault/NavbarDefault';
import Swal from 'sweetalert2';
import Footer from '../footer/Footer';
import { Button, Card, Form } from "react-bootstrap";


const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const handleNameChange = (e) => {
        setFormData({ ...formData, name: e.target.value });
    };
    
    const handleEmailChange = (e) => {
        setFormData({ ...formData, email: e.target.value });
    };
    
    const handlePhoneChange = (e) => {
        setFormData({ ...formData, phone: e.target.value });
    };
    
    const handleMessageChange = (e) => {
        setFormData({ ...formData, message: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        emailjs.send('service_75fqpfv', 'template_h83k6a8', formData, 'Ip1GEDcOAbIIhVBwo')
            .then((response) => {
                Swal.fire({
                    title: '¡Éxito!',
                    text: 'Email enviado con éxito!',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });

                setFormData({ name: '', email: '', phone: '', message: '' });
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Error',
                    text: `Error al enviar el email: ${error.text}`,
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            });
    };  

  return (
    <>
        <NavbarDefault />

        <div style={{minHeight: "100vh"}}>
            <Card className="w-80 mx-auto" style={{ maxWidth: "800px", marginTop: "20px", marginBottom: "20px"}}>
                <Card.Header>
                    <Card.Title>Contactate con RentAr</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>

                        <Form.Group controlId="nombre" className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="string"
                                placeholder="Ingrese su nombre"
                                value={formData.name}
                                onChange={handleNameChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="correo" className="mb-3">
                            <Form.Label>Correo</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Ingrese su email"
                                value={formData.email}
                                onChange={handleEmailChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="telefono" className="mb-3">
                            <Form.Label>Telefono</Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="Ingrese su numero de telefono"
                                value={formData.phone}
                                onChange={handlePhoneChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="mensaje" className="mb-3">
                            <Form.Label>Mensaje</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Ingrese su mensaje"
                                value={formData.message}
                                onChange={handleMessageChange}
                            />
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
};


export default Contact;