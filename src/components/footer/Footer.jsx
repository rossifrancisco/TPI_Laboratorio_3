import { Container, Row, Col } from 'react-bootstrap';


const Footer = () => {

    return (
        <footer style={{ backgroundColor: '#000', color: '#fff', padding: '40px 0' }}>
            <Container>
                <Row>
                    <Col md={4}>
                    <h5>RentAR Inmobiliaria</h5>
                    <p>Síguenos en redes sociales:</p>
                    <p>
                        Facebook | Instagram | Linkedin | Twitter
                    </p>
                    </Col>

                    <Col md={2}>
                    <h6>Servicios</h6>
                    <ul className="list-unstyled">
                        <li>Alquiler</li>
                        <li>Venta</li>
                        <li>Administración</li>
                    </ul>
                    </Col>

                    <Col md={3}>
                    <h6>Recursos</h6>
                    <ul className="list-unstyled">
                        <li>Preguntas Frecuentes</li>
                        <li>Términos y Condiciones</li>
                        <li>Política de Privacidad</li>
                    </ul>
                    </Col>

                    <Col md={3}>
                    <h6>Soporte</h6>
                    <ul className="list-unstyled">
                        <li>Email: soporte@rentar.com</li>
                        <li>Teléfono: +34134345656</li>
                    </ul>
                    </Col>
                </Row>
                <hr style={{ borderColor: '#555' }} />
                <Row>
                    <Col className="text-center">
                    <p>Copyright 2024. RentAR Inmobiliaria. Todos los derechos reservados</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}
export default Footer;