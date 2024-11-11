import Image from 'react-bootstrap/Image';
import Navbar from '../navbarDefault/NavbarDefault';
import Footer from '../footer/Footer'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import { useState } from 'react';

const Home = () => {
    const imageHero = 'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    const imageRent = 'public/images/pexels-pixasquare-1115804.jpg'
    const navigate = useNavigate()
    const [hovered, setHovered] = useState(false);

    return (
        <>
            <Navbar />
            <div style={{ textAlign: 'center', position: 'relative' }}>
                <Image src={imageHero} fluid style={{ width: '100%' }} />
                <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white' }}>
                    <h1
                        onClick={() => navigate('/Rent')}
                        onMouseEnter={() => setHovered(true)} // Activa el hover
                        onMouseLeave={() => setHovered(false)} // Desactiva el hover
                        style={{
                            fontSize: "48px",
                            cursor: "pointer", 
                            transition: "all 0.3s ease", 
                            color: hovered ? "lightgrey" : "white", 
                            textShadow: hovered ? "3px 3px 5px rgba(0, 0, 0, 0.2)" : "", 
                            backgroundColor: hovered ? "rgba(0, 0, 255, 0.1)" : "", 
                            padding: "10px",
                            borderRadius: "10px", 
                        }}
                    >
                        ENCONTRÁ TU LUGAR IDEAL
                    </h1>
                </div>
            </div>

            <div className="d-flex" style={{ height: '100vh', backgroundColor: '#f0f0f0' }}>
                <div style={{ flex: 1 }}>
                    <Image src={imageRent} fluid style={{ height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1, padding: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div>

                        <h2>En RentAR</h2>
                        <p>
                            Estamos dedicados a ayudarte a encontrar el hogar de tus sueños o a vender tu propiedad de manera rápida y eficiente.
                            Nuestro portal te ofrece una experiencia fácil, segura y personalizada, permitiéndote acceder a una amplia variedad
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home;