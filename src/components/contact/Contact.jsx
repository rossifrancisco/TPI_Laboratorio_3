import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import NavbarDefault from '../navbarDefault/NavbarDefault';
import Swal from 'sweetalert2';
import Footer from '../footer/Footer';

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
        <div className="container mt-5" style={{minHeight: "100vh"}}>
            <h2>Contactate con RentAr</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nombre:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleNameChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Teléfono:</label>
                    <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Mensaje:</label>
                    <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        rows="4"
                        value={formData.message}
                        onChange={handleMessageChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary" style={{ marginTop: 15 }}>Enviar</button>
            </form>
        </div>
        <Footer />
    </>
    
  );
};


export default Contact;